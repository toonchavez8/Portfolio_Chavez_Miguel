// import the service data
import { SERVICE, SelectedServices } from "./model.js";
import View from "./view.js";

// init fucntion
function init() {
	const VIEW = new View();

	// create an instance of the SelectedServices class
	const MODEL = new SelectedServices("selectedServices", SERVICE);

	//update render on local storage change
	MODEL.addEventListener("selectedService", () => {
		console.log("selectedService");
		VIEW.render(SERVICE, MODEL.selectedService);
	});

	// render the view
	VIEW.render(SERVICE, MODEL.selectedService);

	// add event listener to the services
	VIEW.getSelectedServices(MODEL.selectedService, SERVICE);
}

// call init function
init();
