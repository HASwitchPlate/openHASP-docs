# Waveshare ESP32-S3 Touch LCD :material-new-box:{ .tag-large }

<div class="row justify-content-center">
        <a href="../images/waveshare-esp32-s3-touch-lcd43-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-5" data-title="Waveshare ESP32-S3 Touch LCD 4.3&quot;">
            <img src="../images/waveshare-esp32-s3-touch-lcd43-front.jpg" class="img-fluid">
        </a>
        <a href="../images/waveshare-esp32-s3-touch-lcd7-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-5" data-title="Waveshare ESP32-S3 Touch LCD 7&quot;">
            <img src="../images/waveshare-esp32-s3-touch-lcd7-front.jpg" class="img-fluid">
        </a>
</div>

The Waveshare ESP32-S3 Touch LCD range consists of 4.3" and 7.0"
RGB displays. Both models use an ESP32-S3 module with integrated
2.4 GHz Wi-Fi and Bluetooth 5.0 and feature a capacitive touchscreen.

Both displays use an 800 × 480 RGB interface and share much of the
same hardware, pin configuration and openHASP configuration.

## Models

{!hardware/waveshare/esp32-s3-touch-lcd-table.html!}

## Hardware

Both models are based on the ESP32-S3 and include PSRAM, making them
well suited for openHASP applications using larger numbers of fonts
and graphics.

The displays use the GT911 capacitive touch controller.

## Backlight

The display backlight requires a hardware connection to an ESP32 GPIO
before it can be controlled by openHASP.

### 4.3"

The default backlight GPIO is **GPIO6**.

### 7.0"

The backlight can be controlled using **GPIO6** or **GPIO16**.

GPIO6 requires a more involved hardware modification.

GPIO16 is available through the JST connector and can therefore be
connected with a relatively simple solder modification using the
supplied cable.

> **Important:** The GPIO16 option does not require a separate
> openHASP firmware build.

After making the required hardware modification, select the desired
GPIO under:

**WebUI → Display Settings → Backlight GPIO**

Click **Save Settings** and then use the red **Restart** button in
the WebUI.

## Pinout

The two models share most of their GPIO assignments.

{!hardware/waveshare/esp32-s3-touch-lcd-pinout.html!}

> **Warning:** Check the hardware revision of your display before
> making any solder modifications. Do not assume that a pin is
> electrically safe to connect without checking the board documentation.

## Flashing

The following openHASP environments are available:

- `waveshare-esp32-s3-touch-lcd-4.3`
- `waveshare-esp32-s3-touch-lcd-7`

Also available via the web installer at
<a target="_blank" href="https://nightly.openhasp.com/">Nightly</a>.

Alternatively, the latest builds can be found under
<a target="_blank" href="https://github.com/HASwitchPlate/openHASP/actions">GitHub Actions</a>.
Select the latest successful action and look under the **Assets**
section for the firmware binaries.

### Recommended method

1. Use the **Nightly** build website to initially flash the device.
2. Configure the display using the openHASP WebUI.
3. If required, configure the backlight GPIO under **Display Settings**.
4. Click **Save Settings** and then use the red **Restart** button.
5. For subsequent updates, use OTA or compile your own firmware if
   comfortable doing so.

## Troubleshooting

### Backlight does not dim

Make sure the backlight circuit has been physically connected to a
usable ESP32 GPIO.

1. Select GPIO16 under **WebUI → Display Settings**.
2. Click **Save Settings**.
3. Click the red **Restart** button in the WebUI.
4. Test the backlight control again.

A physical reset or power cycle should not be used as a substitute for
the WebUI restart immediately after changing the configuration.
