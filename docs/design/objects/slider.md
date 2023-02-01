
# Slider
**obj:`slider`**

![lv_slider](../lv_ex_slider_1.png)

| Property | Value      | Default | Description
|----------|------------|---------|---------------
| min      | [int16][9]      | 0       | minimum value of the indicator
| max      | [int16][9]      | 100     | maximum value of the indicator
| val      | [int16][9]      | 0       | current value of the indicator
| start_value | [int16][9]   | 0       | optional minimal allowed value of the indicator

Vertical sliders can be created if the width of the object is smaller than its height.

!!! note
    `min`, `max`, `val` and `start_value` also support negative values.
   
??? example "Example `jsonl`"
    ```json linenums="1"
    {"page":1,"id":6,"obj":"slider","x":20,"y":250,"w":200,"h":20,"min":15,"max":35}
    ```
While pressing and dragging the `slider` object the following events are sent: `down` (old value), `changed` (repeatedly until released) and `up` (value at the moment of releasing it):

```json linenums="1"
{"event":"down","val":21}
{"event":"changed","val":22}
{"event":"changed","val":23}
{"event":"changed","val":25}
{"event":"changed","val":27}
{"event":"changed","val":29}
{"event":"up","val":31}
```
<!--
## Double Slider
**objid:30**

| Property | Value      | Default | Description
|----------|------------|---------|---------------
| min      | [int16][9]      | 0       | minimum value of the indicator
| max      | [int16][9]      | 100     | maximum value of the indicator
| val      | [int16][9]      | 0       | current value of the indicator
-->
