import Swal from "sweetalert2/dist/sweetalert2.js";

// emailjs init
emailjs.init("bEU9CcH5OwpZRKVcA");

// create a class for the view
export default class View {
	constructor() {
		this.startQuizBtn = document.getElementById("quizStart");
		this.quizContainer = document.getElementById("quizContainer");
		this.quizCloseBtn = document.getElementById("quizClose");
		this.totalPrice = document.getElementById("totalPrice");
		this.discountedPrice = document.getElementById("discountedPrice");
		this.discountMessage = document.getElementById("discountMessage");
		this.turnAroundContainer = document.getElementById("turnAroundContainer");
		this.checkBoxContainer = document.getElementById("checkBoxContainer");
		this.emailContainer = document.getElementById("emailContainer");
		this.emailInput = document.getElementById("emailInput");
		this.emailHelp = document.getElementById("emailHelpId");
	}

	render(SERVICE, selectedService) {
		this.#displayQuiz();

		this.#closeQuiz();

		this.#displayQuestions(SERVICE);

		this.#totalPrice(selectedService);

		this.#displayEmailInput();
	}

	// method to display the quiz
	#displayQuiz() {
		// add event listener to start quiz button
		this.startQuizBtn.addEventListener("click", () => {
			// hide the start quiz button
			this.startQuizBtn.style.display = "none";
			//remove d-none class from quiz container
			this.quizContainer.classList.remove("d-none");
		});
	}

	// method to close the quiz
	#closeQuiz() {
		// add event listener to close quiz button
		this.quizCloseBtn.addEventListener("click", (e) => {
			// prevent default action
			e.preventDefault();
			// hide the quiz container
			this.quizContainer.classList.add("d-none");
			// show the start quiz button
			this.startQuizBtn.style.display = "block";
		});
	}

	// method to display the service
	#displayQuestions(sevices) {
		// loop through the services
		sevices.map((service) => {
			const input = document.createElement("input");
			input.setAttribute("type", "checkbox");
			input.setAttribute("id", service.id);
			input.setAttribute("name", service.name);
			input.setAttribute("value", service.name);
			input.classList.add("form-check-input");

			const label = document.createElement("label");
			label.setAttribute("for", service.id);
			label.classList.add("form-check-label");
			label.textContent = service.name;

			const p = document.createElement("p");
			p.textContent = service.description;

			const span = document.createElement("span");
			span.classList.add("rb-200");

			const money = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(service.price);

			span.textContent = money;

			const div = document.createElement("div");
			div.classList.add("form-check");
			div.appendChild(input);
			div.appendChild(label);
			div.appendChild(p);
			div.appendChild(span);

			this.checkBoxContainer.appendChild(div);
		});
	}

	#totalPrice(selectedService) {
		// get the total price from local storage or set it to 0

		const totalPrice = selectedService.reduce((total, service) => {
			return total + service.price;
		}, 0);

		// declare discount variable
		let discount;

		// set discount message
		let discountMessage;
		// switch statement to check the number of services selected
		switch (selectedService.length) {
			case 2:
				discount = totalPrice * 0.1;
				discountMessage = "For 2 services you're eligible for a 10% discount";
				break;
			case 3:
				discount = totalPrice * 0.15;
				discountMessage = "For 3 services you're eligible for a 15% discount";
				break;
			case 4:
				discount = totalPrice * 0.2;
				discountMessage = "For 4 services you're eligible for a 20% discount";
				break;
			default:
				discount = 0;
		}

		// display the total price
		const money = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(totalPrice);

		// display the discounted price
		const discountedPrice = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(totalPrice - discount);

		// display the discount message
		this.discountedPrice.textContent = discountedPrice;

		if (selectedService.length >= 2) {
			this.discountMessage.classList.remove("d-none");
			this.discountedPrice.classList.remove("d-none");
			this.totalPrice.classList.add("line-through");
		} else {
			this.discountMessage.classList.add("d-none");
			this.discountedPrice.classList.add("d-none");
			this.totalPrice.classList.remove("line-through");
		}

		// display the discounted message
		this.discountMessage.textContent = discountMessage;

		document.getElementById("totalPrice").textContent = money;
	}
	// method to get the selected services
	getSelectedServices(selectedService, SERVICE) {
		// get all checkboxes
		this.checkBoxes = document.querySelectorAll("input[type=checkbox]");
		//	 check if checkbox exists
		if (!this.checkBoxes) return;

		// check if there is a selected service in local storage
		if (localStorage.getItem("selectedServices")) {
			// get the selected service from local storage
			selectedService = JSON.parse(localStorage.getItem("selectedServices"));
			// loop through the selected service
			selectedService.forEach((service) => {
				// get the checkbox with the value of the selected service
				const checkbox = document.querySelector(
					`input[value="${service.name}"]`
				);
				// check if checkbox exists
				if (checkbox) {
					// check the checkbox
					checkbox.checked = true;
				}

				// update the total price
				this.#totalPrice(selectedService);
			});
		}

		// loop through the checkboxes
		this.checkBoxes.forEach((checkbox) => {
			// add event listener to each checkbox
			checkbox.addEventListener("change", () => {
				// check if checkbox is checked
				if (checkbox.checked) {
					// push the checked checkbox to the selectedService array

					selectedService.push(this.#findService(SERVICE, checkbox.value));

					// store the selected service in local storage
					localStorage.setItem(
						"selectedServices",
						JSON.stringify(selectedService)
					);

					// update the total price
					this.#totalPrice(selectedService);

					// display the email input
					this.#displayEmailInput(selectedService);
				} else {
					// remove the checked checkbox from the selectedService array
					selectedService.splice(selectedService.indexOf(checkbox.value), 1);

					// store the selected service in local storage
					localStorage.setItem(
						"selectedServices",
						JSON.stringify(selectedService)
					);

					// update the total price
					this.#totalPrice(selectedService);

					// display the email input
					this.#displayEmailInput(selectedService);
				}
			});
		});
	}

	#findService(SERVICE, checkboxValue) {
		// find the service that matches the checkbox value
		const service = SERVICE.find((service) => service.name === checkboxValue);
		// return the service
		return service;
	}

	//method to display email input
	#displayEmailInput(selectedService) {
		// check if there is a selected service in local storage
		if (localStorage.getItem("selectedServices")) {
			// get the selected service from local storage
			selectedService = JSON.parse(localStorage.getItem("selectedServices"));
			// check if there is a selected service
			if (selectedService.length > 0) {
				// display the email input
				this.emailContainer.classList.remove("d-none");

				// send email
				this.#sendEmail();
			}

			if (selectedService.length === 0) {
				// hide the email input
				this.emailContainer.classList.add("d-none");
			}
		}
	}

	// method to send email to the user using emailjs
	#sendEmail() {
		// add event listener to the email input
		this.emailInput.addEventListener("keydown", (e) => {
			//get value of the email input
			const email = e.target.value;

			// if email is valid set emailhelper to display none
			if (this.#validateEmail(email)) {
				this.emailHelp.classList.add("d-none");
			}

			// if email is not valid set emailhelper to display block
			if (!this.#validateEmail(email)) {
				this.emailHelp.classList.remove("d-none");
			}

			// if email is valid and enter key is pressed
			if (this.#validateEmail(email) && e.keyCode === 13) {
				//send email with selected services and display success message
				emailjs
					.send("toochavez.dev", "template_e6k9j4b", {
						to_email: email,
						selected_services: JSON.parse(
							localStorage.getItem("selectedServices")
						),
					})
					.then(() => {
						this.emailHelp.classList.add("d-none");
						this.emailInput.value = "";
						Swal.fire("email sent!", "", "success");
					});
			}
		});
	}

	// method to validate the email
	#validateEmail(email) {
		// regular expression to validate email
		const re = /\S+@\S+\.\S+/;
		// return the result of the test
		return re.test(email);
	}
}
