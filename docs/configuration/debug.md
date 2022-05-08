# Debug Settings

openHASP logs valuable information during its operation to the serial port, telnet console or syslog server.
Use these settings to configure the debug output.

<div class="row justify-content-center">
            <a href="../../assets/images/settings/debug_settings.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-8" data-title="Debug Settings" data-footer="">
                <img src="../../assets/images/settings/debug_settings.png" class="img-fluid img-thumbnail">
            </a>
</div>

## Settings

### Serial Port ### {: .param }
Set the baudrate to use for the serial logging and console.

### Telemetry Period ### {: .param }
This is the interval in seconds with which openHASP will send automatic statusupdate messages to the `state/statusupdate` topic.

### Syslog Server ### {: .param }
Specify the hostname or IP address of the syslog server.

### Syslog Port ### {: .param }
Specify the port of the syslog server.

### Syslog Protocol ### {: .param }
Select the protocol used by your syslog backend.

---

Click 'Save Settings' to save your settings to the device. A restart is required to make the settings active. Navigate back to the Main Menu and click Restart to activate the settings.
