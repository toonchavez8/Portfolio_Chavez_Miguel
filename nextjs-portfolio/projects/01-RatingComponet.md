---
name: Interactive rating component
description: FrontEnd Mentor interactive rating component
image: https://res.cloudinary.com/duzeqpmgg/image/upload/v1713281977/toonchavez_Dev/projects/interactive-rating-component_othen5.png
url: https://example.com/project1
tags:
  - web
  - frontendmentors
stack:
  - HTML
  - SCSS
  - JavaScript
date: 2022-06-01
github: https://github.com/toonchavez8/01_RatingComponent
live: https://01-rating-component.vercel.app/
stared: false
readingTime: 0
---

# Interactive rating component

![BlogCover](https://res.cloudinary.com/duzeqpmgg/image/upload/v1713281977/toonchavez_Dev/projects/interactive-rating-component_othen5.png)

This is one of the first projects I did outside of the course I was enrolled in at the time, and it's a fairly simple rating component.

Here's an image of the final result:

![Interactive rating component](https://res.cloudinary.com/duzeqpmgg/image/upload/v1712004000/toonchavez_Dev/projects/01-rating-component-vercel-app_vii8df.png)

## [Front End Mentors](https://www.frontendmentor.io/)

Frontend Mentor is one of my favorite places to get project ideas and learn how to implement them. Sometimes it's hard to find a project that hasn't already been done, so building from the great designs that FEM provides is pretty sweet.

Link to challange: [Interactive rating component](https://www.frontendmentor.io/challenges/interactive-rating-component-koxpeBUmI)

### Code Snippets

Here are some code snippets I particularly liked from this project:

#### HTML

```html title="index.html"
  <div class="lottie">
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" class="lottie"></script>
    <lottie-player src="/images/illustration-thank-you.json"
    background="#0"
    speed="1"
    style="width: 18rem; height: 18rem;"
    loop
    autoplay
    class="lottie">
    </lottie-player>
  </div>

```

I have a background in motion design and animation so everytime i can use animations I make i will definitly try, it's a nice way to add some life to a design.

#### SCSS

```scss title="index.scss"
.container {
    //border: 2px solid magenta; //temporary
    width: 100vw;
    height: 100vh;
    display:  flex;
    align-items: center;
    justify-content: center;
}
```

Something that i would now change is the way i managed the height and width, it can lead to overlow and thats not good.

#### JavaScript

```javascript title="index.js"
ratingBtn.forEach(ratingbutton => {
    ratingbutton.addEventListener('click', handleRatings);
});

function handleRatings(event) {
  // rest of the code
}
```

Something that didnt really click until i worked on this component was managing functions to handle other logic, this to me at the moment was very clean how `onclick` i called the function that would actually handle the logic.

Its a fun simple solution that looking back still holds up for me.

### What I Learned

Through working on this project, I learned:

- How to create interactive components using HTML, CSS, and JavaScript.
- Improved my understanding of flexbox layout for positioning elements.
- Enhanced my ability to implement designs from external sources.

## Links to live and repo
