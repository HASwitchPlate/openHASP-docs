## Display clock and temperature

![screenshot](images/cc_sampl_clocktemp.png)

The easiest example is to display the state of a clock and a temperature sensor from Home Assistant, using _label_ objects in openHASP.

Create a label object to display the temperature value, a separate label object to display the unit and a third label object for the clock:

```json linenums="1"
{"page":0,"id":4,"obj":"label","x":175,"y":5,"h":30,"w":45,"text":"00.0","align":2,"bg_color":"#2C3E50"}
{"page":0,"id":5,"obj":"label","x":220,"y":5,"h":30,"w":45,"text":"°C","align":0,"bg_color":"#2C3E50"}
{"page":0,"id":6,"obj":"label","x":3,"y":5,"h":30,"w":62,"text":"00:00","align":0,"bg_color":"#2C3E50"}
```

In component configuration all you need for the objects is:

```yaml linenums="1"
    objects:
      - obj: "p0b4"
        properties:
          "text": "{{ states('sensor.my_room_temperature') }}"
      - obj: "p0b6"
        properties:
          "text": "{{ states('sensor.time') }}"
```

#### Tip:
You can also use a magic template to display the time that the plate has obtained from ntp. This means you do not need a Home Assistant rule to push the time.

```json linenums="1"
{"page":0,"id":6,"obj":"label","x":3,"y":5,"h":30,"w":62,"text":"00:00","template":"%H:%M","align":0,"bg_color":"#2C3E50"}
```

#### Note:
You can of course omit the second label object with the unit and use the same for both value and unit:

```json linenums="1"
{"page":0,"id":4,"obj":"label","x":175,"y":5,"h":30,"w":62,"text":"00.0°C","align":2,"bg_color":"#2C3E50"}
{"page":0,"id":6,"obj":"label","x":3,"y":5,"h":30,"w":62,"text":"00:00","align":0,"bg_color":"#2C3E50"}
```

In component configuration you will add the unit to the value using the template:

```yaml linenums="1"
    objects:
      - obj: "p0b4"
        properties:
          "text": "{{ states('sensor.my_room_temperature') }}°C"
```

All these being on page 0 means that they will appear on all the pages.

*  *  *  *  *

## Some basic controls

Jsonl and Home Assistant configuration:

#### Toggle a light (or any switchable entity with on/off states)

![screenshot](images/cc_sampl_lightswitch.png)

```json linenums="1"
{"page":1,"id":2,"obj":"btn","x":10,"y":40,"w":105,"h":90,"toggle":true,"text":"\uE335","text_font":32,"align":1}
```

```yaml linenums="1"
      - obj: "p1b2" # switch, checkbox or btn with toggle true
        properties:
          "val": '{{ 1 if is_state("light.my_lamp", "on") else 0 }}'
          "text": '{{ "\uE6E8" if is_state("light.my_lamp", "on") else "\uE335" | e }}'
        event:
          "down":
            - service: homeassistant.toggle
              entity_id: "light.my_lamp"
```

#### Dropdown (self-populating from an input_select)

```json linenums="1"
{"page":1,"id":3,"obj":"dropdown","x":5,"y":40,"w":230,"h":30,"options":""}
```

```yaml linenums="1"
      - obj: "p1b3" # dropdown
        properties:
          "options": >
            {% if (state_attr('input_select.my_dropdown_selections','options') != none and states('input_select.my_dropdown_selections') not in ['unavailable', 'unknown']) %}{%for item in state_attr('input_select.my_dropdown_selections','options')%}{{item+"\n"|e}}{%-if not loop.last%}{%-endif%}{%-endfor%}{% endif %}
          "val": >
            {% if (state_attr('input_select.my_dropdown_selections','options') != none and states('input_select.my_dropdown_selections') not in ['unavailable', 'unknown']) %}{%for item in state_attr('input_select.my_dropdown_selections','options')%}
            {{loop.index -1 if item == states('input_select.my_dropdown_selections') }}
            {%-endfor%}{% endif %}
        event:
          "changed":
            - service: input_select.select_option
              data:
                option: '{{ text }}'
              target:
                entity_id: input_select.my_dropdown_selections
            - service: persistent_notification.create
              data:
                message: Selected {{ text }}
```

*  *  *  *  *

## Color coded icons

