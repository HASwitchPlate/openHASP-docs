# Time Settings

The internal clock of the plate is synchronized with one or more NTP servers.
The clock is used to display the time on the plate and in the log.
To show the correct time for your area, please configure the corrent timezone.

<div class="row justify-content-center">
            <a href="../images/time_settings.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-8" data-title="Time Settings" data-footer="">
                <img src="../images/time_settings.png" class="img-fluid img-thumbnail">
            </a>
</div>

## Settings

### Region ### {: .param }
Select the region or continent of the timezone you are in.
This selection shows the timezones of that region or continent in the dropdown below.

### Timezone ### {: .param }
Select the city or timezone you are in.
The timezones shown in this list are filtered by the selected region above.

### NTP Servers ### {: .param }
Enter the URL or IP address of up to 3 Network Time Servers to synchronized the internal clock with.

---

Click 'Save Settings' to save your settings to the device. A restart is required to make the settings active. Navigate back to the Main Menu and click Restart to activate the settings.


## Command Line

You can also configure the wifi settings via the serial or telnet console:

```sh linenums="1"
ssid myAccessPointName
pass myWifiPassword
reboot
```