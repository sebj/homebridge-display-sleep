const Service, Characteristic;

const displayControl = require('display-control');

module.exports = homebridge => {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	homebridge.registerAccessory('homebridge-computer-sleep', 'Sleep', DeviceStateAccessory);
}

class DeviceStateAccessory {

	constructor (log, config) {
		this.log = log;
		this.service = 'Switch';
		this.config = config;

		this.retrieveSwitchState = this.retrieveSwitchState.bind(this)

		this.on = false
	}

	setState (on, callback) {
		if (this.on === on) return callback();

		if (on) {
			displayControl.wake();
		} else {
			displayControl.sleep();
		}

		this.on = on

		const state = on ? 'on' : 'off';
		this.log('Set ' + this.config.name + ' to ' + state);

		callback(null);
	}

	getServices () {
		const informationService = new Service.AccessoryInformation();
		
		informationService
			.setCharacteristic(Characteristic.Manufacturer, 'Device Manufacturer')
			.setCharacteristic(Characteristic.Model, 'Device Model')
			.setCharacteristic(Characteristic.SerialNumber, 'Device Serial Number');

		const switchService = new Service.Switch(this.config.name);

		switchService
			.getCharacteristic(Characteristic.On)
			.on('set', this.setState.bind(this));

		this.switchService = switchService;
		this.retrieveSwitchState();

		return [switchService];
	}
}