# Base Object
**obj:`obj`**

![lv_base_object](images/lv_ex_base_object_1.png)

The Base Object can be directly used as a simple, empty widget. It is nothing more then a (rounded) rectangle.

You can use it as a background shape for other objects by putting its jsonl line before the object. It catches touches!

???+ example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":50,"obj":"obj","x":5,"y":35,"w":230,"h":250,"click":0}
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
