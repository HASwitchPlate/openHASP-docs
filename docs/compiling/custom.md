# Custom Code

To add your own custom code in the `src/custom` directory, you need to enable `#define HASP_USE_CUSTOM 1` in your `include\user_config_override.h`.

You can start adding code by copying the template files as `my_custom.h` and `my_custom.cpp`. This will add the `custom\my_custom.h` header to openHASP compilation and call the defined functions from the main loop.

## Available Hooks

Create a file `src/my_custom.h` that defines *all* these custom hooks:

```cpp title="src/my_custom.h"
#ifndef HASP_CUSTOM_H
#define HASP_CUSTOM_H
#if defined(HASP_USE_CUSTOM)

#include "hasplib.h"

void custom_setup();
void custom_loop();
void custom_every_second();
void custom_every_5seconds();
bool custom_pin_in_use(uint8_t pin);
void custom_get_sensors(JsonDocument& doc);
void custom_topic_payload(const char* topic, const char* payload, uint8_t source);

#endif // HASP_USE_CUSTOM
#endif // HASP_CUSTOM_H
```

The `custom_setup()` function is called at boot. Use it to initialize variables, load libraries, configure GPIOs or sensors.

The `custom_loop()` function is called every itteration of the main loop, much like the Arduino `loop()` function.
It is very important to make the execution of this function very efficient without using any blocking code or `delay()`.
Otherwise it will have an impact on the UI responsiveness and/or other time-sensitive code.

`custom_every_second()` and `custom_every_5seconds()` functions are called every second and every 5 seconds respectively.
You can use these to execute non-time-critical code.

The function `custom_pin_in_use()` is used to indicate that a pin is in use. Return `true` if the pin used by your custom code.

Use `custom_get_sensors()` to add a sensor key and value to the periodic `sensor` MQTT messages. 
The function is called every 30 seconds by default, but the teleperiod interval can be changed by the user.
The `doc` variable is passed so you can add your JSON object too it. *(see below)*

With `custom_topic_payload()` you can receive custom topic & payload messages.
You can use the value of the topic and payload variables to set LVGL attributes or perform custom actions.</br>
`source` indicates the module from wich the command is received. (`TAG_MQTT`, `TAG_CONS`, `TAG_TELN`, `TAG_HTTP`, ...)

## Customize functions

In `src/my_custom.cpp` you add the code to execute for each of the functions declared above.

### Setup

We keep a variable for tracking the last blink time.

```cpp linenums="1" title="my_custom.h"
#include "hasplib.h"

#if defined(HASP_USE_CUSTOM) && true // <-- set this to true in your code

#include "hasp_debug.h"
#include "custom/my_custom.h"

unsigned long last_blink = 0;
bool blink_state = LOW;

void custom_setup()
{
    // Initialization code here
    last_blink = millis();
    pinMode(LED_BUILTIN, OUTPUT);
    randomSeed(millis());
}
```

### Loops

Next, check the time past since the last blink.
This should execute very fast, do not use `delay()` or any blocking code.
```cpp linenums="9"
void custom_loop()
{
    // Non-blocking code here!
    if(blink_speed && (millis() - last_blink > blink_speed)) {
        if (blink_state==LOW) {
            blink_state = HIGH;
        } else {
            blink_state = LOW;
        }
        digitalWrite(LED_BUILTIN, blink_state);
        last_blink = millis();
    }
}
```

We don't execute code at fixed intervals, so leave these functions blank:
```cpp linenums="29"
void custom_every_second()
{
    // Unused
}

void custom_every_5seconds()
{
    // Unused
}
```

### Declare pins

We need to tell the firmware which custom pins we have used:
```cpp linenums="18"
bool custom_pin_in_use(uint8_t pin)
{
    switch(pin) {
        case LED_BUILTIN:  // Custom LED pin
        case 6:  // Custom Input pin
            return true;
        default:
            return false;
    }
}
```

### Report Sensors

Here we can add data to the `sensors` MQTT messages that are sent periodically.
You can add a simple Key-Value pair or a more complex JSON object if needed.

```cpp
void custom_get_sensors(JsonDocument& doc)
{
    JsonObject sensor = doc.createNestedObject(F("Temperature"));  // Add Key
    sensor[F("Temperature")] = random(256);                        // Set Value
}
```

### Debug Output

By including `#include "hasp_debug.h"` we can also utilize `LOG_*()` functions to print debug output to the console:

- LOG_VERBOSE(TAG_CUSTOM, message [, args])
- LOG_NOTICE(TAG_CUSTOM, message [, args])
- LOG_TRACE(TAG_CUSTOM, message [, args])
- LOG_ERROR(TAG_CUSTOM, message [, args])

### MQTT Output

Use `dispatch_state_subtopic(topic, payload)` to send an MQTT message and payload to `hasp/<plate>/state/topic`.

```cpp linenums="1"
void custom_every_5seconds()
{
    LOG_VERBOSE(TAG_CUSTOM, "%d seconds have passsed...", 5);
    dispatch_state_subtopic("my_topic", "{\"test\":123}");
}
```