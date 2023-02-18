# Fonts

## Built-in Fonts

The ESP8266 firmware only has 1 built-in font: Unscii with font size 8pt.

The ESP32 additionally contains the Ubuntu Condensed font in these font sizes: 12, 16, 22 and 28pt.

The built-in fonts can be set by using the pointsize as parameter:

for example:
```json linenums="1"
p4b1.text_font=16
p4b2.value_font=8
```

## Proposed built-in Icons

Top 80~100 icons will be included in the built-in font sizes,
this means importance >=45 or >=35:

{{ read_csv("docs/assets/csv/mdi-icons.csv") }}

To use an icon in a text you need to prefix the UTF-8 value with `\u`.
To ensure proper decoding the payload should be used with a `json` or `jsonl` command.

`jsonl` example:
```json linenums="1"
{"page":2,"id":1,"obj":"label","x":0,"y":50,"w":150,"h":50,"text":"\uE64A Hello world!"}
```

`json` example:
```json linenums="1"
["p2b1.text=\uE64A Hello world!"]
```

## Custom Fonts

You can add a custom `.zi` font by uploading it to the internal flash.
Apply it as the default font on the Configuration > HASP Settings page.
To use it, set the pointsize parameter of the property to `0`.


