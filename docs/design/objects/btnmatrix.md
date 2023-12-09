# Button Matrix
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
