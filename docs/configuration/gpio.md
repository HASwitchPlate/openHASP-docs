<h1>GPIO Settings</h1>

You can attach external devices like buttons, switches, relays or LEDs using the GPIO pins of the ESP.

## Web UI

![GPIO Settings](../assets/images/settings/gpio_addpin.png "GPIO Add New Pin") &nbsp;
![GPIO Pin Configuration](../assets/images/settings/gpio_pinconfig.png "GPIO Pin Configuration")

## Pin

Select the pin of the gpio to use.

Pins known to be in use will be hidden from this list.
Check the documentation of your board to see which pins are free to be used as gpio.

## Groupid

GPIOs and objects can be grouped together by specifying a groupid. The state of objects is then altered by any object in the same group. This allows for simple action-reaction scenarios without relying on a home automation system:

- Link a switch and relay together
- Link a push button and doorbell together

The applied value is *normalized* and *proportionate* to the value of the input object, much like a percentage:

- Binary objects, like a switch, checkbox or toggle button only pass along 0% and 100% values.
- Range objects, like a slider, arc slider, roller or drop-down list pass along a value between 0-65535, depending on their current `min`, `max` and `val` attributes.

!!! note "Note"
    The grouping of multiple gpios and objects together is intended for simple actions only.
    More complex actions should be performed by a home automation system, without linking groupids together.

## Default state

The polarity of the gpio when it is *not* being engaged i.e. the gpio is not connected, zero or idle:

- `HIGH`: The default state is high using the internal PULL_UP resistor. 
- `LOW`: The default state is low using the internal PULL_DOWN resistor. 

## Types

### Button

A button gpio sends events to topic `input#` where `#` is the groupnumber.

GPIO buttons send out **events** while they occur. The possible events are:

- `down`: Occurs when a button goes from depressed to pressed
- `up`: The button was released within a short time i.e. a short click has occurred
- `long`: A single LONG event is send when the button is *still* being pressed after the threshold time of 400ms
- `release`: The button is released after being pressing for a LONG threshold time.
<!-- - `HOLD`: The HOLD event is repeated every 400ms while the button is still pressed -->
<!-- - `LOST`: This event occurs when the object looses the focus while the screen is still being touched -->


The values of objects or gpios with the same groupid will be set to maximum when the button is being pressed and to minimum when the button is released.

### Switch

A switch gpio sends events to `input#` where `#` is the groupnumber.

GPIO Switches send out their **value** when toggled: {"val":"0"} or {"val":"1"}.

The values of objects or gpios in the same group will be set to maximum when the switch is turned on
and to minimum when the switch is turned off.

### Relay

Set the relay ON or OFF when an event is received on `output#` where `#` is the groupnumber or from another group `intput`.

When a relay is grouped with a button or switch in the same group, it will be turned ON or OFF according to the state of the button or switch.

When a relay is controlled by a range object (slider, arc slider, roller, drop-down list) within the same group, the state will be be ON if the `.val` value is halfway the range or above.

!!! danger "Warning"
    Attaching devices to mains power can be dangerous!
    Configuring gpios is done on your **own responsibility**.
    Be sure to test any system thoroughly using low voltages first.

### Led

Set the brightness of the LED between `0` and `255` when a value is received on `output#` where `#` is the groupnumber.

When a led is controlled by a button or switch in the same group, it will be turned ON or off according to the state of the button or switch.

When a led is controlled by a range object (slider, arc slider, roller, drop-down list) in the same group, the brightness will be proportional to the `.val` value of the object within its range (`min-max`).

For example:

Consider a roller or drop-down list with 4 options: `OFF`, `Low`, `Medium` and `High`.
The `.val` values can range from 0 to 3.
These will set the brightness of the led to 0 (0%), 84 (33%), 170 (66%) and 255 (100%) respectively.

For a roller or drop-down list with 5 options, `.val` ranges between 0 and 4. The brightness of the led increases 25% with each step.


### PWM

Set the duty cycle of the pin between `0` and `4095` when a value is received on `output#` where `#` is the groupnumber or from another group `intput`.

When the PWM gpio is grouped with a button or switch, its duty cycle is either set to full-duty or off according to the state of the button or switch.

When the PWM gpio is grouped with range object (slider, arc slider, roller, drop-down list), the duty cycle is proportional to the `.val` value of the object within its range (`min-max`).

## Idle State

The GPIO pins do *not* affect the idle state of the device. Only interacting with the touchscreen automatically resets the idle state.

If you want a GPIO pin to wakeup the device, you should monitor its mqtt topic and use the [`idle`](../../commands#idle) and [`backlight`](../../commands#backlight) commands appropriately.


---

Click 'Save Settings' to save your settings to the device. A restart is required to make the settings active. Navigate back to the Main Menu and click Restart to activate the settings.

