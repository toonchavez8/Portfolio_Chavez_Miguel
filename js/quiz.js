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

// This function displays the services available to the user
function displayServices() {
	let servicesPrompt = "services available:\n";
	// Loop through the services array and add the details for each item to the prompt
	for (let index = 0; index < SERVICE.length; index++) {
		servicesPrompt += `${index + 1}. ${SERVICE[index].name}: ${
			SERVICE[index].description
		} - starting at $${SERVICE[index].price} USD\n`;
	}
	// Display the prompt with all the services
	alert(servicesPrompt);
}

// function to prompt the user for the service they want to add to thier order
function selectService() {
	const SELECTED_SERVICE = [];

	// Prompt the user to add services to the order
	let response = "";
	do {
		response = prompt(
			"Enter the number of the service you would like to select (or type 'done' to finish):"
		);
		// Check if the user entered "done"
		if (response !== null && response !== "" && response !== "done") {
			// Get the service index from the user input
			const serviceIndex = parseInt(response) - 1;
			// Check if the service index is valid
			if (
				!isNaN(serviceIndex) &&
				serviceIndex >= 0 &&
				serviceIndex < SERVICE.length
			) {
				// Add the service to the order
				SELECTED_SERVICE.push(SERVICE[serviceIndex]);
			} else {
				alert("Invalid selection");
			}
		}
	} while (
		// Continue prompting the user until they enter "done" or cancel the prompt
		response !== null &&
		response !== "" &&
		response !== "done"
	);

	// Display the order summary
	let orderPrompt = "Your order:\n";
	const mapedServices = SELECTED_SERVICE.map(
		(service) => `${service.name} - $${service.price} \n`
	).join("");

	// calculate the total price of the order
	const total = SELECTED_SERVICE.reduce((acc, service) => {
		return acc + service.price;
	}, 0);

	// check the number of services selected and display the appropriate message with the total price
	switch (SELECTED_SERVICE.length) {
		case 1:
			orderPrompt += `You have selected ${SELECTED_SERVICE.length} service. \n \n ${mapedServices} \n your total is $${total}`;
			break;
		case 2:
			orderPrompt += `You have selected ${
				SELECTED_SERVICE.length
			} services. \n \n ${mapedServices} for a total worth of $${total} \n\n You will receive a 10% discount.\n your total is $${
				total - total * 0.1
			}`;

			break;
		case 3:
			orderPrompt += `You have selected ${
				SELECTED_SERVICE.length
			} services. \n \n ${mapedServices}  for a total worth of $${total}\n\n You will receive a 20% discount.\n your total is $${
				total - total * 0.2
			}`;

			break;
		case 4:
			orderPrompt += `You have selected ${
				SELECTED_SERVICE.length
			} services. \n \n ${mapedServices} \n for a total worth of $${total}\n\n You will receive a 30% discount.\n your total is $${
				total - total * 0.3
			}`;

			break;
		default:
			orderPrompt += "You have not selected any services.";
	}

	alert(orderPrompt);
}

// first we display the services available to the user
displayServices();

// then we prompt the user to select the services they want to add to their order
selectService();
