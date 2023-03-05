import { Application } from "@splinetool/runtime";

const canvas = document.getElementById("canvas3d");
const app = new Application(canvas);
app.load("https://prod.spline.design/3fwf8D00ieqSpn-k/scene.splinecode");

const typeOnText = document.getElementById("typeOnText");

const textArray = [
	"developer",
	"UI / UX designer",
	"motion designer",
	"filmmaker",
];

const reducedMotion = window.matchMedia(
	"(prefers-reduced-motion: reduce)"
).matches;

if (reducedMotion) {
	// If the user prefers reduced motion, don't run the animation
	typeOnText.textContent = textArray[0];
}

function typeOn() {
	let wordIndex = 0;
	let letterIndex = 0;

	function type() {
		if (!reducedMotion && letterIndex < textArray[wordIndex].length) {
			typeOnText.textContent += textArray[wordIndex].charAt(letterIndex);
			letterIndex++;
			setTimeout(type, 100); // Set a delay between each letter
		} else {
			// Wait for 2 seconds before erasing the text
			setTimeout(erase, 2000);
		}
	}

	function erase() {
		if (letterIndex > 0) {
			typeOnText.textContent = textArray[wordIndex].substring(
				0,
				letterIndex - 1
			);
			letterIndex--;
			setTimeout(erase, 100); // Set a delay between each erased letter
		} else {
			// Move on to the next word
			wordIndex++;
			if (wordIndex >= textArray.length) {
				// If we've reached the end of the array, start over
				wordIndex = 0;
			}
			// Wait for 1 seconds before typing the next word
			setTimeout(type, 1000);
		}
	}

	type(); // Call the type function to start the typing effect
}

typeOn(); // Call the typeOn function to start the animation

// Create a new function to allow the user to ho

const $carouselItems = $(".carousel .carousel-item");

$carouselItems.each(function () {
	const minPerSlide = 3;
	const $next = $(this).next().length
		? $(this).next()
		: $(this).siblings(":first");

	$next.children(":first-child").clone().appendTo($(this));

	let slidesRemaining = minPerSlide - 1;
	while (slidesRemaining > 0) {
		$next.next().length
			? $next.next().children(":first-child").clone().appendTo($(this))
			: $(this)
					.siblings(":first")
					.children(":first-child")
					.clone()
					.appendTo($(this));
		slidesRemaining--;
	}
});
