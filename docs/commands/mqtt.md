## MQTT Topics

`hasp/plate01/command/` is for sending commands to the screen
`hasp/plate01/state/` is for receiving updates from the screen

So the topic depends on the direction of the data flow.

Sending a message to topic `hasp/plate01/command/p1b2.val` with payload `25` would be a valid command.
You can send a test MQTT message with a standalone program like MQTT Explorer or mosuito_pub.

## Issuing commands

Commands can be issued via the Serial commandline, telnet commandline or MQTT.

For MQTT, you can use either:

- `hasp/<nodename>/command` topic with payload `<keyword>=<parameter(s)>`
- `hasp/<nodename>/command/<keyword>` topic with payload `<parameter(s)>`</br>
  Leave the payload empty to get the current state without changing it.
