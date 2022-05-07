# Wifi Settings

When using a wireless network adapter, you need to configure the SSID to connect.

<div class="row justify-content-center">
            <a href="../../assets/images/settings/wifi_settings.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-8" data-title="Wifi Settings" data-footer="">
                <img src="../../assets/images/settings/wifi_settings.png" class="img-fluid img-thumbnail">
            </a>
</div>

## Web UI

### SSID

The name of the wireless network to connect to.

### Password

Optional password for the access point, if required.

---

Click 'Save Settings' to save your settings to the device. A restart is required to make the settings active. Navigate back to the Main Menu and click Restart to activate the settings.


## Command Line

You can also configure the wifi settings via the serial or telnet console:

```sh linenums="1"
ssid myAccessPointName
pass myWifiPassword
reboot
```