const slider = document.getElementById("slider");

// Get data from JSON file
let = testimonials = data;

// CREATE A SLIDE FOR EACH TESTIMONIAL
for (let i = 0; i < testimonials.length; i++) {
  const newLi = document.createElement("li");
  newLi.id = `slide-${i + 1}`;
  newLi.className = "slide";

  if (i > 0) {
    newLi.classList.add("slide-right", "fade");
  }
  newLi.innerHTML = `<div class="slide-container">
    <div class="slide-img">
      <div class="slide-img-container">
        <div class="img-shadow">
          <img class="profile" src="${testimonials[i].image}" alt="${testimonials[i].name}">
          <div class="slide-control" data-carousel>
            <span class="prev" data-carousel-button="prev">
              <img src="images/icon-prev.svg" alt="">
            </span>
            <span class="next round" data-carousel-button="next">
              <img src="images/icon-next.svg" alt="">
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-text">
      <div class="slide-text-container">
        <img src="images/pattern-quotes.svg" alt="">
        <p class="quote">“${testimonials[i].quote}”</p>
        <p class="citation">
          <span class="name">${testimonials[i].name}</span>
          <span class="title">${testimonials[i].profession}</span>
        </p>
      </div>
    </div>
  </div>

  <img class="pattern-curve" src="images/pattern-curve.svg" alt="">`;
  slider.appendChild(newLi);
}

// creating constants for slide controls
const slideControls = document.querySelectorAll(".slide-control");
const btnControls = document.querySelectorAll(".slide-control span");
const prevBtns = document.querySelectorAll(".slide-control span.prev");
const nextBtns = document.querySelectorAll(".slide-control span.next");
const slides = document.querySelectorAll(".slider .slide");
//defining index, direction and active slides
let slideIndex = 0;
let slideDirection;
let activeSlide;

// add class active only to the first slide
slides[0].classList.add("active");

// for loop for each button that adds a click event listener
btnControls.forEach(function (button) {
  button.addEventListener("click", function () {
    // INCREMENT SLIDE

    // if it's the next button and the slide index is less than the number of slides i.e there are more slides to display, call the changeSlide function to go forward
    if (button.dataset.carouselButton === "next") {
      if (slideIndex < slides.length - 1) {
        changeSlides(1);
        styleBtns();
      }

      // else if it's the previous button and the slide index greater than 0 i.e there are more slides to display, call the changeSlide function to go backwards
    } else if (button.dataset.carouselButton === "prev") {
      if (slideIndex > 0) {
        changeSlides(0);
        styleBtns();
      }
    }

    function changeSlides(slideDirection) {
      //if slide direction is true increment slide index by 1 and display next slide else, if it's false decrement slide index by 1 and display previous slides
      slideDirection ? slideIndex++ : slideIndex--;

      // SET ACTIVE SLIDE -- to be the one that is at the current index based on what button is clicked
      activeSlide = slides[slideIndex];

      // DEACTIVATE SLIDE -- first creates the deactivate array
      const deactivate = [];

      //pushes the slide before the current slide to the deactivate array
      if (slides[slideIndex - 1]) {
        deactivate.push(slides[slideIndex - 1]);
      }

      //pushes the slide after the current slide to the deactivate array
      if (slides[slideIndex + 1]) {
        deactivate.push(slides[slideIndex + 1]);
      }

      // removes the active class for each slide in the deactivate array after 1000ms to account for the transition
      setTimeout(() => {
        deactivate.forEach(function (slide) {
          slide.classList.remove("active");
        });
      }, "1000");

      // adds active class to the activeSlide element
      if (activeSlide) {
        activeSlide.classList.add("active");
      }

      //adds slide-left class to the slide before the current slide then decrements i so that it becomes the current slide
      for (let i = slideIndex; i >= 0; i--) {
        slides[i].classList.add("slide-left");
      }

      //adds slide-right class to the slide after the current slide
      for (let i = slideIndex; i < slides.length; i++) {
        slides[i].classList.add("slide-right");
      }
      // removes certain default classes for current slide
      activeSlide.classList.remove("slide-left");
      activeSlide.classList.remove("slide-right");
      activeSlide.classList.remove("fade");

      // adds class 'fade' to slides in deactivate array
      deactivate.forEach(function (slide) {
        slide.classList.add("fade");
      });
    }

    //function that increases the opacity of slideControl from 0 to 1
    function styleBtns() {
      slideControls.forEach(function (control) {
        control.style.opacity = "0";
        setTimeout(function () {
          control.style.opacity = "1";
        }, "600");
      });

      //removes previous buttons if active slide is the first of the array
      if (slideIndex === 0) {
        prevBtns.forEach(function (btn) {
          setTimeout(function () {
            btn.style.display = "none";
          }, "200");
        });

        // adds class "round" to each next button if the active slide is the first of the array
        nextBtns.forEach(function (btn) {
          setTimeout(function () {
            btn.classList.add("round");
          }, "200");
        });
        //removes the next button from the last slide
      } else if (slideIndex === slides.length - 1) {
        nextBtns.forEach(function (btn) {
          setTimeout(function () {
            btn.style.display = "none";
          }, "200");
        });

        // adds class "round" to each next button if the active slide is the last of the array

        prevBtns.forEach(function (btn) {
          setTimeout(function () {
            btn.classList.add("round");
          }, "200");
        });

        //removes "round" class to the next and previous buttons when the active slide is neither the first or the last slide
      } else {
        nextBtns.forEach(function (btn) {
          setTimeout(function () {
            btn.classList.remove("round");
          }, "200");
        });
        prevBtns.forEach(function (btn) {
          setTimeout(function () {
            btn.classList.remove("round");
          }, "200");
        });
        // displays next and previous buttons as "block" when the active slide is neither the first or the last of the array
        prevBtns.forEach(function (btn) {
          setTimeout(function () {
            btn.style.display = "block";
          }, "200");
        });
        nextBtns.forEach(function (btn) {
          setTimeout(function () {
            btn.style.display = "block";
          }, "200");
        });
      }
    }
  });
});
