## Backlight ON (dimmed) if there's any light in the room, OFF otherwise

The night mode activates when all the lights are off and shutters are down below 25% (assuming it's dark enough for the backlight to be disturbing in such situation), the day mode activates otherwise. During the day, when the screen is after short idle, it dims to the level configured in Home Assistant, but never turns off. During the night, the screen turns off after the long idle period.

This will act directly on the plate in a certain room, as it is triggered by entities located in that room. If you have multiple plates in various rooms, you can create separate automations for each.

```yaml linenums="1"
- id: openhasp-plate_myroom-day
  alias: "openHASP Night mode based on My Room entities"
  trigger:
    - platform: state
      entity_id: light.plate_myroom_light_12
    - platform: state
      entity_id: light.plate_myroom_light_14
    - platform: state
      entity_id: cover.myroom_1
    - platform: state
      entity_id: cover.myroom_2
    - platform: state
      entity_id: openhasp.plate_myroom
      from: 'unavailable'
  mode: restart
  condition:
    condition: and
    conditions:
    - condition: template
      value_template: "{{ (as_timestamp(now()) - as_timestamp(states('sensor.ha_uptime_moment'))) / 60 > 2 }}"
    - condition: template
      value_template: >
        {{ 
        state_attr("cover.myroom_1", "current_position") | float(default=0) > 25 or
        state_attr("cover.myroom_2", "current_position") | float(default=0) > 25 or
        states("light.plate_myroom_light_12") == "on" or 
        states("light.plate_myroom_light_14") == "on"
        }}
  action:
    - service: openhasp.config
      target:
        entity_id: openhasp.plate_myroom
      data:
        submodule: gui
        parameters: '{"idle2":0}'


- id: openhasp-plate_myroom-night
  alias: "openHASP Day mode based on My Room entities"
  trigger:
    - platform: state
      entity_id: light.plate_myroom_light_12
    - platform: state
      entity_id: light.plate_myroom_light_14
    - platform: state
      entity_id: cover.myroom_1
    - platform: state
      entity_id: cover.myroom_2
    - platform: state
      entity_id: openhasp.plate_myroom
      from: 'unavailable'
  mode: restart
  condition:
    condition: and
    conditions:
    - condition: template
      value_template: "{{ (as_timestamp(now()) - as_timestamp(states('sensor.ha_uptime_moment'))) / 60 > 2 }}"
    - condition: template
      value_template: >
        {{ not (
        state_attr("cover.myroom_1", "current_position") | float(default=0) > 25 or
        state_attr("cover.myroom_2", "current_position") | float(default=0) > 25 or
        states("light.plate_myroom_light_12") == "on" or 
        states("light.plate_myroom_light_14") == "on" )
        }}
  action:
    - service: openhasp.config
      target:
        entity_id: openhasp.plate_myroom
      data:
        submodule: gui
        parameters: '{"idle2":60}'

```

Note the condition which assures to avoid triggering the automations falsely when Home Assistant (re)starts (allows running the automation only when Home Assistant has been up for at least 2 minutes).

* * * * *

## Backlight ON (dimmed) during the day, OFF during the night for all the plates

The night mode activates when sun goes down, and the day mode activates when the sun comes up. During the day, when the screen is after short idle, it dims to the level configured in Home Assistant, but never turns off. During the night, the screen turns off after the long idle period.

Assuming your plate's configured MQTT _group name_ is `plates`, this will affect _all_ the plates in your system at once:

```yaml linenums="1"
- id: openhasp-night
  alias: "openHASP Night mode"
  trigger:
    - platform: numeric_state
      entity_id: sun.sun
      attribute: elevation
      below: -1
  condition:
    - condition: template
      value_template: "{{ (as_timestamp(now()) - as_timestamp(states('sensor.ha_uptime_moment'))) / 60 > 2 }}"
  action:
    - service: mqtt.publish
      data:
        topic: hasp/plates/config/gui
        payload: '{"idle2":120}'

- id: openhasp-day
  alias: "openHASP Day mode"
  trigger:
    - platform: numeric_state
      entity_id: sun.sun
      attribute: elevation
      above: 1
  condition:
    - condition: template
      value_template: "{{ (as_timestamp(now()) - as_timestamp(states('sensor.ha_uptime_moment'))) / 60 > 2 }}"
  action:
    - service: mqtt.publish
      data:
        topic: hasp/plates/config/gui
        payload: '{"idle2":0}'
```

Note here too the condition which assures to avoid triggering the automations falsely when Home Assistant (re)starts (allows running the automation only when Home Assistant has been up for at least 2 minutes).

* * * * *

## Turn ON moodlight when backlight goes OFF (and back)

If your plate has moodlights, it is useful in dark situations, when you don't want to have the screen backlit on all the time as above, but have the mood light on instead. During the day mood light doesn't light.

Put your `light.plate_my_room_moodlight` to a Lovelace card entity row and select a nice color for moodlight.

```yaml linenums="1"
- id: openhasp-moodlight-on
  alias: "openHASP Moodlight ON when Backlight OFF"
  trigger:
    - platform: state
      entity_id: light.plate_my_room_backlight
      from: 'on'
      to: 'off'
  action:
    - service: light.turn_on
      target:
        entity_id: light.plate_my_room_moodlight

- id: openhasp-moodlight-off
  alias: "openHASP Moodlight OFF when Backlight ON"
  trigger:
    - platform: state
      entity_id: light.plate_my_room_backlight
      from: 'off'
      to: 'on'
  action:
    - service: light.turn_off
      target:
        entity_id: light.plate_my_room_moodlight
```

* * * * *

## Return to home page after some idle time

Apart from the idle times controlling backlight levels, one may want to return to page 1 after a while. 

```yaml linenums="1"
- id: openhasp-back-to-page-1
  alias: "openHASP back to page 1"
  trigger:
    - platform: template
      value_template: "{{ state_attr('openhasp.plate_my_room','idle') != 'off' }}"
      for: "00:05:00"
  condition:
    - condition: template
      value_template: "{{ states('openhasp.plate_my_room') != '1' and states('openhasp.plate_my_room') != 'unavailable' }}"
  action:
    - service: openhasp.change_page
      target:
        entity_id: openhasp.plate_my_room
      data:
        page: 1

```
<!--
* * * * *

## Reload design pages from Home Assistant configuration directory

It's possible to store the `pages.jsonl` plate design configuration files in a central location, namely your Home Assistant server. Practically you can do this by creating a directory where your `configuration.yaml` resides, say `hasp-lvgl` and you can drop your `pages.jsonl` files there for all your plates.

You need to allow Home Assistant components to access this directory, this can be done in `configuration.yaml` with this directive (in case of hassio looks like this) :
```yaml linenums="1"
homeassistant:
  allowlist_external_dirs: 
    - /config/openhasp/
```

With the [services](#custom-component/services) `openhasp.clear_page` and `openhasp.load_pages` you can clear one or all the pages of your plate, and reload their configuration from the server, respectively.

For the example automation below i've created an [input_boolean](https://www.home-assistant.io/integrations/input_boolean/){target=_blank} named `load_pages_plate_my_room` in order to have a switch in Lovelace UI to trigger this manually.

```yaml linenums="1"
- id: openhasp-reload_pages
  alias: "openHASP reload pages"
  trigger:
    - platform: state
      entity_id: input_boolean.load_pages_plate_my_room
      from: 'off'
      to: 'on'
  action:
    - service: openhasp.clear_page
      data:
        page: 1
      target:
        entity_id: openhasp.plate_my_room
    - service: hasp_lvgl.load_pages
      data:
        path: /config/openhasp/pages_my_room_v1.jsonl
      target:
        entity_id: openhasp.plate_my_room
    - service: input_boolean.turn_off
      data:
        entity_id: input_boolean.load_pages_plate_my_room
```

If you omit the `openhasp.clear_page` service completely, the objects will be updated. It's important to know that they have to remain the same type (e.g. you can't update from a `label` type object to a `button` type object. If you need a change, you need to clear first.)

If you omit lines `data:` and `page: 1`, all pages will be cleared.

To trigger this automation when Home Assistant starts, you can use this in your automation:
```yaml linenums="1"
  trigger:
    - platform: homeassistant
      event: start
```
_Note:_ You can also use the `path` directive in the component config to load the design configuration at Home Assistant start, but that won't clear the existing pages (it assumes the pages are empty). 

-->
* * * * *

## Prevent burn-in of the LCD screen

You can use this to protect and prolonge the lifetime of the LCD screens, thus being more green and generating less hazardous waste.

Wall mounted LCD screns main problem is that they display the same picture 99.999% of the time. Even if somebody turns off backlight during the night or dark periods, the LCD screen keeps showing the same picture, seen by nobody. There are high chances that this will lead to screen [picture burn-in](https://github.com/HASwitchPlate/openHASP/issues/134){target=_blank} after a few years of operation.

<h3>Pixel training</h3>

One way to reduce this is to "train" the pixels periodically with completely different other content.
Assuming your group name is configured as `plates` in your screens running openHASP, here is a possible solution to extend their life (all at once). The cycle runs for 30 seconds each time, can be stopped by touching. The trigger runs this 6 times each night.

```yaml linenums="1"
- id: openhasp_antiburn_start_at_night
  alias: openHASP anti-burn-in start at night
  initial_state: 'on'
  trigger:
    - platform: time
      at: '00:20:00'
    - platform: time
      at: '01:20:00'
    - platform: time
      at: '02:20:00'
    - platform: time
      at: '03:20:00'
    - platform: time
      at: '04:20:00'
    - platform: time
      at: '05:20:00'
  action:
    - service: mqtt.publish
      data:
        topic: hasp/plates/command/antiburn
        payload: '1'
```

<h3>Clear pixels when backlight off</h3>

Another way to reduce the chance of burn-in is to clear the contents of the screen while the backlight is turned off, as nobody sees the pixels anyway.
Just add these actions to the [first automation example](#turn-on-moodlight-when-backlight-goes-off-and-back) which draw an overlay with a black base object on page 0 when display is off, and deletes it when comes back on:

for automation `openhasp-moodlight-on`, add to actions:

```yaml linenums="1"
    - service: mqtt.publish
      data:
        topic: hasp/plates/command/jsonl
        payload: '{"page":0,"id":99,"obj":"obj","x":0,"y":0,"w":240,"h":320,"radius":0,"hidden":0,"bg_grad_dir":0,"bg_color":"black"}'
```

for automation `openhasp-moodlight-off`, add to actions:

```yaml linenums="1"
    - service: mqtt.publish
      data:
        topic: hasp/plates/command/p0b99.hidden
        payload: '1'
    - service: mqtt.publish
      data:
        topic: hasp/plates/command/p0b99.delete
        payload: ''
```

Don't forget to adjust the size of the object to your screen if it's not 240x320.

## Dynamically set UI element dimensions

!!! note
    This technique relies on [small changes in the openHasp device firmwar ](https://github.com/HASwitchPlate/openHASP/issues/278) that should be present in all builds of `0.7` _after_ 2021-01.

openHasp devices report several device properties to the Custom Component... including `tftWidth` and `tftHeight`.
These properties are exposed in home assistant as device attributes and can be used in template automations.

Here is a modified version of the [Display clock and temperature](./sampl_conf.md#display-clock-and-temperature) example configuration that will use a "generic" `jsonl` file that has no hard-coded layout attributes: `x`, `y`, `w`, `h` and will appear the same on devices with different resolutions and screen orientations.

Tell the openHasp device to create three text labels.
As we are not specifying x/y coordinates, when the device _first_ powers on, all three labels will be drawn in the upper left corner with their default size/values.

When `plate00` comes online and connects to the MQTT broker, the openHasp Custom Component will be invoked and the `yaml` below will be executed.
The templates will be executed and the computed `x`, `y`, `w`, `h` values for each UI component will be sent to the plate.

````json linenums="1"
{
    "page": 0,
    "comment": "Default to page0 as the header and page/layout"
}
{
    "id": 1,
    "comment": "Time in the top left",
    "obj": "label",
    "text": "00:00",
    "bg_color": "#2C3E50"
}
{
    "id": 2,
    "comment": "Temp in the middle",
    "obj": "label",
    "text": "00.0°C",
    "bg_color": "#2C3E50"
}
{
    "id": 3,
    "comment": "Humidity in the top right",
    "obj": "label",
    "text": "00.0%",
    "bg_color": "#2C3E50"
}
```

Assuming that the above `jsonl` was deployed to a openHasp device named `plate00`, configure the Home Assistant Custom Component with `yaml` like this:

```yaml linenums="1"
# The top left corner is 0,0, X grows positive to the right and Y grows positive down
plate00:
  objects:
    # Header: Time
    - obj: "p0b1"
      properties:
        "align": "left"
        "text": "{{ states('sensor.time') }}"
        "mode": "loop"
        ##
        # Draw the labels with a 1% margin from the top and sides
        "x": >-
          {% set scnWd = state_attr('openhasp.plate00', 'tftWidth') | int %}
          {% set hdrHorMargin = (scnWd*0.01) | int %}
          {{hdrHorMargin}}          

        "y": >-
          {% set scnHt = state_attr('openhasp.plate00', 'tftHeight') | int %}
          {% set hdrVrtMargin = (scnHt*0.01) | int %}
          {{hdrVrtMargin}}          

        # Width is 1/3 of the screen width after subtracting margins
        ##
        "w": >-
          {% set numObj = 3 %}
          {% set scnWd = state_attr('openhasp.plate00', 'tftWidth') | int %}
          {% set hdrHorMargin = (scnWd*0.01) | int %}
          {% set usableHdrWd = scnWd-(2*hdrHorMargin) %}
          {% set hdrLblWd = (usableHdrWd/numObj) | int %}
          {{hdrLblWd}}          

        # Height is 10% of the screen, after margin
        ##
        "h": >-
          {% set scnHt = state_attr('openhasp.plate00', 'tftHeight') | int %}
          {% set hdrVrtMargin = (scnHt*0.01) | int %}
          {% set hdrHt = (scnHt*0.1) | int %}
          {% set hdrLblHt = hdrHt-hdrVrtMargin %}
          {{hdrLblHt}}          

    # Header: Temp
    - obj: "p0b2"
      properties:
        "align": "center"
        "text": "{{ states('sensor.room_temperature') }}°C"
        "mode": "loop"
        ##
        # Draw the labels with a 1% margin from the top and sides
        "x": >-
          {% set numObj = 3 %}
          {% set scnWd = state_attr('openhasp.plate00', 'tftWidth') | int %}
          {% set hdrHorMargin = (scnWd*0.01) | int %}
          {% set usableHdrWd = scnWd-(2*hdrHorMargin) %}
          {% set hdrLblWd = (usableHdrWd/numObj) | int %}
          {% set hdrHorMargin = (scnWd*0.01) | int %}
          {{hdrHorMargin+hdrLblWd}}

        "y": >-
          {% set scnHt = state_attr('openhasp.plate00', 'tftHeight') | int %}
          {% set hdrVrtMargin = (scnHt*0.01) | int %}
          {{hdrVrtMargin}}          

        # Width is 1/3 of the screen width after subtracting margins
        ##
        "w": >-
          {% set numObj = 3 %}
          {% set scnWd = state_attr('openhasp.plate00', 'tftWidth') | int %}
          {% set hdrHorMargin = (scnWd*0.01) | int %}
          {% set usableHdrWd = scnWd-(2*hdrHorMargin) %}
          {% set hdrLblWd = (usableHdrWd/numObj) | int %}
          {{hdrLblWd}}          

        # Height is 10% of the screen, after margin
        ##
        "h": >-
          {% set scnHt = state_attr('openhasp.plate00', 'tftHeight') | int %}
          {% set hdrVrtMargin = (scnHt*0.01) | int %}
          {% set hdrHt = (scnHt*0.1) | int %}
          {% set hdrLblHt = hdrHt-hdrVrtMargin %}
          {{hdrLblHt}}          

    # Header: Humidity
    - obj: "p0b3"
      properties:
        "align": "right"
        "text": "{{ states('sensor.room_humidity') }}%"
        "mode": "loop"
        ##
        # Draw the labels with a 1% margin from the top and sides
        "x": >-
          {% set numObj = 3 %}
          {% set scnWd = state_attr('openhasp.plate00', 'tftWidth') | int %}
          {% set hdrHorMargin = (scnWd*0.01) | int %}
          {% set usableHdrWd = scnWd-(2*hdrHorMargin) %}
          {% set hdrLblWd = (usableHdrWd/numObj) | int %}
          {% set hdrHorMargin = (scnWd*0.01) | int %}
          {{hdrHorMargin+(2*hdrLblWd)}}          

        "y": >-
          {% set scnHt = state_attr('openhasp.plate00', 'tftHeight') | int %}
          {% set hdrVrtMargin = (scnHt*0.01) | int %}
          {{hdrVrtMargin}}          

        # Width is 1/3 of the screen width after subtracting margins
        ##
        "w": >-
          {% set numObj = 3 %}
          {% set scnWd = state_attr('openhasp.plate00', 'tftWidth') | int %}
          {% set hdrHorMargin = (scnWd*0.01) | int %}
          {% set usableHdrWd = scnWd-(2*hdrHorMargin) %}
          {% set hdrLblWd = (usableHdrWd/numObj) | int %}
          {{hdrLblWd}}          

        # Height is 10% of the screen, after margin
        ##
        "h": >-
          {% set scnHt = state_attr('openhasp.plate00', 'tftHeight') | int %}
          {% set hdrVrtMargin = (scnHt*0.01) | int %}
          {% set hdrHt = (scnHt*0.1) | int %}
          {% set hdrLblHt = hdrHt-hdrVrtMargin %}
          {{hdrLblHt}}
```

You should be able to shift  the screen orientation for `plate00` by 90 degrees and restart the device to apply your change.
When the device boots back up and connects to MQTT, openHasp should report a different value for it's `tftHeight` and `tftWidth` which will cause Home Assistant to re-evaluate the templates.
A few seconds after connecting to MQTT, `plate00` should have an updated layout that reflects it's new screen orientation.
