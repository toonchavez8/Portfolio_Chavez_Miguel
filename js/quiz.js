import { SERVICE, selectedService } from "./model.js";
import View from "./view.js";

// init fucntion
function init() {
	// model
	// view
	const VIEW = new View();

	VIEW.render(SERVICE, selectedService);

	VIEW.getSelectedServices(selectedService, SERVICE);
}

// call init function
init();
