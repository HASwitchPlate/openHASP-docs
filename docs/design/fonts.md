<style type="text/css">
.md-typeset table:not([class]) td
{
  padding: 0.5em 0.25m;
  line-height: 1.25;
  vertical-align: middle;
}

.md-typeset table:not([class]) th
{
  min-width: 5%;
  padding: 0.5em 0.25m;

}

th:nth-child(3n+1) { width: 8%; text-align: center;}
th:nth-child(3n+2) { width: 8%; text-align: center;}
th:nth-child(3n+3) { width: 34%; text-align: left; }

td:nth-child(3n+2) { white-space: nowrap; }
</style>


<h1>Fonts</h1>

## Built-in Fonts

The ESP8266 firmware only has 1 built-in font: Unscii with font size 8pt.

The ESP32 firmware builds additionally contain the Roboto Condensed font in _four_ font sizes depending on the display resolution:

- 320x240: 12, 16, 24 and 32pt
- 480x320: 16, 24, 32 and 48pt

Including selected glyphs of Latin-1 character set and MaterialDesign icons below.

The built-in fonts can be set by using the pointsize as parameter. For example:

```json
p4b1.text_font=24
p4b2.value_font=12
```

!!! note
    It is possible to create custom builds with built-in fonts of other sizes (choose any _four_ of 12, 14, 16, 20, 22, 24, 26, 28, 32, 36, 38, 40, 44, 48) and supporting Latin-2 or Cyrillic character sets (even combined) by [customizing](../compiling/customize.md) `user_config_override.h`.

### Built-in Icons

The icons in the list below are included with the built-in font sizes.
Included are a range of arrows, navigation, climate, controls, devices, energy, lights, places, presence, security, sound, time and wireless icons.

{{ read_csv("docs/assets/csv/icons.csv") }}

To use an icon in a text you need to prefix the UTF-8 character code with `\u`.
**To ensure proper decoding the payload should be used with a `json` or `jsonl` command.**

`jsonl` example:
```json
{"page":2,"id":1,"obj":"label","x":10,"y":50,"w":150,"h":50,"text":"\uE64A Hello world!","text_font":24}
```

`json` example:
```json
["p2b1.text=\uE64A Hello world!"]
```


### Character Sets

