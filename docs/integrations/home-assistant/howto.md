The [openHASP Custom Component][1]{target=_blank} simplifies synchronization of objects on one or more openHASP plates with Home Assistant entities. You can map any service supported by any entity in Home Assistant to any object event in openHASP, moreover, you can set any property of any object in openHASP to any value from Home Assistant. This powerful concept gives you full freedom to create a completely customized, hardware-based control user interface for your home automation.

We call _plate_ any device running openHASP in your system.

# Installation

You have the option to install the custom component using HACS or via manual download:

=== "Using HACS"
    [![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)][3]{target=_blank}

    Install using [HACS][4] in one-click. This is the preferred and recommended method, as HACS provides a very effective way to keep the component updated and/or choose between various versions.

    1. Goto _Home Assistant > HACS > Integrations_.
    2. Click the _Explore & Add Repositories_ button.
    3. Search for `openHASP` and click on the openHasp logo.
    4. Click _Install this repository in HACS_. **Note:** To install the current unstable development version select the _Main_.
    5. Click Install
    6. Reboot Home-Assistant

=== "Manual Install"
    Alternatively, you can also install it manually: 

    [:material-file-download-outline: Download ZIP][2]{target=_blank .md-button .md-button--primary }

    1. Using the tool of choice open the directory (folder) for your HA configuration (where you find `configuration.yaml`).
    2. If you do not have a `custom_components` directory there, you need to create it.
    3. In the `custom_components` directory create a new folder called `openhasp`.
    4. Download _all_ the files from the `custom_components/openhasp/` directory in this repository.
    5. Place the files you downloaded in the new directory you created.
    6. Edit your `configuration.yaml` file add an entry similar to the example below.
    7. Restart Home Assistant

    !!! note
        The [download][2]{target=_blank} link points to the actual _development code_ in the _master_ branch. 

!!! warning
    You have to use component version consistently with the firmware version on your plates. For example, if your plates are at firmware version 0.6.x, you also need to use component version 0.6.x to ensure interoperability. Home Assistant will show a warning if it finds a version mismatch. Note that you can only have one version of the component installed at a time so a mix of plate versions cannot be deployed.

## Configuration 

First prepare your plates to be integrated with Home Assistant (follow steps in order):

1. Connect your plates to the [network](../../installation/wifi-setup.md). Static DHCP or fixed IP is not needed as communication only happes through MQTT.
2. Set the [GPIO configuration](../../configuration/gpio.md) corresponding to your hardware (important for them to be detected as entities), save and reboot.
3. Restart Home Assistant.
4. Set the [MQTT server](../../configuration/mqtt.md) settings and make sure each plate has a unique node name, save and reboot.

The component will automatically discover the plates and you will see them appearing in Lovelace UI's _Configuration > Devices & Services > openHASP_.

When Home Assistant detects your plate, you will have to give it a name. In the examples below both name and node name is `plate35`.   
You will be presented with options to set the backlight brightness level when the plate is idle and optionally you can set a path to a centrally located `pages.jsonl` file containing design for this plate - the component can send the contents of the file when the plate connects. From v0.6.3 of the component this file can also be a file with a `.json` extenstion. See the _JSON Files_ section below.

!!! note
     If you opt to store the `pages.jsonl` file on Home Assistant server, it will only be loaded on start of Home Assistant and reloaded on plate availability (becoming online). Optionally you should also check [how to handle the offline state](../examples/example-offlinehandling.md) of the plate.

Currently you will get a warning that you need to add manual configuration for the objects in your `configuration.yaml`, that's no problem, read ahead.

### Example

To add an openHASP plate to your installation with a sample configuration, upload a `pages.jsonl` file with the folowing content to your plate first:

```json linenums="1"
{"page":1,"id":1,"obj":"btn","x":0,"y":0,"w":240,"h":30,"text":"openHASP","value_font":22,"bg_color":"#2C3E50","text_color":"#FFFFFF","radius":0,"border_side":0}
{"page":1,"id":2,"obj":"btn","x":10,"y":40,"w":105,"h":90,"toggle":true,"text":"\uE335","text_font":32,"mode":"break","align":1}
{"page":1,"id":3,"obj":"dropdown","x":10,"y":140,"w":170,"h":30,"options":"Apples\nBananas\nOranges\nMelon"}
{"page":0,"id":1,"obj":"label","x":175,"y":5,"h":30,"w":62,"text":"00.0°C","align":2,"bg_color":"#2C3E50","text_color":"#FFFFFF"}
```

