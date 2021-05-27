The [openHASP Custom Component][1] simplifies synchronization of objects on one or more openHASP plates with Home Assistant entities.

We call _plate_ any device running openHASP in your system.

# Installation

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)][3]

Install using [HACS][4] in one-click. This is the preferred and recommended method, as HACS provides a very effective way to keep the component updated and/or choose between various versions.

!!! note "Note"
    Alternatively, you can also install it manually ([download][2] and follow these steps): 

    1. Using the tool of choice open the directory (folder) for your HA configuration (where you find `configuration.yaml`).
    2. If you do not have a `custom_components` directory there, you need to create it.
    3. In the `custom_components` directory create a new folder called `openhasp`.
    4. Download _all_ the files from the `custom_components/openhasp/` directory in this repository.
    5. Place the files you downloaded in the new directory you created.
    6. Edit your `configuration.yaml` file add an entry similar to the example below.
    7. Restart Home Assistant

!!! warning "Warning"
    You have to use component version consistently with the firmware version on your plates. For example, if your plates are at firmware version 0.5.x, you also need to use component version 0.5.x to ensure interoperability. Home Assistant will show a warning if it finds a version mismatch. Note that you can only have one version of the component installed at a time so a mix of plate versions cannot be deployed.

## Configuration 

First prepare your plates to be integrated with Home Assistant (follow steps in order):

1. Connect your plates to the [network](../../installation/wifi-setup.md). Static DHCP or fixed IP is not needed as communication only happes through MQTT.
2. Set the [GPIO configuration](../../configuration/gpio.md) corresponding to your hardware (important for them to be detected as entities), save and reboot.
3. Restart Home Assistant.
4. Set the [MQTT server](../../configuration/mqtt.md) settings and make sure each plate has a unique node name, save and reboot.

The component will automatically discover the plates and you will see them appearing in _Home Assistant > Configuration > Integrations > HASP-Open Hardware Edition_.

When Home Assistant detects your plate, you will have to give it a name. In the examples below both name and node name is `plate35`.

Currently you will get a warning that you need to add manual configuration for the objects in your `configuration.yaml`, that's no problem, read ahead.

### Example

To add an openHASP plate to your installation with a sample configuration, upload a `pages.jsonl` file with the folowing content to your plate first:

```json
{"page":1,"id":1,"obj":"btn","x":0,"y":0,"w":240,"h":30,"text":"openHASP","value_font":22,"bg_color":"#2C3E50","text_color":"#FFFFFF","radius":0,"border_side":0}
{"page":1,"id":2,"obj":"btn","x":10,"y":40,"w":105,"h":90,"toggle":true,"text":"\uE335","text_font":26,"mode":"break","align":1}
{"page":1,"id":3,"obj":"dropdown","x":10,"y":130,"w":160,"h":30,"options":"Apples\nBananas\nOranges\nMelon"}

{"page":0,"id":1,"obj":"label","x":175,"y":5,"h":30,"w":62,"text":"00.0°C","align":2,"bg_color":"#2C3E50","text_color":"#FFFFFF"}
```

Assuming your plate's configured MQTT node name is `plate35`, add the following to your `configuration.yaml` file (Home Assistant will deliberatey ask for it when finished autodetection procedure):

```yaml
openhasp:
  plate35:
    objects:
      - obj: "p0b1"  # temperature label on all pages
        properties:
          "text": '{{ states("sensor.my_room_temperature") }}°C'
      - obj: "p1b2"  # light-switch toggle button
        properties:
          "val": '{{ 1 if states("light.my_room") == "on" else 0 }}'
          "text": '{{ "\uE6E8" if is_state("light.my_room", "on") else "\uE335" | e }}'
        event:
          "up":
            - service: homeassistant.toggle
              entity_id: "light.my_room"
      - obj: "p1b3"  # dropdown
        event:
          "changed":
            - service: persistent_notification.create
              data:
                message: I like {{ text }}
```

### Variable definitions

**openhasp:** *(Required)*    
The platform identifier. Required once in the configuration.

**plate35:** *(Required)*    
Your plate identifier slug. For each plate in your sytem, such an entry is required, has to be unique. It is generated automatically from the plate name you gave during discovery, which by default equals to the _HASP Node Name_ set in the plate's [configuration](../../configuration/mqtt.md).

