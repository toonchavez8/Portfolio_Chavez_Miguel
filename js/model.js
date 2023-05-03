const emptySelectedServices = [];

//Service class to represet my services and their properties and include a nested object for the turn around time that will updataded in the services array
class Service {
	constructor(name, description, price, min, max, isFlexible) {
		this.name = name;
		this.description = description;
		this.price = price;

		this.turnAroundTime = {
			min: min,
			max: max,
			isFlexible: isFlexible,
		};
	}
}

// create an array of services based on the Service class
const SERVICE = [
	new Service(
		"UI/UX Design",
		"User-centered design solutions.",
		3500,
		"2 weeks",
		"8 weeks",
		false
	),
	new Service(
		"Full Stack Web Development",
		"End-to-end web development solutions.",
		2000,
		"4 weeks",
		"12 weeks",
		true
	),
	new Service(
		"3d Modeling",
		"High-quality 3D modeling services.",
		1500,
		" 72 hours",
		"2 weeks",
		true
	),
	new Service(
		"Animation",
		"Creative animation services for businesses.",
		2500,
		" 1 week",
		"4 weeks",
		false
	),
];

// create a class to store the selected services and the storage key for state management
export default class SelectedServices extends EventTarget {
	constructor(key, services) {
		super();
		this.storageKey = key;
		this.services = services;
	}

	// getter method to get the selected services from local storage
	get selectedService() {
		// get the selected services from local storage
		const selectedService = JSON.parse(localStorage.getItem(this.storageKey));
		if (selectedService !== null) {
			// check if the selected services are valid
			const valid = this.checkSelectedServices(selectedService);
			if (valid) {
				return selectedService;
			} else {
				// if the selected services are not valid, return an empty object
				return emptySelectedServices;
			}
		} else {
			return emptySelectedServices;
		}

		// dispatch an event
	}

	// method to check if the selected services are valid
	checkSelectedServices(services) {
		// check if the services are an array
		if (!Array.isArray(services)) {
			return false;
		}
		// check if the services are services of the company
		for (const service of services) {
			if (!this.services.includes(service)) {
				return false;
			}
		}
		// else return true
		return true;
	}
}

// export the service array
export { SERVICE, SelectedServices };
