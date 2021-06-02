# Data Types

There are 5 major data types that openHASP uses when communicating over MQTT:

## Boolean
Properties with a boolean data type accept these values and are case insensitive:

- `true` / `ON` / `1` / `yes`
- `false` / `OFF` / `0` / `no`

The return value will be either `1`/`0` or `on`/`off` depending on the context.

## Integer
Numeric properties have integer values with a variable minimum and maximum input value.     
Certain object properties also support negative values.

!!! note "Details"
    `int8` (signed) supports values ranging from -128 to 127, `uint8` (unsigned) supports values ranging from 0 to 255.    
    `int16` (signed) supports values ranging from -32768 to 32767, `uint16` (unsigned) supports values ranging from 0 to 65535.


## String
Properties that accept textual input. When sending raw text in the MQTT payload or as command parameter no quotes are needed.    
Only when a text value is included in a `jsonl` or `json` command, it needs to be quoted accoring to JSON rules.

## JSON Object
Some properties can be set or retrieved in JSON format too. The JSON object has several keys that have a boolean, integer or string data type.

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
