
<h1>Dash UI</h1>

<h2>Layout</h2>

![screenshot](../../assets/images/screenshots/dashui-060.png)

<h2>Code</h2>

To add an openHASP plate to your installation with the Dash UI sample configuration:

- in the plate's web UI select `Material Light` UI theme, choose a purple color in the Hue color bar and reboot,
- upload a `pages.jsonl` file with the folowing content to your plate's flash memory and reboot:

```json linenums="1"
{"page":1,"comment":"---------- Page 1 ----------"}
{"page":1,"id":0,"bg_color":"#FFFFFF","bg_grad_color":"#FFFFFF","text_color":"#000000","radius":0,"border_side":0}
{"page":1,"id":1,"obj":"btn","x":0,"y":0,"w":240,"h":30,"text":"LIVING ROOM","value_font":22,"bg_color":"#2C3E50","bg_grad_color":"#2C3E50","text_color":"#FFFFFF","radius":0,"border_side":0}
{"page":1,"id":2,"obj":"arc","x":5,"y":45,"w":140,"h":100,"max":40,"border_side":0,"type":0,"rotation":0,"start_angle":180,"end_angle":0,"start_angle1":180,"value_font":12,"value_ofs_x":-19,"value_ofs_y":-4,"bg_opa":0}
{"page":1,"id":3,"obj":"arc","x":130,"y":45,"w":140,"h":100,"max":100,"border_side":0,"type":0,"start_angle":180,"end_angle":0,"start_angle1":180,"value_font":12,"value_color":"#000000","value_ofs_x":-19,"value_ofs_y":-4,"bg_opa":0}
{"page":1,"id":4,"obj":"btn","x":0,"y":120,"w":240,"h":20,"val":0,"text":"CO2 levels: ","radius":0,"border_side":0}
{"page":1,"id":5,"obj":"label","x":2,"y":35,"w":140,"text":"Temperature"}
{"page":1,"id":6,"obj":"label","x":140,"y":35,"w":140,"text":"Humidity"}
{"page":1,"id":7,"obj":"btn","x":0,"y":160,"w":240,"h":20,"text":"LIGHTS","bg_color":"#F1C40F","text_color":"#FFFFFF","radius":0,"border_side":0}
{"page":1,"id":8,"obj":"label","x":20,"y":190,"w":140,"h":20,"text":"Ceiling Light"}
{"page":1,"id":9,"obj":"switch","x":160,"y":190,"w":40,"h":20}
{"page":1,"id":10,"obj":"label","x":20,"y":215,"w":140,"h":20,"text":"Wall Light"}
{"page":1,"id":11,"obj":"switch","x":160,"y":215,"w":40,"h":20}
{"page":1,"id":12,"obj":"label","x":20,"y":240,"w":200,"h":20,"text":"Ambient Light"}
{"page":1,"id":13,"obj":"slider","x":30,"y":265,"w":200,"h":10}

{"page":0,"comment":"---------- All pages ----------"}
{"page":0,"id":11,"obj":"btn","action":"prev","x":0,"y":290,"w":79,"h":32,"bg_color":"#34495E","text":"\uE141","text_color":"#000000","radius":0,"border_side":0,"text_font":32}
{"page":0,"id":12,"obj":"btn","action":"back","x":80,"y":290,"w":80,"h":32,"bg_color":"#34495E","text":"\uE2DC","text_color":"#000000","radius":0,"border_side":0,"text_font":24}
{"page":0,"id":13,"obj":"btn","action":"next","x":161,"y":290,"w":79,"h":32,"bg_color":"#34495E","text":"\uE142","text_color":"#000000","radius":0,"border_side":0,"text_font":32}
```

Assuming your plate's configured MQTT topic is `plate35`, values for Temperature, Humidity and CO2 Sensor have to be sent from another device by publishing values to the appropriate command topic:

- `hasp/plate35/command/p1b2.val %value%` - to update Temperature arc value
- `hasp/plate35/command/p1b2.value_str %value%°C` - to update Temperature text value
- `hasp/plate35/command/p1b3.val %value%` - to update Humidity arc value 
- `hasp/plate35/command/p1b3.value_str %value% %` - to update Humidity text value
- `hasp/plate35/command/p1b4.text CO2 levels: %value%` - to update CO2 level value

