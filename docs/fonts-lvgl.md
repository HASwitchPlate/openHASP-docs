<h1>Fonts</h1>

## Built-in Fonts

The ESP8266 firmware only has 1 built-in font: Unscii with font size 8pt.

The ESP32 additionally contains the Roboto Condensed font in these font sizes: 12, 16, 22 and 28pt.

The built-in fonts can be set by using the pointsize as parameter:

for example:
```
p4b1.text_font=16
p4b2.value_font=8
```

## Built-in Icons

These icons are included in the Roboto Condensed font:

|Icon|UTF-8|Desciption|Icon|UTF-8|Description
|:--:|:------:|----|:--:|:-----:|-----------
| <i class="fa fa-music"></i> | F001| music	| <i class="fa fa-random"></i> | F074| random
| <i class="fa fa-film"></i> | F008| film	| <i class="fa fa-chevron-up"></i> | F077| chevron-up
| <i class="fa fa-th-list"></i> | F00B| th-list	| <i class="fa fa-chevron-down"></i> | F078| chevron-down
| <i class="fa fa-check"></i> | F00C| check	| <i class="fa fa-retweet"></i> | F079| retweet
| <i class="fa fa-times"></i> | F00D| times	| <i class="fa fa-folder"></i> | F07B| folder
| <i class="fa fa-power-off"></i> | F011| power-off	| <i class="fa fa-upload"></i> | F093| upload
| <i class="fa fa-cog"></i> | F013| cog	| <i class="fa fa-phone"></i> | F095| phone
| <i class="fa fa-home"></i> | F015| home	| <i class="fa fa-cut"></i> | F0C4| cut
| <i class="fa fa-download"></i> | F019| download	| <i class="fa fa-copy"></i> | F0C5| copy
| <i class="fa fa-inbox"></i> | F01C| inbox	| <i class="fa fa-save"></i> | F0C7| save
| <i class="fa fa-refresh"></i> | F021| sync	| <i class="fa fa-bolt"></i> | F0E7| bolt
| <i class="fa fa-volume-off"></i> | F026| volume-off	| <i class="fa fa-paste"></i> | F0EA| paste
| <i class="fa fa-volume-down"></i> | F027| volume-down	| <i class="fa fa-bell"></i> | F0F3| bell
| <i class="fa fa-volume-up"></i> | F028| volume-up	| <i class="fa fa-keyboard-o"></i> | F11C| keyboard
| <i class="fa fa-image"></i> | F03E| image	| <i class="fa fa-location-arrow"></i> | F124| location-arrow
| <i class="fa fa-step-backward"></i> | F048| step-backward	| <i class="fa fa-file"></i> | F15B| file
| <i class="fa fa-play"></i> | F04B| play	| <i class="fa fa-wifi"></i> | F1EB| wifi
| <i class="fa fa-pause"></i> | F04C| pause	| <i class="fa fa-battery-full"></i> | F240| battery-full
| <i class="fa fa-stop"></i> | F04D| stop	| <i class="fa fa-battery-three-quarters"></i> | F241| battery-three-quarters
| <i class="fa fa-step-forward"></i> | F051| step-forward	| <i class="fa fa-battery-half"></i> | F242| battery-half
| <i class="fa fa-eject"></i> | F052| eject	| <i class="fa fa-battery-quarter"></i> | F243| battery-quarter
| <i class="fa fa-chevron-left"></i> | F053| chevron-left	| <i class="fa fa-battery-empty"></i> | F244| battery-empty
| <i class="fa fa-chevron-right"></i> | F054| chevron-right	| <i class="fa fa-usb"></i> | F287| usb
| <i class="fa fa-plus"></i> | F067| plus	| <i class="fa fa-bluetooth"></i> | F293| bluetooth
| <i class="fa fa-minus"></i> | F068| minus	| <i class="fa fa-pencil"></i> | F304| pen
| <i class="fa fa-eye"></i> | F06E| eye	| <i class="fa fa-trash"></i> | F2ED| trash-alt
| <i class="fa fa-eye-slash"></i> | F070| eye-slash	| <i class="fa fa-backspace"></i> | F55A| backspace
| <i class="fa fa-exclamation-triangle"></i> | F071| exclamation-triangle	| <i class="fa fa-sd-card"></i> | F7C2| sd-card

To use an icon in a text you need to prefix the UTF-8 value with `\u`.
To ensure proper decoding the payload should be used with a `json` or `jsonl` command.

`jsonl` example:
```
{"obj":"label","id":10,"x":0,"y":0,"w":70,"h":50,"parentid":5,"text":"\uf00c OK"}
```

`json` example:
```
["p3b10.text=\uf00c OK"]
```

## Custom Fonts

You can add a custom font by uploading it to the internal flash.
Apply it as the default font on the Configuration > HASP Settings page.

## FontAwesome Icons

