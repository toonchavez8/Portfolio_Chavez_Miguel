export default class View {
	constructor() {
		this.startQuizBtn = document.getElementById("quizStart");
		this.quizContainer = document.getElementById("quizContainer");
		this.quizCloseBtn = document.getElementById("quizClose");
		this.checkBoxContainer = document.getElementById("checkBoxContainer");

		// get all checkboxes
		this.checkBoxes = document.querySelectorAll("input[type=checkbox]");
	}

	render(SERVICE) {
		this.#displayQuiz();

		this.#closeQuiz();

		this.#displayQuestions(SERVICE);
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
		sevices.forEach((service) => {
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

			span.textContent = `$${service.price}.00 `;

			const div = document.createElement("div");
			div.classList.add("form-check");
			div.appendChild(input);
			div.appendChild(label);
			div.appendChild(p);
			div.appendChild(span);

			this.checkBoxContainer.appendChild(div);
		});
	}
}
