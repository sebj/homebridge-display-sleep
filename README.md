# homebridge-computer-sleep

A [Homebridge](https://github.com/nfarina/homebridge) switch accessory to sleep and wake the host computer.

## Installation

1. Install Homebridge using `npm install -g homebridge`
2. Install this plugin using `npm install -g homebridge-computer-sleep`
3. Update your configuration file. See **Configuration** below.

## Configuration

Your Homebridge config file (`~/.homebridge/config.json`) must include a `ComputerSleep` accessory with a name of your choosing for this plugin to function.

Example:
```
"accessories": [
    {
        "accessory": "ComputerSleep",
        "name": "Office PC"
    }
]
```

## Usage
* Create an accessory as shown above in **Configuration** 
    * Setting `name` to the name of your device is recommended - 'Gaming PC', 'MacBook Pro', etc.
* The accessory will show as On in HomeKit when your device is awake (default), and Off when it is toggled off to sleep.
