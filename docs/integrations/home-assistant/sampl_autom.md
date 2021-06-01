## Keep backlight ON (dimmed) during the day, and turn it OFF during the night

The night mode activates when sun goes down, and the day mode activates when the sun comes up. During the day, when the screen is after short idle, it dims to the level configured in Home Assistant, but never turns off. During the night, the screen turns off after the long idle period.

Assuming your plate's configured MQTT _group name_ is `plates`, this will affect _all_ the plates in your system at once:

```yaml
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

Note the condition which assures to avoid triggering the automations falsely when Home Assistant (re)starts (allows running the automation only when Home Assistant has been up for at least 2 minutes).

* * * * *

## Turn ON moodlight when backlight goes OFF (and back)

If your plate has moodlights, it is useful in dark situations, when you don't want to have the screen backlit on all the time as above, but have the mood light on instead. During the day mood light doesn't light.

Put your `light.plate_my_room_moodlight` to a Lovelace card entity row and select a nice color for moodlight.

```yaml
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

```yaml
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
```yaml
homeassistant:
  allowlist_external_dirs: 
    - /config/openhasp/
```

With the [services](#custom-component/services) `openhasp.clear_page` and `openhasp.load_pages` you can clear one or all the pages of your plate, and reload their configuration from the server, respectively.

For the example automation below i've created an [input_boolean](https://www.home-assistant.io/integrations/input_boolean/) named `load_pages_plate_my_room` in order to have a switch in Lovelace UI to trigger this manually.

```yaml
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
```yaml
  trigger:
    - platform: homeassistant
      event: start
```
_Note:_ You can also use the `path` directive in the component config to load the design configuration at Home Assistant start, but that won't clear the existing pages (it assumes the pages are empty). 

-->
* * * * *

## Prevent burn-in of the LCD screen

You can use this to protect and prolonge the lifetime of the LCD screens, thus being more green and generating less hazardous waste.

Wall mounted LCD screns main problem is that they display the same picture 99.999% of the time. Even if somebody turns off backlight during the night or dark periods, the LCD screen keeps showing the same picture, seen by nobody. There are high chances that this will lead to screen [picture burn-in](https://github.com/HASwitchPlate/openHASP/issues/134) after a few years of operation.

<h3>Pixel training</h3>

One way to reduce this is to "train" the pixels periodically with completely different other content.
Assuming your group name is configured as `plates` in your 240x320 screens running openHASP, here is a possible solution to extend their life (all at once).

The first automation runs for 1 minute by cycling an overlay with a full-screen base object every second through white, red, green, blue and black. It starts and remains turned off at Home Assistant start, to run it you need to turn it on using the service `automation.turn_on`.

```yaml
- id: openhasp_antiburn
  alias: "openHASP anti burn-in screen protection"
  initial_state: false
  trigger:
    platform: state
    entity_id: automation.openhasp_anti_burn_in_screen_protection
    from: 'off'
    to: 'on'
  action:
    - service: mqtt.publish
      data:
        topic: hasp/plates/command/jsonl
        payload: '{"page":0,"id":99,"obj":"obj","x":0,"y":0,"w":240,"h":320,"radius":0,"hidden":0,"bg_grad_dir":0,"bg_color":"white"}'
    - repeat:
        while:
          - condition: template
            value_template: '{{ repeat.index <= 12 }}'
        sequence:
          - service: mqtt.publish
            data:
              topic: hasp/plates/command/p0b99.bg_color
              payload: 'white'
          - delay: '00:00:01'
          - service: mqtt.publish
            data:
              topic: hasp/plates/command/p0b99.bg_color
              payload: 'red'
          - delay: '00:00:01'
          - service: mqtt.publish
            data:
              topic: hasp/plates/command/p0b99.bg_color
              payload: 'green'
          - delay: '00:00:01'
          - service: mqtt.publish
            data:
              topic: hasp/plates/command/p0b99.bg_color
              payload: 'blue'
          - delay: '00:00:01'
          - service: mqtt.publish
            data:
              topic: hasp/plates/command/p0b99.bg_color
              payload: 'black'
          - delay: '00:00:01'
    - service: mqtt.publish
      data:
        topic: hasp/plates/command/p0b99.delete
        payload: ''
    - service: automation.turn_off
      target:
        entity_id: automation.openhasp_anti_burn_in_screen_protection
```

The second automation takes care to stop the looping colors when you touch the screen:

```yaml
- id: openhasp_antiburn_touch_stop
  alias: "openHASP anti-burn-in stop when touched"
  initial_state: 'on'
  mode: restart
  trigger:
    - platform: mqtt
      topic: 'hasp/+/state/p0b99'
      payload: '{"event":"down"}'
    - platform: mqtt
      topic: 'hasp/+/LWT'
      payload: "online"
  action:
    - service: automation.turn_off
      target:
        entity_id: automation.openhasp_anti_burn_in_screen_protection
    - service: mqtt.publish
      data:
        topic: hasp/plates/command/p0b99.delete
        payload: ''
```

The third automation simply runs the first automation at 3 different times every night:

```yaml
- id: openhasp_antiburn_start_at_night
  alias: "openHASP anti-burn-in start at night"
  initial_state: 'on'
  trigger:
    - platform: time
      at: '00:20:00'
    - platform: time
      at: '02:20:00'
    - platform: time
      at: '04:20:00'
  action:
    - service: automation.turn_on
      target:
        entity_id: automation.openhasp_anti_burn_in_screen_protection
```

<h3>Clear pixels when backlight off</h3>

Another way to reduce the chance of burn-in is to clear the contents of the screen while the backlight is turned off, as nobody sees the pixels anyway.
Just add these actions to the [first automation example](#turn-on-moodlight-when-backlight-off-and-vice-versa) which draw an overlay with a black base object on page 0 when display is off, and deletes it when comes back on:

for automation `openhasp-moodlight-on`, add to actions:

```yaml
    - service: mqtt.publish
      data:
        topic: hasp/plates/command/jsonl
        payload: '{"page":0,"id":99,"obj":"obj","x":0,"y":0,"w":240,"h":320,"radius":0,"hidden":0,"bg_grad_dir":0,"bg_color":"black"}'
```

for automation `openhasp-moodlight-off`, add to actions:

```yaml
    - service: automation.turn_off
      target:
        entity_id: automation.openhasp_anti_burn_in_screen_protection
    - service: mqtt.publish
      data:
        topic: hasp/plates/command/p0b99.hidden
        payload: '1'
    - service: mqtt.publish
      data:
        topic: hasp/plates/command/p0b99.delete
        payload: ''
```

Both methods can coexist.  
Don't forget to adjust the size of the object to your screen if it's not 240x320.
