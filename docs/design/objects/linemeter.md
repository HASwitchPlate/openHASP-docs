# Line Meter
**obj:`linemeter`**

![lv_lmeter](images/lv_ex_linemeter_1.png)

| Property       | Value      | Default | Description
|----------------|------------|---------|---------------
| min            | [int16][9] | 0       | minimum value of the indicator
| max            | [int16][9] | 100     | maximum value of the indicator
| val            | [int16][9] | 0       | current value of the indicator
| angle          | 0-360      | 240     | angle between start and end of the scale
| line_count     | [uint16][9]| 31      | tick count of the scale
| rotation       | 0-360      | 0       | offset for the scale angles to rotate it
| type           | 0-1        | 0       | `0` = indicator lines are activated clock-wise<br>`1` = indicator lines are activated counter-clock-wise

Use [line][7] and [scale][8] properties to customize.

!!! note
    `min`, `max` and `val` also support negative values.
   
???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":12,"obj":"linemeter","x":20,"y":70,"w":200,"h":200,"value_str":"Temp","val":75,"line_count":35,"line_rounded":1}
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
