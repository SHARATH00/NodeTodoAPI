# About
This Todo API is designed to facilitate the management of todo tasks. It offers endpoints for creating, updating, retrieving, and deleting todos. Leveraging MongoDB as the underlying database and built with Node.js and Express framework, this API provides a robust solution for todo list management.

## Installation
```
git clone <repository-url>
cd <repository-folder>
npm install
```
## Dependencies
```
npm install body-parser --save
npm install express --save
npm install mongodb --save
npm install mongoose --save
npm install nodemon --save

```
Now a server is running on the Pi. If you plug in a Pico to the USB it will install the client code on the pico within 6 sec and make it a remote serial port.

`/dev/pts/pty1`

It's that easy to setup a remote serial port. Each time you plug in a pico, it will be the next `ptyN` on the list.

If you haven't already installed npm:
```
sudo apt update
sudo apt install nodejs npm
```

### Background
Designed to facilitate communication between a remote device (such as a Raspberry Pi) and a device connected via serial to the Pico. It leverages TCP/IP networking to bridge data exchange between the Pico's serial interface and a networked environment. Extend this project using either the [`node-red-bridge`](https://github.com/RajkumarGara/node-red-bridge) or [`homebridge-tcp-smarthome`](https://github.com/RajkumarGara/homebridge-tcp-smarthome).

### Pico on-board LED status
* LED blinks repeatedly during the WiFi connection process. Upon successful connection it turns off.
* LED switches on again when connected to the TCP server.
* LED blinks once upon receiving a command either from TCP server or a serially connected device.
* LED turns off when disconnected from the TCP server.

## Project Details
* **Curious about PtyServer?**
    * Detects Pico clients upon receiving first packet with `pico_{N}`, and creates a pseudo terminal(pty) for each Pico.
    * Sends data available in pty to the respective Pico.
    * Writes data received from Pico into corresponding pty.
    * Log the commands and responses for each pico; check out the log:
        ```
        tail -f /tmp/smartHome.log
        ```

* **Wondering how plugging Pico into the Pi installs client code in Pico?**
    * The udev rule ([99-pico.rules](./src/99-pico.rules)) watches Pi's USB port for Pico connection.
    * When a Pico is connected, it triggers another script [PicoScriptDeployer.py](./src/pi/PicoScriptDeployer.py) to run on Pi.

* **And what exactly does PicoScriptDeployer do?**
    * It fetches `wifi-ssid, password, IP, Pico-Serial-ID` and updates the corresponding credentials on [config.json](./src/pico/config.json). You can also manually update it.
    * Deploys [`main.py`](./src/pico/main.py) and [`config.json`](./src/pico/config.json) to the most recently connected pico.
    * You can observe the deployer log:
        ```
        tail -f /tmp/deployer.log
        ``` 

* **Now, what's the role of the main code in Pico?**
    * Retrieves the network credentials and server details from the `config.json`.
    * Upon TCP connection, sends its `Serial-ID` to the Pi in the first packet.
    * Continuously checks for data in TCP and Serial; if it receives data from either, it sends that data to the other. 

## Visual Overview
* Checkout the testing results from PostMan.
    ![GET](img/GET.jpg)
    ![POST](img/POST.jpg)
    ![DELETE](img/DELETE.jpg)
    ![UPDATE](img/UPDATE.jpg)
## Error Handling 
* If an error occurs during processing, the API will respond with an appropriate error message and an HTTP status code indicating the error.

