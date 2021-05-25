<h1>Frequently Asked Questions</h1>

### :question: The font looks tiny

On ESP8266, the out-of-the box font is Unscii 8pt because this font takes up very little space in memory and on flash.
This default font is just intended to get the device setup, then you can Upload your own .zi font.

On ESP32, the default font is Roboto Condensed 12.


### :question: How to use Fontawesome icons?

Upload another .zi file named fontawesome*xx*.zi of the same point size as the normal text .zi font.
e.g. If your custom font is `arial24.zi´, you should also add a `fontawesome24.zi` file.

You can download `fontawesome.zip` from the [HMI Font Pack](https://github.com/fvanroie/HMI-Font-Pack/releases) repository.


### :question: Is there a file browser built-in?

*A:* Since v0.6.0 there is a native file browser included on ESP32.

You can use it to upload, download and edit files on the flash partition of the ESP32.
Using that webpage, you can right-click and delete files:

![HTTP configuration](assets/images/faq/faq_file_delete.png "Delete file")

Click on the File Editor button on the Main Webpage:

![HTTP configuration](assets/images/faq/faq_file_browser.png "File Browser")


### :question: How to delete files from flash?

Yes: *See: Is there a file browser built-in?*