Assuming your plate's configured MQTT node name is `plate35`, add the following to your `configuration.yaml` file (Home Assistant will deliberatey ask for it when finished autodetection procedure):

```yaml linenums="1"
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
:   The platform identifier. Required once in the configuration.

**plate35:** *(Required)*    
:   Your plate identifier slug. For each plate in your sytem, such an entry is required, has to be unique. It is generated automatically from the plate name you gave during discovery, which by default equals to the _HASP Node Name_ set in the plate's [configuration](../../configuration/mqtt.md).

<!--
**path:** *(path) (Optional)*     
Path to a `pages.jsonl` file containing design for this plate, to be loaded on Home Assistant start and on plate availability (becoming online).<br>
_Note:_ Don't upload any `pages.jsonl` file to the plate's flash memory at all! This assumes your plate pages are empty at boot. Checkout the _services_ section for requirements to use this.

**idle_brightness:** *(int) (Optional)*    
The brightness of the screen when idle (before long idle). Numeric value between 1 and 255. Default 25. 
-->

**objects:** *(Optional)*     
:   Definition of the objects reacting to changes in Home Assistant, or generating events for Home Assistant.

**obj:** *(string) (Required)*     
:   The object identifier which we want to integrate with Home Assistant. Its name has the form `pXbY` where `X` represents the page where the object is located, and `Y` represents the `id` of the object on that page.

**properties:** *(Optional)*     
:   List containing the properties of the object which we want to modify based on changes occurring in Home Assistant. In the example above `text` property gets updated whenever `sensor.my_room_temperature` changes. 
  
**event:** *(Optional)*     
:   List containing the events generated by the object when touched on the screen. These are object-specific and can be observed accurately with an MQTT client. Each event defines a list of services which will be processed in order (like actions list in an automation).  

In the example above, when object `p1b2` (which is a toggle button) generates the `on` event, `light.my_room` will be turned on by the service call `light.turn_on` as specified in the event config. And similarily when `off` event comes through MQTT, the light will be turned off by the corresponding service call.  

!!! note
    Any variable coming from the MQTT message can be used between curly brackets and passed to the service call. In the example above when object `p1b3` (which is a dropdown selector) generates the `changed` event, a persistent notification will appear in Home Assistant's Lovelace interface containing the selected text from the object, which was passed over from the MQTT message. See [object events](../../../design/objects/#events) for more types of generated events.


### Reloading the configuration

After you make changes to the configuration of the plate you can apply them by either restarting Home Assistant or by **reloading the integration** from Lovelace user interface with option found in _Configuration > Devices & Services > openHASP > (your plate >) 3dots menu > Reload_. Note that this has to be done individually for each configured plate. 

You can achieve the same by with a service too:

```yaml linenums="1"
service: homeassistant.reload_config_entry
data:
  entry_id: 95f7d6fe3fa5f4e242797e9ae4a5dd1d
```
With the `entry_id` found in _.storage/core.config_entries_ file from your main Home Assistant configuration directory (do NOT edit this file!).


### Configuration tips

#### Multiple plates

If you have multiple plates you can add them all using different plate identifiers. Their configured topics have to be unique too:

```yaml linenums="1"
openhasp:
  plate_my_room_1:
    objects:
      # ...
  plate_my_room_2:
    objects:
      # ...
  plate_my_room_3:
    objects:
      # ...
