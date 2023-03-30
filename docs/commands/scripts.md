Commands can be processed in batch one after another from `.cmd` script files located in the flash storage of the plate.    
General rules when creating `.cmd` batch scripts:

- can contain any command
- empty lines are ignored
- `#` or `//` can be used for comments
- `space` or `tab` in front of a command is ignored
- lines starting with `{` are processed as `jsonl` payloads
- lines starting with `[` are processed as `json` payloads
- other lines are processed as `<command> <payload>`
- `CR`, `LF` or `CRLF` line endings allowed
- `UTF8` encoding is required for special characters

To start a batch script, use `run` command.

## System scripts

If any of the following scripts is present on the filesystem, it will be run automatically according to the rules below:

- `L:/boot.cmd` is executed when the plate has finished (re)booting
- `L:/online.cmd` will be executed after connection to the network was successfull
- `L:/offline.cmd` will be executed after connection to the WiFi is lost

This makes it possible to disable or hide buttons, load a special offline page, etc. See [example][5].
