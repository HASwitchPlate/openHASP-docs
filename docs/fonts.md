<h1>Fonts</h1>

## Built-in Fonts

The ESP8266 firmware only has 1 built-in font: Unscii with font size 8pt.

The ESP32 firmware builds additionally contain the Ubuntu Condensed font in _four_ font sizes: 12, 16, 24 and 32pt including selected glyphs of Latin-1 character set. 

The built-in fonts can be set by using the pointsize as parameter. For example:

```
p4b1.text_font=24
p4b2.value_font=12
```

!!! note
    It is possible to create custom builds with built-in fonts of other sizes (choose any _four_ of 12, 14, 16, 20, 22, 24, 26, 28, 32, 36, 38, 40, 44, 48) and supporting Latin-2 or Cyrillic character sets (even combined) by [customizing](compiling-customize.md) `user_config_override.h`.

## Built-in Icons

The icons in the list below are included with the built-in font sizes.
Included are a range of arrows, navigation, climate, controls, devices, energy, lights, places, presence, security, sound, time and wireless icons.

{{ read_csv("docs/assets/csv/icons.csv") }}

To use an icon in a text you need to prefix the UTF-8 character code with `\u`.
**To ensure proper decoding the payload should be used with a `json` or `jsonl` command.**

`jsonl` example:
```
{"page":2,"id":1,"obj":"label","x":10,"y":50,"w":150,"h":50,"text":"\uE64A Hello world!","text_font":24}
```

`json` example:
```
["p2b1.text=\uE64A Hello world!"]
```

## External Fonts

You can also add a custom `.zi` font by uploading it to the internal flash.
Apply it as the default font on the Configuration > HASP Settings page.
To use it, set the pointsize parameter of the property to `0`.

