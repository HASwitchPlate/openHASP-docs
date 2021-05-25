<h1>Languages</h1>

## Encoding

The character sets are encoded in UTF-8. All character sets contain the ASCII 0x20-0x7E characters and the non-braking-space (NBSP). Each set contains roughly the same *extended* characters from its equivalent [iso-8859 standard](https://en.wikipedia.org/wiki/ISO/IEC_8859).

For example: To display the &#x00F7; character on the plate you need to use `\u00F7` in json or jsonl commands, or send the encoded UTF-8 bytes `0xC3` `0xB7` in other commands.

All character sets also contain about 100 standaard Material Design Icons for home automation use.

The default font in pre-compiled binaries is Roboto-Condensed-Regular with the Latin 1 character set. There is no support for right-to-left scipts.

## Ascii

ASCII 0x20-0x7E characters extended with these 12 additional characters: 

&#x00A3;
&#x00B0;
&#x00B1;
&#x00B5;
&#x00B7;
&#x00BC;
&#x00BD;
&#x00BE;
&#x00D7;
&#x00F7;
&#x20AC;
NBSP


## Latin 1

Covers Northern and Western European languages: English (en), French (fr), Spanish (es), Portuguese (pt), Italian (it), Dutch (nl), German (de), Danish (da), Swedish (sv), Norwegian (no), Finnish (fi)

&#x00A1;
&#x00A3;
&#x00B0;
&#x00B1;
&#x00B5;
&#x00B7;
&#x00BC;
&#x00BD;
&#x00BE;
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
&#x00D7;
&#x00D8;
&#x00D9;
&#x00DA;
&#x00DC;
&#x00DD;
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
&#x00EC;
&#x00ED;
&#x00EE;
&#x00EF;
&#x00F1;
&#x00F2;
&#x00F3;
&#x00F4;
&#x00F5;
&#x00F6;
&#x00F7;
&#x00F8;
&#x00F9;
&#x00FA;
&#x00FB;
&#x00FC;
&#x00FD;
&#x0152;
&#x0153;
&#x0160;
&#x0161;
&#x017D;
&#x017E;
&#x1E9E;
&#x20AC;
NBSP

## Latin 2

Covers Central and Eastern European languages: Czech (cs), Hungarian (hu), Polish (pl), Romanian (ro), Croatian (hr), Slovak (sk), Slovenian (sl), Sorbian

&#x00A3;
&#x00B0;
&#x00B1;
&#x00B5;
&#x00B7;
&#x00BC;
&#x00BD;
&#x00BE;
&#x00C1;
&#x00C2;
&#x00C9;
&#x00CD;
&#x00CE;
&#x00D3;
&#x00D6;
&#x00D7;
&#x00DA;
&#x00DC;
&#x00DD;
&#x00E1;
&#x00E2;
&#x00E9;
&#x00ED;
&#x00EE;
&#x00F3;
&#x00F6;
&#x00F7;
&#x00FA;
&#x00FC;
&#x0102;
&#x0103;
&#x010C;
&#x010D;
&#x0114;
&#x0115;
&#x0147;
&#x0148;
&#x0150;
&#x0151;
&#x015E;
&#x015F;
&#x0160;
&#x0161;
&#x0162;
&#x0163;
&#x016E;
&#x016F;
&#x0170;
&#x0171;
&#x017D;
&#x017E;
&#x01C4;
&#x01C5;
&#x01C6;
&#x01C7;
&#x01C8;
&#x01C9;
&#x01CA;
&#x01CB;
&#x01CC;
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
&#x20AC;
NBSP

<!--
## Character Sets

- latin-1: West European languages: French (fr), Spanish (es), Catalan (ca), Basque (eu), Portuguese (pt), Italian (it), Albanian (sq), Rhaeto-Romanic (rm), Dutch (nl), German (de), Danish (da), Swedish (sv), Norwegian (no), Finnish (fi), Faroese (fo), Icelandic (is), Irish (ga), Scottish (gd), and English (en), incidentally also Afrikaans (af) and Swahili (sw), Australia and much of Africa
- latin-2: Central and Eastern Europe: Czech (cs), Hungarian (hu), Polish (pl), Romanian (ro), Croatian (hr), Slovak (sk), Slovenian (sl), Sorbian
- latin-3: Esperanto (eo) and Maltese
- iso-8859-4 (latin4): Superseeded by Latin6
- iso-8859-5: Cyrillic letters for Bulgarian (bg), Byelorussian (be), Macedonian (mk), Russian (ru), Serbian (sr) and Ukrainian (uk).
- iso-8859-7:  Greek
- ISO-8859-9 (Latin5): Turkish
- iso-8859-10 (latin6): Latin6 rearranged the Latin4 characters, dropped some symbols and the Latvian ŗ, added the last missing Inuit (Greenlandic Eskimo) and non-Skolt Sami (Lappish) letters and reintroduced the Icelandic ðýþ to cover the entire Nordic area.
- iso-8859-11: Thai
- iso-8859-13 (latin7): Baltic Rim and re-establish the Latvian (lv) support
- iso-8859-14 (latin8): Adds Gaelic and Welsh (cy) letters to cover all Celtic languages. 
- iso-8859-15 (latin9): Update Latin1 by replacing the less needed symbols ¦¨´¸¼½¾ with forgotten French and Finnish letters and placing the U+20AC Euro sign in the cell =A4 of the former international currency sign ¤.
-->


## Characters

{{ read_csv("docs/assets/csv/characters.csv") }}

