let gridChilds = document.getElementsByClassName('grid-child');

TweenMax.from(".header", { duration: 1.5, y: "-200%" })
TweenMax.from(".blue-bar", { duration: 1.5, x: "-200%" })
TweenMax.from(".grid-parent", { duration: 1.5, x: "200%" })

for(let i = 0; i < gridChilds.length; i++) {
  gridChilds[i].addEventListener("mouseenter", function() {
    TweenMax.to(gridChilds[i], {
        duration: 0.7,
        scale: 1.1
    })
  })

  gridChilds[i].addEventListener("mouseleave", function() {
    TweenMax.to(gridChilds[i], {
        duration: 0.7,
        scale: 1
    })
  })

  gridChilds[i].addEventListener("click", function() {
    TweenMax.to(".header", { duration: 1.5, y: "-200%" })
    TweenMax.to(".blue-bar", { duration: 1.5, x: "-200%" })
    TweenMax.to(".grid-parent", { duration: 1.5, x: "200%" })
  })
}
