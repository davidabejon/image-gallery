const initialTime = new Date().getTime();
const images = document.getElementsByClassName("image");
const zoomedImages = document.getElementsByClassName("zoomed");
const down = document.getElementById("down");

let index = 0;
let nextImage = images[0];
let lastCoords = { x: 0, y: 0 };

const activate = (image, x, y) => {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = index;

  image.dataset.status = "active";

  lastCoords = { x, y };
}

const distanceFromLast = (x, y) => {
  return Math.hypot(x - lastCoords.x, y - lastCoords.y);
}

let zoomed = false;

const handleOnMove = e => {

    let timePassed = (new Date().getTime() - initialTime) / 1000;

    if (timePassed > 5 && !zoomed) {
        if(distanceFromLast(e.clientX, e.clientY) > 170) {
            nextImage = images[index % images.length];
            const lastImage = images[(index - 5) % images.length];
    
        activate(nextImage, e.clientX, e.clientY);
    
        if(lastImage) lastImage.dataset.status = "inactive";
        
        index++;
    }
  }
}

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

function Position(obj){
    var currenttop = 0;
    if (obj.offsetParent){
        do {
            currenttop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        return [currenttop];
    }
   }

function goDown() {
    window.scroll(0, Position(document.getElementById("down")))
}

window.onclick = e => {
    zoomed = !zoomed;

    for (let i = 0; i < images.length; i++) {
        images[i].classList.toggle("fade");
        zoomedImages[i].classList.toggle("fade-zoomed");
    }

    for (let i = 0; i < zoomedImages.length; i++) {
        if (zoomedImages[i].dataset.index == nextImage.dataset.index) {
            zoomedImages[i].classList.add("visible");
        } else {
            zoomedImages[i].classList.remove("visible");
        }
    }

    if (zoomed) {
        setTimeout(goDown, 1000);
    } else {
        setTimeout(window.scroll, 1000, 0, 0);
    }
    
};