<!--
**path:** *(path) (Optional)*     
Path to a `pages.jsonl` file containing design for this plate, to be loaded on Home Assistant start and on plate availability (becoming online).<br>
_Note:_ Don't upload any `pages.jsonl` file to the plate's flash memory at all! This assumes your plate pages are empty at boot. Checkout the _services_ section for requirements to use this.

**idle_brightness:** *(int) (Optional)*    
The brightness of the screen when idle (before long idle). Numeric value between 1 and 255. Default 25. 
-->

**objects:** *(Optional)*     
Definition of the objects reacting to changes in Home Assistant, or generating events for Home Assistant.

**obj:** *(string) (Required)*     
The object identifier which we want to integrate with Home Assistant. Its name has the form `pXbY` where `X` represents the page where the object is located, and `Y` represents the `id` of the object on that page.

**properties:** *(Optional)*     
List containing the properties of the object which we want to modify based on changes occurring in Home Assistant. In the example above `text` property gets updated whenever `sensor.my_room_temperature` changes. 
  
**event:** *(Optional)*     
List containing the events generated by the object when touched on the screen. These are object-specific and can be observed accurately with an MQTT client. Each event defines a list of services which will be processed in order (like actions list in an automation).  

In the example above, when object `p1b2` (which is a toggle button) generates the `on` event, `light.my_room` will be turned on by the service call `light.turn_on` as specified in the event config. And similarily when `off` event comes through MQTT, the light will be turned off by the corresponding service call.  

_Note:_ Any variable coming from the MQTT message can be used between curly brackets and passed to the service call. In the example above when object `p1b3` (which is a dropdown selector) generates the `changed` event, a persistent notification will appear in Home Assistant's Lovelace interface containing the selected text from the object, which was passed over from the MQTT message. See [object events](../../../design/objects#events) for more types of generated events.
### Configuration tips

#### Multiple plates

If you have multiple plates you can add them all using different plate identifiers. Their configured topics have to be unique too:

```yaml
openhasp:
  plate_my_room_1:
    topic: "hasp/plate1"
    objects:
      ...
  plate_my_room_2:
    topic: "hasp/plate2"
    objects:
      ...
  plate_my_room_3:
    topic: "hasp/plate3"
    objects:
      ...
```

#### Split configuration

You can use Home Assistant's [split configuration][5] to help better organizing your config files.

Instead of keeping the configuration of all openHASP plates in Home Assistant's main config file, you can keep openHASP config separately, by adding only this to `configuration.yaml`:

`openhasp: !include openhasp.yaml`

After this, you can move your openHASP configuration starting with `plate_my_room:` level to your separate `openhasp.yaml` file and restart Home Assistant.

Moreover, if you have multiple plates, you can keep each one in a separate config file, to achieve this, make it like:

`openhasp: !include_dir_merge_named openhasp_configs/`

Create a directory `openhasp_configs` right near `configuration.yaml`, and put in it all your plates configuration (only with `plate_my_room:` level) in separate yaml files and restart Home Assistant.

* * * * *

This component implements some specific services to make interactions with the plate even more comfortable.

## Services

**openhasp.wakeup**  
  Wakes up the display when an external event has occurred, like a presence or a PIR motion sensor.

**openhasp.next_page**  
  Changes plate to the next page.

**openhasp.prev_page**  
  Changes plate to the previous page.

**openhasp.change_page**  
  Changes plate directly to the specified page number.

**openhasp.clear_page**  
  Clears the contents of the specified page number. If page number not specified, clears all the pages.

**openhasp.load_pages**  
  Loads new design from pages.jsonl file from _full path_.   
  The file must be located in an authorised location defined by [allowlist_external_dirs](https://www.home-assistant.io/docs/configuration/basic/#allowlist_external_dirs) (in case of hassio `/config/` is the directory where Home Assistant's configuration.yaml resides, so in case of a subdirectory called `openhasp` the full path would be e.g. `/config/openhasp/pages.jsonl`, and you need to add  `/config/openhasp/` to your `allowlist_external_dirs`).  
  _Important:_ the contents of the file are loaded line by line thus `"page":X` has to be defined for each object.   
  Unless you clear the page first, the objects will be updated.
  
  Check out the example automations for further information on how to use the services within Home Assistant.

[1]: https://github.com/HASwitchPlate/openHASP-custom-component
[2]: https://github.com/HASwitchPlate/openHASP-custom-component/archive/refs/heads/main.zip
[3]: https://github.com/custom-components/hacs
[4]: https://hacs.xyz/
[5]: https://www.home-assistant.io/docs/configuration/splitting_configuration/
