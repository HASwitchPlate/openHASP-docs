# Dropdown List
**obj:`dropdown`**

![lv_dropdown](../images/lv_ex_dropdown_1.png)

| Property   | Value      | Default | Description
|------------|------------|---------|--------------------------
| options    | [string][10]     | ""      | List of items separated by `\n`
| val        | [int16][9]      | 0       | The number of the selected item
| text       | [string][10]     | ""      | *Read-only* The text of the selected item
| direction  | byte       | 0       | Direction where the dropdown expands:<BR> `0` = down, `1` = up, `2` = left, `3` = right <BR>_Note:_ up and down are superseeded by the screen size.
| show_selected | [bool][2] | true  | Show the selected option or a static text
| max_height | [int16][9]      | 3/4 of screen height | The maximum height of the open drop-down list 

| Method   | Parameters |  Description
|----------|----------|--------------------------
| open     |          | To manually open the drop-down list
| close    |          | To manually close the drop-down list

To change the currently selected item, use the `val` attribute.    
To change the items in the list, use the `options` attribute.

??? example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":10,"obj":"dropdown","x":10,"y":205,"w":105,"h":30,"options":"Apple\nBanana\nOrange\nMelon"}
    ```

When the item is changed both `val` and `text` of the newly selected item are send out accompanied by the `change` event.
