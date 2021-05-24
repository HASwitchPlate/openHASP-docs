
<h1>Firmware Update</h1>

## ESP Firmware Update

### Serial Upload

Either use [Tasmotizer](https://github.com/tasmota/tasmotizer) or esptool.py to upload a new firmware file to the ESP. This procedure is the same as the initial installation.

### HTTP Upload

When the ESP has previously been flashed via serial, you can upload a new **ota** firmware binary using the internal webserver.

### HTTP Update

When the ESP has previously been flashed via serial you can download and install a new **ota** firmware binary directly from an webserver.

### OTA Upload

When the ESP has previously been flashed via serial, subsequent updates can be performed Over-the-Air from within PlatformIO.

## STM32F4xx Firmware Update
