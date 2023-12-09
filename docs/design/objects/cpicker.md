# Color picker
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
