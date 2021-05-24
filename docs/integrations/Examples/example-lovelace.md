
<h1>Lovelace-like entities</h1>

<h2>Code</h2>

To add an openHASP plate to your installation with the Dash UI sample configuration, upload a `pages.jsonl` file with the folowing content to your plate:

```text
{"page":1,"id":1,"obj":"btn","x":0,"y":0,"w":240,"h":30,"text":"ENTITIES","value_font":22,"bg_color":"#2C3E50","text_color":"#FFFFFF","radius":0,"border_side":0,"enabled":0}

{"page":1,"id":11,"obj":"label","x":8,"y":30,"w":30,"h":35,"text":"\uE004","align":1,"text_font":28,"text_color":"black"}
{"page":1,"id":12,"obj":"label","x":48,"y":40,"w":130,"h":30,"text":"Presence override","align":0,"text_font":16,"text_color":"black"}
{"page":1,"id":13,"obj":"switch","x":180,"y":37,"w":50,"h":25,"radius":25,"radius2":15}

{"page":1,"id":21,"obj":"label","x":8,"y":65,"w":30,"h":35,"text":"\uF054","align":1,"text_font":28,"text_color":"black"}
{"page":1,"id":22,"obj":"label","x":48,"y":75,"w":130,"h":30,"text":"Front gate","align":0,"text_font":16,"text_color":"black"}
{"page":1,"id":23,"obj":"switch","x":180,"y":72,"w":50,"h":25,"radius":25,"radius2":15}

{"page":1,"id":31,"obj":"label","x":8,"y":100,"w":30,"h":35,"text":"\uF054","align":1,"text_font":28,"text_color":"black"}
{"page":1,"id":32,"obj":"label","x":48,"y":110,"w":130,"h":30,"text":"Back yard","align":0,"text_font":16,"text_color":"black"}
{"page":1,"id":33,"obj":"switch","x":180,"y":107,"w":50,"h":25,"radius":25,"radius2":15}

{"page":1,"id":41,"obj":"label","x":8,"y":135,"w":30,"h":35,"text":"\uEA7A","align":1,"text_font":28,"text_color":"black"}
{"page":1,"id":42,"obj":"label","x":48,"y":145,"w":130,"h":30,"text":"Trash service","align":0,"text_font":16,"text_color":"black"}
{"page":1,"id":43,"obj":"label","x":100,"y":145,"w":130,"h":30,"text":"in 6 days","align":2,"text_color":"black"}

{"page":1,"id":51,"obj":"label","x":8,"y":170,"w":30,"h":35,"text":"\uE70D","align":1,"text_font":28,"text_color":"black"}
{"page":1,"id":52,"obj":"label","x":48,"y":180,"w":130,"h":30,"text":"Selective trash","align":0,"text_font":16,"text_color":"black"}
{"page":1,"id":53,"obj":"label","x":100,"y":180,"w":130,"h":30,"text":"in 10 days","align":2,"text_color":"black"}

{"page":1,"id":61,"obj":"label","x":8,"y":205,"w":30,"h":35,"text":"\uE32A","align":1,"text_font":28,"text_color":"black"}
{"page":1,"id":62,"obj":"label","x":48,"y":215,"w":130,"h":30,"text":"Green energy active","align":0,"text_font":16,"text_color":"black"}
{"page":1,"id":63,"obj":"label","x":100,"y":215,"w":130,"h":30,"text":"Yes :)","align":2,"text_color":"black"}

{"page":1,"id":71,"obj":"label","x":8,"y":240,"w":30,"h":35,"text":"\uE026","align":1,"text_font":28,"text_color":"black"}
{"page":1,"id":72,"obj":"label","x":48,"y":250,"w":130,"h":30,"text":"Air quality","align":0,"text_font":16,"text_color":"black"}
{"page":1,"id":73,"obj":"label","x":100,"y":250,"w":130,"h":30,"text":"OK (29.58 µg/m3)","align":2,"text_color":"black"}
```
Check out the [pagination example](example-pagination) to learn how to implement the bottom bar.  
Check out the [clock and temperature example](custom-component/sampl_conf#display-clock-and-temperature) to learn how to implement values to the top.  
Check out the [Lovelace cover example](custom-component/sampl_conf#cover-like-in-lovelace) to learn how to bring life to the objects.  

<h2>Result</h2>

![Screenshot](assets/images/screenshots/demo_lovelace_entities.png){: align=left }

<div style="clear:both;"></div>
