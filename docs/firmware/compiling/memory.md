# Memory handling

If you have high memory use by for example:

* large `pages.jsonl` file
* many large fonts
* large images

.. you risk getting "out of memory" errors. 

## Memory types and how to see if there are potential problems

There are different memory pools inside openHASP:

* **Device Memory** (also called "System Memory"): general program use
* **LVGL Memory**: graphics
* **PSRam**: when available, used for some graphics functions

By default, the first 2 types of memory share space in the device's internal SRAM, and the default size of the LVGL Memory is some "sensible" default value for your device. Example: SC01 Plus has 64kiB. The remainder of the SRAM is mostly used for the Device Memory.

There are 3 major indicators than you can use to determine if you risk running out of memory:

* **Free memory**
* **Fragmentation**
* **Largest free block**

See the `/info` web page for the first 2 indicators. The status MQTT message has `heapFree` and `heapFrag` for these 2 indicators of the Device Memory.

The console logs show all 3 indicators of both Device Memory and LVGL Memory. If you see a log file that starts with ```[21:52:01.007][29684/42548 30][ 9552/ 9736  2] MQTT PUB: ...```, it means:

* Time of log 21:52 etc (of course)
* Device Memory:
    * Largest continuous free block: 29.6kB
    * Total free memory: 42.5kB
    * Fragmentation: 32%
* LVGL Memory:
    * Largest continuous free block: 9.5kB
    * Total free memory: 9.7kB
    * Fragmentation: 2%

In general,

* Device free memory must remain above 25-30kB.
* LVGL free memory must remain above 5kB, depending on you graphical needs.
* Fragmentation must be low. The higher it is, the higher the risk of problems.

## How to solve memory problems

In some cases, there are relatively simple solutions:

* Use device with enough RAM and with PSram.
* If you have large images, see the recommendations about `.bin` files.
* If you have many large fonts, standardize to a small list of different sizes.

If this doesn't help, then you may need to adapt the default memory handling via changing settings in `include\user_config_override.h`.

Here are some options:

* increase LVGL memory: change `LV_MEM_SIZE`. Know that this will impact the available heap memory. Please keep an eye on the memory indicators and adapt according to your situation.
* use `LV_MEM_CUSTOM`. This will force both memory pools to use the Device's SRAM together, without separation between them. As a result,
    * the console log no longer shows the second memory section
    * you may encounter other memory errors. Example: downloading a huge file from the device via the device's web interface may cause a crash of the network connectivity.
* adapt the memory management methods behind `LV_MEM_CUSTOM`. For low level information, see `include\lv_conf_v7.h`

    ```C
    #define LV_MEM_CUSTOM_ALLOC   malloc       /*Wrapper to malloc*/
    #define LV_MEM_CUSTOM_FREE    free         /*Wrapper to free*/
    ```

    If you want to use PSram instead, change the define to `ps_malloc` if the device actually has PSram. Or use `hasp_malloc`, which will check if PSram is available first and uses it if it does. This is not fully tested. Use at your own risk, and be so kind as to inform us of your findings via github or, better, update this documentation.
