# FTP Settings

!!! note ""
    **Note:** All FTP communication is unencrypted and setting credentials is only a simple security measure!

<div class="row justify-content-center">
            <a href="../images/ftp_settings.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-8" data-title="FTP Settings" data-footer="">
                <img src="../images/ftp_settings.png" class="img-fluid img-thumbnail">
            </a>
</div>


The FTP server will only be started if a userand password have been configured.
Anonymous access is not allowed for security reasons.

Both active and passive modes are supported but you must limit the client to use
only one transfer connection at a time.

## Settings

#### Username and Password ### {: .param }
Enter the credentials required to access the FTP server.

#### Port ### {: .param }
Set the port for the FTP Server.

#### Passive Port ### {: .param }
Set the data port to be used in passive mode.

---

Click 'Save Settings' to save the changes. A restart of the FTP service is needed to apply the settings.



## FTP Client Setup

Any FTP client should be able to connect to the FTP service on the plate.
You must force the client to use **only one** connection at same time.

### Filezilla

For example to use FileZilla as FTP client configure the site settings like this:

<div class="row justify-content-center">
    <a href="../images/filezilla_2.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="Filezilla General Settings" data-footer="">
        <img src="../images/filezilla_2.png" class="img-fluid">
    </a>
    <a href="../images/filezilla_1.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-6" data-title="Filezilla Transfer Settings" data-footer="">
        <img src="../images/filezilla_1.png" class="img-fluid">
    </a>
</div>

First, you must go on Manage site ==> New site and now set these parameters:

#### General Settings

- Select protocol **FTP - File Transfer Protocol**
- Select **Only use plain FTP (insecure)**
- Set your login and password

#### Transfer Settings

- Select **Limit number of simultanious connections**
- Set the Maximum number of connections to **1**

Now you can connect to your device and manage its files using drag and drop.

