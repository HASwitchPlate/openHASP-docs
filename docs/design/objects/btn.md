# Button
**obj:`btn`**

![lv_btn](images/lv_ex_btn_1.png)

| Property | Value      | Default | Description
|----------|------------|---------|--------------
| toggle   | [bool][2]  | false   | When enabled, creates a toggle-on/toggle-off button. If false, creates a normal button
| val      | [int16][9]      | 0       | The value: `0` = untoggled, `1` = toggled
| text     | [string][10]     | ""      | The text of the label
| mode     | [string][10]     | `expand`| The wrapping mode of long text labels.<br>`expand` Expand the object size to the text size<br>`break` Keep the object width, break the too long lines and expand the object height<br>`dots` Keep the size and write dots at the end if the text is too long<br>`scroll` Keep the size and roll the text back and forth<br>`loop` Keep the size and roll the text circularly<br>`crop` Keep the size and crop the text out of it
| align    | [string][10]       | `left`       | Text alignment: `left`, `center`, `right` 

## Examples

Similar to the text label, it's possible to set the color of characters in the text indvidually, just prefix the text to be re-colored with a `#RRGGBB` hexadecimal color code and a space, and close with a single hash `#` tag.

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":2,"obj":"btn","x":10,"y":40,"w":105,"h":90,"toggle":false,"text":"Normal Button","mode":"break","align":"center"}
    {"page":1,"id":3,"obj":"btn","x":125,"y":40,"w":105,"h":90,"toggle":true,"text":"#FFD700 Toggle# Button","mode":"break","align":"center"}
    ```

## Events

## Push Button

**Normal** buttons (`toggle=false`) send touch events while they occur: 

Short touch:
```json linenums="1"
{"event":"down"}
{"event":"up"}
```

Long press:
```json linenums="1"
{"event":"down"}
{"event":"long"}
{"event":"hold"}
{"event":"hold"}
{"event":"release"}
```

## Toggle Button

**Toggle** buttons (`toggle=true`) send out the old value in the `down` event and the new value in the `up` event when released:

Toggle ON:
```json linenums="1"
{"event":"down","val":0}
{"event":"up","val":1}
```

Toggle OFF:
```json linenums="1"
{"event":"down","val":1}
{"event":"up","val":0}
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
