# Line
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
