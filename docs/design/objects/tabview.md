# Tabs

## Tabview
**obj:`tabview`**

![lv_tabview](images/lv_ex_tabview_1.png)

A tabview is an object that can hold multiple tab objects.
You first create the `tabview` object and then add `tab` objects to it.

| Property | Value        | Default | Description
|----------|--------------|---------|--------------------------
| val      | [int8][9]    | 0       | The number of the active tab, starting at 0
| text     | [string][10] | ""      | The name of the active tab
| btn_pos  | 0..4         | 1       | Position of the tab buttons:</br>`0` = none</br>`1` = top</br>`2` = bottom</br>`3` = left</br>`4` = right
| count    | [uint16][9]  | 0       | *Read-only* The number of tabs of the tabview

To change the currently visible tab, use the `val` attribute after all tabs have been added.   

!!! note
    To adjust the height of the tab buttons row, use `pad_top40` and `pad_bottom40` [styling][13] properties. Accepts also negative values.     
    To adjust the text size of the tab names, use the `text_font40` [styling][14] property.    

Read further down to learn now to add tabs to the tabview.


## Tab
**obj:`tab`**

| Property | Value        | Default | Description
|----------|--------------|---------|--------------------------
| parentid | [int8][9]    | 0       | The `id` of the tabview object to which this tab is added
| text     | [string][10] | "Tab"   | The name of tab button

Set the parent object (which `tabview` the tabs belong to) by referencing the `parentid` when creating the tab.
To add other objects to these tabs, set the `parentid` when creating those objects to the _id of the tab_ you want them to appear on.

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":14,"obj":"tabview","btn_pos":1,"y":180}
    {"page":1,"id":51,"obj":"tab","parentid":14,"text":"Tab 1"}
    {"page":1,"id":52,"obj":"tab","parentid":14,"text":"Tab 2"}
    {"page":1,"id":53,"obj":"tab","parentid":14,"text":"Tab 3"}
    {"page":1,"id":61,"obj":"switch","x":20,"y":10,"w":60,"h":30,"parentid":51,"radius":25,"radius20":25}
    {"page":1,"id":71,"obj":"dropdown","x":15,"y":10,"w":110,"h":30,"parentid":52,"options":"Apple\nBanana\nOrange\nMelon"}
    {"page":1,"id":81,"obj":"checkbox","x":15,"y":10,"w":110,"h":30,"parentid":53,"text":" Nice tabview"} 
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
