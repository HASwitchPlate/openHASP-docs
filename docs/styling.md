
<h1>Styling Properties</h1>

You can adjust the appearance of objects by changing the foreground, background and/or border color of each object.
Some objects allow for more complex syling, effectively changing its appearance or its sub-components.

## Boolean
Properties with a boolean data type accept these values and are case insensitive:

- true / ON / 1 / yes
- false / OFF / 0 / no

## Colors
Color values can be:

- Short names (from table below)
- RGB hex code (`#rrggbb`)
- Short hex code (`#rgb`)
- RGB565 number format (`0..65535`)

{{ read_csv("docs/assets/csv/colors.csv") }}

### Setting Color

Examples:
```json
p0b2.value_color=13891
p1b5.text_color=silver
p2b3.bg_color=#C042A3
p2b4.border_color=#9f9
```

### Return values

When retrieving the color of an object, both the HTML representation as the RGB values are returned seperately.

The format will be a json object with components:

- color : 6 digit hexadecimal code preceeded by a hash `#` sign.
- r : byte value for red (`0..255`)
- g : byte value for green (`0..255`)
- b : byte value for blue (`0..255`)

For example, the color returned by a color picker change event is:
```json
{"color":"#00fff6","r":0,"g":255,"b":246}
```

## General

General styling options.

| Property | Value     | Default | Description
|:---------|:---------:|:-------:|:----
| enabled  | [bool][2] | true    | object is touchable<br>if `false` a _disabled_ style is applied


## Background

The color and gradient used for drawing the background of an object.

| Property       |   Type   | Description
| :---           |   :---:  | :---
| bg_opa         | byte     | The background opacity level
| bg_color       |[color][1]| The background color
| bg_grad_color  |[color][1]| The background gradient color
| bg_grad_dir    | [0..2]   | 0 = none *(=default)*<br>1 = horizontal<br>2 = vertical
| bg_grad_stop   | byte     | Specifies where the gradient should stop.<br>0 = at left/top most position<br>255= at right/bottom most position *(=default)*
| bg_main_stop   | byte     | Specifies where should the gradient start<br>0 = at left/top most position *(=default)*<br>255= at right/bottom most position

To adjust the background style of a page use `pXb0` where `X` is the page number.

## Border

The border is drawn on top of the background. It has radius rounding.

| Property     |  Type    | Description
| :---         |  :---:   | :---
| border_color |[color][1]| Specifies the color of the border
| border_opa   | byte     | Specifies opacity of the border
| border_width | byte     | Set the width of the border
| border_side  | byte     | Specifies which sides of the border to draw.<br>0 = none<br>1 = bottom<br>2 = top<br>4 = left<br>8 = right<br>15 = full<br>A sum of these values is also possible to select specific sides.
| border_post  | [bool][2]| If `true` the border will be drawn after all children have been drawn.

## Padding and Margin

Padding sets the space on the inner sides of the edges. It means "I don't want my children too close to my sides, so keep this space". Padding inner sets the "gap" between the children. Margin sets the space on the outer side of the edges. It means "I want this space around me".

Objects use them to set spacing. See the documentation of the [objects](../objects) for the details.

| Property      | Type  | Description
| :---          | :---: | :---
| pad_top       | int16 | Set the padding on the top
| pad_bottom    | int16 | Set the padding on the bottom
| pad_left      | int16 | Set the padding on the left
| pad_right     | int16 | Set the padding on the right
| pad_inner     | int16 | Set the padding inside the object between children
| margin_top    | int16 | Set the margin on the top
| margin_bottom | int16 | Set the margin on the bottom
| margin_left   | int16 | Set the margin on the left
| margin_right  | int16 | Set the margin on the right

## Shadow

The shadow is a blurred area under the object.

| Property      |  Type    | Description
| :---          |  :---:   | :---
| shadow_color  |[color][1]| Color of the shadow
| shadow_opa    | byte     | Specifies opacity of the shadow
| shadow_width  | int16    | Set the width (blur size) of the outline
| shadow_ofs_x  | int16    | Set the an X offset for the shadow
| shadow_ofs_y  | int16    | Set the an Y offset for the shadow
| shadow_spread | byte     | Make the shadow larger than the background in every direction by this value

## Text

Properties for textual objects only.

| Property          |  Type    | Description
| :---              |  :---:   | :---
| text_color        |[color][1]| Color of the text
| text_opa          | byte     | Opacity level of the text [0-255]
| text_font         | byte     | The [Font ID](../fonts)
| text_letter_space | int16    | Distance between letters of the text, can be a negative number
| text_line_space   | int16    | Distance between lines of the text, can be a negative number 
| text_decor        | byte     | Add text decoration.<br>0 = none *(=default)*<br>1 = underline<br>2 = strikethrough<br>3 = underline and strikethrough
| text_sel_color    |[color][1]| Set background color of text selection

## Value

Value is an arbitrary text drawn on top of an object. It can be a lightweight replacement for creating label objects.

| Property           |  Type    | Description
| :---               |  :---:   | :---
| value_str          | string   | Text to display
| value_color        |[color][1]| Color of the text
| value_opa          | byte     | Opacity level of the text [0-255]
| value_font         | byte     | The [Font ID](../fonts)
| value_letter_space | int16    | Distance between letters of the text, can be a negative number
| value_line_space   | int16    | Distance between lines of the text, can be a negative number
| value_align        | align    | Alignment of the text. Can be: none, left, right, top, bottom, full or center *(=default)*
| value_ofs_x        | int16    | X offset from the original position of the alignment
| value_ofs_y        | int16    | Y offset from the original position of the alignment

## Line

Properties for [line meter](../objects#line-meter) objects.

| Property          |  Type    | Description
| :---              |  :---:   | :---
| line_color        |[color][1]| Color of the line
| line_opa          | byte     | Opacity level of the line [0-255]
| line_width        | int16    | Width of the line
| line_dash_width   | int16    | Width of dash. Dashing is drawn only for horizontal or vertical lines. `0` = disable dash (= default)
| line_dash_gap     | int16    | Gap between two dash line. Dashing is drawn only for horizontal or vertical lines. `0` = disable dash (= default)
| line_rounded      | [bool][2]| `true` = draw rounded line endings. Default = `false`

## Scale

The properties for styling the scale of [line meter](../objects#line-meter) or [gauge](../objects#gauge) objects.

| Property               |  Type    | Description
| :---                   |  :---:   | :---
| scale_grad_color       |[color][1]| Make gradient to this color on the scale lines
| scale_end_color        |[color][1]| Color of the scale lines in the end region
| scale_width            | int16    | Width of the scale
| scale_border_width     | int16    | Width of a border drawn on the outer side of the scale in the normal region
| scale_end_border_width | int16    | Width of a border drawn on the outer side of the scale in the end region
| scale_end_line_width   | int16    | Width of a scale lines in the end region

## Image

| Property      |  Type    | Description
| :---          |  :---:   | :---
| image_opa     | byte     | Opacity of the image
| image_recolor  |[color][1]| Color of the overlay color mask
| image_recolor_opa | byte | Specifies opacity of the overlay color mask

<!--

## Outline

n/a

## Pattern

n/a

## Transitions

n/a

-->

[1]: #colors
[2]: #boolean
