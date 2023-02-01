# Roller
**obj:`roller`**

![lv_dropdown](../images/lv_ex_roller_1.png)

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

??? example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":11,"obj":"roller","x":125,"y":205,"w":105,"h":30,"options":"Apple\nBanana\nOrange\nMelon","mode":1}
    ```

When the item is changed both `val` and `text` of the newly selected item are send out accompanied by the `change` event.
