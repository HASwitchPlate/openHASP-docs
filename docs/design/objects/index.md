<style type="text/css">

.md-typeset__table {
   min-width: 100%;
}

table th:first-child{
  border-radius:5px 0 0 0;
}

table th:last-child{
  border-radius:0 5px 0 0;
}

tbody tr:nth-child(even) {
  background: #88888811;
}

.md-typeset table:not([class])
{
    display: table;
}

.md-typeset table:not([class]) td
{
 padding: 0.5em 1.25em;
  line-height: 1.25;
}


</style>

# Objects

There are two ways to create an object on the screen:

- Uploading a [`pages.jsonl`](../pages.md#pagesjsonl) file onto the internal flash
- Use the [`jsonl`](../../commands/global.md#jsonl) command *(via MQTT, serial or telnet console)*

## Cheatsheet

| obj       | Type     | Description                      | [Extra Parts][18]
|:----------|:---------|:---------------------------------|:-----------
| btn       | Binary   | [Button](#button)                |
| switch    | Toggle   | [Switch](#switch)                | indicator, knob
| checkbox  | Toggle   | [Checkbox](#checkbox)            | indicator
| label     | Visual   | [Label](#text-label)             |
| led       | Visual   | [LED](#led-indicator)            |
| spinner   | Visual   | [Spinner](#spinner)              | indicator
| obj       | Visual   | [Base Object](#base-object)      |
| line      | Visual   | [Line](#line)                    |
| img       | Visual   | [Image](#image)                  |
| cpicker   | Selector | [Color picker](#color-picker)    | knob
| roller    | Selector | [Roller](#roller)                | selected
| dropdown  | Selector | [Dropdown List](#dropdown-list)  | selected, items, scrollbar
| btnmatrix | Selector | [Button Matrix](#button-matrix)  | items
| msgbox    | Selector | [Messagebox](#messagebox)        | items, items_bg
| tabview   | Selector | [Tabview](#tabview)              | items, items_bg, indicator, selected
| tab       | Selector | [Tab](#tab)                      |
| bar       | Range    | [Progress Bar](#progress-bar)    | indicator
| slider    | Range    | [Slider](#slider)                | indicator, knob
| arc       | Range    | [Arc](#arc)                      | indicator, knob
| linemeter | Range    | [Line Meter](#line-meter)        |
| gauge     | Range    | [Gauge](#gauge)                  | indicator, ticks
| qrcode    | Visual   | [Qrcode](#qrcode)                |


## Common Parameters

### Common Properties

These are the common properties shared among all objects,
but only the `id` and `obj` properties are required to create an object:

| Property    | Value        | Default | Description
|:------------|:------------:|:-------:|:----
| id          | 1..254       | n/a     | _Required._ ID of the object on this page. `0` for the page itself.
| obj         | [string][10] | n/a     | _Required._ Name of the object type _(see below)_ 
| page        | 0..12        | n/a     | ID of the page the object appears on _(see below)_
| groupid     | 0..15        | 0 (none)| ID of the [GPIO group][3] the object belongs to
| x           | [int16][9]   | 0       | Horizontal position on the page
| y           | [int16][9]   | 0       | Vertical position on the page
| w           | [int16][9]   | 0       | Width of the object
| h           | [int16][9]   | 0       | Height of the object
| enabled     | [bool][2]    | true    | Object is touchable, if `false`, a _disabled_ style is applied
| hidden      | [bool][2]    | false   | Object is hidden
| opacity     | [uint8][9]   | 255     | How much the the object is opaque
| swipe :material-new-box:{ .tag-small }  | [JSONobject][11] | null    | Swipe gestures handled locally _(see below)_
| action :material-new-box:{ .tag-small } | [JSONobject][11] | null    | Touch command handled locally _(see below)_
| click       | [bool][2]    | true    | Object is touch/clickable _(also see `enabled`)_
| ext_click_h | [uint8][9]   | 0       | Extended horizontal clickable are on the left and right 
| ext_click_v | [uint8][9]   | 0       | Extended vertical clickable are on the top and bottom
| parentid    | [uint8][9]   | 0       | Set the object to be the child of another object.<br>`x` and `y` will be relative to the parent object. _Property inheritance can affect the appearance of the of the children (more info in [styling][12])_.
| tag         | [JSONobject][11] | n/a      | Arbitrary attribute data. Once set, it will be included in each event message. For advanced scenarios (more info in an [example][17]).
| jsonl       | [JSONobject][11] | n/a      | _Pseudo-property_ to set multiple properties of an existing object in one go with a JSON object.

!!! tip
    Further customizable properties can be found in [styling][12].

Ids start from 1 on _each page_.
You can have a maximum of 254 ids on each page. You don't have to use them in ascending order, you can for example use them for logical numbering (start labels from 11, 12, 13, buttons from 21, 22, 23 etc.)
   
#### Pages  
If the `page` parameter is not present, the object is placed on the same page as the _previous object_. If `page` is not specified for the first object either, the _current page_ being displayed is used.

`"page":0` indicates that the object is visible on **all** pages. It can be used for example to specify a static menu bar.
You can still hide the object on select pages if needed. Objects on page 0 appear on **top** of any objects on the underlying page.

#### Actions :material-new-box:{ .tag-small }
Action commands are supported only by _binary_ or _visual_ type of objects and they are performed locally on the plate. Actions can be of most any [command](../../commands/global.md):

`action` has the format of `"action": {"<btn event>": "<command>"}`

***btn events:** are found in [events](#events). examples are `up`, `down` etc.

Check out the [example](../../examples/pagination.md) for how to implement actions.  
You can change the target pages using `prev`, `back` and `next` [page attributes](../pages.md#page-attributes) operation on the page object `pXb0`.  

#### Swipe <a name="swipe"></a>
Objects and page area (`pXb0`) support  the`swipe` property. Enabling this will process `left`, `right`, `up` and/or `down` swipes on the object. The start of the swipe needs to be on the element which has this property enabled for the feature to activate.

- The default is `"swipe":null` or swipe gestures disabled.
- To enable the default swipe gestures use `"swipe":1`. This will change the page to `next`, `prev` and `back` on `left`, `right` and `down` swipes, respectively. It is a shorthand for `"swipe":{"down":"page back","left":"page next","right":"page prev"}`.
- You can customize the gesture to execure different commands if needed.

!!! Note
    Page id `p0b0` is not valid to set this property as it has to be set on real elements. 

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

!!! tip
    To actively see the sent out events you can use an MQTT client app and subscribe to the `hasp/#` topic.

### Common Methods

These are the common methods shared among all objects,

| Method     | Parameters | Description |
|:-----------|:----------:|:------------|
| `clear`    |            | Delete the children from the object
| `delete`   |            | Delete the object and its children from the page
| `to_front` |            | Bring the object to the front on the page
| `to_back`  |            | Send the object to the back on the page

Example commands:

```json linenums="1"
p1b5.delete
p1b3.to_front
```
## Object Types

Each object type is an ID that indicates which object type that line represents.
Besides the common properties listed above, each object type can have specific properties.

## Text Label
**obj:`label`**

![lv_label](images/lv_ex_label_1.png)

| Property | Value      | Default    | Description
|----------|------------|------------|--------------
| text     | [string][10]     | "Text"     | The text of the label, `\n` for line break. Can also be a [variable][15].
| mode     | [string][10]     | `crop`     | The wrapping mode of long text labels:<br>`expand` Expand the object size to the text size<br>`break` Keep the object width, break the too long lines and expand the object height<br>`dots` Keep the size and write dots at the end if the text is too long<br>`scroll` Keep the size and roll the text back and forth<br>`loop` Keep the size and roll the text circularly<br>`crop` Keep the size and crop the text out of it
| align    | [string][10]       | `left`       | Text alignment: `left`, `center`, `right` 

It's possible to set the color of characters in the text indvidually, just prefix the text to be re-colored with a `#RRGGBB` hexadecimal color code and a space, and close with a single hash `#` tag.

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":1,"obj":"label","x":10,"y":5,"w":150,"h":50,"text":"\uE64A Hello world!"}
    {"page":1,"id":1,"obj":"label","x":10,"y":5,"w":150,"h":50,"text":"#0000FF \uE64A# #FF0000 Hello# #008000 world#!"}
    ```

## Button
**obj:`btn`**

![lv_btn]./images/lv_ex_btn_1.png)

| Property | Value      | Default | Description
|----------|------------|---------|--------------
| toggle   | [bool][2]  | false   | When enabled, creates a toggle-on/toggle-off button. If false, creates a normal button
| val      | [int16][9]      | 0       | The value: `0` = untoggled, `1` = toggled
| text     | [string][10]     | ""      | The text of the label
| mode     | [string][10]     | `expand`| The wrapping mode of long text labels.<br>`expand` Expand the object size to the text size<br>`break` Keep the object width, break the too long lines and expand the object height<br>`dots` Keep the size and write dots at the end if the text is too long<br>`scroll` Keep the size and roll the text back and forth<br>`loop` Keep the size and roll the text circularly<br>`crop` Keep the size and crop the text out of it
| align    | [string][10]       | `left`       | Text alignment: `left`, `center`, `right` 

Similar to the text label, it's possible to set the color of characters in the text indvidually, just prefix the text to be re-colored with a `#RRGGBB` hexadecimal color code and a space, and close with a single hash `#` tag.

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":2,"obj":"btn","x":10,"y":40,"w":105,"h":90,"toggle":false,"text":"Normal Button","mode":"break","align":"center"}
    {"page":1,"id":3,"obj":"btn","x":125,"y":40,"w":105,"h":90,"toggle":true,"text":"#FFD700 Toggle# Button","mode":"break","align":"center"}
    ```

**Normal** buttons (`toggle=false`) send touch events while they occur: 

Short touch:
```json linenums="1"
{"event":"down"}
{"event":"up"}
```

Long press:
```json linenums="1"
{"event":"down"}
{"event":"long"}
{"event":"hold"}
{"event":"hold"}
{"event":"release"}
```

**Toggle** buttons (`toggle=true`) send out the old value in the `down` event and the new value in the `up` event when released:

Toggle ON:
```json linenums="1"
{"event":"down","val":0}
{"event":"up","val":1}
```

Toggle OFF:
```json linenums="1"
{"event":"down","val":1}
{"event":"up","val":0}
```


## Switch
**obj:`switch`**

![lv_switch](images/lv_ex_switch_1.png)

| Property   | Value      | Default | Description
|------------|------------|---------|---------------
| val        | [bool][2]  | 0       | `1` = on, `0` = off
| bg_color10 | [color][1] | 0       | changes indicator color
| bg_color20 | [color][1] | 0       | changes knob color
| radius20   | [int16][9]      | depends<BR>on theme | changes knob corner radius (also see [radius](#common-properties))

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":4,"obj":"switch","x":125,"y":145,"w":105,"h":55,"radius":15}
    ```
Events generated by switch are similar to the ones generate by the _toggle_ buttons.


## Checkbox
**obj:`checkbox`**

![lv_checkbox](images/lv_ex_checkbox_1.png)

| Property | Value      | Default    | Description
|----------|------------|------------|--------------
| val      | [int16][9]      | 0          | `1` = checked<br>`0` = unchecked
| text     | [string][10]     | "Checkbox" | The label of the checkbox

!!! note
    The checkbox object ignores the `w` and `h` attribute. These are calculated
    based on the font and text.

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":5,"obj":"checkbox","x":10,"y":145,"w":105,"text":" Checkbox"}
    ```
Events generated by checkbox are similar to the ones generate by the _toggle_ buttons.


## Progress Bar
**obj:`bar`**

![lv_bar](images/lv_ex_bar_1.png)

| Property | Value      | Default | Description
|----------|------------|---------|---------------
| min      | [int16][9]      | 0       | minimum value of the indicator
| max      | [int16][9]      | 100     | maximum value of the indicator
| val      | [int16][9]      | 0       | current value of the indicator
| start_value | [int16][9]   | 0       | optional minimal allowed value of the indicator

Vertical bars can be created if the width of the object is smaller than its height.

!!! note
    `min`, `max`, `val` and `start_value` also support negative values.


## Slider
**obj:`slider`**

![lv_slider](images/lv_ex_slider_1.png)

| Property | Value      | Default | Description
|----------|------------|---------|---------------
| min      | [int16][9]      | 0       | minimum value of the indicator
| max      | [int16][9]      | 100     | maximum value of the indicator
| val      | [int16][9]      | 0       | current value of the indicator
| start_value | [int16][9]   | 0       | optional minimal allowed value of the indicator

Vertical sliders can be created if the width of the object is smaller than its height.

!!! note
    `min`, `max`, `val` and `start_value` also support negative values.
   
???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":6,"obj":"slider","x":20,"y":250,"w":200,"h":20,"min":15,"max":35}
    ```
While pressing and dragging the `slider` object the following events are sent: `down` (old value), `changed` (repeatedly until released) and `up` (value at the moment of releasing it):

```json linenums="1"
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
| min      | [int16][9]      | 0       | minimum value of the indicator
| max      | [int16][9]      | 100     | maximum value of the indicator
| val      | [int16][9]      | 0       | current value of the indicator
-->

## Arc
**obj:`arc`**

![lv_arc](images/lv_ex_arc_1.png)

| Property    | Value      | Default | Description
|-------------|------------|---------|--------------
| min         | [int16][9] | 0       | minimum value of the indicator
| max         | [int16][9] | 100     | maximum value of the indicator
| val         | [int16][9] | 0       | current value of the indicator
| rotation    | [int16][9] | 0       | offset to the 0 degree position
| type        | 0-2        | 0       | `0` = normal, `1` = symmetrical, `2` = reverse
| adjustable  | [bool][2]  | false   | Add knob that the user can operate to change the value
| start_angle | 0-360      |         | start angle of the arc background (see note)
| end_angle   | 0-360      |         | end angle of the arc background (see note)
|start_angle10| 0-360      |         | start angle of the arc indicator (see note)
| end_angle10 | 0-360      |         | end angle of the arc indicator (see note)


!!! note
    Zero degree is at the middle right (3 o'clock) of the object and the degrees are increasing in a clockwise direction. The angles should be in the [0-360] range.     
    `min`, `max` and `val` also support negative values.

!!! tip
    To adjust the size of the knob, use `pad_top20`, `pad_bottom20`, `pad_left20`, `pad_right20` [styling][13] properties. If you increase the knob beyond the margins of the object, you also need to increase `pad_top`, `pad_bottom`, `pad_left`, `pad_right` for the arc itself.    
    Check out [value styling][6] to display a textual value in the middle of the arc.     

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":9,"obj":"arc","x":20,"y":75,"w":200,"h":200,"min":15,"max":35,"border_side":0,"type":0,"rotation":0,"start_angle":135,"end_angle":45,"start_angle10":135,"end_angle10":45,"adjustable":true}
    ```

While pressing and dragging the `arc` object the following events are sent: `down` (old value), `changed` (repeatedly until released) and `up` (value at the moment of releasing it):

```json linenums="1"
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

![lv_dropdown](images/lv_ex_dropdown_1.png)

| Property   | Value      | Default | Description
|------------|------------|---------|--------------------------
| options    | [string][10]     | ""      | List of items separated by `\n`
| val        | [int16][9]      | 0       | The number of the selected item
| text       | [string][10]     | ""      | *Read-only* The text of the selected item
| direction  | byte       | 0       | Direction where the dropdown expands:<BR> `0` = down, `1` = up, `2` = left, `3` = right <BR>_Note:_ up and down are superseeded by the screen size.
| show_selected | [bool][2] | true  | Show the selected option or a static text
| max_height | [int16][9]      | 3/4 of screen height | The maximum height of the open drop-down list 

| Method   | Parameters |  Description
|----------|----------|--------------------------
| open     |          | To manually open the drop-down list
| close    |          | To manually close the drop-down list

To change the currently selected item, use the `val` attribute.    
To change the items in the list, use the `options` attribute.

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":10,"obj":"dropdown","x":10,"y":205,"w":105,"h":30,"options":"Apple\nBanana\nOrange\nMelon"}
    ```

When the item is changed both `val` and `text` of the newly selected item are send out accompanied by the `change` event.

## Roller
**obj:`roller`**

![lv_dropdown](images/lv_ex_roller_1.png)

| Property | Value      | Default | Description
|----------|------------|---------|--------------------------
| options  | [string][10]     | ""      | List of items separated by `\n`
| val      | [int16][9]      | 0       | The number of the selected item
| text     | [string][10]     | ""      | *Read-only* The text of the selected item
| rows     | [int8][9]       | 3       | The number of rows that are visible<BR>Use this property instead of `h` to set object height
| mode     | 0..1       | 0       | Roller mode: `0` = normal (finite), `1` = infinite
| align    | [string][10]       | `center`       | Text alignment: `left`, `center`, `right` 

To change the currently selected item, use the `val` attribute.    
To change the items in the list, use the `options` attribute.

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":11,"obj":"roller","x":125,"y":205,"w":105,"h":30,"options":"Apple\nBanana\nOrange\nMelon","mode":1}
    ```

When the item is changed both `val` and `text` of the newly selected item are send out accompanied by the `change` event.

## Line Meter
**obj:`linemeter`**

![lv_lmeter](images/lv_ex_linemeter_1.png)

| Property       | Value      | Default | Description
|----------------|------------|---------|---------------
| min            | [int16][9]      | 0       | minimum value of the indicator
| max            | [int16][9]      | 100     | maximum value of the indicator
| val            | [int16][9]      | 0       | current value of the indicator
| angle          | 0-360      | 240     | angle between start and end of the scale
| line_count     | [uint16][9]     | 31      | tick count of the scale
| rotation       | 0-360      | 0       | offset for the scale angles to rotate it
| type           | 0-1        | 0       | `0` = indicator lines are activated clock-wise<br>`1` = indicator lines are activated counter-clock-wise

Use [line][7] and [scale][8] properties to customize.

!!! note
    `min`, `max` and `val` also support negative values.
   
???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":12,"obj":"linemeter","x":20,"y":70,"w":200,"h":200,"value_str":"Temp","val":75,"line_count":35,"line_rounded":1}
    ```

## Gauge
**obj:`gauge`**

![lv_gauge](images/lv_ex_gauge_1.png)

| Property       | Value      | Default | Description
|----------------|------------|---------|---------------
| min            | [int16][9]      | 0       | minimum value of the indicator
| max            | [int16][9]      | 100     | maximum value of the indicator
| val            | [int16][9]      | 0       | current value of the indicator
| critical_value | [int16][9]      | 80      | scale color will be changed to scale_end_color after this value
| label_count    | [uint8][9]      |         | number of labels (and major ticks) of the scale
| line_count     | [uint16][9]     | 31      | number of minor ticks of the entire scale
| angle          | 0-360      | 240     | angle between start and end of the scale
| rotation       | 0-360      | 0       | offset for the gauge's angles to rotate it
| format         | [uint16][9]     | 0       | divider for major tick values

To strip trailing zero's of major tick labels the `format` divider can be used to scale the values before printing:

- `0` : print the major tick value as is
- `1` : strip 1 zero, i.e. divide tick value by 10 before printing the major tick label
- `2` : strip 2 zeros, i.e. divide tick value by 100 before printing the major tick label
- `3` : strip 3 zeros, i.e. divide tick value by 1000 before printing the major tick label
- `4` : strip 4 zeros, i.e. divide tick value by 10000 before printing the major tick label

Only these values are allowed, arbitrary numbers are not supported.

!!! note
    `min`, `max` and `val` also support negative values.
   
???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":13,"obj":"gauge","x":20,"y":70,"w":200,"h":200}
    ```

Use [scale][8] properties to customize.


## Tabview
**obj:`tabview`**

![lv_tabview](images/lv_ex_tabview_1.png)

A tabview is an object that can hold multiple tab objects.
You first create the `tabview` object and then add `tab` objects to it.

| Property | Value        | Default | Description
|----------|--------------|---------|--------------------------
| val      | [int8][9]    | 0       | The number of the active tab, starting at 0
| text     | [string][10] | ""      | The name of the active tab
| btn_pos  | 0..4         | 1       | Position of the tab buttons:</br>`0` = none</br>`1` = top</br>`2` = bottom</br>`3` = left</br>`4` = right
| count    | [uint16][9]  | 0       | *Read-only* The number of tabs of the tabview

To change the currently visible tab, use the `val` attribute after all tabs have been added.   

!!! note
    To adjust the height of the tab buttons row, use `pad_top40` and `pad_bottom40` [styling][13] properties. Accepts also negative values.     
    To adjust the text size of the tab names, use the `text_font40` [styling][14] property.    

Read further down to learn now to add tabs to the tabview.


## Tab
**obj:`tab`**

| Property | Value        | Default | Description
|----------|--------------|---------|--------------------------
| parentid | [int8][9]    | 0       | The `id` of the tabview object to which this tab is added
| text     | [string][10] | "Tab"   | The name of tab button

Set the parent object (which `tabview` the tabs belong to) by referencing the `parentid` when creating the tab.
To add other objects to these tabs, set the `parentid` when creating those objects to the _id of the tab_ you want them to appear on.

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":14,"obj":"tabview","btn_pos":1,"y":180}
    {"page":1,"id":51,"obj":"tab","parentid":14,"text":"Tab 1"}
    {"page":1,"id":52,"obj":"tab","parentid":14,"text":"Tab 2"}
    {"page":1,"id":53,"obj":"tab","parentid":14,"text":"Tab 3"}
    {"page":1,"id":61,"obj":"switch","x":20,"y":10,"w":60,"h":30,"parentid":51,"radius":25,"radius20":25}
    {"page":1,"id":71,"obj":"dropdown","x":15,"y":10,"w":110,"h":30,"parentid":52,"options":"Apple\nBanana\nOrange\nMelon"}
    {"page":1,"id":81,"obj":"checkbox","x":15,"y":10,"w":110,"h":30,"parentid":53,"text":" Nice tabview"} 
    ```


## Color picker
**obj:`cpicker`**

![lv_cpicker](images/lv_ex_cpicker_1.png)

| Property    | Value        | Default | Description
|-------------|--------------|---------|--------------
| color       | [color][1]   | 0       | The selected color in html format #rrggbb
| scale_width | [uint16][9]  | 25      | The width of the color gradient of the circle
| pad_inner   | [int16][9]   | 10      | The padding between the circle and the inner preview circle
| mode        | [string][10] | "hue"   | The aspect of the color being edited: `"hue"`, `"saturation"`, or `"value"`
| mode_fixed  | [bool][2]    | false   | Disables long press behavior to cycle color modes

The object will automatically adjust based on the `w` and `h` properties: when the object is longer then it is height a rectangular color picker is created, otherwise it will be circular.

Long pressing the inner preview circle, if `mode_fixed` is `false`, will cause color picker to cycle through the color modes: hue > saturation > value. Double-click on the inner preview circle to reset the current value.

#### Setting Color

Example MQTT commands:
```json linenums="1"
hasp/<nodename>/command/p0b2.color 13891
hasp/<nodename>/command/p1b5.color silver
hasp/<nodename>/command/p2b3.color #C0C0C0
hasp/<nodename>/command/p2b3.mode saturation
```

#### Events

While pressing and dragging the `cpicker` object the following events are sent: `down` (old color), `changed` (repeatedly until released) and `up` (value at the moment of releasing it):

```json linenums="1"
{"event":"down","color":"#8300ff","r":131,"g":0,"b":255,"h":271,"s":100,"v":100}
{"event":"changed","color":"#7300ff","r":115,"g":0,"b":255,"h":267,"s":100,"v":100}
{"event":"changed","color":"#6200ff","r":98,"g":0,"b":255,"h":263,"s":100,"v":100}
{"event":"up","color":"#6200ff","r":98,"g":0,"b":255,"h":263,"s":100,"v":100}
```

## Spinner
**obj:`spinner`**

![lv_spinner](images/lv_ex_spinner_1.png)

| Property     | Value      | Default | Description
|--------------|------------|---------|--------------
| speed        | [int16][9] | 1000    | The time for 1 turn in ms
| direction    | [int16][9] | 0       | `0` = clockwise, `1` = counter-clockwise
| angle        | 0-360      | 60      | The length of the spinning segment in degrees
| type         | 0-2        | 0       | `0` = slow down on the top, `1` = slow down and stretch, `2` = constant speed no stretch
| line_width   | [int16][9] | 20    | The width of the background circle
| line_width10 | [int16][9] | 20    | The width of the spinning segment
| line_color   | [color][1] | depends<BR>on theme | color of the background circle
| line_color10 | [color][1] | depends<BR>on theme | color of the spinning segment

!!! tip
    Check out background, border, and line [styling][12] to adjust other aspects of the appearance.

!!! note
    Placing objects over/under the spinner will increase the CPU load because all objects need to be redrawn constantly.

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":15,"obj":"spinner","x":180,"y":50,"w":36,"h":36,"bg_opa":0,"border_width":0,"line_width":6,"line_width10":6,"angle":80,"line_color":"white","line_color10":"green"}
    ```

## LED Indicator
**obj:`led`**

![lv_led](images/lv_ex_led_1.png)

| Property   | Value      | Default | Description
|------------|------------|---------|---------------
| val        | byte       | 0       | The brightness of the indicator [`0..255`]


## Button Matrix
**obj:`btnmatrix`**

![lv_btnmatrix](images/lv_ex_btnmatrix_1.png)

| Property | Value            | Default  | Description
|----------|------------------|----------|--------------
| options  | [json array][11] | "Text"   | Json array of [strings][10] where each element is the label of a button. Use `"\n"` for a new line of buttons
| align    | [string][10]     | `center` | Text alignment: `left`, `center`, `right` 
| toggle   | [bool][2]        | false    | All buttons behave as toggle buttons or normal buttons
| one_check| [bool][2]        | false    | Allow only one button to be checked (toggled) at once
| val      | [int8][9]        | 0        | The number of the active button, starting at 0. In conjunction with `toggle` and `one_check` set it to `-1` to deactivate all buttons

The [styling properties][12] apply to *all* buttons in the matrix.
To change the color of a single label you can prefix the text with a `#RRGGBB` hexadecimal color code and close with a single hash `#` tag.

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":20,"obj":"btnmatrix","x":10,"y":10,"w":220,"h":150,"options":["#FF0000 Red Text#","#0000FF Cyan Text#","\n","#FFFF00 Yellow Text#"],"toggle":1,"one_check":1}
    ```


## Messagebox
**obj:`msgbox`**

![lv_msgbox](images/lv_ex_msgbox_1.png)

| Property   | Value           | Default | Description
|------------|-----------------|---------|--------------------------
| text       | [string][10]    | ""      | The text of the message to be displayed.
| options    | [json array][11]| ["OK"]  | Json array of [string][10]s where each element is the label of a button
| ~~modal~~  | [bool][2]       | false   | Make the messagebox a modal dialog requiring user input
| auto_close | [int16][9]      | 0       | Close the pop-up message automatically after this number of milliseconds have passed

The Message boxes act as a pop-up. The default width is the horizontal screen size, the height adjusts according to the contents of the message.
The pop-up is centered on the screen.

!!! note
    The messagebox object is automatically deleted when it is closed. You will need to create it again using `jsonl` to pop-up a new message.

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":24,"obj":"msgbox","text":"A message box with two buttons","options":["Apply","Close"]}
    ```


## Line
**obj:`line`**

![lv_line](images/lv_ex_line_1.png)

| Property | Value        | Default | Description
|----------|--------------|---------|--------------------------
| points   | [JSON array][11] | ""  | The name of the image file
| auto_size| [bool][2]    | true    | Automatically set the size of the line object to the outer bounds
| y_invert | [bool][2]    | false   | The y direction might be counter-intuitive in some cases so the y coordinates can be inverted

The points parameter is a JSON array of [x,y] coordinates, for example `[[10,25],[100,25],[100,0]]`.

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":33,"obj":"line","points":[[10,25],[100,25],[100,0]],"auto_size":0,"y_invert":1}
    ```


## Image
**obj:`img`**

![lv_img](images/lv_ex_img_1.png)

| Property | Value        | Default | Description
|----------|--------------|---------|--------------------------
| src      | [string][10] | ""      | The name of the image file
| auto_size| [bool][2]    | true    | Automatically set the size of the image object to the image source
| offset_x | [int16][9]   | 0       | Shift the picture horizontally relative to the image object
| offset_y | [int16][9]   | 0       | Shift the picture vertically relative to the image object
| zoom     | [uint16][9]  | 256     | A larger value enlarges the images (e.g. `512` double size), a smaller value shrinks it (e.g. `128` half size). Fractional scale works as well. E.g. `281` for `10%` enlargement.
| angle    | [int16][9]   | 0       | Rotate the picture around its pivot point. Angle has `0.1` degree precision, so for `45.8°` use `458`.
| pivot_x  | [int16][9]   | H center| The pivot point of the rotation, by default centered
| pivot_y  | [int16][9]   | V center| The pivot point of the rotation, by default centered
| antialias| [bool][2]    | false   | The quality of the angle and zoom transformation. With enabled anti-aliasing the transformations has a higher quality but they are slower.

!!! note
    You can use `image_recolor` and `image_recolor_opa` from the [image styling][5] properties to apply a color overlay mask.

Either PNG or BIN image files are supported, from flash:

- PNG image are decoded and kept in memory, thus you'll be able to display full-screen images only if your microcontroller [has installed PSram memory](../../firmware/index.md#recommended-boards),
  else you will be limited to small icons or `BIN` files.

- BIN images are *not* stored in memory and are read from flash each time. This will be slower but allows the use of larger images even if your microcontroller doesn't have PSram.   

- BIN images from flash do not support `zoom` or `angle` transformations.

- Use the online [LVGL Image Converter][16]{target=_blank} to create BIN files. Set the output format to *Binary* or *Binary RGB565*.


???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":34,"obj":"img","src":"L:/image.png","auto_size":0,"w":50}
    ```

# QR-Code
**obj:`qrcode`**

![lv_qrcode](images/lv_ex_qrcode_1.png)

| Property | Value        | Default | Description
|----------|--------------|---------|--------------------------
| text     | [string][10] | ""      | The text to encode to QR code
| size     | [int16][9]   | 140     | The object is always a square with a width and a height that correspond to size.


???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":42,"obj":"qrcode","text":"www.openhasp.com/0.7.0/design/objects/","x":520,"y":20,"size":200}
    ```

!!! note :
    The maximum text length depends on the QR code version. By default, the maximum version 7 is used, which corresponds to a maximum text length of 122 characters.

## Base Object
**obj:`obj`**

![lv_base_object](images/lv_ex_base_object_1.png)

The Base Object can be directly used as a simple, empty widget. It is nothing more then a (rounded) rectangle.

You can use it as a background shape for other objects by putting its jsonl line before the object. It catches touches!

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":50,"obj":"obj","x":5,"y":35,"w":230,"h":250,"click":0}
    ```
   
[1]: ../data-types.md#colors
[2]: ../data-types.md#boolean
[3]: ../../firmware/configuration/gpio.md#groupid
[4]: ../styling.md#general
[5]: ../styling.md#image
[6]: ../styling.md#value
[7]: ../styling.md#line
[8]: ../styling.md#scale
[9]: ../data-types.md#integer
[10]: ../data-types.md#string
[11]: ../data-types.md#json-object
[12]: ../styling.md
[13]: ../styling.md#padding-and-margin
[14]: ../styling.md#text
[15]: ../data-types.md#variables
[16]: https://lvgl.io/tools/imageconverter
[17]: ../../integrations/home-assistant/sampl_conf.md#using-tags
[18]: ../styling.md#parts
