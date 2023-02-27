# Arc
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
   
[1]: ../../data-types/#colors
[2]: ../../data-types/#boolean
[3]: ../../../configuration/gpio/#groupid
[4]: ../../styling/#general
[5]: ../../styling/#image
[6]: ../../styling/#value
[7]: ../../styling/#line
[8]: ../../styling/#scale
[9]: ../../data-types/#integer
[10]: ../../data-types/#string
[11]: ../../data-types/#json-object
[12]: ../../styling/
[13]: ../../styling/#padding-and-margin
[14]: ../../styling/#text
[15]: ../../data-types/#variables
[16]: https://lvgl.io/tools/imageconverter
[17]: ../../../integrations/home-assistant/sampl_conf/#using-tags
[18]: ../../styling/#parts
