
# Styling Properties

You can adjust the appearance of objects by changing the foreground, background and/or border color of each object.
Some objects allow for more complex styling, effectively changing the appearance of their sub-components.     

## Suffixes

The styling properties below support an optional two-digit suffix to indicate which **part** and/or **state** of the object the property applies to.
A styling property without suffix will be applied to the **default state** of the **main part** of the object *(i.e. the background)*.

Very detailed styling can be applied to each part depending on the state of the object:

### Parts

All objects have at least a main part.
Several objects are made up of additional parts which can each be styled separately.
To access the properties of the parts use a two-digit suffix appended to the styling properties below.

The part indexes are:

- 00 = main part of the object *(i.e. the background)*
- 10 = the indicator or needle, highlighting the the current value
- 20 = the knob which can be used the change the value
- 30 = the background of the items/buttons
- 40 = the items/buttons
- 50 = the selected item
- 60 = major ticks of the gauge object
- 70 = the text cursor
- 80 = the scrollbar
- 90 = other special part, not listed above

!!! tip  
    For example the _gauge_ object uses `line_width` to set the minor ticks thickness, `line_width60` for major ticks and `line_width10` for the thickness of the needle.
    

### States

The state indexes:

- 00 = default styling
- 01 = styling for toggled state
- 02 = styling for pressed, not toggled state
- 03 = styling for pressed and toggled state
- 04 = styling for disabled not toggled state
- 05 = styling for disabled and toggled state

For example to set the `radius` of all the buttons in _btnmatrix_ you'd set a value for the property `radius30`. Using `radius` without a suffix will apply the property to the outline background of it.

A `toggle` `btn` can be made to show `text` `yellow` when toggled ON with `"text_color":"white","text_color01":"yellow"`
    

### Inheritance

If objects are children of other objects (they have the [parentid][7] property set), property inheritance takes place. 

Some properties (typically that are related to text and opacity) can be inherited from the parent object's styles. Inheritance is applied only if the given property is not set in the initial jsonl of the child object (at first draw). In this case, if the property is inheritable, the property's value will be searched in the parents too until an object specifies a value for the property. The parents will use their own state to detemine the value. So for example if a button is pressed, and the text color comes from here, the pressed text color will be used. ([source][8]{target=_blank}) Inheritance takes place at run time too.     

When a parent object is deleted, all children will be deleted too.

## General

General styling options.

| Property     | Value      | Default | Description
|:-------------|:----------:|:-------:|:-----------
| radius       | [uint16][3]| depends<BR>on theme | The radius of the rounded corners of the object:<BR>0 = no radius i.e. square corners<BR>65535 = pill shaped object (true circle if object has same width and height)
| clip_corner  | [bool][2] | false   | Enable to clip off the overflowed content on the rounded (`radius > 0`) corners of the object


## Background

The color and gradient used for drawing the background of an object.

| Property       |   Type   | Description
| :---           |   :---:  | :---
| bg_opa         | [uint8][3]     | The background opacity level
| bg_color       |[color][1]| The background color
| bg_grad_color  |[color][1]| The background gradient color
| bg_grad_dir    | [0..2]   | 0 = none *(=default)*<br>1 = horizontal<br>2 = vertical
| bg_grad_stop   | [uint8][3]     | Specifies where the gradient should stop.<br>0 = at left/top most position<br>128 = in the center<br>255 = at right/bottom most position *(=default)*
| bg_main_stop   | [uint8][3]     | Specifies where should the gradient start<br>0 = at left/top most position *(=default)*<br>128 = in the center<br>255 = at right/bottom most position

To adjust the background style of a page use `pXb0` where `X` is the page number.

## Border

The border is drawn on top of the background. It has radius rounding.

| Property     |  Type    | Description
| :---         |  :---:   | :---
| border_color |[color][1]| Specifies the color of the border
| border_opa   | [uint8][3]     | Specifies opacity of the border
| border_width | [uint8][3]     | Set the width of the border
| border_side  | [uint8][3]     | Specifies which sides of the border to draw.<br>0 = none<br>1 = bottom<br>2 = top<br>4 = left<br>8 = right<br>15 = full<br>A sum of these values is also possible to select specific sides.
| border_post  | [bool][2]| If `true` the border will be drawn after all children have been drawn.

## Outline

The outline is similar to border but is drawn outside of the object.

| Property     |  Type     | Description
| :---         |  :---:    | :---
| outline_color|[color][1] | Specifies the color of the outline
| outline_opa  | [uint8][3]| Specifies opacity of the outline
| outline_width| [uint8][3]| Set the width of the outline
| outline_pad  | [int16][3]| The space between the object and the outline. (default=0)

## Padding and Margin

Padding sets the space on the inner sides of the edges. It means "I don't want my children too close to my sides, so keep this space". Padding inner sets the "gap" between the children. Margin sets the space on the outer side of the edges. It means "I want this space around me".

Objects use them to set spacing. See the documentation of the [objects](../objects/) for the details.

