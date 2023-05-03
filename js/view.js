export default class View {
	constructor() {
		this.startQuizBtn = document.getElementById("quizStart");
		this.quizContainer = document.getElementById("quizContainer");
	}

	// method to display the quiz
	displayQuiz() {
		// hide the start quiz button
		this.startQuizBtn.style.display = "none";
		// display the quiz container
		this.quizContainer.style.display = "block";
	}
}
