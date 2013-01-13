### SSDP Search Sample w/ Chrome Socket UDP
This is SSDP Search Sample w/ Chrome Socket UDP APIs. Web app may send SSDP M-Search packet w/ "ssdp:all" and display the response packet.
These code are based on [Kamatsu-san](https://github.com/KensakuKOMATSU/chrome-upnp)'s code.

### How to run
* install [Chrome canary](https://www.google.com/intl/en/chrome/browser/canary.html).
this web app is tesed w/ version 26.0.1381.0 canary
* enable chrome experimental APIs w/ "chrome://flags/"
* download this source code.
* install web app. setting -> tool -> extension function -> enable developer mode and select "webapp" directory by "install unpackaged extension function".
* exit extension function and run SSDP web app on "app window".

### To do list
* parse and display SSDP response packet
* fix crash after M-Search
* need to close UDP socket
* add other search mode
