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

The ESP32 firmware includes these built-in fonts:

- Unscii with font size 8pt
- Roboto Condensed in _four_ font sizes depending on the display resolution:
    - 320x240: 12, 16, 24 and 32pt
    - 480x320: 16, 24, 32 and 48pt

Each font contains selected glyphs of the [Latin-1](#latin-1) character set and MaterialDesign icons below.

The built-in fonts can be set by using the pointsize as parameter. For example:

```json linenums="1"
p4b1.text_font=24
p4b2.value_font=12
```

!!! note "Developer Note"
    It is possible to create custom builds with built-in fonts of other sizes (choose any _four_ of 12, 14, 16, 20, 22, 24, 26, 28, 32, 36, 38, 40, 44, 48) and
    supporting [Latin-2](#latin-2), [Cyrillic](#cyrillic), [Greek](#greek) or [Vietnamese](#vietnamese) character sets (even combined)
    by [customizing](../compiling/customize.md) `user_config_override.h`.


## Built-in Icons

The icons in the list below are included with the built-in font sizes.
Included are a range of arrows, navigation, climate, controls, devices, energy, lights, places, presence, security, sound, time and wireless icons.

{{ read_csv("docs/assets/csv/icons.csv") }}

### Encoding

The encoding of the icons depends on how they are sent to the plate:

#### 1. As JSON payload

To use an icon in a `json` or `jsonl` payload you need to prefix the UTF-8 character code with `\u`.
ArduinoJSON will correctly decode the text into it's UTF-8 representation while parsing the JSON object:

`jsonl` example:
```json linenums="1"
{"page":2,"id":1,"obj":"label","w":150,"h":50,"text":"\uE64A Hello world!"}
```

`json` example:
```json linenums="1"
["p2b1.text=\uE64A Hello world!"]
```

If the icon codepoint is larger than `0xFFFF` you need to convert the codepoint to its **[surrogate pair][1]{target=_blank}** first!
Then include both UTF-16 surrogate characters in the payload like this:

`jsonl` example:
```json linenums="1"
{"page":2,"id":1,"obj":"label","w":150,"h":50,"text": "\uDB81\uDC25 Hello world!"}
```

`json` example:
```json linenums="1"
["p2b1.text=\uDB81\uDC25 Hello world!"]
```

#### 2. As raw payload

Raw payloads are directly passed to the LVGL text rendering engine without any conversion on the MCU.
You need to make sure the string is properly encoded into UTF-8 **by the application sending the payload**!
How this is accomplished depends on the Home Automation tool:

##### Home Assistant

- Code points up to `0xFFFF` should be encoded as `"\uE6E8"` in the template.</br>
  __Note:__ Use lowercase `\u` and exactly 4 hexadecimal digits.

- Code points above `0xFFFF` *must* be encoded as `"\U0001F5E9"` in the template.</br>
  __Note:__ Use capital `\U` and exactly 8 hexadecimal digits.

- At the end of the template you *must* indicate that Home Assistant needs encoded the string before sending it by appending `|e` *(pipe symbol + `e`)* at the end.

```yaml linenums="1"
- obj: "p1b2"  # light-switch toggle button
  properties:
    "text": '{{ "\uE6E8" if is_state("light.x","on") else "\U0001F5E9" |e }}'
```



## Custom Fonts

With the online Font Converter tool you can create binary font files from any TTF, OTF or WOFF font.
You can select custom ranges of Unicode characters and specify the bpp (bits-per-pixel).

The font converter is designed to be compatible with LVGL. An offline version of the converter is also available [here][2]{target=_blank}.

### Online Font Converter

How to use the font converter?

  1.  Give a name to the binary font. E.g. "arial_20"
  2.  Specify the height in pixels
  3.  Set the bpp (bits-per-pixel). Higher values result in a smoother (anti-aliased) font but will require more flash and memory.
  4.  Choose a TTF, OTF or WOFF source font file
  5.  Set a range of Unicode characters to include in your font or list the characters in the Symbols field
  6.  Optionally choose another font too and specify the ranges and/or symbols for it as well. The characters will be merged into the final binary font.
  7.  Click the Convert button to download the resulting `.bin` file.

{!design/converter/content.html!}

### Use Custom Fonts

  1. Copy the resulting binary font file to the flash partition of your plate.
  2. In the jsonl code use `"text_font":"arial_20"` without the extention or use command `p1b2.text_font=arial_20`

!!! warning
  The entire binary font is cached into memory when it is first used.
  PSram is *highly* recommended to use binary fonts.


## Character Sets

The characters are encoded in UTF-8. All character sets include the [Ascii](#ascii) `0x20-0x7E` characters, the non-braking-space (NBSP) and 10 universal symbols.
Each set contains roughly the same *extended* characters from its equivalent [iso-8859 standard](https://en.wikipedia.org/wiki/ISO/IEC_8859){target=_blank}.
All character sets also contain about 130 standard Material Design Icons for home automation use.

The default font in pre-compiled binaries is Roboto-Condensed-Regular with the [Latin 1](#latin-1) character set. There is no support for right-to-left scripts.

For example: To display the &#x00F7; character on the plate you need to use `\u00F7` in json or jsonl commands, or send the encoded UTF-8 bytes `0xC3` `0xB7` in other commands.

### Ascii

Includes all ASCII 0x20-0x7E characters extended with a non-breaking space and 10 *universal* symbols: 

`NBSP`
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

This is the default character set of the pre-compiled firmware binary files.     
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

Needs compiling with [customization](../../compiling/customize/).
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


### Cyrillic

Needs compiling with [customization](../../compiling/customize/).
Includes all characters and symbols from the [Ascii range](#ascii) above.

Covers the Slavic languages that use a Cyrillic alphabet, including Belarusian, Bulgarian, Macedonian, Russian, Serbian, and Ukrainian 

&#x0400;
&#x0401;
&#x0402;
&#x0403;
&#x0404;
&#x0405;
&#x0406;
&#x0407;
&#x0408;
&#x0409;
&#x040A;
&#x040B;
&#x040C;
&#x040D;
&#x040E;
&#x040F;
&#x0410;
&#x0411;
&#x0412;
&#x0413;
&#x0414;
&#x0415;
&#x0416;
&#x0417;
&#x0418;
&#x0419;
&#x041A;
&#x041B;
&#x041C;
&#x041D;
&#x041E;
&#x041F;
&#x0420;
&#x0421;
&#x0422;
&#x0423;
&#x0424;
&#x0425;
&#x0426;
&#x0427;
&#x0428;
&#x0429;
&#x042A;
&#x042B;
&#x042C;
&#x042D;
&#x042E;
&#x042F;
&#x0430;
&#x0431;
&#x0432;
&#x0433;
&#x0434;
&#x0435;
&#x0436;
&#x0437;
&#x0438;
&#x0439;
&#x043A;
&#x043B;
&#x043C;
&#x043D;
&#x043E;
&#x043F;
&#x0440;
&#x0441;
&#x0442;
&#x0443;
&#x0444;
&#x0445;
&#x0446;
&#x0447;
&#x0448;
&#x0449;
&#x044A;
&#x044B;
&#x044C;
&#x044D;
&#x044E;
&#x044F;
&#x0450;
&#x0451;
&#x0452;
&#x0453;
&#x0454;
&#x0455;
&#x0456;
&#x0457;
&#x0458;
&#x0459;
&#x045A;
&#x045B;
&#x045C;
&#x045D;
&#x045E;
&#x045F;


### Greek

Needs compiling with [customization](../../compiling/customize/).
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

### Vietnamese

Needs compiling with [customization](../../compiling/customize/).
Includes all characters and symbols from the [Ascii range](#ascii) above.

Covers the Vietnamese (vi) language:

&#xC1;	<!-- 	Á	-->
&#xC0;	<!-- 	À	-->
&#xC2;	<!-- 	Â	-->
&#x102;	<!-- 	Ă	-->
&#xC3;	<!-- 	Ã	-->
&#x1EA4;	<!-- 	Ấ	-->
&#x1EA6;	<!-- 	Ầ	-->
&#x1EAE;	<!-- 	Ắ	-->
&#x1EB0;	<!-- 	Ằ	-->
&#x1EAA;	<!-- 	Ẫ	-->
&#x1EB4;	<!-- 	Ẵ	-->
&#x1EA2;	<!-- 	Ả	-->
&#x1EA8;	<!-- 	Ẩ	-->
&#x1EB2;	<!-- 	Ẳ	-->
&#x1EA0;	<!-- 	Ạ	-->
&#x1EAC;	<!-- 	Ậ	-->
&#x1EB6;	<!-- 	Ặ	-->
&#x110;	<!-- 	Đ	-->
&#xC9;	<!-- 	É	-->
&#xC8;	<!-- 	È	-->
&#xCA;	<!-- 	Ê	-->
&#x1EBC;	<!-- 	Ẽ	-->
&#x1EBE;	<!-- 	Ế	-->
&#x1EC0;	<!-- 	Ề	-->
&#x1EC4;	<!-- 	Ễ	-->
&#x1EBA;	<!-- 	Ẻ	-->
&#x1EC2;	<!-- 	Ể	-->
&#x1EB8;	<!-- 	Ẹ	-->
&#x1EC6;	<!-- 	Ệ	-->
&#xCD;	<!-- 	Í	-->
&#xCC;	<!-- 	Ì	-->
&#x128;	<!-- 	Ĩ	-->
&#x1EC8;	<!-- 	Ỉ	-->
&#x1ECA;	<!-- 	Ị	-->
&#xD3;	<!-- 	Ó	-->
&#xD2;	<!-- 	Ò	-->
&#xD4;	<!-- 	Ô	-->
&#xD5;	<!-- 	Õ	-->
&#x1ED0;	<!-- 	Ố	-->
&#x1ED2;	<!-- 	Ồ	-->
&#x1ED6;	<!-- 	Ỗ	-->
&#x1ECE;	<!-- 	Ỏ	-->
&#x1A0;	<!-- 	Ơ	-->
&#x1ED4;	<!-- 	Ổ	-->
&#x1ECC;	<!-- 	Ọ	-->
&#x1EDA;	<!-- 	Ớ	-->
&#x1EDC;	<!-- 	Ờ	-->
&#x1EE0;	<!-- 	Ỡ	-->
&#x1ED8;	<!-- 	Ộ	-->
&#x1EDE;	<!-- 	Ở	-->
&#x1EE2;	<!-- 	Ợ	-->
&#xDA;	<!-- 	Ú	-->
&#xD9;	<!-- 	Ù	-->
&#x168;	<!-- 	Ũ	-->
&#x1EE6;	<!-- 	Ủ	-->
&#x1AF;	<!-- 	Ư	-->
&#x1EE4;	<!-- 	Ụ	-->
&#x1EE8;	<!-- 	Ứ	-->
&#x1EEA;	<!-- 	Ừ	-->
&#x1EEE;	<!-- 	Ữ	-->
&#x1EEC;	<!-- 	Ử	-->
&#x1EF0;	<!-- 	Ự	-->
&#xDD;	<!-- 	Ý	-->
&#x1EF2;	<!-- 	Ỳ	-->
&#x1EF8;	<!-- 	Ỹ	-->
&#x1EF6;	<!-- 	Ỷ	-->
&#x1EF4;	<!-- 	Ỵ	-->
&#xE1;	<!-- 	á	-->
&#xE0;	<!-- 	à	-->
&#xE2;	<!-- 	â	-->
&#x103;	<!-- 	ă	-->
&#xE3;	<!-- 	ã	-->
&#x1EA5;	<!-- 	ấ	-->
&#x1EA7;	<!-- 	ầ	-->
&#x1EAF;	<!-- 	ắ	-->
&#x1EB1;	<!-- 	ằ	-->
&#x1EAB;	<!-- 	ẫ	-->
&#x1EB5;	<!-- 	ẵ	-->
&#x1EA3;	<!-- 	ả	-->
&#x1EA9;	<!-- 	ẩ	-->
&#x1EB3;	<!-- 	ẳ	-->
&#x1EA1;	<!-- 	ạ	-->
&#x1EAD;	<!-- 	ậ	-->
&#x1EB7;	<!-- 	ặ	-->
&#x111;	<!-- 	đ	-->
&#xE9;	<!-- 	é	-->
&#xE8;	<!-- 	è	-->
&#xEA;	<!-- 	ê	-->
&#x1EBD;	<!-- 	ẽ	-->
&#x1EBF;	<!-- 	ế	-->
&#x1EC1;	<!-- 	ề	-->
&#x1EC5;	<!-- 	ễ	-->
&#x1EBB;	<!-- 	ẻ	-->
&#x1EC3;	<!-- 	ể	-->
&#x1EB9;	<!-- 	ẹ	-->
&#x1EC7;	<!-- 	ệ	-->
&#xED;	<!-- 	í	-->
&#xEC;	<!-- 	ì	-->
&#x129;	<!-- 	ĩ	-->
&#x1EC9;	<!-- 	ỉ	-->
&#x1ECB;	<!-- 	ị	-->
&#xF3;	<!-- 	ó	-->
&#xF2;	<!-- 	ò	-->
&#xF4;	<!-- 	ô	-->
&#xF5;	<!-- 	õ	-->
&#x1ED1;	<!-- 	ố	-->
&#x1ED3;	<!-- 	ồ	-->
&#x1ED7;	<!-- 	ỗ	-->
&#x1ECF;	<!-- 	ỏ	-->
&#x1A1;	<!-- 	ơ	-->
&#x1ED5;	<!-- 	ổ	-->
&#x1ECD;	<!-- 	ọ	-->
&#x1EDB;	<!-- 	ớ	-->
&#x1EDD;	<!-- 	ờ	-->
&#x1EE1;	<!-- 	ỡ	-->
&#x1ED9;	<!-- 	ộ	-->
&#x1EDF;	<!-- 	ở	-->
&#x1EE3;	<!-- 	ợ	-->
&#xFA;	<!-- 	ú	-->
&#xF9;	<!-- 	ù	-->
&#x169;	<!-- 	ũ	-->
&#x1EE7;	<!-- 	ủ	-->
&#x1B0;	<!-- 	ư	-->
&#x1EE5;	<!-- 	ụ	-->
&#x1EE9;	<!-- 	ứ	-->
&#x1EEB;	<!-- 	ừ	-->
&#x1EEF;	<!-- 	ữ	-->
&#x1EED;	<!-- 	ử	-->
&#x1EF1;	<!-- 	ự	-->
&#xFD;	<!-- 	ý	-->
&#x1EF3;	<!-- 	ỳ	-->
&#x1EF9;	<!-- 	ỹ	-->
&#x1EF7;	<!-- 	ỷ	-->
&#x1EF5;	<!-- 	ỵ	-->
&#x20AB;	<!-- 	₫	-->


[1]: http://www.russellcottrell.com/greek/utilities/SurrogatePairCalculator.htm
[2]: https://github.com/lvgl/lv_font_conv