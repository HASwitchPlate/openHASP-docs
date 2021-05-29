<h1>Widgets Demo</h1>

<h2>Code</h2>

This is a real-world example of a `pages.jsonl` file:

```json
{"page":1,"comment":"---------- Page 1 ----------"}
{"id":1,"obj":"btn","x":10,"y":45,"w":220,"h":55,"toggle":true,"text":"Push Me \uF40B"}
{"id":2,"obj":"checkbox","x":10,"y":100,"w":220,"h":55,"text":" My Checkbox"}
{"id":3,"obj":"label","x":10,"y":10,"w":220,"h":30,"text":"\uE75A My Label","align":1,"padh":50}
{"id":4,"obj":"switch","x":100,"y":220,"w":120,"h":55}
{"id":5,"obj":"led","x":10,"y":220,"w":55,"h":55}
{"id":6,"obj":"dropdown","x":10,"y":160,"w":130,"options":"\uE40A Apples\n\uE40A Oranges\n\uE40A Bananas"}
{"id":7,"obj":"spinner","x":160,"y":140,"w":70,"h":70}

{"page":2,"comment":"---------- Page 2 ----------"}
{"id":11,"obj":"slider","x":20,"y":260,"w":200,"h":20,"val":25}
{"id":12,"obj":"gauge","x":10,"y":10,"w":150,"h":150,"val":75}
{"id":13,"obj":"bar","x":20,"y":232,"w":200,"h":20, "val":75}
{"id":14,"obj":"linemeter","x":130,"y":125,"w":100,"h":100,"val":32}
{"id":15,"obj":"label","x":30,"y":65,"w":70,"h":70,"parentid":14,"text":"\uE12C OK"}

{"comment":"---------- Page 3 ----------"}
{"page":3,"id":1,"obj":"cpicker","page":3,"x":20,"y":0,"w":200,"h":200}
{"page":3,"id":2,"obj":"cpicker","page":3,"x":30,"y":220,"w":200,"h":40,"rect":true}

{"page":4,"comment":"---------- Page 4 ----------"}
{"id":1,"obj":"roller","x":40,"y":15,"w":160,"rows":3,"options":"2020\n2021\n2022\n2023\n2024"}
{"id":2,"obj":"img","src":"/littlefs/logo-medium.png","x":45,"y":130,"auto_size":1,"w":150}

{"comment":"---------- All Pages ----------"}
{"page":0,"id":7,"obj":"btn","action":"prev","x":0,"y":290,"w":79,"h":32,"text":"\uE141","text_color":"#FFFFFF","radius":0,"border_side":0,"text_font":32}
{"page":0,"id":8,"obj":"btn","action":"back","x":80,"y":290,"w":80,"h":32,"text":"\uE2DC","text_color":"#FFFFFF","radius":0,"border_side":0,"text_font":24}
{"page":0,"id":9,"obj":"btn","action":"next","x":161,"y":290,"w":79,"h":32,"text":"\uE142","text_color":"#FFFFFF","radius":0,"border_side":0,"text_font":32}

{"comment":"---------- Limit page prev/next between 1 and 4 ----------"}
{"page":1,"id":0,"prev":4}
{"page":4,"id":0,"next":1}

```

Upload [this logo](https://raw.githubusercontent.com/HASwitchPlate/openHASP-docs/0.6/docs/assets/images/logo-medium.png) to the plate.

<h2>Result</h2>

![screenshot](https://user-images.githubusercontent.com/1550668/120073363-3ca5e880-c098-11eb-82d8-ad58cf4a9d66.png)
![screenshot](https://user-images.githubusercontent.com/1550668/120073369-44658d00-c098-11eb-9ad7-c318866c62c2.png)
![screenshot](https://user-images.githubusercontent.com/1550668/120073374-492a4100-c098-11eb-9ac2-1144bd039eea.png)
![screenshot](https://user-images.githubusercontent.com/1550668/120074302-7b3da200-c09c-11eb-9fa8-7396e02b63bc.png)



