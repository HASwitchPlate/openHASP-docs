# Line
**obj:`line`**

![lv_line](../images/lv_ex_line_1.png)

| Property | Value        | Default | Description
|----------|--------------|---------|--------------------------
| points   | [JSON array][11] | ""  | The name of the image file
| auto_size| [bool][2]    | true    | Automatically set the size of the line object to the outer bounds
| y_invert | [bool][2]    | false   | The y direction might be counter-intuitive in some cases so the y coordinates can be inverted

The points parameter is a JSON array of [x,y] coordinates, for example `[[10,25],[100,25],[100,0]]`.

??? example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":33,"obj":"line","points":[[10,25],[100,25],[100,0]],"auto_size":0,"y_invert":1}
    ```
