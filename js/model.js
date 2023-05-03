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

console.log(SERVICE);

const selectedService = [];
// export the service array
export { SERVICE, selectedService };
