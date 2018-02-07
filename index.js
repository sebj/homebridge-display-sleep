const serialNumber = require('serial-number');
const displayControl = require('display-control');

serialNumber.preferUUID = true;

let Service, Characteristic;

module.exports = homebridge => {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	homebridge.registerAccessory('homebridge-computer-sleep', 'ComputerSleep', DeviceStateAccessory);
}

class DeviceStateAccessory {

	constructor (log, config) {
		this.log = log;
		this.config = config;
		this.on = true;

		this.informationService = new Service.AccessoryInformation();
		this.informationService
			.setCharacteristic(Characteristic.Manufacturer, 'Unknown')
			.setCharacteristic(Characteristic.Model, 'Unknown')
			.setCharacteristic(Characteristic.SerialNumber, 'Unknown');

		serialNumber((err, serial) => {
			if (!err && serial)
				this.informationService.setCharacteristic(Characteristic.SerialNumber, serial);
		});

		this.service = new Service.Switch(this.config.name);
		this.service
			.setCharacteristic(Characteristic.On, true)
			.getCharacteristic(Characteristic.On)
			.on('set', this.setState.bind(this));
	}

	setState (on, callback) {
		if (this.on === on)
			return callback();

		if (on) {
			displayControl.wake();
		} else {
			displayControl.sleep();
		}

		this.on = on;
		this.service.setCharacteristic(Characteristic.On, on);

		const state = on ? 'on' : 'off';
		this.log('Set ' + this.config.name + ' to ' + state);

		callback(null);
	}

	getServices () {
		return [this.informationService, this.service];
	}
}