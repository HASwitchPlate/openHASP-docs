<style type="text/css">


.ekko-lightbox-container > div > iframe
{
  height: 240px;
  max-height: 240px;
}

.wm-page-content img
{
  margin-top: 10px;
  margin-bottom: px;
}



</style>
<h1>Objects</h1>

There are two ways to create an object on the screen:

- Uploading a [`pages.jsonl`](pages.md#pagesjsonl) file onto the internal flash
- Use the [`jsonl`](commands.md#multiple-commands) command *(via MQTT, serial or telnet console)*

### Cheatsheet

| obj       | Type   | Description
|:----------|:-------|:-----------
| btn       | Binary | [Button](#button)
| switch    | Toggle | [Switch](#switch)
| checkbox  | Toggle | [Checkbox](#checkbox)
| label     | Visual | [Label](#text-label)
| led       | Visual | [LED](#led-indicator)
| spinner   | Visual | [Spinner](#spinner)
| obj       | Visual | [Base Object](#base-object)
| dropdown  | Selector | [Dropdown List](#dropdown-list)
| roller    | Selector | [Roller](#roller)
| btnmatrix | Selector | [Button Matrix](#button-matrix)
| cpicker   | Selector | [Colorpicker](#colorpicker)
| bar       | Range | [Progress Bar](#progress-bar)
| slider    | Range | [Slider](#slider)
| arc       | Range | [Arc](#arc)
| lmeter    | Range | [Line Meter](#line-meter)
| gauge     | Range | [Gauge](#gauge)

## Common Parameters

### Common Properties

These are the common properties shared among all objects,
but only the `id` and `obj` properties are required to create an object:

| Property | Value     | Required | Default | Description
|:---------|:---------:|:--------:|:-------:|:----
| id       | 1..255    | yes      | n/a     | ID of the object on this page
| obj      | string    | yes      | n/a     | Name of the object type _(see below)_ 
| page     | 0..12     | no       | n/a     | ID of the page the object appears on _(see below)_
| groupid  | 0..15     | no       | 0 (none)| ID of the [GPIO group][3] the object belongs to
| x        | int16     | no       | 0       | horizontal position on the page
| y        | int16     | no       | 0       | vertical position on the page
| w        | int16     | no       | 0       | width of the object
| h        | int16     | no       | 0       | height of the object
| click    | [bool][2] | no       | true    | object is touch/clickable _(also see [enabled][4])_
| hidden   | [bool][2] | no       | false   | object is hidden
| opacity  | 0..255    | no       | 255     | how much the the object is opaque
| radius   | uint16    | no       | depends<BR>on theme | the radius of the rounded corners of the object:<BR>`0` square corners<BR>`100` pill shaped object (true circle if object has same width and height)
| action   | string    | no       | 0       | command handled locally _(see below)_
| swipe    | [bool][2] | no       | false   | page navigation using swipe gestures _(see below)_

!!! note "<i class='fa fa-info-circle'></i>&nbsp; Note"
    Further customizable properties can be found in [styling](styling.md).

#### Pages  
If the `page` parameter is not present, the object is placed on the same page as the _previous object_. If `page` is not specified for the first object either, the _current page_ being displayed is used.

`"page":0` indicates that the object is visible on **all** pages. It can be used for example to specify a static menu bar.
You can still hide the object on select pages if needed. Objects on page 0 appear on **top** of any objects on the underlying page.

#### Actions  
Action commands are supported only by _binary_ or _visual_ type of objects and they are performed locally on the plate. The following actions can be set for these objects:
- `p1` to `p12` to switch to the corresponding page numbers directly
- `prev` to switch to the previous page
- `next` to switch to the next page
- `back` to go back to the home page

Check out the [example](example-pagination.md) for how to implement actions.  
You can change the target pages using `prev`, `back` and `next` [page attributes](pages.md#page-attributes) operation on the page object`pXb0`.  

#### Swipe  
Objects and page area (`p0bY`) support `swipe` property. Enabling this will process `left`, `right` and `down` swipes on the object as `next`, `prev` and `back` page changes, respectively. The start of the swipe needs to be on the element which has this property enabled for the feature to activate.  
_Note:_ Page id `p0b0` is not valid to set this property as it has to be set on real elements. 

### Events

All objects are touchable by default and respond to touch events. To disable touch events for an object set its `enabled` property to `false`. In this case the touch event "goes through" to the object on the layer below or to the page itself.

Events (and values) are published in a state topic corresponding to the object, eg. `hasp/<nodename>/state/p1b2` with payload in json format eg. `{"event":"up","val":1}`.  
Possible events (depending on object type) are:

| Event   | Description |
|:--------|:------------|
| `down`| Occurs when a button goes from depressed to pressed (the moment of touch)|
| `up`| The button was released within a short time i.e. a short press has occurred|
| `release`| The button is released after being pressed for over the threshold time|
| `long` | Event is sent when the button is *still* being pressed after the threshold time of 400ms|
| `hold`| The HOLD event is repeated every 200ms while the button is still pressed|
| `changed` | Event is sent when the value of the object has changed during the event|
<!-- - `LOST`: This event occurs when the object looses the focus while the screen is still being touched -->

_Tip:_ To actively see the sent out events you can use an MQTT client app and subscribe to the `hasp/#` topic.

### Common Methods

These are the common methods shared among all objects,

| Method   | Parameters | Description |
|:---------|:----------:|:------------|
| `delete`   |            | Delete the object from the page
| `to_front` |            | Bring the object to the front on the page
| `to_back`  |            | Send the object to the back on the page

Example commands:

```json
p1b5.delete
p1b3.to_front
```
<H2>Object Types</H2>

Each object type is an ID that indicates which object type that line represents.
Besides the common properties listed above, each object type can have specific properties.

## Text Label
**obj:`label`**

![lv_label](assets/images/objects/lv_ex_label_1.png){: align=center }

| Property | Value      | Default    | Description
|----------|------------|------------|--------------
| text     | string     | "Text"     | The text of the label, `\n` for line break.
| mode     | string     | `crop`     | The wrapping mode of long text labels:<br>`expand` Expand the object size to the text size<br>`break` Keep the object width, break the too long lines and expand the object height<br>`dots` Keep the size and write dots at the end if the text is too long<br>`scroll` Keep the size and roll the text back and forth<br>`loop` Keep the size and roll the text circularly<br>`crop` Keep the size and crop the text out of it
| align    | 0..2       | 0       | Text alignment: `0` = left, `1` = center, `2` = right

Example `jsonl`:
```json
{"page":1,"id":1,"obj":"label","x":0,"y":50,"w":150,"h":50,"text":"\uE64A Hello world!"}
```

## Button
**obj:`btn`**

![lv_btn](assets/images/objects/lv_ex_btn_1.png)

| Property | Value      | Default | Description
|----------|------------|---------|--------------
| toggle   | [bool][2]  | false   | When enabled, creates a toggle-on/toggle-off button. If false, creates a normal button
| val      | int16      | 0       | The value: `0` = untoggled, `1` = toggled
| text     | string     | ""      | The text of the label
| mode     | string     | `expand`| The wrapping mode of long text labels.<br>`expand` Expand the object size to the text size<br>`break` Keep the object width, break the too long lines and expand the object height<br>`dots` Keep the size and write dots at the end if the text is too long<br>`scroll` Keep the size and roll the text back and forth<br>`loop` Keep the size and roll the text circularly<br>`crop` Keep the size and crop the text out of it
| align    | 0..2       | 0       | Text alignment: `0` = left, `1` = center, `2` = right


Example `jsonl`:
```json
{"page":1,"id":2,"obj":"btn","x":10,"y":40,"w":105,"h":90,"toggle":false,"text":"Normal Button","mode":"break","align":1}
{"page":1,"id":3,"obj":"btn","x":125,"y":40,"w":105,"h":90,"toggle":true,"text":"Toggle Button","mode":"break","align":1}
```

**Normal** buttons (`toggle=false`) send touch events while they occur: 

Short touch:
```json
{"event":"down"}
{"event":"up"}
```

Long press:
```json
{"event":"down"}
{"event":"long"}
{"event":"hold"}
{"event":"hold"}
{"event":"release"}
```

**Toggle** buttons (`toggle=true`) send out the old value in the `down` event and the new value in the `up` event when released:

Toggle ON:
```json
{"event":"down","val":0}
{"event":"up","val":1}
```

Toggle OFF:
```json
{"event":"down","val":1}
{"event":"up","val":0}
```


## Switch
**obj:`switch`**

![lv_switch](assets/images/objects/lv_ex_switch_1.png){: align=center }

| Property   | Value      | Default | Description
|------------|------------|---------|---------------
| val        | [bool][2]  | 0       | `1` = on, `0` = off
| bg_color1  | [color][1] | 0       | changes indicator color
| bg_color2  | [color][1] | 0       | changes knob color
| radius2    | int16      | depends<BR>on theme | changes knob corner radius (also see [radius](#common-properties))

Example `jsonl`:
```json
{"page":1,"id":4,"obj":"switch","x":125,"y":145,"w":105,"h":55,"radius":15}
```
Events generated by switch are similar to the ones generate by the _toggle_ buttons.


## Checkbox
**obj:`checkbox`**

![lv_checkbox](assets/images/objects/lv_ex_checkbox_1.png){: align=center }

| Property | Value      | Default    | Description
|----------|------------|------------|--------------
| val      | int16      | 0          | `1` = checked<br>`0` = unchecked
| text     | string     | "Checkbox" | The label of the checkbox

!!! note "<i class='fa fa-info-circle'></i>&nbsp; Note"
    The checkbox object ignores the `w` and `h` attribute. These are calculated
    based on the font and text.

Example `jsonl`:
```json
{"page":1,"id":5,"obj":"checkbox","x":10,"y":145,"w":105,"text":" Checkbox"}
```
Events generated by checkbox are similar to the ones generate by the _toggle_ buttons.

## Progress Bar
**obj:`bar`**

![lv_bar](assets/images/objects/lv_ex_bar_1.png){: align=center }

| Property | Value      | Default | Description
|----------|------------|---------|---------------
| min      | int16      | 0       | minimum value of the indicator
| max      | int16      | 100     | maximum value of the indicator
| val      | int16      | 0       | current value of the indicator

Vertical bars can be created if the width of the object is smaller than its height.

## Slider
**obj:`slider`**

![lv_slider](assets/images/objects/lv_ex_slider_1.png){: align=center }

| Property | Value      | Default | Description
|----------|------------|---------|---------------
| min      | int16      | 0       | minimum value of the indicator
| max      | int16      | 100     | maximum value of the indicator
| val      | int16      | 0       | current value of the indicator

Vertical sliders can be created if the width of the object is smaller than its height.

Example `jsonl`:
```json
{"page":1,"id":6,"obj":"slider","x":20,"y":250,"w":200,"h":20,"min":15,"max":35}
```
While pressing and dragging the `slider` object the following events are sent: `down` (old value), `changed` (repeatedly until released) and `up` (value at the moment of releasing it):

```json
{"event":"down","val":21}
{"event":"changed","val":22}
{"event":"changed","val":23}
{"event":"changed","val":25}
{"event":"changed","val":27}
{"event":"changed","val":29}
{"event":"up","val":31}
```
<!--
## Double Slider
**objid:30**

| Property | Value      | Default | Description
|----------|------------|---------|---------------
| min      | int16      | 0       | minimum value of the indicator
| max      | int16      | 100     | maximum value of the indicator
| val      | int16      | 0       | current value of the indicator
-->

## Arc
**obj:`arc`**

![lv_arc](assets/images/objects/lv_ex_arc_1.png){: align=center }

| Property  | Value      | Default | Description
|-----------|------------|---------|--------------
| min       | int16      | 0       | minimum value of the indicator
| max       | int16      | 100     | maximum value of the indicator
| val       | int16      | 0       | current value of the indicator
| rotation  | int16      | 0       | offset to the 0 degree position
| type      | 0-2        | 0       | `0` = normal, `1` = symmetrical, `2` = reverse
| adjustable| [bool][2]  | false   | Add knob that the user can operate to change the value
|start_angle| 0-360      |         | start angle of the arc background (see note)
| end_angle | 0-360      |         | end angle of the arc background (see note)
|start_angle1| 0-360     |         | start angle of the arc indicator (see note)
| end_angle1 | 0-360     |         | end angle of the arc indicator (see note)

!!! note
    Zero degree is at the middle right (3 o'clock) of the object and the degrees are increasing in a clockwise direction. The angles should be in the [0-360] range.

!!! note
    Check out [value styling](styling.md/#value) to display a textual value in the middle of the arc.

Example `jsonl`:
```json
{"page":1,"id":9,"obj":"arc","x":20,"y":75,"w":200,"h":200,"min":15,"max":35,"border_side":0,"type":0,"rotation":0,"start_angle":135,"end_angle":45,"start_angle1":135,"end_angle1":45,"adjustable":true}
```

While pressing and dragging the `arc` object the following events are sent: `down` (old value), `changed` (repeatedly until released) and `up` (value at the moment of releasing it):

```json
{"event":"down","val":21}
{"event":"changed","val":22}
{"event":"changed","val":23}
{"event":"changed","val":25}
{"event":"changed","val":27}
{"event":"changed","val":29}
{"event":"up","val":31}
```


## Dropdown List
**obj:`dropdown`**

![lv_dropdown](assets/images/objects/lv_ex_dropdown_1.png){: align=center }

| Property   | Value      | Default | Description
|------------|------------|---------|--------------------------
| options    | string     | ""      | List of items separated by `\n`
| val        | int16      | 0       | The number of the selected item
| text       | string     | ""      | *Read-only* The text of the selected item
| direction  | byte       | 0       | Direction where the dropdown expands:<BR> `0` = down, `1` = up, `2` = left, `3` = right <BR>_Note:_ up and down are superseeded by the screen size.
| show_selected | [bool][2] | true  | Show the selected option or a static text
| max_height | int16      | 3/4 of screen height | The maximum height of the open drop-down list 

| Method   | Parameters |  Description
|----------|----------|--------------------------
| open     |          | To manually open the drop-down list
| close    |          | To manually close the drop-down list

To change the currently selected item, use the `val` attribute.    
To change the items in the list, use the `options` attribute.

Example `jsonl`:
```json
{"page":1,"id":10,"obj":"dropdown","x":10,"y":205,"w":105,"h":30,"options":"Apple\nBanana\nOrange\nMelon"}
```

When the item is changed both `val` and `text` of the newly selected item are send out accompanied by the `change` event.

## Roller
**obj:`roller`**


<img alt="Roller demo" src="../../lv_ex_roller_1/canvas.png" class="img-tight">

<a href="http://haswitchplate.github.io/openHASP-docs/lv_ex_roller_1/index.html?w=320&h=240"   data-lightbox="iframe" data-toggle="lightbox"  data-gallery="example-gallery" data-title="Roller demo" >
Roller demo
</a>


| Property | Value      | Default | Description
|----------|------------|---------|--------------------------
| options  | string     | ""      | List of items separated by `\n`
| val      | int16      | 0       | The number of the selected item
| text     | string     | ""      | *Read-only* The text of the selected item
| rows     | int8       | 3       | The number of rows that are visible<BR>Use this property instead of `h` to set object height
| mode     | 0..1       | 0       | Roller mode: `0` = normal (finite), `1` = infinite
| align    | 0..2       | 1       | Text alignment: `0` = left, `1` = center, `2` = right

To change the currently selected item, use the `val` attribute.    
To change the items in the list, use the `options` attribute.

Example `jsonl`:
```json
{"page":1,"id":11,"obj":"roller","x":125,"y":205,"w":105,"h":30,"options":"Apple\nBanana\nOrange\nMelon","mode":1}
```

When the item is changed both `val` and `text` of the newly selected item are send out accompanied by the `change` event.

## Line Meter
**obj:`lmeter`**

![lv_lmeter](assets/images/objects/lv_ex_linemeter_1.png){: align=center }

| Property       | Value      | Default | Description
|----------------|------------|---------|---------------
| min            | int16      | 0       | minimum value of the indicator
| max            | int16      | 100     | maximum value of the indicator
| val            | int16      | 0       | current value of the indicator
| angle          | 0-360      | 240     | angle between start and end of the scale
| line_count     | uint16     | 31      | tick count of the scale
| rotation       | 0-360      | 0       | offset for the scale angles to rotate it
| type           | 0-1        | 0       | `0` = indicator lines are activated clock-wise<br>`1` = indicator lines are activated counter-clock-wise

Use [line](styling.md#line) and [scale](styling.md#scale) properties to customize.

Example `jsonl`:
```json
{"page":1,"id":12,"obj":"lmeter","x":20,"y":70,"w":200,"h":200,"value_str":"Temp","val":75,"line_count":35,"line_rounded":1}
```

## Gauge
**obj:`gauge`**

![lv_gauge](assets/images/objects/lv_ex_gauge_1.png){: align=center }

| Property       | Value      | Default | Description
|----------------|------------|---------|---------------
| min            | int16      | 0       | minimum value of the indicator
| max            | int16      | 100     | maximum value of the indicator
| val            | int16      | 0       | current value of the indicator
| critical_value | int16      | 80      | scale color will be changed to scale_end_color after this value
| angle          | 0-360      | 240     | angle between start and end of the scale
| label_count    | uint8      |         | number of labels (and major ticks) of the scale
| line_count     | uint16     | 31      | number of minor ticks of the entire scale
| rotation       | 0-360      | 0       | offset for the gauge's angles to rotate it
| format         | uint16     | 0       | divider for major tick values

To strip trailing zero's of major tick labels the `format` divider can be used to scale the values before printing:

- `0` : print the major tick value as is
- `1` : strip 1 zero, i.e. divide tick value by 10 before printing the major tick label
- `2` : strip 2 zeros, i.e. divide tick value by 100 before printing the major tick label
- `3` : strip 3 zeros, i.e. divide tick value by 1000 before printing the major tick label
- `4` : strip 4 zeros, i.e. divide tick value by 10000 before printing the major tick label

Only these values are allowed, arbitrary numbers are not supported.

Example `jsonl`:
```json
{"page":1,"id":13,"obj":"gauge","x":20,"y":70,"w":200,"h":200}
```
Use [scale](styling.md#scale) properties to customize.


## Color picker
**obj:`cpicker`**

![lv_cpicker](assets/images/objects/lv_ex_cpicker_1.png){: align=center }

| Property | Value      | Default | Description
|----------|------------|---------|--------------
| color    | [color][1] | 0       | The selected color in html format #rrggbb

The object will automatically adjust based on the `w` and `h` properties: when the object is longer then it is height a rectangular color picker is created, otherwise it will be circular.  
By long pressing the object, the color picker will change to setting the other parameters of the color (hue > saturation > value). 

#### Setting Color

Examples MQTT commands:
```text
hasp/plate/<nodename>/p0b2.color 13891
hasp/plate/<nodename>/p1b5.color silver
hasp/plate/<nodename>/p2b3.color #C0C0C0
```

#### Events

While pressing and dragging the `cpicker` object the following events are sent: `down` (old color), `changed` (repeatedly until released) and `up` (value at the moment of releasing it):

```json
{"event":"down","color":"#8300ff","r":131,"g":0,"b":255}
{"event":"changed","color":"#7300ff","r":115,"g":0,"b":255}
{"event":"changed","color":"#6200ff","r":98,"g":0,"b":255}
{"event":"up","color":"#6200ff","r":98,"g":0,"b":255}
```

## Spinner
**obj:`spinner`**

![lv_spinner](assets/images/objects/lv_ex_spinner_1.png){: align=center }

| Property  | Value      | Default | Description
|-----------|------------|---------|--------------
| speed     | int16      | 1000    | The time for 1 turn in ms
| direction | int16      | 100     | `0` = clockwise, `1` = counter-clockwise
| thickness | int16      | dep. on theme | The width of the arc line

## LED Indicator
**obj:`led`**

![lv_led](assets/images/objects/lv_ex_led_1.png){: align=center }

| Property   | Value      | Default | Description
|------------|------------|---------|---------------
| val        | byte       | 0       | The brightness of the indicator [`0..255`]

## Button Matrix
**obj:`btnmatrix`**

![lv_btnmatrix](assets/images/objects/lv_ex_btnmatrix_1.png){: align=center }

| Property | Value      | Default    | Description
|----------|------------|------------|--------------
| options  | json array | "Text"     | Json array of strings where each element is the label of a button. Use `"\n"` for a new line of buttons.
| align    | 0..2       | 1          | Text alignment: `0` = left, `1` = center, `2` = right
| toggle   | [bool][2]  | false      | All buttons behave as toggle buttons or normal buttons
| one_check| [bool][2]  | false      | Allow only one button to be checked (toggled) at once

The [styling properties](styling.md) apply to *all* buttons in the matrix.
To change the color of a single label you can prefix the text with a `#RRGGBB` hexadecimal color code and close with a single hash `#` tag.

Example `jsonl`:
```json
{"page":1,"id":20,"obj":"btnmatrix","x":10,"y":10,"w":220,"h":150,"options":["#FF0000 Red Text#","#0000FF Cyan Text#","\n","#FFFF00 Yellow Text#"],"toggle":1,"one_check":1}
```

## Base Object
**obj:`obj`**

![lv_base_object](assets/images/objects/lv_ex_base_object_1.png)

The Base Object can be directly used as a simple, empty widget. It is nothing more then a (rounded) rectangle.

You can use it as a background shape for other objects by putting its jsonl line before the object. It catches touches!

[1]: styling.md#colors
[2]: styling.md#boolean
[3]: configuration/gpio.md#groupid
[4]: styling.md#general
