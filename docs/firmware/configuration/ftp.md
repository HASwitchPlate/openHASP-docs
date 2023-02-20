# FTP Settings

!!! note ""
    **Note:** All FTP communication is unencrypted and that this is only a simple security measure!

<div class="row justify-content-center">
            <a href="../ftp_settings.png" data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-8" data-title="FTP Settings" data-footer="">
                <img src="../ftp_settings.png" class="img-fluid img-thumbnail">
            </a>
</div>


The FTP server will only be started if a user has been configured.
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

