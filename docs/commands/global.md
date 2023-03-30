## `run`

_accepted parameters:_ name of a `.cmd` or `.jsonl` file present on the flash filesystem of the plate. Filename must be preceeded by the `/` character      

Run a batch script or load a jsonl page.

!!! example "Example" 
    `run /script.cmd`         
    `run /pages_party_mode.jsonl`


## `jsonl`

_accepted parameters:_ one or more json formatted lines     

Create new objects *or* update the properties of an existing object. When updating an existing object the `obj` property is not required and will be ignored.

Each line in the `jsonl` payload defines one object and has to be in the json format. If the payload exceeds the MQTT buffer of 2 kB it will be cut off to fit,
don't send too many lines in a single payload, you can always sends multiple jsonl commands.

!!! example "Example"    
    ```json linenums="1"
    jsonl {"obj":"btn","id":14,"x":120,"y":1,"w":30,"h":40,"text_font":"2","text":"Test","text_color":"gray","bg_opa":0,"border_width":0}
    ```

_For more details see [Pages](../design/pages) and [Objects](../design/objects)._


## `json`

_accepted parameters:_ json array of strings

Use the `json` command to send multiple commands as an array of strings in one payload.

!!! example "Example"  
    ```json linenums="1"
    json ['page 3','backlight {"state":"ON","brightness":100}','idle off']
    ```

This command will change to page 3, turn the backlight on at ~40% brightness and reset the idle timer.


## `page`

_accepted parameters:_ `[1-12]`, `prev`, `next` or `back`

Switches the display to show the objects from a different page and return the page number in `state/page`.

Calling the `page` command without a parameter will return the value of the current page in `state/page`.


## `clearpage`
_accepted parameters:_ `[0-12]` or `all`

Deletes all objects on a given page. If no page number is specified, it clears the current page.
Use `clearpage all` to clear all objects on all pages.

To delete individual objects, you can issue the `pXbY.delete` command.

<!--
## dim
_accepted parameters:_ `[0-255]`

Sets the level of the backlight from 0 to 255, where 0 is off and 255 is full brightness.

!!! example "Example"
    `dim 127` sets the display to half the brightness.

This can be used in conjunction with the [idle events][4], e.g. to dim the screen after a period of inactivity.

## light
_accepted parameters:_ `on`/`off`, `true`/`false`, `0`/`1`, `yes`/`no`

Switches the backlight on or off, independent of the set dim level. Turning the backlight on will restore the brightness to the previous dim level.

!!! example "Example"
    `light on` Turn the backlight on 

`dim` and `light` commands will work only if a Backlight GPIO pin is configured to the pin required to control the display backlight.

`dim 0` and `light 0` both turn off the screen, however, with `dim 0` the touching will haven an effect on the objects beneath but not wake the screen, while with `light 0` it will only wake the scren but will not affect the objects.


## dim

!!! warning "Deprecated, use `backlight` instead"


## light

!!! warning "Deprecated, use `backlight` instead"

-->

## `backlight`
_accepted json keys:_

- **state:** `on`/`off`, `true`/`false`, `0`/`1`, `yes`/`no`
- **brightness:** `1..255`

!!! example "Example"
    `backlight {"state":"on","brightness":128}` sets the display to half the brightness.

Instead of a json payload, you can use a simple payload.
To change the state, use either `on`/`off`, `true`/`false`, `0`, `yes`/`no`.
A simple integer payload of `1..255` will adjust the brightness.

!!! example "Example"
    `backlight off` </br>
    `backlight 200`  sets the display brightness to ~80%.


## `moodlight`
_accepted json keys:_

- **state:** `on`/`off`, `true`/`false`, `0`/`1`, `yes`/`no`
- **brightness:** `1..255` :material-new-box:{ .tag-small }
- **color** or
- **r, g, b:** `0..255`

An RGB moodlight can be controlled by configuring 3 [GPIO pins][3] as type `Mood Red`, `Mood Green` and `Mood blue`.
These leds can then be controlled together using the `moodlight` command.

!!! example "Example"
    ```json linenums="1"
    moodlight {"state":"off","color":"green"}
    moodlight {"state":true,"color":"#ff00e7"}
    moodlight {"color":12345}
    moodlight {"state":"on","r":255,"g":0,"b":255}
    ```

- The `state` key accepts [boolean values][2] to turn the moodlight on or off
- The `brightness` key can be set between `1` and `255` to dim the moodlight
- The `color` key accepts [color values][1] to set the RGB channels at once
- Individual `r`, `g` and `b` keys can also be used to set each channel separately

Calling the `moodlight` command without parameters (or sending an empty payload to the `hasp/<nodename>/command/moodlight` topic) returns the current state:

!!! example "Example"
    ```json linenums="1"
    "state/moodlight" {"state":"ON","brightness":255,"color":"#ff0000","r":255,"g":0,"b":0}
    ```

The color is returned as a hexadecimal value and as individual RGB channels.


## `idle`
_accepted parameters:_ `off`, `short`:material-new-box:{ .tag-medium } or `long`:material-new-box:{ .tag-medium }

Sets the idle state of the device and publishes the new state via a `state/idle` status message.

`off` resets the idle counter as if a touch event occurred on the device. This is helpful e.g. when you want to wake up the display when an external event has occurred, like a PIR motion sensor.

`short` or `long` sets the idle timer to the number of seconds configured in the [Display Settings][4]. You can use this to force an idle state, for example at night or when leaving the house.

Calling the `idle` command without a parameter will also return the current idle state `short`, `long` or `off` in the `state/idle` topic.


## `output[x]`

where `[x]` is number of the gpio pin (0-39)

_accepted json keys:_

- **state:** `on`/`off`, `true`/`false`, `0`/`1`, `yes`/`no`
- **val:** `0..255`

Changes the state GPIO pin to `on` or `off`. If the pin is configured as a `LED` or `Serial Dimmer` then the `val` key will control the brightness.

!!! note
    If the GPIO is assigned to a group then objects and other GPIOs that share the same `groupid` will change state accordingly.


## `input[x]`

where `[x]` is number of the gpio pin (0-39)

_read-only_

Returns a JSON object containing the current state of the input, either `on` or `off`

!!! example "Example"
    ```json linenums="1"
    input4 => {"state":"on"}
    ```
