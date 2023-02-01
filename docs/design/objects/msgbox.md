
# Messagebox
**obj:`msgbox`**

![lv_msgbox](../images/lv_ex_msgbox_1.png)

| Property   | Value           | Default | Description
|------------|-----------------|---------|--------------------------
| text       | [string][10]    | ""      | The text of the message to be displayed.
| options    | [json array][11]| ["OK"]  | Json array of [string][10]s where each element is the label of a button
| ~~modal~~  | [bool][2]       | false   | Make the messagebox a modal dialog requiring user input
| auto_close | [int16][9]      | 0       | Close the pop-up message automatically after this number of milliseconds have passed

The Message boxes act as a pop-up. The default width is the horizontal screen size, the height adjusts according to the contents of the message.
The pop-up is centered on the screen.

!!! note
    The messagebox object is automatically deleted when it is closed. You will need to create it again using `jsonl` to pop-up a new message.

??? example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":24,"obj":"msgbox","text":"A message box with two buttons","options":["Apply","Close"]}
    ```