The characters are encoded in UTF-8. All character sets include the [Ascii](#ascii) `0x20-0x7E` characters, the non-braking-space (NBSP) and 10 universal symbols.
Each set contains roughly the same *extended* characters from its equivalent [iso-8859 standard](https://en.wikipedia.org/wiki/ISO/IEC_8859){target=_blank}.
All character sets also contain about 130 standard Material Design Icons for home automation use.

The default font in pre-compiled binaries is Roboto-Condensed-Regular with the [Latin 1](#latin-1) character set. There is no support for right-to-left scipts.

For example: To display the &#x00F7; character on the plate you need to use `\u00F7` in json or jsonl commands, or send the encoded UTF-8 bytes `0xC3` `0xB7` in other commands.

### Ascii

Includes all ASCII 0x20-0x7E characters extended with these 11 *universal* symbols: 

NBSP
&#x00A3;
&#x00B0;
&#x00B1;
&#x00B2;
&#x00B3;
&#x00B5;
&#x00D7;
&#x00F7;
&#x20AC;
&#x2022;


### Latin 1

The default character set for the pre-compiled firmware binary files.</br>
Includes all characters and symbols from the [Ascii range](#ascii) above.

Covers Northern, Western and Southern European languages: English (en), French (fr), Spanish (es), Portuguese (pt), Italian (it), Dutch (nl), German (de), Danish (da), Swedish (sv), Norwegian (no), Finnish (fi), Albanian (sq), Turkish (tr)

&#x00A1;
&#x00BF;
&#x00C0;
&#x00C1;
&#x00C2;
&#x00C3;
&#x00C4;
&#x00C5;
&#x00C6;
&#x00C7;
&#x00C8;
&#x00C9;
&#x00CA;
&#x00CB;
&#x00CC;
&#x00CD;
&#x00CE;
&#x00CF;
&#x00D1;
&#x00D2;
&#x00D3;
&#x00D4;
&#x00D5;
&#x00D6;
&#x00D8;
&#x00D9;
&#x00DA;
&#x00DB;
&#x00DC;
&#x00DD;
&#x00DE;
&#x00DF;
&#x00E0;
&#x00E1;
&#x00E2;
&#x00E3;
&#x00E4;
&#x00E5;
&#x00E6;
&#x00E7;
&#x00E8;
&#x00E9;
&#x00EA;
&#x00EB;
&#x00EC;
&#x00ED;
&#x00EE;
&#x00EF;
&#x00F0;
&#x00F1;
&#x00F2;
&#x00F3;
&#x00F4;
&#x00F5;
&#x00F6;
&#x00F8;
&#x00F9;
&#x00FA;
&#x00FB;
&#x00FC;
&#x00FD;
&#x00FE;
&#x00FF;
&#x011E;
&#x011F;
&#x0130;
&#x0131;
&#x0152;
&#x0153;
&#x015E;
&#x015F;
&#x0160;
&#x0161;
&#x017D;
&#x017E;
&#x1E9E;


### Latin 2

Includes all characters and symbols from the [Ascii range](#ascii) above.

Covers Central and Eastern European languages: Czech (cs), Hungarian (hu), Polish (pl), Romanian (ro), Croatian (hr), Slovak (sk), Slovenian (sl), Sorbian (sb)

&#x00C1;
&#x00C2;
&#x00C4;
&#x00C9;
&#x00CD;
&#x00CE;
&#x00D3;
&#x00D4;
&#x00D6;
&#x00DA;
&#x00DC;
&#x00DD;
&#x00E1;
&#x00E2;
&#x00E4;
&#x00E9;
&#x00ED;
&#x00EE;
&#x00F3;
&#x00F4;
&#x00F6;
&#x00FA;
&#x00FC;
&#x00FD;
&#x0102;
&#x0103;
&#x0104;
&#x0105;
&#x0106;
&#x0107;
&#x010C;
&#x010D;
&#x010E;
&#x010F;
&#x0110;
&#x0111;
&#x0114;
&#x0115;
&#x0118;
&#x0119;
&#x011A;
&#x011B;
&#x0139;
&#x013A;
&#x013D;
&#x013E;
&#x0141;
&#x0142;
&#x0143;
&#x0144;
&#x0147;
&#x0148;
&#x0150;
&#x0151;
&#x0154;
&#x0155;
&#x0158;
&#x0159;
&#x015A;
&#x015B;
&#x015E;
&#x015F;
&#x0160;
&#x0161;
&#x0162;
&#x0163;
&#x0164;
&#x0165;
&#x016E;
&#x016F;
&#x0170;
&#x0171;
&#x0179;
&#x017A;
&#x017B;
&#x017C;
&#x017D;
&#x017E;<!-- Serbo-Croatian Digraphs: Usually written as separate letters
&#x01C4;
&#x01C5;
&#x01C6;
&#x01C7;
&#x01C8;
&#x01C9;
&#x01CA;
&#x01CB;
&#x01CC;
-->
&#x01CD;
&#x01CE;
&#x0200;
&#x0201;
&#x0202;
&#x0203;
&#x0204;
&#x0205;
&#x0206;
&#x0207;
&#x0208;
&#x0209;
&#x020A;
&#x020B;
&#x020C;
&#x020D;
&#x020E;
&#x020F;
&#x0210;
&#x0211;
&#x0212;
&#x0213;
&#x0214;
&#x0215;
&#x0216;
&#x0217;
&#x0218;
&#x0219;
&#x021A;
&#x021B;

### Greek

Includes all characters and symbols from the [Ascii range](#ascii) above.

Covers the Greek (el) language:

&#x0386;
&#x0388;
&#x0389;
&#x038A;
&#x038C;
&#x038E;
&#x038F;
&#x0390;
&#x0391;
&#x0392;
&#x0393;
&#x0394;
&#x0395;
&#x0396;
&#x0397;
&#x0398;
&#x0399;
&#x039A;
&#x039B;
&#x039C;
&#x039D;
&#x039E;
&#x039F;
&#x03A0;
&#x03A1;
&#x03A3;
&#x03A4;
&#x03A5;
&#x03A6;
&#x03A7;
&#x03A8;
&#x03A9;
&#x03AC;
&#x03AD;
&#x03AE;
&#x03AF;
&#x03B0;
&#x03B1;
&#x03B2;
&#x03B3;
&#x03B4;
&#x03B5;
&#x03B6;
&#x03B7;
&#x03B8;
&#x03B9;
&#x03BA;
&#x03BB;
&#x03BC;
&#x03BD;
&#x03BE;
&#x03BF;
&#x03C0;
&#x03C1;
&#x03C2;
&#x03C3;
&#x03C4;
&#x03C5;
&#x03C6;
&#x03C7;
&#x03C8;
&#x03C9;
&#x03CA;
&#x03CB;
&#x03CC;
&#x03CD;
&#x03CE;



## External Fonts

You can also add a custom `.zi` font by uploading it to the internal flash.
Apply it as the default font on the Configuration > HASP Settings page.
To use it, set the pointsize parameter of the property to `0`.

