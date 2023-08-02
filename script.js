const movingCircleEl = document.querySelector("#moving-circle");
const timeEl = document.querySelector("#footer-time");
const imageEls = document.querySelectorAll(".page2-content ");
// console.log(new Date().getHours());

// for moving mouse
const circleMouseFollower = (xscale, yscale) => {
  window.addEventListener("mousemove", (e) => {
    movingCircleEl.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${xscale}, ${yscale})`;
  });
};

// for smooth scrolling
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// gsap annimation.........

const firstPageAnim = () => {
  const tl = gsap.timeline();
  tl.from("#nav", {
    opacity: 0,
    duration: 1.5,
    y: 10,
  });
  tl.to(".bounding-elem, #heading h5", {
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: Expo.ease,
    opacity: 0.86,
    delay: -1,
  });

  tl.from("#herofooter", {
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    delay: -0.5,
  });
};

// function for getting time in real time
const getTime = () => {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let amOrPm = hours >= 12 ? "PM" : "AM";

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  timeEl.innerText = `${hours} : ${minutes} ${amOrPm} GMT`;
};

// defaming of moving circle according to it's position

const defamingCircle = () => {
  let xscale = 1;
  let yscale = 1;

  let xprev = 0;
  let yprev = 0;

  window.addEventListener("mousemove", (details) => {
    let xdiff = details.clientX - xprev;
    xprev = details.clientX;
    let ydiff = details.clientY - yprev;
    yprev = details.clientY;

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

    circleMouseFollower(xscale, yscale);
  });
};

// applying mousemove event on elemetn to get image
// imageelms ko select karna
// add mousemove eventlintener on each an element
// image show honi chahiye kaha show honi chahiye pe mouse cursor hai to
// x ki and y ki values ko lena hoga
// image ki max and min value set krna
// fir image ko move karana or rotate karana

imageEls.forEach((elem) => {
  elem.addEventListener("mouseleave", () => {
    gsap.to(elem.querySelector(".page2-img"), {
      opacity: 0,
    });
  });
  let rotate = 0;
  let diffrot = 0;

  elem.addEventListener("mousemove", (details) => {
    // will provide all the information about the elem
    // console.log(elem.getBoundingClientRect())

    let diff = details.clientY - elem.getBoundingClientRect().top;
    diffrot = rotate - details.clientX;
    rotate = details.clientX;
    gsap.to(elem.querySelector(".page2-img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      duration: 0.5,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.4),
    });
  });
});

circleMouseFollower();
firstPageAnim();
getTime();
defamingCircle();
