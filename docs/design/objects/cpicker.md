# Color picker
**obj:`cpicker`**

![lv_cpicker](../images/lv_ex_cpicker_1.png)

| Property | Value      | Default | Description
|----------|------------|---------|--------------
| color    | [color][1] | 0       | The selected color in html format #rrggbb
| scale_width | [uint16][9]     | 25      | The width of the color gradient of the circle
| pad_inner | [int16][9]       | 10      | The padding between the circle and the inner preview circle

The object will automatically adjust based on the `w` and `h` properties: when the object is longer then it is height a rectangular color picker is created, otherwise it will be circular.

By long pressing the inner preview circle, the color picker will through the color modes: hue > saturation > value. Double-click on the inner preview circle to reset the current value.

#### Setting Color

Example MQTT commands:
```json linenums="1"
hasp/<nodename>/command/p0b2.color 13891
hasp/<nodename>/command/p1b5.color silver
hasp/<nodename>/command/p2b3.color #C0C0C0
```

#### Events

While pressing and dragging the `cpicker` object the following events are sent: `down` (old color), `changed` (repeatedly until released) and `up` (value at the moment of releasing it):

```json linenums="1"
{"event":"down","color":"#8300ff","r":131,"g":0,"b":255}
{"event":"changed","color":"#7300ff","r":115,"g":0,"b":255}
{"event":"changed","color":"#6200ff","r":98,"g":0,"b":255}
{"event":"up","color":"#6200ff","r":98,"g":0,"b":255}
```