![icons](https://user-images.githubusercontent.com/1550668/120081781-9372e880-c0bf-11eb-8c9a-62d2a16c24c5.png)


<h4>Color code a WiFi icon according to RSSI reported by the plate</h4>

**openHASP config:** (screen size 240x320) 

```json linenums="1"
{"obj":"btn","id":1,"x":120,"y":1,"w":30,"h":40,"text_font":"2","text":"\uE5A9","text_color":"gray","bg_opa":0,"border_width":0}
```

relevant **openHASP-custom-component config:**

```yaml linenums="1"
    - obj: "p0b1"
      properties:
        "text_color": "{% if -30 <= state_attr('openhasp.openhasp_plate','rssi') |int %}green{% elif -31 > state_attr('openhasp.openhasp_plate','rssi') |int >= -50 %}orange{% elif -51 > state_attr('openhasp.openhasp_plate','rssi') |int >= -80 %}tomato{% else %}red{% endif %}"
```

<h4>Color code a temperature icon according to sensor values</h4>

**openHASP config:** (screen size 240x320) 

```json linenums="1"
{"obj":"btn","id":3,"x":165,"y":1,"w":30,"h":40,"text_font":"2","text":"\uE50F","text_color":"gray","bg_opa":0,"border_width":0}
```

relevant **openHASP-custom-component config:**

```yaml linenums="1"
    - obj: "p0b3"
      properties:
        "text_color": "{% if states('sensor.room_temperature') |int <= 21  %}#4682B4{% elif 21 < states('sensor.room_temperature') |int <= 26 %}green{% else %}red{% endif %}"
```

*  *  *  *  *

## Variable sized icons

![screenshot](images/cc-sampl-fan-speed-titlebar.png)

Have a fan icon which changes its size depending on the speed of the fan, and goes off the screen when the fan is off.

**openHASP config:**

```json linenums="1"
{"page":0,"id":1,"obj":"label","x":1,"y":1,"h":35,"w":35,"text":"\uE210","align":"left","bg_color":"#2C3E50","text_color":"yellow"}
```

relevant **openHASP-custom-component config:**

```yaml linenums="1"
      - obj: "p0b1"
        properties:
          "jsonl": >
            {% if is_state('input_select.fan_speed', 'Low') %}
            {"text_font":12,"x":6,"y":7}
            {%-elif is_state('input_select.fan_speed', 'Medium') %}
            {"text_font":16,"x":5,"y":6}
            {%-elif is_state('input_select.fan_speed', 'Hign') %}
            {"text_font":24,"x":1,"y":2}
            {%-elif is_state('input_select.fan_speed', 'Turbo') %}
            {"text_font":32,"x":-2,"y":-3}
            {%-elif is_state('input_select.fan_speed', 'OFF') %}
            {"text_font":12,"x":-10,"y":-10}
            {% endif %}
```

*  *  *  *  *

## Light brightness and color

![screenshot](images/cc_sampl_rgb.png)

Have a light in Home Assistant controlled by openHASP. In our example we use Lanbon L8's moodlight which has both brightness and color - we use a [slider](../../design/objects/slider.md) object for the brightness, and a [cpicker](../../design/objects/cpicker.md) object for color.

relevant **openHASP config:**

```json linenums="1"
{"page":1,"id":31,"obj":"slider","x":6,"y":15,"w":14,"h":180,"min":1,"max":255}
{"page":1,"id":32,"obj":"cpicker","x":30,"y":10,"w":180,"h":180}
```

relevant **openHASP-custom-component config:**

```yaml linenums="1"
      - obj: "p1b31" # Light brightness
        properties:
          "val": "{{ state_attr('light.plate_moodlight', 'brightness') if state_attr('light.plate_moodlight', 'brightness') != None else 0 }}"
        event:
          "changed":
            - service: light.turn_on
              data:
                entity_id: light.plate_moodlight
                brightness:  "{{ val }}"
          "up":
            - service: light.turn_on
              data:
                entity_id: light.plate_moodlight
                brightness:  "{{ val }}"

      - obj: "p1b32" # Light color
        properties:
          "color": >
            {% if is_state('light.plate_moodlight','on') %}
            {% set rgb = state_attr('light.plate_moodlight','rgb_color') %}
            {{ "#%02x%02x%02x" | format(rgb[0],rgb[1],rgb[2]) }}
            {% endif %}
        event:
          "up":
            - service: light.turn_on
              data:
                entity_id: light.plate_moodlight
                rgb_color: "[{{ r }},{{ g }},{{ b }}]"

```
The brightness slider value gets updated from the `brightness` attribute of `light.plate_moodlight`, while it's on. If it's off, that attribute is removed by Home Assistant, in that case we set it to `0`.

The `color` property gets updated from the `rgb_color` attriburte of the light. The R, G and B decimal color values are converted to hexadecimal html color code using a template whenever the color of the light changes in Home Assistant.

When somebody changes the color of the picker object on the page, the light in Home Assistant gets updated with `rgb_color` values received in the MQTT message from the plate.

*  *  *  *  *

## Cover with state feedback

![screenshot](images/cc_sampl_cover.png)  


The icon on the up and down buttons change color when covers move and set opacity when reached to limit. UI theme set to `Hasp Light` in plate's web interface. 

relevant **openHASP config:** (screen size 240x320) 

```json linenums="1"
{"page":1,"id":4,"obj":"btn","x":5,"y":140,"w":73,"h":60,"toggle":false,"text":"\uE05D","text_font":32}
{"page":1,"id":5,"obj":"btn","x":83,"y":140,"w":73,"h":60,"toggle":false,"text":"\uE4DB","text_font":32}
{"page":1,"id":6,"obj":"btn","x":161,"y":140,"w":73,"h":60,"toggle":false,"text":"\uE045","text_font":32}
```

relevant **openHASP-custom-component config:**

```yaml linenums="1"
      - obj: "p1b4"
        properties:
          "text_color": "{{ '#FFFF00' if is_state('cover.cover_1', 'opening') else '#FFFFFF' }}"
          "text_opa": "{{ '80' if is_state_attr('cover.cover_1','current_position', 100) else '255' }}"
        event:
          "down":
            - service: cover.open_cover
              target:
                entity_id: "cover.cover_1"
      - obj: "p1b5"
        properties:
          "text": >
            {% if is_state('cover.cover_1', 'closing') %}
            {{ "\uE4DB" | e }}
            {%-elif is_state('cover.cover_1', 'opening') %}
            {{ "\uE4DB" | e }}
            {%-elif is_state('cover.cover_1', 'closed') %}
            {{ "\uF11C" | e }}
            {%-elif is_state('cover.cover_1', 'open') %}
            {{ "\uF11E" | e }}
            {% endif %}
        event:
          "down":
            - service: cover.stop_cover
              target:
                entity_id: "cover.cover_1"
      - obj: "p1b6"
        properties:
          "text_color": "{{ '#FFFF00' if is_state('cover.cover_1', 'closing') else '#FFFFFF' }}"
          "text_opa": "{{ '80' if is_state_attr('cover.cover_1','current_position', 0) else '255' }}"
        event:
          "down":
            - service: cover.close_cover
              target:
                entity_id: "cover.cover_1"
```

*  *  *  *  *

## Cover with button matrix

A simpler cover control with only basic feedback. UI theme set to `Hasp Light` in plate's web interface. 

relevant **openHASP config:** (screen size 240x320) 

```json linenums="1"
{"page":4,"id":20,"obj":"btnmatrix","x":0,"y":20,"w":240,"h":70,"options":["\uE05D","\uE4DB","\uE045"],"text_font":32,"bg_opa":0,"border_opa":0}
```

relevant **openHASP-custom-component config:**

```yaml linenums="1"
      - obj: "p4b20"
        properties:
          "options": >
            {% if is_state('cover.cover_1', 'closing') %}
            ["\uE05D","\uE4DB","#FFFF00 \uE045"]
            {%-elif is_state('cover.cover_1', 'opening') %}
            ["#FFFF00 \uE05D","\uE4DB","\uE045"]
            {%-else %}
            ["\uE05D","\uE4DB","\uE045"]
            {% endif %}
        event:
          "down":
            - service: >
                {% if val == 0 %}
                cover.open_cover
                {%-elif val == 1 %}
                cover.stop_cover
                {%-elif val == 2 %}
                cover.close_cover
                {% endif %}
              target:
                entity_id: cover.cover_1
```

*  *  *  *  *

## Covers like in Lovelace

![screenshot](images/cc_sampl_cover_lovelacee.png)  

The icon behaves like in Lovelace. UI theme set to `Hasp Light` in plate's web interface.

<video width="360" height="640" controls>
  <source src="../../../assets/videos/cc_sampl_cover_lovelace.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

Check out the [Lovelace-like entities](../../examples/lovelace.md) for similar placement.  

relevant **openHASP config:** (screen size 240x320, UI Theme: Hasp Light) 

```json linenums="1"
{"page":5,"id":12,"obj":"label","x":8,"y":33,"w":35,"h":35,"text":"\uF11D","align":1,"text_font":32,"text_color":"#053248"}
{"page":5,"id":13,"obj":"label","x":48,"y":43,"w":80,"h":30,"text":"Cover 1","align":0,"text_font":16,"text_color":"#053248"}
{"page":5,"id":14,"obj":"btn","x":125,"y":37,"w":30,"h":30,"toggle":false,"text":"\uE05D","text_font":32,"bg_opa":0,"border_opa":0,"text_color":"#053248"}
{"page":5,"id":15,"obj":"btn","x":165,"y":37,"w":30,"h":30,"toggle":false,"text":"\uE4DB","text_font":32,"bg_opa":0,"border_opa":0,"text_color":"#053248"}
{"page":5,"id":16,"obj":"btn","x":205,"y":37,"w":30,"h":30,"toggle":false,"text":"\uE045","text_font":32,"bg_opa":0,"border_opa":0,"text_color":"#053248"}

{"page":5,"id":22,"obj":"label","x":8,"y":69,"w":35,"h":35,"text":"\uF11D","align":1,"text_font":32,"text_color":"#053248"}
{"page":5,"id":23,"obj":"label","x":48,"y":79,"w":80,"h":30,"text":"Cover 2","align":0,"text_font":16,"text_color":"#053248"}
{"page":5,"id":24,"obj":"btn","x":125,"y":73,"w":30,"h":30,"toggle":false,"text":"\uE05D","text_font":32,"bg_opa":0,"border_opa":0,"text_color":"#053248"}
{"page":5,"id":25,"obj":"btn","x":165,"y":73,"w":30,"h":30,"toggle":false,"text":"\uE4DB","text_font":32,"bg_opa":0,"border_opa":0,"text_color":"#053248"}
{"page":5,"id":26,"obj":"btn","x":205,"y":73,"w":30,"h":30,"toggle":false,"text":"\uE045","text_font":32,"bg_opa":0,"border_opa":0,"text_color":"#053248"}
```

relevant **openHASP-custom-component config:**

```yaml linenums="1"
      - obj: "p5b12"
        properties:
          "text": >
            {% if is_state('cover.my_cover', 'closing') %}
            {{ "\uE6C0" | e }}
            {%-elif is_state('cover.my_cover', 'opening') %}
            {{ "\uE6C3" | e }}
            {%-elif is_state('cover.my_cover', 'closed') %}
            {{ "\uF11C" | e }}
            {%-elif is_state('cover.my_cover', 'open') %}
            {{ "\uF11E" | e }}
            {% endif %}
      - obj: "p5b14"
        event:
          "down":
            - service: cover.open_cover
              target:
                entity_id: "cover.my_cover"
      - obj: "p5b15"
        event:
          "down":
            - service: cover.stop_cover
              target:
                entity_id: "cover.my_cover"
      - obj: "p5b16"
        event:
          "down":
            - service: cover.close_cover
              target:
                entity_id: "cover.my_cover"
```

*  *  *  *  *

## Media player

![screenshot](images/cc_sampl_mediaplayer.png)  

The labels with artist and title are scrolling, the progressbar fills if the media player provides duration and playback position. The dropdown lists containing the available sources and sound modes of the player get populated automatically by the values existing on the player in Home Assistant, and also the actually selected source is in sync with it.

Player availability is shown by the opacity of the buttons. Player state (play/pause) is shown by the middle button, short pressing means pause, long-press means stop. Power state shown by color, repeat, shuffle and muted state shown by appropriate icons on the buttons.
UI theme set to `Hasp Light` in plate's web interface.

relevant **openHASP config:** (screen size 240x320) 

```json linenums="1"
{"page":6,"id":10,"obj":"obj","x":5,"y":35,"w":230,"h":250,"click":0,"bg_opa":0,"shadow_opa":140,"shadow_color":"black","shadow_width":20,"shadow_spread":0}
{"page":6,"id":11,"obj":"obj","x":8,"y":38,"w":200,"h":84,"click":0}
{"page":6,"id":12,"obj":"label","x":10,"y":48,"w":196,"h":30,"text":"-","mode":"scroll","align":1}
{"page":6,"id":13,"obj":"label","x":10,"y":83,"w":196,"h":30,"text":"-","mode":"scroll","align":1}
{"page":6,"id":14,"obj":"bar","x":8,"y":117,"w":200,"h":5,"min":0,"max":100,"border_opa":0,"pad_top":0,"pad_bottom":0,"pad_left":0,"pad_right":0}
{"page":6,"id":15,"obj":"dropdown","x":8,"y":129,"w":120,"h":30,"options":"Source1\nSource2\nSource3","direction":3,"max_height":300,"radius":5}
{"page":6,"id":16,"obj":"dropdown","x":133,"y":129,"w":75,"h":30,"options":"Jazz\nPop\nRock","direction":2,"radius":5}
{"page":6,"id":17,"obj":"btn","x":8,"y":166,"w":50,"h":70,"toggle":false,"text":"\uE4AE","text_font":32}
{"page":6,"id":18,"obj":"btn","x":66,"y":166,"w":83,"h":70,"toggle":false,"text":"\uE40A","text_font":32}
{"page":6,"id":19,"obj":"btn","x":157,"y":166,"w":51,"h":70,"toggle":false,"text":"\uE4AD","text_font":32}
{"page":6,"id":20,"obj":"slider","x":212,"y":38,"w":20,"h":244,"min":0,"max":100,"val":85}
{"page":6,"id":21,"obj":"btn","x":8,"y":241,"w":45,"h":40,"toggle":false,"text":"\uE425","text_font":32}
{"page":6,"id":22,"obj":"btn","x":60,"y":241,"w":45,"h":40,"toggle":false,"text":"\uE457","text_font":32}
{"page":6,"id":23,"obj":"btn","x":111,"y":241,"w":45,"h":40,"toggle":false,"text":"\uE49E","text_font":32}
{"page":6,"id":24,"obj":"btn","x":163,"y":241,"w":45,"h":40,"toggle":false,"text":"\uE57E","text_font":32}
```

relevant **openHASP-custom-component config:**

```yaml linenums="1"
      - obj: "p6b12" # artist label
        properties:
          "text": "{{ state_attr('media_player.sound_my_room1','media_artist') if state_attr('media_player.sound_my_room1','media_artist') else '-' }}"

      - obj: "p6b13" # title label
        properties:
          "text": "{{ state_attr('media_player.sound_my_room1','media_title') if state_attr('media_player.sound_my_room1','media_title') else '-' }}"

      - obj: "p6b15" # sources list
        properties:
          "options": >
            {% if (state_attr('media_player.sound_my_room1','source_list') != none and states('media_player.sound_my_room1') not in ['unavailable', 'unknown']) %}
            {{"(no source)\n"|e}}
            {%- for source in state_attr('media_player.sound_my_room1','source_list') -%}
            {{source+"\n"|e}}{%-if not loop.last%}{%-endif%}{%-endfor%}{%-endif %}
          "val": >
            {% if states('media_player.sound_my_room1') not in ['unavailable', 'unknown'] %}
            {% if state_attr('media_player.sound_my_room1','source') == None %}0{% else %}
            {%for source in state_attr('media_player.sound_my_room1','source_list')%}
            {{loop.index if source == state_attr('media_player.sound_my_room1','source') }}
            {%-endfor%}{%-endif %}{%-endif %}
          "click": "{{ 'false' if states('media_player.sound_my_room1') in ['unavailable', 'unknown'] else 'true' }}"
        event:
          "changed":
            - service: media_player.select_source
              data:
                entity_id: media_player.sound_my_room1
                source: "{{ text }}"

      - obj: "p6b16" # sound modes list
        properties:
          "options": >
            {% if (state_attr('media_player.sound_my_room1','sound_mode_list') != none and states('media_player.sound_my_room1') not in ['unavailable', 'unknown']) %}
            {%-for soundmode in state_attr('media_player.sound_my_room1','sound_mode_list')-%}
            {{soundmode+"\n"|e}}{%-if not loop.last%}{%-endif%}{%-endfor%}{%-endif %}
          "val": >
            {% if states('media_player.sound_my_room1') not in ['unavailable', 'unknown'] %}{%for source in state_attr('media_player.sound_my_room1','sound_mode_list')%}
            {{loop.index -1 if source == state_attr('media_player.sound_my_room1','sound_mode') }}
            {%-endfor%}{% endif %}
          "click": "{{ 'false' if states('media_player.sound_my_room1') in ['unavailable', 'unknown'] else 'true' }}"
        event:
          "changed":
            - service: media_player.select_sound_mode
              data:
                entity_id: media_player.sound_my_room1
                sound_mode: "{{ text }}"

      - obj: "p6b14" # progressbar
        properties:
          "max": "{{ state_attr('media_player.sound_my_room1','media_duration') | int }}"
          "val": "{{ state_attr('media_player.sound_my_room1','media_position') | int }}"

      - obj: "p6b18" # play/pause/stop
        properties:
          "text": >
            {% if is_state('media_player.sound_my_room1', 'playing') %}
            {{ "\uE3E4" | e }}
            {%-else %}
            {{ "\uE40A" | e }}
            {%-endif %}
          "text_opa": "{{ '80' if states('media_player.sound_my_room1') in ['unavailable', 'unknown'] else '255' }}"
        event:
          "down":
            - service: media_player.media_play_pause
              target:
                entity_id: media_player.sound_my_room1
          "long":
            - service: media_player.media_stop
              target:
                entity_id: media_player.sound_my_room1

      - obj: "p6b17" # prev
        properties:
          "text_opa": "{{ '80' if states('media_player.sound_my_room1') in ['unavailable', 'unknown'] else '255' }}"
        event:
          "down":
            - service: media_player.media_previous_track
              target:
                entity_id: media_player.sound_my_room1

      - obj: "p6b19" # next
        properties:
          "text_opa": "{{ '80' if states('media_player.sound_my_room1') in ['unavailable', 'unknown'] else '255' }}"
        event:
          "down":
            - service: media_player.media_next_track
              target:
                entity_id: media_player.sound_my_room1

      - obj: "p6b20" # volume slider
        properties:
          "val": >
            {% if (state_attr('media_player.sound_my_room1','volume_level') != none and states('media_player.sound_my_room1') not in ['unavailable', 'unknown']) %}
            {{ state_attr('media_player.sound_my_room1','volume_level') * 100 | int(default=80) }}
            {%-endif %}
          "click": "{{ 'false' if states('media_player.sound_my_room1') in ['unavailable', 'unknown'] else 'true' }}"
        event:
          "changed":
            - service: media_player.volume_set
              data:
                entity_id: media_player.sound_my_room1
                volume_level: "{{ val | int / 100 }}"
          "up":
            - service: media_player.volume_set
              data:
                entity_id: media_player.sound_my_room1
                volume_level: "{{ val | int / 100 }}"

      - obj: "p6b21" # power
        properties:
          "text_color": "{{ '#B00000' if states('media_player.sound_my_room1') == 'off' else '#FFFFFF' }}"
          "text_opa": "{{ '80' if states('media_player.sound_my_room1') in ['unavailable', 'unknown'] else '255' }}"
        event:
          "down":
            - service: media_player.toggle
              data:
                entity_id: media_player.sound_my_room1

      - obj: "p6b22" # repeat
        properties:
          "text": >
            {% if is_state_attr('media_player.sound_my_room1', 'repeat', 'one') %}
            {{ "\uE458" | e }}
            {% elif is_state_attr('media_player.sound_my_room1', 'repeat', 'all') %}
            {{ "\uE456" | e }}
            {%-else %}
            {{ "\uE457" | e }}
            {%-endif %}
          "text_opa": "{{ '80' if states('media_player.sound_my_room1') in ['unavailable', 'unknown'] else '255' }}"
        event:
          "down":
            - service: media_player.repeat_set
              data:
                entity_id: media_player.sound_my_room1
                repeat: >
                  {% if is_state_attr('media_player.sound_my_room1', 'repeat', 'one') %}
                  all
                  {% elif is_state_attr('media_player.sound_my_room1', 'repeat', 'all') %}
                  off
                  {% elif is_state_attr('media_player.sound_my_room1', 'repeat', 'off') %}
                  one
                  {%-endif %}

      - obj: "p6b23" # shuffle
        properties:
          "text": >
            {% if state_attr('media_player.sound_my_room1', 'shuffle') %}
            {{ "\uE49D" | e }}
            {%-else %}
            {{ "\uE49E" | e }}
            {%-endif %}
          "text_opa": "{{ '80' if states('media_player.sound_my_room1') in ['unavailable', 'unknown'] else '255' }}"
        event:
          "down":
            - service: media_player.shuffle_set
              data:
                entity_id: media_player.sound_my_room1
                shuffle:  >
                  {% if state_attr('media_player.sound_my_room1', 'shuffle') %}
                  false
                  {% else %}
                  true
                  {%-endif %}

      - obj: "p6b24" # mute
        properties:
          "text": >
            {% if state_attr('media_player.sound_my_room1', 'is_volume_muted') %}
            {{ "\uE75F" | e }}
            {%-else %}
            {{ "\uE57E" | e }}
            {%-endif %}
          "text_opa": "{{ '80' if states('media_player.sound_my_room1') in ['unavailable', 'unknown'] else '255' }}"
        event:
          "down":
            - service: media_player.volume_mute
              data:
                entity_id: media_player.sound_my_room1
                is_volume_muted:  >
                  {% if state_attr('media_player.sound_my_room1', 'is_volume_muted') %}
                  false
                  {% else %}
                  true
                  {%-endif %}
```
Note that the `val` value of the slider is multiplied and divided by 100 when read and set, because [LVGL only suppports integers](../../design/data-types.md#integer) for object values. By multiplying and dividing by 100, it becomes possible to set volume between 0 and 1 as required by Home Assistant.

*  *  *  *  *

## Generic thermostat/climate

![screenshot](images/cc_sampl_climate.png)  

This example is a bit more complex in the aspect that it uses several objects put on top of each other, and grouped toghether using the `parentid` parameter.  Special attention goes to an invisible [tabview](../../design/objects/tabview.md) (exteding over the label dispaying the target temperarture) which allows for swiping between an on/off switch and dropdowns for setting the hvac and fan modes.

The target temperature can be set by dragging the arc handle, more precise +/- setting possible by short/long pressing the middle circle containing the current temperature (increasing/decreasing the value by the _temperature step_ defined by the climate entity). Note that the `min`, `max` and `val` values of the arc and gauge are multiplied and divided by 10 when set and read, because [LVGL only suppports integers](../../design/data-types.md#integer) for object values. By multiplying and dividing by 10, it becomes possible to set decimal values for climate temperature. 

The number of the ticks on the gauge is determined from the `min`, `max` attributes of the configured climate, likewise the `hvac_modes` and `fan_modes` dropdowns. You can localise these using the `if-else` statements of the template in the configuration of the custom component.

The active area of the arc changes color based on the current hvac mode of the entity.    
UI theme set to `Hasp Light` in plate's web interface.

Note that the tab swiping dots (_p3b26_) are also handled by the custom component. Don't forget update the service call in the configuration with your plate's MQTT node name, and the command parameters if you change the page of the objects.

<video width="360" height="640" controls>
  <source src="../../../assets/videos/cc_sampl_climate_control.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

relevant **openHASP config:** (screen size 240x320) 

```json linenums="1"
{"page":3,"id":10,"obj":"obj","x":5,"y":35,"w":230,"h":250,"click":0}
{"page":3,"id":10,"obj":"obj","x":5,"y":35,"w":230,"h":250,"click":0}
{"page":3,"id":20,"obj":"arc","x":5,"y":37,"w":230,"h":230,"min":170,"max":300,"val":250,"border_side":0,"type":0,"rotation":0,"start_angle":135,"end_angle":45,"adjustable":"true","line_width":21,"line_width10":21,"line_color10":"#34bdeb","bg_opa":0,"pad_top20":5,"pad_bottom20":5,"pad_left20":5,"pad_right20":5,"pad_top":5,"pad_bottom":5,"pad_left":5,"pad_right":5}
{"page":3,"id":21,"obj":"gauge","x":28,"y":28,"w":175,"h":175,"parentid":20,"min":170,"max":300,"val":224,"format":1,"critical_value":301,"label_count":14,"line_count":27,"border_width":0,"pad_top":2,"pad_bottom":2,"pad_left":2,"pad_right":2,"value_str":"°C","value_ofs_y":55,"value_font":16,"bg_opa":0,"line_width10":3,"line_rounded10":1,"line_color":"#348feb","line_color60":"#348feb","scale_grad_color":"#eb4934","scale_grad_color60":"#eb4934","scale_end_color60":"#eb4934"}
{"page":3,"id":22,"obj":"obj","x":85,"y":85,"w":60,"h":60,"parentid":20,"click":0,"radius":30,"border_width":2,"border_opa":200}
{"page":3,"id":23,"obj":"label","x":80,"y":100,"w":70,"h":30,"parentid":20,"text":"22.4","text_font":24,"align":"center"}
{"page":3,"id":24,"obj":"obj","x":145,"y":245,"w":60,"h":30,"click":0,"radius":5}
{"page":3,"id":25,"obj":"label","x":145,"y":245,"w":60,"h":30,"text":"25","text_font":24,"align":"center"}
{"page":3,"id":26,"obj":"label","x":90,"y":220,"w":60,"h":30,"text":"#909090 \u2022# #000000 \u2022# #909090 \u2022#","text_font":24,"align":"center","text_color":"grey","border_width":0}
{"page":3,"id":30,"obj":"tabview","x":0,"y":235,"w":240,"h":80,"btn_pos":0,"bg_opa":0,"border_width":0,"radius":0}
{"page":3,"id":31,"obj":"tab","parentid":30}
{"page":3,"id":32,"obj":"tab","parentid":30}
{"page":3,"id":33,"obj":"tab","parentid":30}
{"page":3,"id":41,"obj":"switch","x":35,"y":10,"w":60,"h":30,"parentid":31,"radius":25,"radius20":25}
{"page":3,"id":42,"obj":"dropdown","x":15,"y":10,"w":110,"h":30,"parentid":32,"options":"fan_modes","direction":"1","radius":5}
{"page":3,"id":43,"obj":"dropdown","x":15,"y":10,"w":110,"h":30,"parentid":33,"options":"hvac_modes","direction":"1","radius":5}
```

relevant **openHASP-custom-component config:**

```yaml linenums="1"
      - obj: "p3b20"  # arc slider
        properties:
          "val": >
            {% if state_attr('climate.thermostat_1','temperature') is not none %}
            {{ state_attr('climate.thermostat_1','temperature') | int * 10 }}
            {%- endif %}
          "min": >
            {% if state_attr('climate.thermostat_1','min_temp') is not none %}
            {{ state_attr('climate.thermostat_1','min_temp') | int * 10 }}
            {%- endif %}
          "max": >
            {% if state_attr('climate.thermostat_1','max_temp') is not none %}
            {{ state_attr('climate.thermostat_1','max_temp') | int * 10 }}
            {%- endif %}
          "opacity": "{{ 60 if (is_state('climate.thermostat_1','unavailable') or is_state('climate.thermostat_1','unknown')) else 255 }}"
          "click": "{{ 'false' if (is_state('climate.thermostat_1','unavailable') or is_state('climate.thermostat_1','unknown')) else 'true' }}"
          "line_color1": >
            {% if is_state('climate.thermostat_1', 'cool') %}
            {{ "#346beb" }}
            {%-elif is_state('climate.thermostat_1', 'heat_cool') %}
            {{ "#34bdeb" }}
            {%-elif is_state('climate.thermostat_1', 'heat') %}
            {{ "#eb3434" }}
            {%-elif is_state('climate.thermostat_1', 'dry') %}
            {{ "#ebeb34" }}
            {%-elif is_state('climate.thermostat_1', 'fan_only') %}
            {{ "#34eb77" }}
            {%-else %}
            {{ "#9f96b0" }}
            {% endif %}
        event:
          "changed":
            - service: climate.set_temperature
              target:
                entity_id: climate.thermostat_1
              data:
                temperature: "{{ val | int / 10 }}"
          "up":
            - service: climate.set_temperature
              target:
                entity_id: climate.thermostat_1
              data:
                temperature: "{{ val | int / 10 }}"

      - obj: "p3b21"  # gauge current temp
        properties:
          "val": >
            {% if not (is_state('sensor.ble_atlaghomerseklet','unavailable') or is_state('sensor.ble_atlaghomerseklet','unknown')) %}
            {{ states('sensor.ble_atlaghomerseklet') | float (default=0) * 10 }}
            {%- endif %}
          "min": >
            {% if state_attr('climate.thermostat_1','min_temp') is not none %}
            {{ state_attr('climate.thermostat_1','min_temp') | int * 10 }}
            {%- endif %}
          "max": >
            {% if state_attr('climate.thermostat_1','max_temp') is not none %}
            {{ state_attr('climate.thermostat_1','max_temp') | int * 10 }}
            {%- endif %}
          "critical_value": >
            {% if state_attr('climate.thermostat_1','max_temp') is not none %}
            {{ state_attr('climate.thermostat_1','max_temp') | int * 10 + 1 }}
            {%- endif %}
          "label_count": >
            {% if state_attr('climate.thermostat_1','max_temp') is not none %}
            {{ state_attr('climate.thermostat_1','max_temp') | int - state_attr('climate.thermostat_1','min_temp') | int + 1 }}
            {%- endif %}
          "line_count": >
            {% if state_attr('climate.thermostat_1','max_temp') is not none %}
            {{ (state_attr('climate.thermostat_1','max_temp') | int - state_attr('climate.thermostat_1','min_temp') | int) * 2 + 1 }}
            {%- endif %}
          "opacity": "{{ 60 if (is_state('climate.thermostat_1','unavailable') or is_state('climate.thermostat_1','unknown')) else 255 }}"

      - obj: "p3b23"  # label current temp (and +/- with short/long touch)
        properties:
          "text": >
            {% if (is_state('sensor.temp_room_1','unavailable') or is_state('sensor.temp_room_1','unknown')) %}
            {{ "--.-" }}
            {%-else %}
            {{ states('sensor.temp_room_1') | round(1,default=0) }}
            {%- endif %}
          "click": "{{ 'false' if (is_state('climate.thermostat_1','unavailable') or is_state('climate.thermostat_1','unknown')) else 'true' }}"
          "opacity": "{{ 60 if (is_state('climate.thermostat_1','unavailable') or is_state('climate.thermostat_1','unknown')) else 255 }}"
        event:
          "up":
            - service: climate.set_temperature
              target:
                entity_id: climate.thermostat_1
              data:
                temperature: "{{ state_attr('climate.thermostat_1','temperature') + state_attr('climate.thermostat_1','target_temp_step') | float(default=1)}}" 
          "long":
            - service: climate.set_temperature
              target:
                entity_id: climate.thermostat_1
              data:
                temperature: "{{ state_attr('climate.thermostat_1','temperature') - state_attr('climate.thermostat_1','target_temp_step') | float(default=1)}}" 


      - obj: "p3b25"  # label target temp
        properties:
          "text": >
            {% if state_attr('climate.thermostat_1','temperature') is not none %}
            {{ state_attr('climate.thermostat_1','temperature') }}
            {%- endif %}
          "opacity": "{{ 60 if (is_state('climate.thermostat_1','unavailable') or is_state('climate.thermostat_1','unknown')) else 255 }}"


      - obj: "p3b41"  # on/off switch
        properties:
          "val": "{{ 0 if (is_state('climate.thermostat_1', 'off') or is_state('climate.thermostat_1', 'unavailable')) else 1 }}"
          "click": "{{ 'false' if (is_state('climate.thermostat_1','unavailable') or is_state('climate.thermostat_1','unknown')) else 'true' }}"
          "opacity": "{{ 60 if (is_state('climate.thermostat_1','unavailable') or is_state('climate.thermostat_1','unknown')) else 255 }}"
        event:
          "down":
            - service_template: >
                {% if val == 0 -%}
                climate.turn_on
                {% else -%}
                climate.turn_off
                {% endif -%}
              entity_id: "climate.thermostat_1"

      - obj: "p3b30"  # tab dots
        event:
          "changed":
            - service: openhasp.command
              target:
                entity_id: openhasp.your_plate
              data:
                keyword: p3b26.text
                parameters: >
                  {% if val == 0 %}
                  {{ "#000000 \u2022# #909090 \u2022# #909090 \u2022#" | e }}
                  {%-elif val == 1 %}
                  {{ "#909090 \u2022# #000000 \u2022# #909090 \u2022#" | e }}
                  {%-elif val == 2 %}
                  {{ "#909090 \u2022# #909090 \u2022# #000000 \u2022#" | e }}
                  {% endif %}

      - obj: "p3b42"  # dropdown with fan_modes
        properties:
          "options": >
            {% if state_attr('climate.thermostat_1','fan_modes') is not none %}{%for mode in state_attr('climate.thermostat_1','fan_modes')%}
            {%- if mode == 'auto' -%}
            Automatic{{"\n"|e}}
            {%- elif mode == 'low' -%}
            Low{{"\n"|e}}
            {%- elif mode == 'medium' -%}
            Medium{{"\n"|e}}
            {%- elif mode == 'high' -%}
            High{{"\n"|e}}
            {%- elif mode == 'turbo' -%}
            Turbo{{"\n"|e}}
            {%- endif -%}
            {%-if not loop.last%}{%-endif%}{%-endfor%}{% endif %}
          "click": "{{ 'false' if (is_state('climate.thermostat_1','unavailable') or is_state('climate.thermostat_1','unknown')) else 'true' }}"
          "val": >
            {% if not (is_state('climate.thermostat_1','unavailable')) %}{%for mode in state_attr('climate.thermostat_1','fan_modes')%}
            {{loop.index -1 if mode == state_attr('climate.thermostat_1','fan_mode') }}
            {%-endfor%}{% endif %}
        event:
          "changed":
            - service: climate.set_fan_mode
              target:
                entity_id: climate.thermostat_1
              data:
                fan_mode: >
                  {% if text == "Automatic" -%}
                  auto
                  {% elif text == 'Low' -%}
                  low
                  {% elif text == 'Medium' -%}
                  medium
                  {% elif text == 'High' -%}
                  high
                  {% elif text == 'Turbo' -%}
                  turbo
                  {% endif -%}

      - obj: "p3b43"  # dropdown with hvac_modes
        properties:
          "options": >
            {% if state_attr('climate.thermostat_1','hvac_modes') is not none %}{%for mode in state_attr('climate.thermostat_1','hvac_modes')%}
            {%- if mode == 'off' -%}
            Off{{"\n"|e}}
            {%- elif mode == 'heat' -%}
            Heating{{"\n"|e}}
            {%- elif mode == 'cool' -%}
            Cooling{{"\n"|e}}
            {%- elif mode == 'heat_cool' -%}
            Heat/Cool{{"\n"|e}}
            {%- elif mode == 'dry' -%}
            Drying{{"\n"|e}}
            {%- elif mode == 'fan_only' -%}
            Fan only{{"\n"|e}}
            {%- else -%}
            On{{"\n"|e}}
            {%- endif -%}
            {%-if not loop.last%}{%-endif%}{%-endfor%}{% endif %}
          "click": "{{ 'false' if (is_state('climate.thermostat_1','unavailable') or is_state('climate.thermostat_1','unknown')) else 'true' }}"
          "val": >
            {% if not (is_state('climate.thermostat_1','unavailable')) %}{%for mode in state_attr('climate.thermostat_1','hvac_modes')%}
            {{loop.index -1 if mode == states('climate.thermostat_1') }}
            {%-endfor%}{% endif %}
        event:
          "changed":
            - service: climate.set_hvac_mode
              target:
                entity_id: climate.thermostat_1
              data:
                hvac_mode: >
                  {% if text == "Off" -%}
                  off
                  {% elif text == 'Heating' -%}
                  heat
                  {% elif text == 'Cooling' -%}
                  cool
                  {% elif text == 'Heat/Cool' -%}
                  heat_cool
                  {% elif text == 'Drying' -%}
                  dry
                  {% elif text == 'Fan only' -%}
                  fan_only
                  {% endif -%}
```


*  *  *  *  *

## Current weather and forecasts

![screenshot](images/cc-sampl-weather-hourss.png) 
![screenshot](images/cc-sampl-weather-dayss.png)   

This example implements two weather forecast screens which located on the same page, can be swiped left and right. On the top area the current weather is shown, on the bottom area the user can choose by swiping between next hours and next days forecast. This is achieved by a [tabview](../../design/objects/tabview.md) object with invisible tabs. 

Since there's no weather integration in Home Assistant which can offer so much information at once, this can be achieved by installing multiple weather components. In our example we use two:

- [Met.no](https://www.home-assistant.io/integrations/met/){target=_blank} (the one coming by default pre-installed) for next days forecast.
- [OpenWeatherMap](https://www.home-assistant.io/integrations/openweathermap/){target=_blank} (available as standard integration to be activated) for next hours forecast. _You need to set the forecast mode to **onecall_hourly** to get forecasts for the day's next hours._

The openHASP component grabs information from both weather sources and updates them on every change.   
The various strings containing day names, day periods, weather conditions can be localized easily to any language within the configuration.

Weather condition icons are displayed from the internal flash space of the plate. For this, you need to upload the desired icon pack to the plate:

- [light theme](../../assets/users/openhasp-weathericons-day.zip)
- [dark theme](../../assets/users/openhasp-weathericons-nigh.zip)

To unzip them on the plate, connect via Telnet and run the command `unzip /openhasp-weathericons-day.zip` to unzip the light theme above (alternatively you can unzip them on your computer and upload them one by one). The configuration example only shows how to use the light theme icons.

This example implements Home Assistant's [standard weather conditions](https://www.home-assistant.io/integrations/weather/){target=_blank} only (as in 2021.06), so any weather integration component can be used. Some integrations know extra conditions in addition to the standard ones, those (with their corresponding icons) can be easily added to the component configuration below.

Note that the tab swiping dots (_p5b10_) are also handled by the custom component. Don't forget update the service call in the configuration with your plate's MQTT node name, and the command parameters if you change the page of the objects.

!!! warning
    For this example to work, you need an ESP32 board having [PSRam](../../design/objects/img.md) memory installed, otherwise openHASP will crash.

relevant **openHASP config:** (screen size 240x320, UI Theme: Hasp Light) 

```json linenums="1"
{"page":5,"id":1,"obj":"btn","x":0,"y":0,"w":240,"h":30,"text":"WEATHER","text_font":16,"bg_color":"#2C3E50","text_color":"#FFFFFF","radius":0,"border_side":0,"click":0}
{"page":5,"id":2,"obj":"obj","x":5,"y":35,"w":230,"h":250,"click":0}

{"page":5,"id":14,"obj":"img","src":"L:/openhasp_dummy_img.png","parentid":2,"auto_size":1,"w":128,"offset_x":-6,"offset_y":-10}

{"page":5,"id":15,"obj":"label","x":100,"y":10,"w":130,"h":25,"align":"center","text":"date current","parentid":2}
{"page":5,"id":16,"obj":"label","x":125,"y":34,"w":95,"h":40,"align":"center","text":"00.0°C","parentid":2,"text_font":32}
{"page":5,"id":17,"obj":"label","x":110,"y":78,"w":120,"h":25,"align":"center","text":"condition","parentid":2}
{"page":5,"id":19,"obj":"label","x":90,"y":95,"w":60,"h":30,"text":"#000000 \u2022# #909090 \u2022#","parentid":2,"text_font":24,"align":"center","text_color":"grey"}

{"page":5,"id":10,"obj":"tabview","x":0,"y":0,"w":240,"h":260,"parentid":2,"btn_pos":0,"bg_opa":0,"border_width":0}
{"page":5,"id":11,"obj":"tab","parentid":10}
{"page":5,"id":12,"obj":"tab","parentid":10}

{"page":5,"id":21,"obj":"label","x":8,"y":123,"w":130,"h":22,"align":"left","text":"hour+2","parentid":11,"pad_top":3,"click":0}
{"page":5,"id":22,"obj":"label","x":124,"y":123,"w":50,"h":22,"align":"center","text":"00.0","parentid":11,"pad_top":-2,"text_font":24,"click":0}
{"page":5,"id":23,"obj":"img","x":182,"y":118,"w":32,"h":32,"src":"L:/openhasp_dummy_img.png","parentid":11,"click":0}

{"page":5,"id":31,"obj":"label","x":8,"y":154,"w":130,"h":22,"align":"left","text":"hour+3","parentid":11,"pad_top":3,"click":0}
{"page":5,"id":32,"obj":"label","x":124,"y":154,"w":50,"h":22,"align":"center","text":"00.0","parentid":11,"pad_top":-2,"text_font":24,"click":0}
{"page":5,"id":33,"obj":"img","x":182,"y":150,"w":32,"h":32,"src":"L:/openhasp_dummy_img.png","parentid":11,"click":0}

{"page":5,"id":41,"obj":"label","x":8,"y":186,"w":130,"h":22,"align":"left","text":"hour+4","parentid":11,"pad_top":3,"click":0}
{"page":5,"id":42,"obj":"label","x":124,"y":186,"w":50,"h":22,"align":"center","text":"00.0","parentid":11,"pad_top":-2,"text_font":24,"click":0}
{"page":5,"id":43,"obj":"img","x":182,"y":182,"w":32,"h":32,"src":"L:/openhasp_dummy_img.png","parentid":11,"click":0}

{"page":5,"id":51,"obj":"label","x":8,"y":218,"w":130,"h":22,"align":"left","text":"hour+5","parentid":11,"pad_top":3,"click":0}
{"page":5,"id":52,"obj":"label","x":124,"y":218,"w":50,"h":22,"align":"center","text":"00.0","parentid":11,"pad_top":-2,"text_font":24,"click":0}
{"page":5,"id":53,"obj":"img","x":182,"y":214,"w":32,"h":32,"src":"L:/openhasp_dummy_img.png","parentid":11,"click":0}

{"page":5,"id":61,"obj":"label","x":6,"y":123,"w":100,"h":22,"align":"left","text":"date+1","parentid":12,"pad_top":3,"click":0}
{"page":5,"id":62,"obj":"label","x":102,"y":123,"w":40,"h":22,"align":"center","text":"00.0","parentid":12,"pad_top":-2,"text_font":24,"text_color":"Navy","click":0}
{"page":5,"id":63,"obj":"label","x":150,"y":123,"w":40,"h":22,"align":"center","text":"00.0","parentid":12,"pad_top":-2,"text_font":24,"text_color":"Blush","click":0}
{"page":5,"id":64,"obj":"img","x":194,"y":118,"w":32,"h":32,"src":"L:/openhasp_dummy_img.png","parentid":12,"click":0}

{"page":5,"id":71,"obj":"label","x":6,"y":154,"w":100,"h":22,"align":"left","text":"date+2","parentid":12,"pad_top":3,"click":0}
{"page":5,"id":72,"obj":"label","x":102,"y":154,"w":40,"h":22,"align":"center","text":"00.0","parentid":12,"pad_top":-2,"text_font":24,"text_color":"Navy","click":0}
{"page":5,"id":73,"obj":"label","x":150,"y":154,"w":40,"h":22,"align":"center","text":"00.0","parentid":12,"pad_top":-2,"text_font":24,"text_color":"Blush","click":0}
{"page":5,"id":74,"obj":"img","x":194,"y":150,"w":32,"h":32,"src":"L:/openhasp_dummy_img.png","parentid":12,"click":0}

{"page":5,"id":81,"obj":"label","x":6,"y":186,"w":100,"h":22,"align":"left","text":"date+3","parentid":12,"pad_top":3,"click":0}
{"page":5,"id":82,"obj":"label","x":102,"y":186,"w":40,"h":22,"align":"center","text":"00.0","parentid":12,"pad_top":-2,"text_font":24,"text_color":"Navy","click":0}
{"page":5,"id":83,"obj":"label","x":150,"y":186,"w":40,"h":22,"align":"center","text":"00.0","parentid":12,"pad_top":-2,"text_font":24,"text_color":"Blush","click":0}
{"page":5,"id":84,"obj":"img","x":194,"y":182,"w":32,"h":32,"src":"L:/openhasp_dummy_img.png","parentid":12,"click":0}

{"page":5,"id":91,"obj":"label","x":6,"y":218,"w":100,"h":22,"align":"left","text":"date+4","parentid":12,"pad_top":3,"click":0}
{"page":5,"id":92,"obj":"label","x":102,"y":218,"w":40,"h":22,"align":"center","text":"00.0","parentid":12,"pad_top":-2,"text_font":24,"text_color":"Navy","click":0}
{"page":5,"id":93,"obj":"label","x":150,"y":218,"w":40,"h":22,"align":"center","text":"00.0","parentid":12,"pad_top":-2,"text_font":24,"text_color":"Blush","click":0}
{"page":5,"id":94,"obj":"img","x":194,"y":214,"w":32,"h":32,"src":"L:/openhasp_dummy_img.png","parentid":12,"click":0}

```

relevant **openHASP-custom-component config:**

```yaml linenums="1"
      - obj: "p5b14" # Icon
        properties:
          "src": "{{ 'L:/w-128-' + states('weather.openweathermap') + '.png' if not is_state('weather.openweathermap','unavailable') }}"

      - obj: "p5b15" # Current date (adjust format to your needs)
        properties:
          "text": >
            {%- if not is_state('weather.openweathermap','unavailable') %}
            {%- set day = (states.weather.openweathermap.last_changed).strftime('%w') %}
            {%- set days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] %}
            {{- days[ day | int -1 ] }} {{ (states.weather.openweathermap.last_changed).strftime('%m. %d. ') }}
            {% endif -%}

      - obj: "p5b16" # Current temp (you can use your own outdoor temp sensor if you have one)
        properties:
          "text": "{{ state_attr('weather.openweathermap','temperature') |string + '°C' if not is_state('weather.openweathermap','unavailable') }}"  # or "{{ states('sensor.your_own_temp_sensor') if not is_state('sensor.your_own_temp_sensor','unavailable') else '--' }}°C"

      - obj: "p5b17" # Current weather condition
        properties:
          "text": >
             {% if is_state('weather.openweathermap','clear-night') -%}
             Clear night
             {% elif is_state('weather.openweathermap','cloudy') -%}
             Cloudy
             {% elif is_state('weather.openweathermap','fog') -%}
             Fog
             {% elif is_state('weather.openweathermap','hail') -%}
             Hail
             {% elif is_state('weather.openweathermap','lightning') -%}
             Lightning
             {% elif is_state('weather.openweathermap','lightning-rainy') -%}
             Thunderstorms
             {% elif is_state('weather.openweathermap','partlycloudy') -%}
             Partly cloudy
             {% elif is_state('weather.openweathermap','pouring') -%}
             Pouring rain
             {% elif is_state('weather.openweathermap','rainy') -%}
             Rainy
             {% elif is_state('weather.openweathermap','snowy') -%}
             Snowy
             {% elif is_state('weather.openweathermap','snowy-rainy') -%}
             Snowy-rainy
             {% elif is_state('weather.openweathermap','sunny') -%}
             Sunny
             {% elif is_state('weather.openweathermap','windy') -%}
             Windy
             {% elif is_state('weather.openweathermap','windy-variant') -%}
             Windy
             {% elif is_state('weather.openweathermap','exceptional') -%}
             Exceptional
             {% elif is_state('weather.openweathermap','unavailable') -%}
             (not available)
             {% else -%}
             {{ states('weather.openweathermap') }}
             {% endif -%}

      - obj: "p5b10"  # tab dots - MAKE SURE YOU UPDATE THIS ONE!!
        event:
          "changed":
            - service: openhasp.command
              target:
                entity_id: openhasp.your_plate
              data:
                keyword: p5b19.text
                parameters: >
                  {% if val == 0 %}
                  {{ "#000000 \u2022# #909090 \u2022#" | e }}
                  {%-elif val == 1 %}
                  {{ "#909090 \u2022# #000000 \u2022#" | e }}
                  {% endif %}

      - obj: "p5b21" # Forecast time +1h
        properties:
          "text": >
            {%- if not is_state('weather.openweathermap','unavailable') %}
            {%- set update = states('sensor.date') %}
            {%- set midnight = now().replace(hour=0, minute=0, second=0, microsecond=0).timestamp() %}
            {%- set event = as_timestamp(strptime(state_attr('weather.openweathermap','forecast')[1]['datetime'], '%Y-%m-%dT%H:%M:%S%z', default='2020-01-01T00:00:00+00:00')) %}
            {%- set delta = ((event - midnight) // 86400) | int %}
            {%- if delta == 0 %}
            Today
            {%- elif delta == 1 %}
            Tomorrow
            {%- endif %}
            {{ event | timestamp_custom(" %-I %p") }}
            {%- endif %}

      - obj: "p5b22" # Forecast temp +1h
        properties:
          "text": "{{ state_attr('weather.openweathermap','forecast')[1]['temperature'] if not is_state('weather.openweathermap','unavailable') else '-' }}"

      - obj: "p5b23" # Forecast condition +1h
        properties:
          "src": >
            {%- if not is_state('weather.openweathermap','unavailable') %}
            L:/w-32-{{ state_attr('weather.openweathermap','forecast')[1]['condition'] }}.png
            {%- endif %}

      - obj: "p5b31" # Forecast time +2h (using Dawn/Morn etc instead of Today/Tomorrow)
        properties:
          "text": >
            {%- if not is_state('weather.openweathermap','unavailable') %}
            {%- set hour = as_timestamp(strptime(state_attr('weather.openweathermap','forecast')[3]['datetime'], '%Y-%m-%dT%H:%M:%S%z', default='2020-01-01T00:00:00+00:00')) | timestamp_custom("%-H") | int %}
            {%- if 4 <= hour < 6 %}
            Dawning
            {%- elif 6 <= hour < 9 %}
            Morning
            {%- elif 9 <= hour < 12 %}
            Forenoon
            {%- elif 12 <= hour < 18 %}
            Afternoon
            {%- elif 18 <= hour < 23 %}
            Evening
            {%- elif 23 <= hour or hour < 4 %}
            Night
            {%- endif %}
            {{- " " + hour |string + " o'clock" }}
            {%- endif %}

      - obj: "p5b32" # Forecast temp +2h
        properties:
          "text": "{{ state_attr('weather.openweathermap','forecast')[3]['temperature'] if not is_state('weather.openweathermap','unavailable') else '-' }}"

      - obj: "p5b33" # Forecast condition +2h
        properties:
          "src": >
            {%- if not is_state('weather.openweathermap','unavailable') %}
            L:/w-32-{{ state_attr('weather.openweathermap','forecast')[3]['condition'] }}.png
            {%- endif %}

      - obj: "p5b41" # Forecast time +4h
        properties:
          "text": >
            {%- if not is_state('weather.openweathermap','unavailable') %}
            {%- set update = states('sensor.date') %}
            {%- set midnight = now().replace(hour=0, minute=0, second=0, microsecond=0).timestamp() %}
            {%- set event = as_timestamp(strptime(state_attr('weather.openweathermap','forecast')[6]['datetime'], '%Y-%m-%dT%H:%M:%S%z', default='2020-01-01T00:00:00+00:00')) %}
            {%- set delta = ((event - midnight) // 86400) | int %}
            {%- if delta == 0 %}
            Today
            {%- elif delta == 1 %}
            Tomorrow
            {%- endif %}
            {{ event | timestamp_custom(" %-I %p") }}
            {%- endif %}

      - obj: "p5b42" # Forecast temp +4h
        properties:
          "text": "{{ state_attr('weather.openweathermap','forecast')[6]['temperature'] if not is_state('weather.openweathermap','unavailable') else '-' }}"

      - obj: "p5b43" # Forecast condition +4h
        properties:
          "src": >
            {%- if not is_state('weather.openweathermap','unavailable') %}
            L:/w-32-{{ state_attr('weather.openweathermap','forecast')[6]['condition'] }}.png
            {%- endif %}

      - obj: "p5b51" # Forecast time +8h
        properties:
          "text": >
            {%- if not is_state('weather.openweathermap','unavailable') %}
            {%- set update = states('sensor.date') %}
            {%- set midnight = now().replace(hour=0, minute=0, second=0, microsecond=0).timestamp() %}
            {%- set event = as_timestamp(strptime(state_attr('weather.openweathermap','forecast')[12]['datetime'], '%Y-%m-%dT%H:%M:%S%z', default='2020-01-01T00:00:00+00:00')) %}
            {%- set delta = ((event - midnight) // 86400) | int %}
            {%- if delta == 0 %}
            Today
            {%- elif delta == 1 %}
            Tomorrow
            {%- endif %}
            {{ event | timestamp_custom(" %-I %p") }}
            {%- endif %}

      - obj: "p5b52" # Forecast temp +8h
        properties:
          "text": "{{ state_attr('weather.openweathermap','forecast')[12]['temperature'] if not is_state('weather.openweathermap','unavailable') else '-' }}"

      - obj: "p5b53" # Forecast condition +8h
        properties:
          "src": >
            {%- if not is_state('weather.openweathermap','unavailable') %}
            L:/w-32-{{ state_attr('weather.openweathermap','forecast')[12]['condition'] }}.png
            {%- endif %}

      - obj: "p5b61" # Forecast date +1d
        properties:
          "text": >
            {%- if not is_state('weather.your_homename','unavailable') %}
            {%- set now1 = as_timestamp(strptime(state_attr('weather.your_homename','forecast')[0]['datetime'], '%Y-%m-%dT%H:%M:%S%z', default='2020-01-01T00:00:00+00:00')) %}
            {%- set day = now1 | timestamp_custom("%w") %}
            {%- set days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] %}
            {{ days[ day | int -1 ] }}{{ now1 | timestamp_custom(" %d") }}
            {%- endif %}

      - obj: "p5b62" # Forecast temp min +1d
        properties:
          "text": "{{ state_attr('weather.your_homename','forecast')[0]['templow'] if not is_state('weather.your_homename','unavailable') else '-' }}"

      - obj: "p5b63" # Forecast temp max +1d
        properties:
          "text": "{{ state_attr('weather.your_homename','forecast')[0]['temperature'] if not is_state('weather.your_homename','unavailable') else '-' }}"

      - obj: "p5b64" # Forecast condition +1d
        properties:
          "src": >
            {%- if not is_state('weather.your_homename','unavailable') %}
            L:/w-32-{{ state_attr('weather.your_homename','forecast')[0]['condition'] }}.png
            {%- endif %}

      - obj: "p5b71" # Forecast date +2d
        properties:
          "text": >
            {%- if not is_state('weather.your_homename','unavailable') %}
            {%- set now1 = as_timestamp(strptime(state_attr('weather.your_homename','forecast')[1]['datetime'], '%Y-%m-%dT%H:%M:%S%z', default='2020-01-01T00:00:00+00:00')) %}
            {%- set day = now1 | timestamp_custom("%w") %}
            {%- set days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] %}
            {{ days[ day | int -1 ] }}{{ now1 | timestamp_custom(" %d") }}
            {%- endif %}

      - obj: "p5b72" # Forecast temp min +2d
        properties:
          "text": "{{ state_attr('weather.your_homename','forecast')[1]['templow'] if not is_state('weather.your_homename','unavailable') else '-' }}"

      - obj: "p5b73" # Forecast temp max +2d
        properties:
          "text": "{{ state_attr('weather.your_homename','forecast')[1]['temperature'] if not is_state('weather.your_homename','unavailable') else '-' }}"

      - obj: "p5b74" # Forecast condition +2d
        properties:
          "src": >
            {%- if not is_state('weather.your_homename','unavailable') %}
            L:/w-32-{{ state_attr('weather.your_homename','forecast')[1]['condition'] }}.png
            {%- endif %}

      - obj: "p5b81" # Forecast date +3d
        properties:
          "text": >
            {%- if not is_state('weather.your_homename','unavailable') %}
            {%- set now1 = as_timestamp(strptime(state_attr('weather.your_homename','forecast')[2]['datetime'], '%Y-%m-%dT%H:%M:%S%z', default='2020-01-01T00:00:00+00:00')) %}
            {%- set day = now1 | timestamp_custom("%w") %}
            {%- set days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] %}
            {{ days[ day | int -1 ] }}{{ now1 | timestamp_custom(" %d") }}
            {%- endif %}

      - obj: "p5b82" # Forecast temp min +3d
        properties:
          "text": "{{ state_attr('weather.your_homename','forecast')[2]['templow'] if not is_state('weather.your_homename','unavailable') else '-' }}"

      - obj: "p5b83" # Forecast temp max +3d
        properties:
          "text": "{{ state_attr('weather.your_homename','forecast')[2]['temperature'] if not is_state('weather.your_homename','unavailable') else '-' }}"

      - obj: "p5b84" # Forecast condition +3d
        properties:
          "src": >
            {%- if not is_state('weather.your_homename','unavailable') %}
            L:/w-32-{{ state_attr('weather.your_homename','forecast')[2]['condition'] }}.png
            {%- endif %}

      - obj: "p5b91" # Forecast date +4d
        properties:
          "text": >
            {%- if not is_state('weather.your_homename','unavailable') %}
            {%- set now1 = as_timestamp(strptime(state_attr('weather.your_homename','forecast')[3]['datetime'], '%Y-%m-%dT%H:%M:%S%z', default='2020-01-01T00:00:00+00:00')) %}
            {%- set day = now1 | timestamp_custom("%w") %}
            {%- set days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] %}
            {{ days[ day | int -1 ] }}{{ now1 | timestamp_custom(" %d") }}
            {%- endif %}

      - obj: "p5b92" # Forecast temp min +4d
        properties:
          "text": "{{ state_attr('weather.your_homename','forecast')[3]['templow'] if not is_state('weather.your_homename','unavailable') else '-' }}"

      - obj: "p5b93" # Forecast temp max +4d
        properties:
          "text": "{{ state_attr('weather.your_homename','forecast')[3]['temperature'] if not is_state('weather.your_homename','unavailable') else '-' }}"

      - obj: "p5b94" # Forecast condition +4d
        properties:
          "src": >
            {%- if not is_state('weather.your_homename','unavailable') %}
            L:/w-32-{{ state_attr('weather.your_homename','forecast')[3]['condition'] }}.png
            {%- endif %}
```


!!! note "Attribution" 
    Icons are copyright from [manifestinteractive](https://github.com/manifestinteractive/weather-underground-icons){target=_blank}
    and [merlinthered](https://www.deviantart.com/merlinthered/art/plain-weather-icons-157162192){target=_blank}.



*  *  *  *  *

## Fan and scent diffuser

![screenshot](images/cc-sampl-fan-diffuser.png)

This example shows how a transparent PNG image can be combined with a moving spinner object, to create the impression of a spinning fan.
In Home Assistant this fan appears as a `select` component with the available presets as `Low`,`Mid`,`High`,`Turbo`,`OFF` selectable options. The scent diffuser appears as a standard `fan` component where the intensity can be set by percentage.     
To control the fan we use a button matrix object which has exactly the same buttons as the options of the select component. To control the scent diffuser we use a slider object.

The fan and the perfume PNG icons are available below. Upload them to the flash storage of your plate.

- [fan](../../assets/users/g64.png)
- [perfume](../../assets/users/perfume3.png)

!!! warning
    For this example to work, you need an ESP32 board having [PSRam](../../design/objects/img.md) memory installed, otherwise openHASP will likely crash.

relevant **openHASP config:** (screen size 240x320, UI Theme: Hasp Light) 

```json
{"page":4,"id":1,"obj":"btn","x":0,"y":0,"w":240,"h":30,"text":"AIR TREATMENT","text_font":16,"bg_color":"#2C3E50","text_color":"#FFFFFF","radius":0,"border_side":0,"click":0}
{"page":4,"id":10,"obj":"obj","x":5,"y":35,"w":230,"h":250,"click":0}
{"page":4,"id":2,"obj":"label","x":10,"y":40,"w":105,"h":20,"text":"Fresh air flow","align":"center","border_width":0}
{"page":4,"id":3,"obj":"label","x":125,"y":40,"w":105,"h":20,"text":"Scent intensity","align":"center","border_width":0}
{"page":4,"id":12,"obj":"spinner","x":36,"y":84,"w":56,"h":56,"bg_opa":0,"border_width":0,"line_width":0,"line_width10":19,"line_color10":"#34eb77","type":2,"angle":160,"speed":3000}
{"page":4,"id":13,"obj":"img","x":14,"y":75,"src":"L:/g64.png","auto_size":1,"w":100,"h":74}
{"page":4,"id":14,"obj":"img","x":130,"y":78,"src":"L:/perfume3.png","auto_size":1,"w":60,"h":68}
{"page":4,"id":40,"obj":"btnmatrix","x":5,"y":130,"w":110,"h":113,"parentid":10,"options":["Low","Mid","\n","High","Turbo","\n","OFF"],"toggle":1,"one_check":1,"bg_opa":0,"pad_inner":5,"border_width":0,"pad_top":0,"pad_bottom":0,"pad_left":0,"pad_right":0}
{"page":4,"id":51,"obj":"slider","x":200,"y":60,"w":25,"h":220,"min":0,"max":60,"val":15}
{"page":4,"id":52,"obj":"obj","x":130,"y":130,"w":50,"h":30,"parentid":10,"click":0,"radius":5}
{"page":4,"id":53,"obj":"label","x":130,"y":130,"w":50,"h":30,"parentid":10,"text":"15","text_font":24,"align":"center"}
{"page":4,"id":54,"obj":"btn","x":130,"y":168,"w":50,"h":76,"parentid":10,"toggle":true,"text":"\uE425","text_font":32,"align":1,"bg_color":"#A0A0A0","bg_grad_color":"#606060","border_color":"#404040"}

```

relevant **openHASP-custom-component config:**
```yaml
      - obj: "p4b40" # Buttin Matrix with the fan presets
        properties:
          "click": "{{ 0 if (is_state('input_select.fan_presets','unavailable') or is_state('input_select.fan_presets','unknown')) else 1 }}"
          "opacity": "{{ 100 if (is_state('input_select.fan_presets','unavailable') or is_state('input_select.fan_presets','unknown')) else 255 }}"
          "options": '["Low","Mid","\n","High","Turbo","\n","OFF"]'
          "toggle": '{{ 1 if (not states("input_select.fan_presets") in state_attr("input_select.fan_presets","options")) or (is_state("input_select.fan_presets","unavailable")) -}}'

          "val": >
            {% if state_attr("input_select.fan_presets","options") is not none -%}
            {% if not states('input_select.fan_presets') in state_attr('input_select.fan_presets','options') -%}-1{% else -%}
            {% for source in state_attr('input_select.fan_presets','options') -%}
            {{loop.index - 1 if source == states('input_select.fan_presets') }}
            {%-endfor%}
            {%- endif %}
            {%- endif %}
        event:
            - service: input_select.input_select_option
              data:
                option: '{{ text }}'
              target:
                entity_id: input_select.fan_presets

      - obj: "p4b12"  # Spinner behind the PNG icon
        properties:
          "opacity": "{{ 0 if states('input_select.fan_presets') in ['unavailable', 'unknown', 'OFF'] else 255 }}"
          "jsonl": >
            {% if is_state('number.plate_test_page_number', '4') %}
            {% if is_state('input_select.fan_presets', 'Alap') %}
            {"speed":7000,"line_color10":"#31de70"}
            {%-elif is_state('input_select.fan_presets', 'Közép') %}
            {"speed":1700,"line_color10":"#dede1f"}
            {%-elif is_state('input_select.fan_presets', 'Magas') %}
            {"speed":800,"line_color10":"#d6a11a"}
            {%-elif is_state('input_select.fan_presets', 'Turbó') %}
            {"speed":250,"line_color10":"#ff4a4a"}
            {% endif %}
            {% else -%}
            {"speed":0}
            {% endif %}

      - obj: "p4b54" # Scent Diffuser ON/OFF button
        properties:
          "val": '{{ 1 if is_state("fan.scent_diffuser_intensity", "on") else 0 }}'
          "enabled": "{{ 'false' if states('input_select.fan_presets') in ['unavailable', 'unknown'] else 'true' }}"
        event:
          "down":
            - service: fan.toggle
              target:
                entity_id: fan.scent_diffuser_intensity

      - obj: "p4b51" # Scent Diffuser intensity slider
        properties:
          "val": "{{ state_attr('fan.scent_diffuser_intensity','percentage') }}"
          "enabled": "{{ 'false' if states('input_select.fan_presets') in ['unavailable', 'unknown'] else 'true' }}"
        event:
          "up":
            - service: fan.set_percentage
              target:
                entity_id: fan.scent_diffuser_intensity
              data:
                percentage: '{{ val }}'

      - obj: "p4b53" # Scent Diffuser intensity number label
        properties:
          "text": "{{ '--' if states('input_select.fan_presets') in ['unavailable', 'unknown'] else state_attr('fan.scent_diffuser_intensity','percentage') }}"
          "opacity": "{{ 255 if is_state('fan.scent_diffuser_intensity', 'on') else 95 }}"
```

Note the condition in the Spinner configuration of the component:      
`{% if is_state('openhasp.plate_test', '4') %}` - this is useful to only animate the spinner when the page containing it is actually shown. Since the spinner is being overlapped by a transparent PNG image, CPU usage is higher as it has to be completely redrawn every frame. CPU resources can be freed up this way - only animate when it can be seen.

!!! note "Attribution" 
    Icons are copyright from [SVG Repo](https://www.svgrepo.com/){target=_blank}.

*  *  *  *  *

## Using tags 

You can avoid too much code repetition when you have multiple similar objects on a page, doing the same thing with different entities, and you'd like to make accessible some advanced options too. Presenting everyting flat will overwhelm your user interface, so it would be better to just show the most used controls, and only display the advanced options in popups related to unique objects. [Tag](../../design/objects/index.md#common-properties) property was made to ease this task.

### Colored lights panel

In the example below we have four coloured lights. Squeezing the ON/OFF button, the color picker and the brightness selector for all four lights on a single page can be challenging - and the result will likely be useless on a small touch screen. Instead, we'll just place the toggle buttons with descriptive labels on the page, and we'll only display the color picker and the brightness selector on demand, in this case when the user touches the descriptive coloured label.

While dynamically drawing these objects we're setting the `tag` property for the color picker and the slider to the `entity_id` of the light we want to adjust, so that when we're interacting with them, the Custom Component can know which light it has to send the adjustments to.

![screenshot1](images/cc-sampl-tags-color-1.png) 
![screenshot2](images/cc-sampl-tags-color-2.png)      

relevant **openHASP config:** (screen size 240x320, UI Theme: Hasp Light) 

```json
{"page":5,"id":1,"obj":"btn","x":0,"y":0,"w":240,"h":30,"text":"COLOURED LIGHTS","text_font":16,"bg_color":"#2C3E50","text_color":"#FFFFFF","radius":0,"border_side":0,"click":0}
{"page":5,"id":2,"obj":"label","x":15,"y":40,"w":100,"h":60,"text":"I.","align":"center","border_width":1,"radius":8,"border_color":"#bdbdbd","bg_opa":255,"click":true}
{"page":5,"id":3,"obj":"label","x":125,"y":40,"w":100,"h":60,"text":"II.","align":"center","border_width":1,"radius":8,"border_color":"#bdbdbd","bg_opa":255,"click":true}
{"page":5,"id":4,"obj":"label","x":15,"y":165,"w":100,"h":60,"text":"III.","align":"center","border_width":1,"radius":8,"border_color":"#bdbdbd","bg_opa":255,"click":true}
{"page":5,"id":5,"obj":"label","x":125,"y":165,"w":100,"h":60,"text":"IV.","align":"center","border_width":1,"radius":8,"border_color":"#bdbdbd","bg_opa":255,"click":true}

{"page":5,"id":11,"obj":"btn","x":15,"y":90,"w":100,"h":60,"toggle":true,"text":"\uE335","text_font":32}
{"page":5,"id":12,"obj":"btn","x":125,"y":90,"w":100,"h":60,"toggle":true,"text":"\uE335","text_font":32}
{"page":5,"id":13,"obj":"btn","x":15,"y":220,"w":100,"h":60,"toggle":true,"text":"\uE335","text_font":32}
{"page":5,"id":14,"obj":"btn","x":125,"y":220,"w":100,"h":60,"toggle":true,"text":"\uE335","text_font":32}
```

relevant **openHASP-custom-component config:** (read comments)
```yaml
      - obj: "p5b11" # toggle button for ON/OFF switching of light I.
        properties:
          "val": '{{ 1 if is_state("light.dmx_vbar_1", "on") else 0 }}'
        event:
          "down":
            - service: homeassistant.toggle
              entity_id: "light.dmx_vbar_1"

      - obj: "p5b12" # toggle button for ON/OFF switching of light II.
        properties:
          "val": '{{ 1 if is_state("light.dmx_vbar_2", "on") else 0 }}'
        event:
          "down":
            - service: homeassistant.toggle
              entity_id: "light.dmx_vbar_2"

      - obj: "p5b13" # toggle button for ON/OFF switching of light III.
        properties:
          "val": '{{ 1 if is_state("light.dmx_vbar_3", "on") else 0 }}'
        event:
          "down":
            - service: homeassistant.toggle
              entity_id: "light.dmx_vbar_3"

      - obj: "p5b14" # toggle button for ON/OFF switching of light IV.
        properties:
          "val": '{{ 1 if is_state("light.dmx_vbar_4", "on") else 0 }}'
        event:
          "down":
            - service: homeassistant.toggle
              entity_id: "light.dmx_vbar_4"

      - obj: "p5b2" # label showing the current color of light I.
        properties:
          "bg_color": >
            {% if is_state('light.dmx_vbar_1','on') %}
            {% set rgb = state_attr('light.dmx_vbar_1','rgb_color') %}
            {{ "#%02x%02x%02x" | format(rgb[0],rgb[1],rgb[2]) }}
            {% endif %}
        event:
          "down":
            - service: light.turn_on
              data:
                entity_id: light.dmx_vbar_1
            - service: openhasp.command # display the on-demand pop-up with color picker and brightness slider, tagged with the entity_id of light I.
              target:
                entity_id: openhasp.plate_test
              data:
                keyword: jsonl
                parameters: >-
                  {"page":5,"id":200,"obj":"obj","x":0,"y":0,"w":240,"h":320,"radius":0,"bg_grad_dir":0,"opacity":150,"bg_color":"black"}
                  {"page":5,"id":210,"obj":"obj","parentid":200,"x":10,"y":15,"w":220,"h":270,"opacity":255,"click":0,"radius":10,"shadow_opa":255,"shadow_color":"black","shadow_width":20,"shadow_spread":0}
                  {"page":5,"id":211,"obj":"label","parentid":210,"x":0,"y":8,"w":220,"h":20,"click":0,"align":"center","text":"Color settings for light I."}
                  {"page":5,"id":201,"obj":"cpicker","parentid":210,"x":20,"y":35,"w":180,"h":180,"tag":"light.dmx_vbar_1","color":
                  {% set rgb = state_attr('light.dmx_vbar_1','rgb_color') -%}
                  "{{ "#%02x%02x%02x" | format(rgb[0],rgb[1],rgb[2]) }}"
                  }
                  {"page":5,"id":202,"obj":"slider","parentid":210,"x":20,"y":225,"w":180,"h":30,"min":1,"max":255,"tag":"light.dmx_vbar_1","val":
                  {{- state_attr('light.dmx_vbar_1', 'brightness') -}}
                  }

      - obj: "p5b3" # label showing the current color of light II.
        properties:
          "bg_color": >
            {% if is_state('light.dmx_vbar_2','on') %}
            {% set rgb = state_attr('light.dmx_vbar_2','rgb_color') %}
            {{ "#%02x%02x%02x" | format(rgb[0],rgb[1],rgb[2]) }}
            {% endif %}
        event:
          "down":
            - service: light.turn_on
              data:
                entity_id: light.dmx_vbar_2
            - service: openhasp.command # display the on-demand pop-up with color picker and brightness slider, tagged with the entity_id of light II.
              target:
                entity_id: openhasp.plate_test
              data:
                keyword: jsonl
                parameters: >-
                  {"page":5,"id":200,"obj":"obj","x":0,"y":0,"w":240,"h":320,"radius":0,"bg_grad_dir":0,"opacity":150,"bg_color":"black"}
                  {"page":5,"id":210,"obj":"obj","parentid":200,"x":10,"y":15,"w":220,"h":270,"opacity":255,"click":0,"radius":10,"shadow_opa":255,"shadow_color":"black","shadow_width":20,"shadow_spread":0}
                  {"page":5,"id":211,"obj":"label","parentid":210,"x":0,"y":8,"w":220,"h":20,"click":0,"align":"center","text":"Color settings for light II."}
                  {"page":5,"id":201,"obj":"cpicker","parentid":210,"x":20,"y":35,"w":180,"h":180,"tag":"light.dmx_vbar_2","color":
                  {% set rgb = state_attr('light.dmx_vbar_2','rgb_color') -%}
                  "{{ "#%02x%02x%02x" | format(rgb[0],rgb[1],rgb[2]) }}"
                  }
                  {"page":5,"id":202,"obj":"slider","parentid":210,"x":20,"y":225,"w":180,"h":30,"min":1,"max":255,"tag":"light.dmx_vbar_2","val":
                  {{- state_attr('light.dmx_vbar_2', 'brightness') -}}
                  }

      - obj: "p5b4" # label showing the current color of light III.
        properties:
          "bg_color": >
            {% if is_state('light.dmx_vbar_3','on') %}
            {% set rgb = state_attr('light.dmx_vbar_3','rgb_color') %}
            {{ "#%02x%02x%02x" | format(rgb[0],rgb[1],rgb[2]) }}
            {% endif %}
        event:
          "down":
            - service: light.turn_on
              data:
                entity_id: light.dmx_vbar_3
            - service: openhasp.command # display the on-demand pop-up with color picker and brightness slider, tagged with the entity_id of light III.
              target:
                entity_id: openhasp.plate_test
              data:
                keyword: jsonl
                parameters: >-
                  {"page":5,"id":200,"obj":"obj","x":0,"y":0,"w":240,"h":320,"radius":0,"bg_grad_dir":0,"opacity":150,"bg_color":"black"}
                  {"page":5,"id":210,"obj":"obj","parentid":200,"x":10,"y":15,"w":220,"h":270,"opacity":255,"click":0,"radius":10,"shadow_opa":255,"shadow_color":"black","shadow_width":20,"shadow_spread":0}
                  {"page":5,"id":211,"obj":"label","parentid":210,"x":0,"y":8,"w":220,"h":20,"click":0,"align":"center","text":"Color settings for light III."}
                  {"page":5,"id":201,"obj":"cpicker","parentid":210,"x":20,"y":35,"w":180,"h":180,"tag":"light.dmx_vbar_3","color":
                  {% set rgb = state_attr('light.dmx_vbar_3','rgb_color') -%}
                  "{{ "#%02x%02x%02x" | format(rgb[0],rgb[1],rgb[2]) }}"
                  }
                  {"page":5,"id":202,"obj":"slider","parentid":210,"x":20,"y":225,"w":180,"h":30,"min":1,"max":255,"tag":"light.dmx_vbar_3","val":
                  {{- state_attr('light.dmx_vbar_3', 'brightness') -}}
                  }

      - obj: "p5b5" # label showing the current color of light IV.
        properties:
          "bg_color": >
            {% if is_state('light.dmx_vbar_4','on') %}
            {% set rgb = state_attr('light.dmx_vbar_4','rgb_color') %}
            {{ "#%02x%02x%02x" | format(rgb[0],rgb[1],rgb[2]) }}
            {% endif %}
        event:
          "down":
            - service: light.turn_on
              data:
                entity_id: light.dmx_vbar_4
            - service: openhasp.command # display the on-demand pop-up with color picker and brightness slider, tagged with the entity_id of light IV.
              target:
                entity_id: openhasp.plate_test
              data:
                keyword: jsonl
                parameters: >-
                  {"page":5,"id":200,"obj":"obj","x":0,"y":0,"w":240,"h":320,"radius":0,"bg_grad_dir":0,"opacity":150,"bg_color":"black"}
                  {"page":5,"id":210,"obj":"obj","parentid":200,"x":10,"y":15,"w":220,"h":270,"opacity":255,"click":0,"radius":10,"shadow_opa":255,"shadow_color":"black","shadow_width":20,"shadow_spread":0}
                  {"page":5,"id":211,"obj":"label","parentid":210,"x":0,"y":8,"w":220,"h":20,"click":0,"align":"center","text":"Color settings for light IV."}
                  {"page":5,"id":201,"obj":"cpicker","parentid":210,"x":20,"y":35,"w":180,"h":180,"tag":"light.dmx_vbar_4","color":
                  {% set rgb = state_attr('light.dmx_vbar_4','rgb_color') -%}
                  "{{ "#%02x%02x%02x" | format(rgb[0],rgb[1],rgb[2]) }}"
                  }
                  {"page":5,"id":202,"obj":"slider","parentid":210,"x":20,"y":225,"w":180,"h":30,"min":1,"max":255,"tag":"light.dmx_vbar_4","val":
                  {{- state_attr('light.dmx_vbar_4', 'brightness') -}}
                  }

      - obj: "p5b200" # the background of the popup. when touched directly, will close the popup by deleting its objects
        event:
          "down":
            - service: openhasp.command
              target:
                entity_id: openhasp.plate_test
              data:
                keyword: p5b200.delete

      - obj: "p5b201" # set the color of the light entity_id extracted from the tag set previously, when displayed, then delete the popup objects
        event:
          "changed":
            - service: light.turn_on
              data:
                entity_id: "{{ tag }}"
                rgb_color: "[{{ r }},{{ g }},{{ b }}]"
          "up":
            - service: openhasp.command
              target:
                entity_id: openhasp.plate_test
              data:
                keyword: p5b200.delete

      - obj: "p5b202" # set the brightness of the light entity_id extracted from the tag set previously, when displayed, then delete the popup objects
        event:
          "changed":
            - service: light.turn_on
              data:
                entity_id: "{{ tag }}"
                brightness:  "{{ val }}"
          "up":
            - service: openhasp.command
              target:
                entity_id: openhasp.plate_test
              data:
                keyword: p5b200.delete
```

Without tags, the last 3 object definitions would have to be added for each light, and also it would be needed to be drawn separately for each light, initially invisible, then toggle visibility at each one. That would have resulted in a much bigger Custom Component configuration, and also plate design.

### Shutter control panel

In the second example, we have five windows with motorized shutters. In addition to the usual UP/STOP/DOWN buttons, the inhabitants want to have three shortcut positions for each shutter, and also a slider for free positioning. Useless to say that it's impossible to put all these on a page, and also it would be a pity to use up 5 pages just for these.

We'll just put the most used, UP/STOP/DOWN buttons on the page (this already looks a bit much...) and we'll use a _long press_ event on the middle STOP button to show a pop-up with the extra required settings related to the desired shutter.

The `tag` here will be a JSON object referencing both the `entity_id` and the position specific to the desired shutter, eg. `"tag":{"cover":"cover.bigroom_i","position":"15"}`, this will be set for the buttons and the slider appearing in the popup. Since the shutters are different sizes and types, the same intermediate physical position may correspond to different numeric values in Home Assistant.

![screenshot3](images/cc-sampl-tags-covers-1.png)
![screenshot4](images/cc-sampl-tags-covers-2.png)       

relevant **openHASP config:** (screen size 240x320, UI Theme: Hasp Light) 

```json
{"page":2,"id":1,"obj":"btn","x":0,"y":0,"w":240,"h":30,"text":"MOTORIZED COVERS","text_font":16,"bg_color":"#2C3E50","text_color":"#FFFFFF","radius":0,"border_side":0,"click":0}
{"page":2,"id":2,"obj":"label","x":7,"y":36,"w":42,"h":20,"text":"I.","align":"center"}
{"page":2,"id":3,"obj":"label","x":53,"y":36,"w":42,"h":20,"text":"II.","align":"center"}
{"page":2,"id":4,"obj":"label","x":99,"y":36,"w":42,"h":20,"text":"III.","align":"center"}
{"page":2,"id":5,"obj":"label","x":145,"y":36,"w":42,"h":20,"text":"IV.","align":"center"}
{"page":2,"id":6,"obj":"label","x":191,"y":36,"w":42,"h":20,"text":"V.","align":"center"}

{"page":2,"id":11,"obj":"btn","x":7,"y":60,"w":42,"h":68,"toggle":false,"text":"\uE05D","text_font":32}
{"page":2,"id":12,"obj":"btn","x":7,"y":136,"w":42,"h":68,"toggle":false,"text":"\uE4DB","text_font":32}
{"page":2,"id":13,"obj":"btn","x":7,"y":212,"w":42,"h":68,"toggle":false,"text":"\uE045","text_font":32}

{"page":2,"id":21,"obj":"btn","x":53,"y":60,"w":42,"h":68,"toggle":false,"text":"\uE05D","text_font":32}
{"page":2,"id":22,"obj":"btn","x":53,"y":136,"w":42,"h":68,"toggle":false,"text":"\uE4DB","text_font":32}
{"page":2,"id":23,"obj":"btn","x":53,"y":212,"w":42,"h":68,"toggle":false,"text":"\uE045","text_font":32}

{"page":2,"id":31,"obj":"btn","x":99,"y":60,"w":42,"h":68,"toggle":false,"text":"\uE05D","text_font":32}
{"page":2,"id":32,"obj":"btn","x":99,"y":136,"w":42,"h":68,"toggle":false,"text":"\uE4DB","text_font":32}
{"page":2,"id":33,"obj":"btn","x":99,"y":212,"w":42,"h":68,"toggle":false,"text":"\uE045","text_font":32}

{"page":2,"id":41,"obj":"btn","x":145,"y":60,"w":42,"h":68,"toggle":false,"text":"\uE05D","text_font":32}
{"page":2,"id":42,"obj":"btn","x":145,"y":136,"w":42,"h":68,"toggle":false,"text":"\uE4DB","text_font":32}
{"page":2,"id":43,"obj":"btn","x":145,"y":212,"w":42,"h":68,"toggle":false,"text":"\uE045","text_font":32}

{"page":2,"id":51,"obj":"btn","x":191,"y":60,"w":42,"h":68,"toggle":false,"text":"\uE05D","text_font":32}
{"page":2,"id":52,"obj":"btn","x":191,"y":136,"w":42,"h":68,"toggle":false,"text":"\uE4DB","text_font":32}
{"page":2,"id":53,"obj":"btn","x":191,"y":212,"w":42,"h":68,"toggle":false,"text":"\uE045","text_font":32}
```

relevant **openHASP-custom-component config:** (read comments)

```yaml
      - obj: "p2b11" # shutter I. up button
        properties:
          "text_color": "{{ '#FFFF00' if is_state('cover.bigroom_i', 'opening') else '#FFFFFF' }}"
          "text_opa": "{{ '80' if is_state_attr('cover.bigroom_i','current_position', 100) else '255' }}"
        event:
          "down":
            - service: cover.open_cover
              target:
                entity_id: "cover.bigroom_i"
      - obj: "p2b13" # shutter I. down button
        properties:
          "text_color": "{{ '#FFFF00' if is_state('cover.bigroom_i', 'closing') else '#FFFFFF' }}"
          "text_opa": "{{ '80' if is_state_attr('cover.bigroom_i','current_position', 0) else '255' }}"
        event:
          "down":
            - service: cover.close_cover
              target:
                entity_id: "cover.bigroom_i"
      - obj: "p2b12" # shutter I. middle stop button
        properties:
          "text": >
            {% if is_state('cover.bigroom_i', 'closing') %}
            {{ "\uE4DB" | e }}
            {%-elif is_state('cover.bigroom_i', 'opening') %}
            {{ "\uE4DB" | e }}
            {%-elif is_state('cover.bigroom_i', 'closed') %}
            {{ "\uF11C" | e }}
            {%-elif is_state('cover.bigroom_i', 'open') %}
            {{ "\uF11E" | e }}
            {% endif %}
        event:
          "down":
            - service: cover.stop_cover
              target:
                entity_id: "cover.bigroom_i"
          "long":
            - service: openhasp.command # display the on-demand pop-up with extra setting objects, tagged with the entity_id and specific positions in JSON objects
              target:
                entity_id: openhasp.plate_bigroom
              data:
                keyword: jsonl
                parameters: >-
                  {"page":2,"id":200,"obj":"obj","x":0,"y":0,"w":240,"h":320,"radius":0,"bg_grad_dir":0,"opacity":150,"bg_color":"black"}
                  {"page":2,"id":210,"obj":"obj","parentid":200,"x":5,"y":55,"w":230,"h":190,"opacity":255,"click":0,"radius":10,"shadow_opa":255,"shadow_color":"black","shadow_width":20,"shadow_spread":0}
                  {"page":2,"id":211,"obj":"label","parentid":210,"x":10,"y":10,"w":210,"h":20,"click":0,"align":"center","text":"Position preset - I."}
                  {"page":2,"id":201,"obj":"btn","parentid":210,"x":10,"y":110,"w":150,"h":60,"toggle":false,"text_font":24,"text":"Middle","tag":{"cover":"cover.bigroom_i","position":"15"}}
                  {"page":2,"id":202,"obj":"btn","parentid":210,"x":10,"y":40,"w":70,"h":60,"toggle":false,"text_font":24,"text":"2/3","tag":{"cover":"cover.bigroom_i","position":"90"}}
                  {"page":2,"id":203,"obj":"btn","parentid":210,"x":90,"y":40,"w":70,"h":60,"toggle":false,"text_font":24,"text":"1/3","tag":{"cover":"cover.bigroom_i","position":"54"}}
                  {"page":2,"id":204,"obj":"slider","parentid":210,"x":180,"y":40,"w":30,"h":130,"min":1,"max":100,"pad_left20":"13","pad_right20":"13","tag":{"cover":"cover.bigroom_i","position":"50"},"val":
                  {{- state_attr('cover.bigroom_i','current_position') -}}
                  }

      - obj: "p2b21" # shutter II.
        properties:
          "text_color": "{{ '#FFFF00' if is_state('cover.bigroom_ii', 'opening') else '#FFFFFF' }}"
          "text_opa": "{{ '80' if is_state_attr('cover.bigroom_ii','current_position', 100) else '255' }}"
        event:
          "down":
            - service: cover.open_cover
              target:
                entity_id: "cover.bigroom_ii"
      - obj: "p2b23"
        properties:
          "text_color": "{{ '#FFFF00' if is_state('cover.bigroom_ii', 'closing') else '#FFFFFF' }}"
          "text_opa": "{{ '80' if is_state_attr('cover.bigroom_ii','current_position', 0) else '255' }}"
        event:
          "down":
            - service: cover.close_cover
              target:
                entity_id: "cover.bigroom_ii"
      - obj: "p2b22"
        properties:
          "text": >
            {% if is_state('cover.bigroom_ii', 'closing') %}
            {{ "\uE4DB" | e }}
            {%-elif is_state('cover.bigroom_ii', 'opening') %}
            {{ "\uE4DB" | e }}
            {%-elif is_state('cover.bigroom_ii', 'closed') %}
            {{ "\uF11C" | e }}
            {%-elif is_state('cover.bigroom_ii', 'open') %}
            {{ "\uF11E" | e }}
            {% endif %}
        event:
          "down":
            - service: cover.stop_cover
              target:
                entity_id: "cover.bigroom_ii"
          "long":
            - service: openhasp.command # display the on-demand pop-up with extra setting objects, tagged with the entity_id and specific positions in JSON objects
              target:
                entity_id: openhasp.plate_bigroom
              data:
                keyword: jsonl
                parameters: >-
                  {"page":2,"id":200,"obj":"obj","x":0,"y":0,"w":240,"h":320,"radius":0,"bg_grad_dir":0,"opacity":150,"bg_color":"black"}
                  {"page":2,"id":210,"obj":"obj","parentid":200,"x":5,"y":55,"w":230,"h":190,"opacity":255,"click":0,"radius":10,"shadow_opa":255,"shadow_color":"black","shadow_width":20,"shadow_spread":0}
                  {"page":2,"id":211,"obj":"label","parentid":210,"x":10,"y":10,"w":210,"h":20,"click":0,"align":"center","text":"Position preset - II.","align":"center"}
                  {"page":2,"id":201,"obj":"btn","parentid":210,"x":10,"y":110,"w":150,"h":60,"toggle":false,"text_font":24,"text":"Middle","tag":{"cover":"cover.bigroom_ii","position":"18"}}
                  {"page":2,"id":202,"obj":"btn","parentid":210,"x":10,"y":40,"w":70,"h":60,"toggle":false,"text_font":24,"text":"2/3","tag":{"cover":"cover.bigroom_ii","position":"90"}}
                  {"page":2,"id":203,"obj":"btn","parentid":210,"x":90,"y":40,"w":70,"h":60,"toggle":false,"text_font":24,"text":"1/3","tag":{"cover":"cover.bigroom_ii","position":"53"}}
                  {"page":2,"id":204,"obj":"slider","parentid":210,"x":180,"y":40,"w":30,"h":130,"min":1,"max":100,"pad_left20":"13","pad_right20":"13","tag":{"cover":"cover.bigroom_ii","position":"50"},"val":
                  {{- state_attr('cover.bigroom_ii','current_position') -}}
                  }

      - obj: "p2b31" # shutter III.
        properties:
          "text_color": "{{ '#FFFF00' if is_state('cover.bigroom_iii', 'opening') else '#FFFFFF' }}"
          "text_opa": "{{ '80' if is_state_attr('cover.bigroom_iii','current_position', 100) else '255' }}"
        event:
          "down":
            - service: cover.open_cover
              target:
                entity_id: "cover.bigroom_iii"
      - obj: "p2b33"
        properties:
          "text_color": "{{ '#FFFF00' if is_state('cover.bigroom_iii', 'closing') else '#FFFFFF' }}"
          "text_opa": "{{ '80' if is_state_attr('cover.bigroom_iii','current_position', 0) else '255' }}"
        event:
          "down":
            - service: cover.close_cover
              target:
                entity_id: "cover.bigroom_iii"
      - obj: "p2b32"
        properties:
          "text": >
            {% if is_state('cover.bigroom_iii', 'closing') %}
            {{ "\uE4DB" | e }}
            {%-elif is_state('cover.bigroom_iii', 'opening') %}
            {{ "\uE4DB" | e }}
            {%-elif is_state('cover.bigroom_iii', 'closed') %}
            {{ "\uF11C" | e }}
            {%-elif is_state('cover.bigroom_iii', 'open') %}
            {{ "\uF11E" | e }}
            {% endif %}
        event:
          "down":
            - service: cover.stop_cover
              target:
                entity_id: "cover.bigroom_iii"
          "long":
            - service: openhasp.command # display the on-demand pop-up with extra setting objects, tagged with the entity_id and specific positions in JSON objects
              target:
                entity_id: openhasp.plate_bigroom
              data:
                keyword: jsonl
                parameters: >-
                  {"page":2,"id":200,"obj":"obj","x":0,"y":0,"w":240,"h":320,"radius":0,"bg_grad_dir":0,"opacity":150,"bg_color":"black"}
                  {"page":2,"id":210,"obj":"obj","parentid":200,"x":5,"y":55,"w":230,"h":190,"opacity":255,"click":0,"radius":10,"shadow_opa":255,"shadow_color":"black","shadow_width":20,"shadow_spread":0}
                  {"page":2,"id":211,"obj":"label","parentid":210,"x":10,"y":10,"w":210,"h":20,"click":0,"align":"center","text":"Position preset - III."}
                  {"page":2,"id":201,"obj":"btn","parentid":210,"x":10,"y":110,"w":150,"h":60,"toggle":false,"text_font":24,"text":"Middle","tag":{"cover":"cover.bigroom_iii","position":"17"}}
                  {"page":2,"id":202,"obj":"btn","parentid":210,"x":10,"y":40,"w":70,"h":60,"toggle":false,"text_font":24,"text":"2/3","tag":{"cover":"cover.bigroom_iii","position":"90"}}
                  {"page":2,"id":203,"obj":"btn","parentid":210,"x":90,"y":40,"w":70,"h":60,"toggle":false,"text_font":24,"text":"1/3","tag":{"cover":"cover.bigroom_iii","position":"53"}}
                  {"page":2,"id":204,"obj":"slider","parentid":210,"x":180,"y":40,"w":30,"h":130,"min":1,"max":100,"pad_left20":"13","pad_right20":"13","tag":{"cover":"cover.bigroom_iii","position":"50"},"val":
                  {{- state_attr('cover.bigroom_iii','current_position') -}}
                  }

      - obj: "p2b41" # shutter IV.
        properties:
          "text_color": "{{ '#FFFF00' if is_state('cover.bigroom_iv', 'opening') else '#FFFFFF' }}"
          "text_opa": "{{ '80' if is_state_attr('cover.bigroom_iv','current_position', 100) else '255' }}"
        event:
          "down":
            - service: cover.open_cover
              target:
                entity_id: "cover.bigroom_iv"
      - obj: "p2b43"
        properties:
          "text_color": "{{ '#FFFF00' if is_state('cover.bigroom_iv', 'closing') else '#FFFFFF' }}"
          "text_opa": "{{ '80' if is_state_attr('cover.bigroom_iv','current_position', 0) else '255' }}"
        event:
          "down":
            - service: cover.close_cover
              target:
                entity_id: "cover.bigroom_iv"
      - obj: "p2b42"
        properties:
          "text": >
            {% if is_state('cover.bigroom_iv', 'closing') %}
            {{ "\uE4DB" | e }}
            {%-elif is_state('cover.bigroom_iv', 'opening') %}
            {{ "\uE4DB" | e }}
            {%-elif is_state('cover.bigroom_iv', 'closed') %}
            {{ "\uF11C" | e }}
            {%-elif is_state('cover.bigroom_iv', 'open') %}
            {{ "\uF11E" | e }}
            {% endif %}
        event:
          "down":
            - service: cover.stop_cover
              target:
                entity_id: "cover.bigroom_iv"
          "long":
            - service: openhasp.command # display the on-demand pop-up with extra setting objects, tagged with the entity_id and specific positions in JSON objects
              target:
                entity_id: openhasp.plate_bigroom
              data:
                keyword: jsonl
                parameters: >-
                  {"page":2,"id":200,"obj":"obj","x":0,"y":0,"w":240,"h":320,"radius":0,"bg_grad_dir":0,"opacity":150,"bg_color":"black"}
                  {"page":2,"id":210,"obj":"obj","parentid":200,"x":5,"y":55,"w":230,"h":190,"opacity":255,"click":0,"radius":10,"shadow_opa":255,"shadow_color":"black","shadow_width":20,"shadow_spread":0}
                  {"page":2,"id":211,"obj":"label","parentid":210,"x":10,"y":10,"w":210,"h":20,"click":0,"align":"center","text":"Position preset - IV."}
                  {"page":2,"id":201,"obj":"btn","parentid":210,"x":10,"y":110,"w":150,"h":60,"toggle":false,"text_font":24,"text":"Middle","tag":{"cover":"cover.bigroom_iv","position":"15"}}
                  {"page":2,"id":202,"obj":"btn","parentid":210,"x":10,"y":40,"w":70,"h":60,"toggle":false,"text_font":24,"text":"2/3","tag":{"cover":"cover.bigroom_iv","position":"90"}}
                  {"page":2,"id":203,"obj":"btn","parentid":210,"x":90,"y":40,"w":70,"h":60,"toggle":false,"text_font":24,"text":"1/3","tag":{"cover":"cover.bigroom_iv","position":"53"}}
                  {"page":2,"id":204,"obj":"slider","parentid":210,"x":180,"y":40,"w":30,"h":130,"min":1,"max":100,"pad_left20":"13","pad_right20":"13","tag":{"cover":"cover.bigroom_iv","position":"50"},"val":
                  {{- state_attr('cover.bigroom_iv','current_position') -}}
                  }

      - obj: "p2b51" # shutter V.
        properties:
          "text_color": "{{ '#FFFF00' if is_state('cover.bigroom_v', 'opening') else '#FFFFFF' }}"
          "text_opa": "{{ '80' if is_state_attr('cover.bigroom_v','current_position', 100) else '255' }}"
        event:
          "down":
            - service: cover.open_cover
              target:
                entity_id: "cover.bigroom_v"
      - obj: "p2b53"
        properties:
          "text_color": "{{ '#FFFF00' if is_state('cover.bigroom_v', 'closing') else '#FFFFFF' }}"
          "text_opa": "{{ '80' if is_state_attr('cover.bigroom_v','current_position', 0) else '255' }}"
        event:
          "down":
            - service: cover.close_cover
              target:
                entity_id: "cover.bigroom_v"
      - obj: "p2b52"
        properties:
          "text": >
            {% if is_state('cover.bigroom_v', 'closing') %}
            {{ "\uE4DB" | e }}
            {%-elif is_state('cover.bigroom_v', 'opening') %}
            {{ "\uE4DB" | e }}
            {%-elif is_state('cover.bigroom_v', 'closed') %}
            {{ "\uF11C" | e }}
            {%-elif is_state('cover.bigroom_v', 'open') %}
            {{ "\uF11E" | e }}
            {% endif %}
        event:
          "down":
            - service: cover.stop_cover
              target:
                entity_id: "cover.bigroom_v"
          "long":
            - service: openhasp.command # display the on-demand pop-up with extra setting objects, tagged with the entity_id and specific positions in JSON objects
              target:
                entity_id: openhasp.plate_bigroom
              data:
                keyword: jsonl
                parameters: >-
                  {"page":2,"id":200,"obj":"obj","x":0,"y":0,"w":240,"h":320,"radius":0,"bg_grad_dir":0,"opacity":150,"bg_color":"black"}
                  {"page":2,"id":210,"obj":"obj","parentid":200,"x":5,"y":55,"w":230,"h":190,"opacity":255,"click":0,"radius":10,"shadow_opa":255,"shadow_color":"black","shadow_width":20,"shadow_spread":0}
                  {"page":2,"id":211,"obj":"label","parentid":210,"x":10,"y":10,"w":210,"h":20,"click":0,"align":"center","text":"Position preset - V."}
                  {"page":2,"id":201,"obj":"btn","parentid":210,"x":10,"y":110,"w":150,"h":60,"toggle":false,"text_font":24,"text":"Middle","tag":{"cover":"cover.bigroom_v","position":"17"}}
                  {"page":2,"id":202,"obj":"btn","parentid":210,"x":10,"y":40,"w":70,"h":60,"toggle":false,"text_font":24,"text":"2/3","tag":{"cover":"cover.bigroom_v","position":"90"}}
                  {"page":2,"id":203,"obj":"btn","parentid":210,"x":90,"y":40,"w":70,"h":60,"toggle":false,"text_font":24,"text":"1/3","tag":{"cover":"cover.bigroom_v","position":"55"}}
                  {"page":2,"id":204,"obj":"slider","parentid":210,"x":180,"y":40,"w":30,"h":130,"min":1,"max":100,"pad_left20":"13","pad_right20":"13","tag":{"cover":"cover.bigroom_v","position":"19"},"val":
                  {{- state_attr('cover.bigroom_v','current_position') -}}
                  }

      - obj: "p2b200" # the background of the popup. when touched directly, will close the popup by deleting its objects
        event:
          "down":
            - service: openhasp.command
              target:
                entity_id: openhasp.plate_bigroom
              data:
                keyword: p2b200.delete


      - obj: "p2b201" # set the shutter position for entity_id extracted from the JSON oject in tag set when displayed, then delete the popup objects
        event:
          "down":
            - service: cover.set_cover_position
              data:
                entity_id: "{{ tag.cover }}"
                position: "{{ tag.position }}"
            - service: openhasp.command
              target:
                entity_id: openhasp.plate_bigroom
              data:
                keyword: p2b200.delete

      - obj: "p2b202" # set the shutter position for entity_id extracted from the JSON oject in tag set when displayed, then delete the popup objects
        event:
          "down":
            - service: cover.set_cover_position
              data:
                entity_id: "{{ tag.cover }}"
                position: "{{ tag.position }}"
            - service: openhasp.command
              target:
                entity_id: openhasp.plate_bigroom
              data:
                keyword: p2b200.delete

      - obj: "p2b203" # set the shutter position for entity_id extracted from the JSON oject in tag set when displayed, then delete the popup objects
        event:
          "down":
            - service: cover.set_cover_position
              data:
                entity_id: "{{ tag.cover }}"
                position: "{{ tag.position }}"
            - service: openhasp.command
              target:
                entity_id: openhasp.plate_bigroom
              data:
                keyword: p2b200.delete

      - obj: "p2b204" # set the shutter position from the slider for entity_id extracted from the JSON oject in tag set when displayed, then delete the popup objects
        event:
          "up":
            - service: cover.set_cover_position
              data:
                entity_id: "{{ tag.cover }}"
                position: "{{ val | int }}"
            - service: openhasp.command
              target:
                entity_id: openhasp.plate_bigroom
              data:
                keyword: p2b200.delete
```
Again - without tags, the last 5 object definitions would have to be added for each shutter, and also it would be needed to be drawn separately for each one, initially invisible, then toggle visibility at each one. That would have resulted in a much bigger Custom Component configuration, and also plate design.

!!! note
    Some examples below may generate errors during Home Assistant startup. Log messages like `Error while processing template` or `Template variable error: 'None' has no attribute 'last_changed'` etc. can be caused by the fact that openHASP component loads faster than the other integrations you have set up, from where you want to pull data. Because the data required by openHASP component is not yet available, an error is generated. But as soon as Home Assistant finishes loading everything, and all the data you've configured is available, things will be normal. Nevertheless the log should be checked regularly to find repetitive problems.

