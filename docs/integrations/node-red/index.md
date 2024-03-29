# Node-RED

You can integrate an openHASP plate in Node-RED by subscribing and publishing to its MQTT topics.

The following is an example of how to use Node-RED to read PIN numbers from an alarm button matrix on page 12, and display those numbers back to the screen on p12b2.

First we define p12b1 as the matrix, and p12b2 as the area where to re-display the PIN.  Add the following to `pages_online.jsonl`

```json
{"comment":" ----------- Page 12 layout ------------"}

{"page":12,"id":1,"obj":"btnmatrix","x":10,"y":40,"w":220,"h":220,"options":["1","2","3","\n","4","5","6","\n","7","8","9","\n","Home","0","Away"],"toggle":false,"one_check":false}
{"page":12,"id":2,"obj":"label","x":104,"y":22,"h":30,"w":40,"text":"    ","text_color":"white","align":0,"bg_color":"#2C3E50"}

```


![Button Matrix](./media/buttonmatrix.jpg)

![Node-RED Flow Visualised](./media/node-red-alarm.jpg)


The following jsonl is for 13 Lanbon L8 panels and can be imported

```json
[
    {
        "id": "0b80aa53cbe8e6e2",
        "type": "tab",
        "label": "Lanbon Security Panel",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "e7faec55927cd35a",
        "type": "mqtt in",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "topic": "hasp/livingroom/state/p12b1",
        "qos": "0",
        "datatype": "utf8",
        "broker": "441d674c9c4a7f07",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 140,
        "y": 80,
        "wires": [
            [
                "8ac3fdee648284fe"
            ]
        ]
    },
    {
        "id": "99cabcc7d52bfc9b",
        "type": "debug",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 1290,
        "y": 200,
        "wires": []
    },
    {
        "id": "ac7b661dc1513061",
        "type": "change",
        "z": "0b80aa53cbe8e6e2",
        "name": "MakeNums",
        "rules": [
            {
                "t": "change",
                "p": "payload",
                "pt": "msg",
                "from": "{\"event\":\"down\",\"val\":0,\"text\":\"1\"}",
                "fromt": "str",
                "to": "1",
                "tot": "str"
            },
            {
                "t": "change",
                "p": "payload",
                "pt": "msg",
                "from": "{\"event\":\"down\",\"val\":1,\"text\":\"2\"}",
                "fromt": "str",
                "to": "2",
                "tot": "str"
            },
            {
                "t": "change",
                "p": "payload",
                "pt": "msg",
                "from": "{\"event\":\"down\",\"val\":2,\"text\":\"3\"}",
                "fromt": "str",
                "to": "3",
                "tot": "str"
            },
            {
                "t": "change",
                "p": "payload",
                "pt": "msg",
                "from": "{\"event\":\"down\",\"val\":3,\"text\":\"4\"}",
                "fromt": "str",
                "to": "4",
                "tot": "str"
            },
            {
                "t": "change",
                "p": "payload",
                "pt": "msg",
                "from": "{\"event\":\"down\",\"val\":4,\"text\":\"5\"}",
                "fromt": "str",
                "to": "5",
                "tot": "str"
            },
            {
                "t": "change",
                "p": "payload",
                "pt": "msg",
                "from": "{\"event\":\"down\",\"val\":5,\"text\":\"6\"}",
                "fromt": "str",
                "to": "6",
                "tot": "str"
            },
            {
                "t": "change",
                "p": "payload",
                "pt": "msg",
                "from": "{\"event\":\"down\",\"val\":6,\"text\":\"7\"}",
                "fromt": "str",
                "to": "7",
                "tot": "str"
            },
            {
                "t": "change",
                "p": "payload",
                "pt": "msg",
                "from": "{\"event\":\"down\",\"val\":7,\"text\":\"8\"}",
                "fromt": "str",
                "to": "8",
                "tot": "str"
            },
            {
                "t": "change",
                "p": "payload",
                "pt": "msg",
                "from": "{\"event\":\"down\",\"val\":8,\"text\":\"9\"}",
                "fromt": "str",
                "to": "9",
                "tot": "str"
            },
            {
                "t": "change",
                "p": "payload",
                "pt": "msg",
                "from": "{\"event\":\"down\",\"val\":10,\"text\":\"0\"}",
                "fromt": "str",
                "to": "0",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 450,
        "y": 160,
        "wires": [
            [
                "9739abb6f93766f6"
            ]
        ]
    },
    {
        "id": "d23a2c349910face",
        "type": "function",
        "z": "0b80aa53cbe8e6e2",
        "name": "BuildPIN",
        "func": "var pin=global.get('pin') || \"\";\n\nvar count=global.get('count') || 0;\ncount +=1;\nglobal.set('count',count)\n\npin = pin+msg.payload;\nglobal.set('pin',pin)\n\n\nif (count >= 4) {\n  msg.payload=pin;\n  global.set('count',undefined)\n  global.set('pin',undefined)\n  return msg;\n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 180,
        "wires": [
            [
                "194eed57a4506f13",
                "eaa539f1f670e8ea",
                "978adaf5813fc4c9",
                "421fb70f969f4c42",
                "4b8a2bd06dcf1342"
            ]
        ]
    },
    {
        "id": "8ac3fdee648284fe",
        "type": "switch",
        "z": "0b80aa53cbe8e6e2",
        "name": "OnDown",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "cont",
                "v": "{\"event\":\"down\"",
                "vt": "str"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 1,
        "x": 420,
        "y": 80,
        "wires": [
            [
                "5249d096ebe1aab7",
                "ac7b661dc1513061"
            ]
        ]
    },
    {
        "id": "978adaf5813fc4c9",
        "type": "api-call-service",
        "z": "0b80aa53cbe8e6e2",
        "name": "Disarm Alarm",
        "server": "669eed80.4f9844",
        "version": 5,
        "debugenabled": false,
        "domain": "alarm_control_panel",
        "service": "alarm_disarm",
        "areaId": [],
        "deviceId": [],
        "entityId": [
            "alarm_control_panel.alarm"
        ],
        "data": "{\"code\":msg.payload}",
        "dataType": "jsonata",
        "mergeContext": "",
        "mustacheAltTags": false,
        "outputProperties": [],
        "queue": "none",
        "x": 920,
        "y": 200,
        "wires": [
            [
                "99cabcc7d52bfc9b"
            ]
        ]
    },
    {
        "id": "8b34728627566066",
        "type": "mqtt in",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "topic": "hasp/mainhall/state/p12b1",
        "qos": "0",
        "datatype": "utf8",
        "broker": "441d674c9c4a7f07",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 150,
        "y": 140,
        "wires": [
            [
                "8ac3fdee648284fe"
            ]
        ]
    },
    {
        "id": "da5ff263f7265cee",
        "type": "mqtt in",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "topic": "hasp/ensuite/state/p12b1",
        "qos": "0",
        "datatype": "utf8",
        "broker": "441d674c9c4a7f07",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 150,
        "y": 200,
        "wires": [
            [
                "8ac3fdee648284fe"
            ]
        ]
    },
    {
        "id": "16c2241ebfe6d928",
        "type": "mqtt in",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "topic": "hasp/mbr/state/p12b1",
        "qos": "0",
        "datatype": "utf8",
        "broker": "441d674c9c4a7f07",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 160,
        "y": 260,
        "wires": [
            [
                "8ac3fdee648284fe"
            ]
        ]
    },
    {
        "id": "9152a3b91fa4ce8a",
        "type": "mqtt in",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "topic": "hasp/porch/state/p12b1",
        "qos": "0",
        "datatype": "utf8",
        "broker": "441d674c9c4a7f07",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 150,
        "y": 320,
        "wires": [
            [
                "8ac3fdee648284fe"
            ]
        ]
    },
    {
        "id": "df2df457211af7fa",
        "type": "mqtt in",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "topic": "hasp/dining/state/p12b1",
        "qos": "0",
        "datatype": "utf8",
        "broker": "441d674c9c4a7f07",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 150,
        "y": 380,
        "wires": [
            [
                "8ac3fdee648284fe"
            ]
        ]
    },
    {
        "id": "ef006a2ad5f4033f",
        "type": "mqtt in",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "topic": "hasp/downbath/state/p12b1",
        "qos": "0",
        "datatype": "utf8",
        "broker": "441d674c9c4a7f07",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 140,
        "y": 440,
        "wires": [
            [
                "8ac3fdee648284fe"
            ]
        ]
    },
    {
        "id": "6dc9dabe1edb7af5",
        "type": "mqtt in",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "topic": "hasp/kitchen/state/p12b1",
        "qos": "0",
        "datatype": "utf8",
        "broker": "441d674c9c4a7f07",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 150,
        "y": 500,
        "wires": [
            [
                "8ac3fdee648284fe"
            ]
        ]
    },
    {
        "id": "fb8196aa68104765",
        "type": "mqtt in",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "topic": "hasp/garage/state/p12b1",
        "qos": "0",
        "datatype": "utf8",
        "broker": "441d674c9c4a7f07",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 150,
        "y": 560,
        "wires": [
            [
                "8ac3fdee648284fe"
            ]
        ]
    },
    {
        "id": "a416144df4052b42",
        "type": "mqtt in",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "topic": "hasp/downhall/state/p12b1",
        "qos": "0",
        "datatype": "utf8",
        "broker": "441d674c9c4a7f07",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 140,
        "y": 620,
        "wires": [
            [
                "8ac3fdee648284fe"
            ]
        ]
    },
    {
        "id": "9305a215bd8a3a87",
        "type": "mqtt out",
        "z": "0b80aa53cbe8e6e2",
        "name": "MQTTPublishMood",
        "topic": "hasp/plates/command",
        "qos": "0",
        "retain": "",
        "respTopic": "",
        "contentType": "",
        "userProps": "",
        "correl": "",
        "expiry": "",
        "broker": "441d674c9c4a7f07",
        "x": 1310,
        "y": 40,
        "wires": []
    },
    {
        "id": "5249d096ebe1aab7",
        "type": "change",
        "z": "0b80aa53cbe8e6e2",
        "name": "White",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "moodlight {\"state\": true, \"r\": 255, \"g\": 255, \"b\": 255, \"brightness\": 255}",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 650,
        "y": 40,
        "wires": [
            [
                "1c99afe47fe6da11",
                "9305a215bd8a3a87"
            ]
        ]
    },
    {
        "id": "3a59fcd31e572bb0",
        "type": "change",
        "z": "0b80aa53cbe8e6e2",
        "name": "Black",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "moodlight {\"state\": true, \"r\": 0, \"g\": 0, \"b\": 0, \"brightness\": 255}",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 810,
        "y": 80,
        "wires": [
            [
                "9305a215bd8a3a87"
            ]
        ]
    },
    {
        "id": "197cb8bad0ea98a3",
        "type": "api-call-service",
        "z": "0b80aa53cbe8e6e2",
        "name": "ArmAway",
        "server": "669eed80.4f9844",
        "version": 5,
        "debugenabled": false,
        "domain": "alarm_control_panel",
        "service": "alarm_arm_away",
        "areaId": [],
        "deviceId": [],
        "entityId": [
            "alarm_control_panel.alarm"
        ],
        "data": "{\"code\":\"1776\"}",
        "dataType": "jsonata",
        "mergeContext": "",
        "mustacheAltTags": false,
        "outputProperties": [],
        "queue": "none",
        "x": 940,
        "y": 320,
        "wires": [
            [
                "99cabcc7d52bfc9b"
            ]
        ]
    },
    {
        "id": "eaa539f1f670e8ea",
        "type": "change",
        "z": "0b80aa53cbe8e6e2",
        "name": "Purple",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "moodlight {\"state\": true, \"r\": 255, \"g\": 0, \"b\": 255, \"brightness\": 255}",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 950,
        "y": 380,
        "wires": [
            [
                "9305a215bd8a3a87",
                "cae42e223294ce38"
            ]
        ]
    },
    {
        "id": "194eed57a4506f13",
        "type": "function",
        "z": "0b80aa53cbe8e6e2",
        "name": "Reset",
        "func": "  global.set('count',undefined)\n  global.set('pin',undefined)\n  msg.payload = \"\"",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 240,
        "wires": [
            [
                "421fb70f969f4c42"
            ]
        ]
    },
    {
        "id": "9739abb6f93766f6",
        "type": "switch",
        "z": "0b80aa53cbe8e6e2",
        "name": "0-9HomeAway",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "btwn",
                "v": "0",
                "vt": "num",
                "v2": "9",
                "v2t": "num"
            },
            {
                "t": "eq",
                "v": "{\"event\":\"down\",\"val\":9,\"text\":\"Home\"}",
                "vt": "str"
            },
            {
                "t": "eq",
                "v": "{\"event\":\"down\",\"val\":11,\"text\":\"Away\"}",
                "vt": "str"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 3,
        "x": 440,
        "y": 240,
        "wires": [
            [
                "d23a2c349910face",
                "f9f85bc88ea6f404"
            ],
            [
                "194eed57a4506f13"
            ],
            [
                "194eed57a4506f13",
                "c861944aac699e3e",
                "206a424a07c9fb22"
            ]
        ]
    },
    {
        "id": "11dad534fd1a944e",
        "type": "change",
        "z": "0b80aa53cbe8e6e2",
        "name": "Black",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "moodlight {\"state\": true, \"r\": 0, \"g\": 0, \"b\": 0, \"brightness\": 255}",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 1010,
        "y": 440,
        "wires": [
            [
                "9305a215bd8a3a87"
            ]
        ]
    },
    {
        "id": "cae42e223294ce38",
        "type": "delay",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 880,
        "y": 440,
        "wires": [
            [
                "11dad534fd1a944e"
            ]
        ]
    },
    {
        "id": "4b8a2bd06dcf1342",
        "type": "mqtt out",
        "z": "0b80aa53cbe8e6e2",
        "name": "MQTTPublishPIN",
        "topic": "hasp/plates/command/p12b2.text",
        "qos": "0",
        "retain": "",
        "respTopic": "",
        "contentType": "",
        "userProps": "",
        "correl": "",
        "expiry": "",
        "broker": "441d674c9c4a7f07",
        "x": 1310,
        "y": 120,
        "wires": []
    },
    {
        "id": "f9f85bc88ea6f404",
        "type": "function",
        "z": "0b80aa53cbe8e6e2",
        "name": "DisplayPIN",
        "func": "var pin=global.get('pin')\n// pin = pin+msg.payload;\nmsg.payload = pin;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 140,
        "wires": [
            [
                "4b8a2bd06dcf1342"
            ]
        ]
    },
    {
        "id": "149782424f319147",
        "type": "change",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "****",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 1040,
        "y": 500,
        "wires": [
            [
                "4b8a2bd06dcf1342",
                "88031b2f0bea8fef"
            ]
        ]
    },
    {
        "id": "421fb70f969f4c42",
        "type": "delay",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "pauseType": "delay",
        "timeout": "500",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 870,
        "y": 500,
        "wires": [
            [
                "149782424f319147"
            ]
        ]
    },
    {
        "id": "88031b2f0bea8fef",
        "type": "delay",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "pauseType": "delay",
        "timeout": "500",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 870,
        "y": 560,
        "wires": [
            [
                "bf47160c100015ca"
            ]
        ]
    },
    {
        "id": "bf47160c100015ca",
        "type": "change",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "    ",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 1040,
        "y": 560,
        "wires": [
            [
                "4b8a2bd06dcf1342"
            ]
        ]
    },
    {
        "id": "c861944aac699e3e",
        "type": "delay",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "pauseType": "delay",
        "timeout": "15",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 660,
        "y": 300,
        "wires": [
            [
                "371b17d0dd9918dc",
                "24f9431e18e5d5f2"
            ]
        ]
    },
    {
        "id": "1c99afe47fe6da11",
        "type": "delay",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "pauseType": "delay",
        "timeout": "300",
        "timeoutUnits": "milliseconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 670,
        "y": 80,
        "wires": [
            [
                "3a59fcd31e572bb0"
            ]
        ]
    },
    {
        "id": "206a424a07c9fb22",
        "type": "change",
        "z": "0b80aa53cbe8e6e2",
        "name": "30 sec",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "Alarm will arm away in 30 seconds",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 410,
        "y": 300,
        "wires": [
            []
        ]
    },
    {
        "id": "24f9431e18e5d5f2",
        "type": "change",
        "z": "0b80aa53cbe8e6e2",
        "name": "15 sec",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "15 seconds",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 410,
        "y": 360,
        "wires": [
            []
        ]
    },
    {
        "id": "371b17d0dd9918dc",
        "type": "delay",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "pauseType": "delay",
        "timeout": "10",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 660,
        "y": 360,
        "wires": [
            [
                "b8098924ec49405c",
                "56b96ab40a26daeb"
            ]
        ]
    },
    {
        "id": "b8098924ec49405c",
        "type": "delay",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "pauseType": "delay",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 660,
        "y": 420,
        "wires": [
            [
                "197cb8bad0ea98a3"
            ]
        ]
    },
    {
        "id": "56b96ab40a26daeb",
        "type": "change",
        "z": "0b80aa53cbe8e6e2",
        "name": "5 Secs",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "5 Seconds",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 410,
        "y": 420,
        "wires": [
            []
        ]
    },
    {
        "id": "0b8f9dbd664953e2",
        "type": "api-call-service",
        "z": "0b80aa53cbe8e6e2",
        "name": "ArmHome",
        "server": "669eed80.4f9844",
        "version": 5,
        "debugenabled": false,
        "domain": "alarm_control_panel",
        "service": "alarm_arm_home",
        "areaId": [],
        "deviceId": [],
        "entityId": [
            "alarm_control_panel.alarm"
        ],
        "data": "{\"code\":\"1776\"}",
        "dataType": "jsonata",
        "mergeContext": "",
        "mustacheAltTags": false,
        "outputProperties": [],
        "queue": "none",
        "x": 940,
        "y": 260,
        "wires": [
            [
                "99cabcc7d52bfc9b"
            ]
        ]
    },
    {
        "id": "0bf633ce2d98dd79",
        "type": "mqtt in",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "topic": "hasp/upbath/state/p12b1",
        "qos": "0",
        "datatype": "utf8",
        "broker": "441d674c9c4a7f07",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 150,
        "y": 680,
        "wires": [
            [
                "8ac3fdee648284fe"
            ]
        ]
    },
    {
        "id": "e3bf26032c55a701",
        "type": "debug",
        "z": "0b80aa53cbe8e6e2",
        "name": "debug 1",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 640,
        "y": 580,
        "wires": []
    },
    {
        "id": "9a8d3eea339efbdc",
        "type": "mqtt in",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "topic": "hasp/allys_room/state/p12b1",
        "qos": "0",
        "datatype": "utf8",
        "broker": "441d674c9c4a7f07",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 140,
        "y": 740,
        "wires": [
            [
                "8ac3fdee648284fe"
            ]
        ]
    },
    {
        "id": "7aac330a4bb67fe8",
        "type": "mqtt in",
        "z": "0b80aa53cbe8e6e2",
        "name": "",
        "topic": "hasp/victorias_room/state/p12b1",
        "qos": "0",
        "datatype": "utf8",
        "broker": "441d674c9c4a7f07",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 130,
        "y": 800,
        "wires": [
            [
                "8ac3fdee648284fe"
            ]
        ]
    },
    {
        "id": "441d674c9c4a7f07",
        "type": "mqtt-broker",
        "name": "192.168.0.21",
        "broker": "192.168.0.21",
        "port": "1883",
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": "4",
        "keepalive": "60",
        "cleansession": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willPayload": "",
        "willMsg": {},
        "sessionExpiry": ""
    },
    {
        "id": "669eed80.4f9844",
        "type": "server",
        "name": "Home Assistant",
        "version": 5,
        "addon": true,
        "rejectUnauthorizedCerts": true,
        "ha_boolean": "y|yes|true|on|home|open",
        "connectionDelay": false,
        "cacheJson": false,
        "heartbeat": false,
        "heartbeatInterval": 30,
        "areaSelector": "friendlyName",
        "deviceSelector": "friendlyName",
        "entitySelector": "friendlyName",
        "statusSeparator": "at: ",
        "statusYear": "hidden",
        "statusMonth": "short",
        "statusDay": "numeric",
        "statusHourCycle": "h23",
        "statusTimeFormat": "h:m",
        "enableGlobalContextStore": true
    }
]
```