# Text Label
**obj:`label`**

![lv_label](images/lv_ex_label_1.png)

| Property | Value      | Default    | Description
|----------|------------|------------|--------------
| text     | [string][10]     | "Text"     | The text of the label, `\n` for line break. Can also be a [variable][15].
| mode     | [string][10]     | `crop`     | The wrapping mode of long text labels:<br>`expand` Expand the object size to the text size<br>`break` Keep the object width, break the too long lines and expand the object height<br>`dots` Keep the size and write dots at the end if the text is too long<br>`scroll` Keep the size and roll the text back and forth<br>`loop` Keep the size and roll the text circularly<br>`crop` Keep the size and crop the text out of it
| align    | [string][10]       | `left`       | Text alignment: `left`, `center`, `right` 

It's possible to set the color of characters in the text indvidually, just prefix the text to be re-colored with a `#RRGGBB` hexadecimal color code and a space, and close with a single hash `#` tag.

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":1,"obj":"label","x":10,"y":5,"w":150,"h":50,"text":"\uE64A Hello world!"}
    {"page":1,"id":1,"obj":"label","x":10,"y":5,"w":150,"h":50,"text":"#0000FF \uE64A# #FF0000 Hello# #008000 world#!"}
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
