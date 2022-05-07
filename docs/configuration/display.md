# Display Settings

Configure the overal settings of the display driver.

<div class="row justify-content-center">
            <a href="../../assets/images/settings/gui_settings.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-8" data-title="Display Settings" data-footer="">
                <img src="../../assets/images/settings/gui_settings.png" class="img-fluid img-thumbnail">
            </a>
</div>

## Web UI

### Short Idle 

When the display has not been touched for the Short Idle amount of seconds, an `idle = short` event will be sent out.

### Long Idle 

When the display has not been touched for Long + Short Idle amount of seconds, an `idle = long` event will be sent out.

The Long Idle period begins to count *after* the Short Idle period.

### Orientation

Rotate the display by the set number of degrees and optionally mirror the display as well.

### Invert Colors

Enable color inversion of the display. This can be enabled if the colors on the display are wrong *e.g. cyan objects is displayed in orange*.

### Show Pointer

Enable this option to show a mouse pointer. This helps with checking if the touches are correctly detected.
The pointer is hidden automatically when the display is idle.

### Backlight Pin

Sets the GPIO pin which is used for PWM dimming of the backlight.

### Invert Backlight

By default openHASP will set the backlight pin `HIGH` to turn on the backlight.
For some devices, the backlight will turn on when the pin is `LOW` instead.
Enable Invert Backlight to swap the *on/off* behavior.

### Calibrate

*Only available with XPT2046 resistive touchscreen controllers.*

Starts an on-screen calibration sequence.

### Run Anti Burn-in

Click this button to run the `antiburn` command, which will display *white noise* on the LCD for approximately 30 seconds.
This can help to reduce ghosting of a static image on some displays. It also trains the pixels to show different colors which can prolong the lifespan of the display.

---

Click 'Save Settings' to save your settings to the device. A restart is required to make the settings active. Navigate back to the Main Menu and click Restart to activate the settings.