| Property      | Type  | Description
| :---          | :---: | :---
| pad_top       | [int16][3] | Set the padding on the top
| pad_bottom    | [int16][3] | Set the padding on the bottom
| pad_left      | [int16][3] | Set the padding on the left
| pad_right     | [int16][3] | Set the padding on the right
| pad_inner     | [int16][3] | Set the padding inside the object between children
| margin_top    | [int16][3] | Set the margin on the top
| margin_bottom | [int16][3] | Set the margin on the bottom
| margin_left   | [int16][3] | Set the margin on the left
| margin_right  | [int16][3] | Set the margin on the right

## Shadow

The shadow is a blurred area under the object.

| Property      |  Type    | Description
| :---          |  :---:   | :---
| shadow_color  |[color][1]| Color of the shadow
| shadow_opa    | [uint8][3]     | Specifies opacity of the shadow
| shadow_width  | [int16][3]    | Set the width (blur size) of the outline
| shadow_ofs_x  | [int16][3]    | Set the an X offset for the shadow
| shadow_ofs_y  | [int16][3]    | Set the an Y offset for the shadow
| shadow_spread | [uint8][3]     | Make the shadow larger than the background in every direction by this value

## Text

Properties applied to the textual elements of the objects.

| Property          |  Type    | Description
| :---              |  :---:   | :---
| text_color        |[color][1]| Color of the text
| text_opa          | [uint8][3]     | Opacity level of the text [0-255]
| text_font         | [uint8][3]     | The [Font ID][6]
| text_letter_space | [int16][3]    | Distance between letters of the text, can be a negative number
| text_line_space   | [int16][3]    | Distance between lines of the text, can be a negative number 
| text_decor        | [uint8][3]     | Add text decoration.<br>0 = none *(=default)*<br>1 = underline<br>2 = strikethrough<br>3 = underline and strikethrough
| text_sel_color    |[color][1]| Set background color of text selection

## Value

Value is an arbitrary text label drawn on top of an object. It can be a lightweight replacement for creating standalone label objects.

| Property           |  Type         | Description
| :---               |  :---:        | :---
| value_str          | [string][4]   | Text to display
| value_color        | [color][1]    | Color of the text
| value_opa          | [uint8][3]    | Opacity level of the text [0-255]
| value_font         | [uint8][3]    | The [Font ID][6]
| value_letter_space | [int16][3]    | Distance between letters of the text, can be negative
| value_line_space   | [int16][3]    | Distance between lines of the text, can be negative
| value_align        | align         | Alignment of the text. Can be: <br>none <br>left <br>right <br>top <br>bottom <br>full <br>center *(=default)*
| value_ofs_x        | [int16][3]    | X offset from the default position of the alignment
| value_ofs_y        | [int16][3]    | Y offset from the default position of the alignment

## Line

Properties for [line](../objects/#line), [line meter](../objects/#line-meter) objects.

| Property               |  Type         | Description
| :---                   |  :---:        | :---
| line_color             | [color][1]    | Color of the line
| line_opa               | [uint8][3]    | Opacity level of the line [0-255]
| line_width             | [int16][3]    | Width of a scale line in the active region (also see `scale_end_line_width` below), or gauge minor ticks thickness
| line_rounded           | [bool][2]     | `true` = draw rounded line endings. Default = `false`
| line_dash_width        | [int16][3]    | Width of dash. Dashing is drawn only for horizontal or vertical lines. `0` = disable dash (= default)
| line_dash_gap          | [int16][3]    | Gap between two dash line. Dashing is drawn only for horizontal or vertical lines. `0` = disable dash (= default)

## Scale

The properties for styling the scale of [line meter](../objects/#line-meter), [gauge](../objects/#gauge) objects.

| Property               |  Type         | Description
| :---                   |  :---:        | :---
| scale_grad_color       | [color][1]    | Gradient to this color on the scale lines, or gauge minor ticks
| scale_end_color        | [color][1]    | Color of the scale lines in the end region, or gauge minor ticks / critical area
| scale_width            | [int16][3]    | Width of the scale in the normal region, or length of gauge minor ticks
| scale_border_width     | [int16][3]    | Width of a border drawn on the outer side of the scale in the normal region
| scale_end_line_width   | [int16][3]    | Width of a scale line in the end region
| scale_end_border_width | [int16][3]    | Width of a border drawn on the outer side of the scale in the end region

## Image

| Property      |  Type    | Description
| :---          |  :---:   | :---
| image_opa     | [uint8][3]     | Opacity of the image
| image_recolor  |[color][1]| Color of the overlay color mask
| image_recolor_opa | [uint8][3] | Specifies opacity of the overlay color mask

<!--

## Pattern

n/a

## Transitions

n/a

-->

[1]: ../data-types/#colors
[2]: ../data-types/#boolean
[3]: ../data-types/#integer
[4]: ../data-types/#string
[5]: ../data-types/#json-object
[6]: ../fonts/
[7]: ../objects/#common-properties
[8]: https://docs.lvgl.io/master/overview/style.html?#inheritance
