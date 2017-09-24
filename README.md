# homebridge-computer-sleep

A switch Homebridge plugin to sleep and wake a computer.

## Installation

1. Install this plugin using `npm install -g homebridge-computer-sleep`
2. Update your configuration file. See **Configuration** below.

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