# MQTT Settings

All communication between **openHASP** and your Home Automation service is done over MQTT. You will need a functional MQTT Broker.

!!! note ""
    **Tip:** Learn more about the protocol on [MQTT Essentials](http://www.hivemq.com/mqtt-essentials/)

<div class="row justify-content-center">
            <a href="../mqtt_settings.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-8" data-title="MQTT Settings" data-footer="">
                <img src="../mqtt_settings.png" class="img-fluid img-thumbnail">
            </a>
</div>

## Settings

### Plate Name ### {: .param }
The *Plate Name* is the unique identifier of your device on your MQTT Broker.

For example, setting the *Plate Name* to **plate35** will make the device listen and communicate on the main topic **hasp/plate35/**

### Group Name ### {: .param }
The *Group Name* is the unique identifier for a **Group** of devices.

For example, the default *Group Name* is **plates**. This will make all devices in this group listen on the main topic **hasp/plates/**
This way you can send a command to all devices in the group at the same moment. Each devices will only respond on their own main *Plate Name* topic.

### Broker ### {: .param }
Set the IP or hostname of your MQTT Broker service.

### Port ### {: .param }
Set the port for your MQTT Broker.

### Username ### {: .param }
Enter credentials if your *MQTT Broker* requires a Username.

### Password ### {: .param }
Enter credentials if your *MQTT Broker* requires a Password.

---

Click 'Save Settings' to save your settings to the device. A restart is required to make the settings active. Navigate back to the Main Menu and click Restart to activate the settings.


## Command Line

You can also configure the mqtt settings via the serial or telnet console:

```sh linenums="1"
hostname myPlateName
mqtthost 192.168.0.123
mqttport 1883
mqttuser myUsername
mqttpass myPassword
reboot
```