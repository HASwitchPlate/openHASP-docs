
<h1>Handle offline state</h1>

openHASP can detect the state when the plate is disconnected from the network. With [Group ID](../../../configuration/gpio/#group) object property combined with [batch processing](../../../commands/#batch-processinng), objects on the screen can act on locally connected devices without using the home automation system - letting you use only these devices when the network is down.

<h2>Prerequisites</h2>

In the use case presented below, the following assumptions are made:

- you have a plate with 2 local relays (configured on [output GPIOs](../../../configuration/gpio/#output-pin) as lights), each relay added to a different group (Group 1 and 2 respectively).
- you want to have 2 toggle buttons on the screen acting directly on these relays when the plate is not yet, or disconnected from the WiFi network. No page navigation is needed as no other objects related to the home automation services have to be displayed.

<h2>Configuration</h2>

In the plate's web UI keep the default `/pages.jsonl` as Startup Layout. This will load immediately after plate boot, before the pate is connected to the network. If your network is not available after boot, this page configuration will be on screen while the plate keeps connecting in the background.

`pages.jsonl` - loaded at boot, has only with objects related to local relays, and displays the hostname:

```json
{"page":1,"id":1,"obj":"btn","x":0,"y":0,"w":240,"h":30,"text":"LIGHTS","text_font":16,"bg_color":"#2C3E50","text_color":"#FFFFFF","radius":0,"border_side":0,"click":0}
{"page":1,"id":2,"obj":"btn","x":10,"y":40,"w":220,"h":115,"toggle":true,"text":"\uE335","text_font":32,"mode":"break","align":1,"radius":20,"groupid":1}
{"page":1,"id":3,"obj":"btn","x":10,"y":165,"w":220,"h":115,"toggle":true,"text":"\uE335","text_font":32,"mode":"break","align":1,"radius":20,"groupid":2}
{"page":1,"id":98,"obj":"btn","x":0,"y":290,"w":240,"h":30,"bg_color":"#2C3E50","text_color":"#FFFFFF","radius":0,"border_side":0,"click":0}
{"page":1,"id":99,"obj":"label","x":0,"y":295,"w":240,"align":"center","text": "%hostname%","text_color":"#FFFFFF"}
```

You can use [batch processing](../../../commands/#batch-processinng) and create scripts which run when the plate connects to the WiFi network or loses connection from it.

`online.cmd` - batch script to run after connected to the WiFi network will clear the screen and load the pages with objects related to the home automation:

```
clearpage all
run /pages_online.jsonl
```

`pages_online.jsonl` - to be loaded after connected to the WiFi network:

Put in `pages_online.jsonl` the main configuration for the pages you'd like to use when the pate is connected to the network and the home automation system. See integraions examples corresponding to the home automation system you have.

`offline.cmd` - batch script to run when connection is lost from the WiFi network will clear the screen and load the page only with objects related to local relays:

```
clearpage all
run /pages_offline.jsonl
```

`pages_offline.jsonl` - to be loaded after connection is lost to the WiFi network, has only with objects related to local relays:

```json
{"page":1,"id":1,"obj":"btn","x":0,"y":0,"w":240,"h":30,"text":"LIGHTS","text_font":16,"bg_color":"#2C3E50","text_color":"#FFFFFF","radius":0,"border_side":0,"click":0}
{"page":1,"id":2,"obj":"btn","x":10,"y":40,"w":220,"h":115,"toggle":true,"text":"\uE335","text_font":32,"mode":"break","align":1,"radius":20,"groupid":1}
{"page":1,"id":3,"obj":"btn","x":10,"y":165,"w":220,"h":115,"toggle":true,"text":"\uE335","text_font":32,"mode":"break","align":1,"radius":20,"groupid":2}
{"page":1,"id":99,"obj":"btn","x":0,"y":290,"w":240,"h":30,"text":"\uE156\uE5A9","text_font":16,"bg_color":"#2C3E50","text_color":"#FFFFFF","radius":0,"border_side":0,"click":0}

```

<h2>Testing</h2>

- Reboot the plate. First only the buttons related to local relays are shown, these act the relays. After the plate connects to the network, screen is cleared and home automation-related pages are loaded.
- Kill the WiFi network. Plate detects the disconnection from the network, thus screen is cleared and only the buttons related to local relays are shown, relays can be turned on and off.
- Restore the WiFi network. Plate reconnects to the network, screen is cleared and home automation-related pages are loaded back again.


