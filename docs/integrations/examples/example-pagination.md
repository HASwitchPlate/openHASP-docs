---
title: Simple page navigation
hide:
  - toc
---

![pagination](https://user-images.githubusercontent.com/1550668/115120975-aa96c480-9fb0-11eb-9bda-95abcc16ec8e.png)

Pagination can be executed locally using the `action` attribute of the objects.  
The `jsonl` lines below will setup 3 buttons to the bottom of a 240x320 screen which will navigate back and forth between the pages:

```json linenums="1"
{"page":0,"id":1,"obj":"btn","action":{"down": "page prev"},"x":0,"y":290,"w":79,"h":32,"bg_color":"#2C3E50","text":"\uE141","text_color":"#FFFFFF","radius":0,"border_side":0,"text_font":28}
{"page":0,"id":2,"obj":"btn","action":{"down": "page back"},"x":80,"y":290,"w":80,"h":32,"bg_color":"#2C3E50","text":"\uE2DC","text_color":"#FFFFFF","radius":0,"border_side":0,"text_font":22}
{"page":0,"id":3,"obj":"btn","action":{"down": "page next"},"x":161,"y":290,"w":79,"h":32,"bg_color":"#2C3E50","text":"\uE142","text_color":"#FFFFFF","radius":0,"border_side":0,"text_font":28}
```

The `action` can take any [command](../../commands.md).

For example:
```json linenums="1"
{"page":0,"id":4,"x": 0, "y": 0, "obj": "btn", "action": {"hold": "restart"}, "text":"\uE456","text_color":"#FFFFFF","radius":0,"border_side":0,"text_font":22}
```
Will restart the device on holding of the button object.

*Note*: `action` has the format of `"action": {"<btn event>": "<command>"}`

***btn events:** are `up`, `down`, `hold`, `release`.

Pagination can be also acomplished by enabling [swipe](../../../design/objects/#swipe) gesture on certain objects. The `jsonl` line below will setup an invisible rectangle overlay at the top of the screen with enabled `swipe`:

```json linenums="1"
{"page":0,"id":6,"obj":"obj","swipe":1,"x":0,"y":0,"h":30,"w":240,"opacity":0,"comment":"swipe-area-at-top"}
```

!!! tip
    You should put these lines to the end of your [`pages.jsonl`](../../../design/pages#pagesjsonl) config file, so that these objects remain at the top, and no others will be drawn on top of them.

* * * * *

To limit page navigation only to page numbers between 1 and 6:

```json linenums="1"
{"page":1,"id":0,"prev":6}
{"page":6,"id":0,"next":1}
```

