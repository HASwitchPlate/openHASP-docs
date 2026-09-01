---
title: T-Panel S3 Lite
---

# LILYGO® T-Panel S3 Lite :material-new-box:{ .tag-large }

!!! warning
    This is **not** the full [T-Panel S3](https://wiki.lilygo.cc/products/t-panel-series/t-panel-s3/) (`lilygo-t-panel`). The Lite has no CST3240 touch, no XL9535 expander, no ESP32-H2, and no 7–24 V barrel jack. Do not flash the `lilygo-t-panel` firmware.

<div class="row justify-content-center">
        <a href="../images/t-panel-s3-lite.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="T-Panel S3 Lite" data-footer="">
            <img src="../images/t-panel-s3-lite.jpg" class="img-fluid">
        </a>
        <a href="../images/t-panel-s3-lite-front.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="T-Panel S3 Lite front" data-footer="">
            <img src="../images/t-panel-s3-lite-front.jpg" class="img-fluid">
        </a>
        <a href="../images/t-panel-s3-lite-back.jpg" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4" data-title="T-Panel S3 Lite back" data-footer="">
            <img src="../images/t-panel-s3-lite-back.jpg" class="img-fluid">
        </a>
</div>

4" 480×480 IPS panel (ST7701S, SPI init + RGB) on an ESP32-S3. Display-only: use MQTT/`pages.jsonl` for the UI and the three hardware buttons for input.

| Pros | Cons |
|:-----|:-----|
| 16 MB flash, 8 MB Quad PSRAM | No touchscreen |
| Square 480×480 IPS | 5 V USB-C only (no barrel jack) |
| Three hardware buttons | Rounded bezel clips the LCD corners |

[:material-cart-variant: LILYGO][1]{target=_blank .md-button .md-button--primary } &nbsp;
[:material-github: T-Panel-Lite][2]{target=_blank .md-button }

## Features

- ESP32-S3, 16 MB flash, **8 MB Quad SPI PSRAM** (`qio_qspi` — not Octal / `N16R8`)
- 4.0" 480×480 ST7701S (YDP395BT001), 9-bit SPI init on ESP32 GPIOs (no XL9535)
- No CST3240 touch
- Backlight GPIO **33** (LilyGO source). The wiki listing GPIO 14 is wrong (that pin is SPI CS)
- MicroSD (SPI)
- KEY1 GPIO 48, KEY2 GPIO 47, BOOT GPIO 0 (openHASP defaults: `BUTTON_TYPE`, `INTERNAL_PULLUP`)
- Power: **5 V USB-C only**

## Firmware

Environment: `lilygo-t-panel-s3-lite` / `lilygo-t-panel-s3-lite_16MB`.

`ARDUINO_USB_CDC_ON_BOOT` is **0**. If it is 1, the plate waits for a USB host and will **not boot from a USB power brick**. `ARDUINO_USB_MODE=1` stays on so USB JTAG flashing still works.

The chip enumerates as Espressif USB JTAG (`303A:1001`). Fast RTS reset often drops the port. Use:

```bash
esptool.py --chip esp32s3 --port /dev/cu.usbmodem1101 --baud 115200 \
  --before usb_reset --after hard_reset write_flash --flash_mode keep --flash_size keep \
  0x0 lilygo-t-panel-s3-lite_full_16MB.bin
```

App-only update (keeps NVS / WiFi / MQTT): flash `firmware.bin` at `0x10000` with the same `--before usb_reset`.

Binaries: [GitHub Actions](https://github.com/HASwitchPlate/openHASP/actions) `lilygo-ttgo` artifact, or compile with PlatformIO.

## Home Assistant

No touch: bind **properties** only in `openhasp:` objects. Do not use `event:` on page widgets for taps.

GPIO buttons appear as MQTT events, e.g. `hasp/<node>/state/input47` (`{"event":"up"}` on a short click). Drive page changes from automations:

```yaml
triggers:
  - trigger: mqtt
    options:
      topic: hasp/tpanel/state/input47   # KEY2
conditions:
  - condition: template
    value_template: "{{ trigger.payload_json.event == 'up' }}"
actions:
  - action: openhasp.next_page
    target:
      entity_id: openhasp.tpanel
```

KEY1 is `input48` / `openhasp.prev_page`. Leave BOOT (GPIO 0) for download mode.

Keep page content ~24 px off the rounded corners; the panel itself is a square 480×480.

## Pins

From LilyGO [`t_panel_config.h`](https://github.com/Xinyuan-LilyGO/T-Panel-Lite/blob/main/libraries/private_library/t_panel_config.h):

| Signal | GPIO |
|---|---|
| SPI CS / SCLK / MOSI | 14 / 36 / 35 |
| DE / HSYNC / VSYNC / PCLK | 38 / 39 / 40 / 41 |
| B0–B4 | 1–5 |
| G0–G5 | 6–11 |
| R0–R4 | 12, 13, 42, 46, 45 |
| Backlight | 33 |
| SD CS / SCLK / MOSI / MISO | 34 / 36 / 35 / 37 |
| KEY1 / KEY2 / BOOT | 48 / 47 / 0 |

RGB: 6 MHz DE mode. Arduino_GFX 1.4.7 polarity `1` (idle-high).

[1]: https://lilygo.cc/products/t-panel-s3
[2]: https://github.com/Xinyuan-LilyGO/T-Panel-Lite
