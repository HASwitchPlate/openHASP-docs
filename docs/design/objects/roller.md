# Roller
**obj:`roller`**

![lv_dropdown](./images/lv_ex_roller_1.png)

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
