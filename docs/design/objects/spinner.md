# Spinner
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
