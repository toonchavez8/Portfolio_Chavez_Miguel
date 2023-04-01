const BTNSTART = document.getElementById("quizStart");

// create a function to provide discount based on number of services
function addServices() {
	// declare variables
	let services = 0;
	const QUESTIONS = prompt("How many services would you like to book?");

	// convert the user's response to a number
	let responseServices = parseInt(QUESTIONS);

	console.log("You requested" + " " + responseServices + " " + "services.");

	//  if statement to check if the user has entered a number
	if (
		responseServices == 0 ||
		responseServices == null ||
		responseServices == "" ||
		isNaN(responseServices)
	) {
		alert("You must add at least one service to get a price");
		console.warn("You must add at least one service to get a price.");
	}

	// create switch statement to provide a discount based on number of services
	if (responseServices > 4) {
		alert("You can only book 4 services at a time.");
		console.warn("You can only book 4 services at a time.");
	} else if (responseServices >= 1 && responseServices <= 5) {
		switch (responseServices) {
			case 1:
				services = responseServices * 100;
				alert("Your total is $" + services);
				console.log("Your total is $" + services);
				break;
			case 2:
				services = responseServices * (100 * 0.9);
				alert("You're getting a 10% discount for ording a second service!");
				alert("Your total is $" + services);
				console.log(
					"You're getting a 10% discount for ording a second service!"
				);
				console.log("Your total is $" + services);
				break;
			case 3:
				services = responseServices * (100 * 0.8);
				alert("You're getting a 20% discount for ording a third service!");
				alert("Your total is $" + services);

				console.log(
					"You're getting a 20% discount for ording a third service!"
				);
				console.log("Your total is $" + services);

				break;
			case 4:
				services = responseServices * (100 * 0.7);
				alert("You're getting a 30% discount for ording a fourth service!");
				alert("Your total is $" + services);

				console.log(
					"You're getting a 30% discount for ording a fourth service!"
				);
				console.log("Your total is $" + services);

				break;
		}
	}
}

addServices();

//  event listener for button
BTNSTART.addEventListener("click", addServices);
