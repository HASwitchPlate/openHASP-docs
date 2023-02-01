
# Progress Bar
**obj:`bar`**

![lv_bar](../images/lv_ex_bar_1.png)

| Property | Value      | Default | Description
|----------|------------|---------|---------------
| min      | [int16][9]      | 0       | minimum value of the indicator
| max      | [int16][9]      | 100     | maximum value of the indicator
| val      | [int16][9]      | 0       | current value of the indicator
| start_value | [int16][9]   | 0       | optional minimal allowed value of the indicator

Vertical bars can be created if the width of the object is smaller than its height.

!!! note
    `min`, `max`, `val` and `start_value` also support negative values.
