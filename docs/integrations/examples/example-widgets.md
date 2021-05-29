<h1>Widgets Demo</h1>

<h2>Code</h2>

This is a real-world example of a `pages.jsonl` file:

```json
{"page":1,"comment":"---------- Page 1 ----------"}
{"id":1,"obj":"btn","x":10,"y":45,"w":220,"h":55,"toggle":true,"text":"Push Me \uf0a6"}
{"id":2,"obj":"checkbox","x":10,"y":100,"w":220,"h":55,"text":"A Checkbox"}
{"id":3,"obj":"label","x":10,"y":10,"w":220,"h":30,"text":"My Label","align":1,"padh":50}
{"id":4,"obj":"switch","x":70,"y":205,"w":100,"h":55}
{"id":5,"obj":"led","x":10,"y":205,"w":55,"h":55}
{"id":6,"obj":"dropdown","x":10,"y":150,"w":150,"options":"\uf007 Line 1\n\uf007 Line 2\n\uf007 Line 3"}
{"id":7,"obj":"spinner","x":165,"y":140,"w":70,"h":70}

{"page":2,"comment":"---------- Page 2 ----------"}
{"id":11,"obj":"slider","x":10,"y":170,"w":200,"h":50}
{"id":12,"obj":"gauge","x":13,"y":10,"w":100,"h":100}
{"id":13,"obj":"bar","x":10,"y":110,"w":200,"h":50}
{"id":14,"obj":"linemeter","x":127,"y":10,"w":100,"h":100}
{"id":15,"obj":"label","x":0,"y":0,"w":70,"h":50,"parentid":5,"text":"\uf00c OK"}

{"comment":"---------- Page 3 ----------"}
{"page":3,"id":1,"obj":"cpicker","page":3,"x":20,"y":0,"w":200,"h":200}
{"page":3,"id":2,"obj":"cpicker","page":3,"x":20,"y":210,"w":200,"h":50,"rect":true}

{"page":4,"comment":"---------- Page 4 ----------"}
{"id":1,"obj":"dropdown","x":10,"y":10,"w":220,"options":"Spring\nSummer\nAutumn\nWinter"}
{"id":2,"obj":"roller","x":40,"y":50,"w":160,"rows":3,"options":"2020\n2021\n2022\n2023\n2024"}

{"page":0,"comment":"---------- All Pages ----------"}
{"id":1,"obj":"btn","x":0,"y":270,"w":75,"h":50,"opacity":100,"text":"\uF053 Prev"}
{"id":2,"obj":"btn","x":75,"y":270,"w":90,"h":50,"opacity":100,"text":"\uF015 Home"}
{"id":3,"obj":"btn","x":165,"y":270,"w":75,"h":50,"opacity":100,"text":"Next \uF054"}
```

<h2>Result</h2>

![Image](https://user-images.githubusercontent.com/1550668/113473564-87c1c780-946a-11eb-9af5-d55788207b22.png)
![Image](https://user-images.githubusercontent.com/1550668/113473575-99a36a80-946a-11eb-9c21-753baa5f216d.png)
![Image](https://user-images.githubusercontent.com/1550668/113473578-9f994b80-946a-11eb-9208-fd9918daf7de.png)
![Image](https://user-images.githubusercontent.com/1550668/113473588-a58f2c80-946a-11eb-9005-b85399283194.png)


