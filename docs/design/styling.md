
# Styling Properties

You can adjust the appearance of objects by changing the foreground, background and/or border color of each object.
Some objects allow for more complex syling, effectively changing its appearance or its sub-components.

## General

General styling options.

| Property     | Value      | Default | Description
|:-------------|:----------:|:-------:|:-----------
| enabled      | [bool][2]  | true    | Object is touchable, if `false`, a _disabled_ style is applied
| radius       | [uint16][3]| depends<BR>on theme | The radius of the rounded corners of the object:<BR>0 = square corners<BR>100 = pill shaped object (true circle if object has same width and height)
| clip_corner  | [bool][2] | false   | Enable to clip off the overflowed content on the rounded (`radius` > `0`) corners of the object


## Background

The color and gradient used for drawing the background of an object.

| Property       |   Type   | Description
| :---           |   :---:  | :---
| bg_opa         | [uint8][3]     | The background opacity level
| bg_color       |[color][1]| The background color
| bg_grad_color  |[color][1]| The background gradient color
| bg_grad_dir    | [0..2]   | 0 = none *(=default)*<br>1 = horizontal<br>2 = vertical
| bg_grad_stop   | [uint8][3]     | Specifies where the gradient should stop.<br>0 = at left/top most position<br>255= at right/bottom most position *(=default)*
| bg_main_stop   | [uint8][3]     | Specifies where should the gradient start<br>0 = at left/top most position *(=default)*<br>255= at right/bottom most position

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
| line_width1            | [int16][3]    | Gauge major ticks thickness
| line_color             | [color][1]    | Starting color of the gauge minor ticks
| line_color1            | [color][1]    | Starting color of the gauge major ticks
| line_rounded           | [bool][2]     | `true` = draw rounded line endings. Default = `false`
| line_dash_width        | [int16][3]    | Width of dash. Dashing is drawn only for horizontal or vertical lines. `0` = disable dash (= default)
| line_dash_gap          | [int16][3]    | Gap between two dash line. Dashing is drawn only for horizontal or vertical lines. `0` = disable dash (= default)

## Scale

The properties for styling the scale of [line meter](../objects/#line-meter), [gauge](../objects/#gauge) objects.

| Property               |  Type         | Description
| :---                   |  :---:        | :---
| scale_grad_color       | [color][1]    | Gradient to this color on the scale lines, or gauge minor ticks
| scale_grad_color1      | [color][1]    | Gradient to this color on the gauge major ticks
| scale_end_color        | [color][1]    | Color of the scale lines in the end region, or gauge minor ticks / critical area
| scale_end_color1       | [color][1]    | Color of the gauge major ticks in the critical area
| scale_width            | [int16][3]    | Width of the scale in the normal region, or length of gauge minor ticks
| scale_width1           | [int16][3]    | Length of the gauge major ticks
| scale_border_width     | [int16][3]    | Width of a border drawn on the outer side of the scale in the normal region
| scale_end_line_width   | [int16][3]    | Width of a scale line in the end region
| scale_end_border_width | [int16][3]    | Width of a border drawn on the outer side of the scale in the end region

## Needle

The properties for styling the needle of [gauge](../objects/#gauge) objects.

| Property               |  Type      | Description
| :---                   |   :---:    | :---
| line_width2            | [int16][3] | Width of the needle line
| line_rounded2          | [bool][2]  | `true` = draw rounded needle ending. Default = `false`
| line_color2            | [color][1] | Color of the needle line
| line_opa2              | [uint8][3] | Opacity level of the needle line [0-255]
| bg_color2              | [color][1] | Color of the needle central circle
| bg_opa2                | [uint8][3] | Opacity level of the needle central circle [0-255]

## Arc

The properties for styling the arc of [arc](../objects/#arc) objects.

| Property               |  Type      | Description
| :---                   |   :---:    | :---
| line_width             | [int16][9] | Width of the arc background (default 20)
| line_color             | [color][1] | Color of the arc background
| line_width1            | [int16][9] | Width of the arc indicator (default 20)
| line_color1            | [color][1] | Color of the arc indicator
  
## Image

| Property      |  Type    | Description
| :---          |  :---:   | :---
| image_opa     | [uint8][3]     | Opacity of the image
| image_recolor  |[color][1]| Color of the overlay color mask
| image_recolor_opa | [uint8][3] | Specifies opacity of the overlay color mask

<!--

## Outline

n/a

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