```

#### Split configuration

You can use Home Assistant's [split configuration][5]{target=_blank} to help better organizing your config files.

Instead of keeping the configuration of all openHASP plates in Home Assistant's main config file, you can keep openHASP config separately, by adding only this to `configuration.yaml`:

`openhasp: !include openhasp.yaml`

After this, you can move your openHASP configuration starting with `plate_my_room:` level to your separate `openhasp.yaml` file and restart Home Assistant.

Moreover, if you have multiple plates, you can keep each one in a separate config file, to achieve this, make it like:

`openhasp: !include_dir_merge_named openhasp_configs/`

Create a directory `openhasp_configs` right near `configuration.yaml`, and put in it all your plates configuration (only with `plate_my_room:` level) in separate yaml files and restart Home Assistant.

* * * * *

## Services
This component implements some specific services to make interactions with the plate even more comfortable.

**openhasp.wakeup**  
:   Wakes up the display when an external event has occurred, like a presence or a PIR motion sensor.

**openhasp.next_page**  
:   Changes plate to the next page.

**openhasp.prev_page**  
:   Changes plate to the previous page.

**openhasp.change_page**  
:   Changes plate directly to the specified page number.

**openhasp.clear_page**  
:   Clears the contents of the specified page number. If page number not specified, clears all the pages.

**openhasp.load_pages**  
:   Loads new design from `pages.jsonl` file from _full path_ on Home Assistant server.

The file must be located in an authorised location defined by [allowlist_external_dirs](https://www.home-assistant.io/docs/configuration/basic/#allowlist_external_dirs){target=_blank} (in case of hassio `/config/` is the directory where Home Assistant's configuration.yaml resides, so in case of a subdirectory called `openhasp` the full path would be e.g. `/config/openhasp/pages.jsonl`, and you need to add  `/config/openhasp/` to your `allowlist_external_dirs`).

!!! note
    The contents of the file are loaded line by line thus `"page":X` has to be defined for each object.
    
Unless you clear the page first, the objects will be updated.

For example, to allow read-access to the folder, add these lines to your `configuration.yaml`:

```yaml linenums="1"
homeassistant:
  allowlist_external_dirs:
    - "/config/openhasp"
```

**openhasp.command**
:   Wraps up any [command](../../commands.md) so that it can be called against the _entity_id_ of the plate. Useful in Automations and Blueprints.

    !!! warning
        This service handles data without input validation. Only for advanced users. No support for any problems caused by using this!

**openhasp.config**
:   Wraps up any raw [submodule config](../../commands/#configsubmodule) so that it can be called against the _entity_id_ of the plate. Useful in Automations and Blueprints.

    !!! warning
        This service handles data without input validation. Only for advanced users. No support for any problems caused by using this!

Check out the example confgurations and automations to learn how to use these services within Home Assistant.

* * * * *

## JSON Files

From v0.6.3 pages file supplied in the plate config within home assistant can be a `.json`, files with this extension will be parsed differently and expect a JSON array containing objects or strings. Objects must be valid JSONL lines and strings can be used for comments. 

As this file is valid JSON whitespace will be ignored when parsing and removed before sending the JSONL data to the plate. If you are storing your plate config along with your HA config, this allows you to have more  readable config which will be formatted in your editor of choice.

Example:

```json linenums="1"
[
  {
    "page": 1,
    "id": 2,
    "obj": "btn",
    "x": 10,
    "y": 40,
    "w": 105,
    "h": 90,
    "toggle": false,
    "text": "Normal Button",
    "mode": "break",
    "align": "center"
  },
  "Comment string will be removed when parsing",
  {
    "page": 1,
    "id": 3,
    "obj": "btn",
    "x": 125,
    "y": 40,
    "w": 105,
    "h": 90,
    "toggle": true,
    "text": "#FFD700 Toggle# Button",
    "mode": "break",
    "align": "center"
  }
]
```


* * * * *
## Debugging

Add these lines to your main `configuration.yaml` configuration and restart Home Assistant:

```yaml linenums="1"
logger:
  default: warning
  logs:
    custom_components.openhasp: debug
```

Look for the debug messages in the `home-assistant.log` file.


[1]: https://github.com/HASwitchPlate/openHASP-custom-component
[2]: https://github.com/HASwitchPlate/openHASP-custom-component/archive/refs/heads/main.zip
[3]: https://github.com/custom-components/hacs
[4]: https://hacs.xyz/
[5]: https://www.home-assistant.io/docs/configuration/splitting_configuration/
