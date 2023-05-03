//Service class to represet my services
class Service {
	constructor(name, description, price) {
		this.name = name;
		this.description = description;
		this.price = price;
	}
}

// create an array of services based on the Service class
const SERVICE = [
	new Service("UI/UX Design", "User-centered design solutions.", 3500),
	new Service(
		"Full Stack Web Development",
		"End-to-end web development solutions.",
		2000
	),
	new Service("3d Modeling", "High-quality 3D modeling services.", 1500),
	new Service("Animation", "Creative animation services for businesses.", 2500),
];

const selectedService = [];
// export the service array
export { SERVICE, selectedService };
