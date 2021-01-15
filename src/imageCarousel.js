const carouselFactory = (imgArray, maxWidth) => {
  //
  // Factory for image carousels
  //
  // create new dom element
  const domElement = (tag, classs, style) => {
    let element = document.createElement(tag);
    element.classList.add(classs);
    element.setAttribute("style", style);
    return element;
  };
  //create new dom image
  const domImage = (src) => {
    let image = document.createElement("img");
    image.classList.add("carousel__photo");
    image.style.display = "none";
    image.style.maxWidth = maxWidth;
    image.src = src;
    return image;
  };


  //active image
  let activeImageIndex = 1;

  //inital photo on load
  const initialPhoto = domImage(imgArray[0]);
  initialPhoto.classList.add("inital")
  initialPhoto.style.display = "block";

  //Containers
  const carouselWrapper = domElement("div", "carousel-wrapper", "color:black");
  carouselWrapper.style.maxWidth = maxWidth;
  const carousel = domElement("div", "carousel", "");
  const carouselButtons = domElement(
    "div",
    "carousel-buttons",
    "display:flex; justify-content: space-around"
  );

  //Buttons
  const btnL = domElement("button", "btn-l", "");
  btnL.textContent = '<'
  const btnR = domElement("button", "btn-r", "color:black");
  btnR.textContent = '>'
  carouselButtons.appendChild(btnL);
  carouselButtons.appendChild(btnR);

  let arrayLen = imgArray.length;

  // loop around array and append images to container
  carousel.appendChild(initialPhoto); //first image to load
  imgArray.forEach((image) => {
    let addImage = domImage(image);
    carousel.appendChild(addImage);
  });

  // append buttons
  carousel.appendChild(carouselButtons);

  // append carousel to wrapper
  carouselWrapper.appendChild(carousel);

  //Methods//

  const getCarousel = ()=>{
    return carouselWrapper
  }

  const domCarousel = document.getElementsByClassName('carousel__photo')
  const domInitial = document.querySelectorAll('.carousel__photo, .initial')
  console.log(domCarousel)
  console.log(domInitial)


  const changeLeft = () => {
    if(activeImageIndex == 1){
     
      domCarousel[activeImageIndex].style.display = 'block'
      domCarousel[0].style.display = 'none'
    }else{
      domCarousel[activeImageIndex].style.display = 'none'
      activeImageIndex -= 1;
      domCarousel[activeImageIndex].style.display = 'block'
    }
  };

  const changeRight = () => {
    domCarousel[0].style.display = 'none'
    if(activeImageIndex == arrayLen){
     
      domCarousel[activeImageIndex].style.display = 'block'
     
    }else{
      domCarousel[activeImageIndex].style.display = 'none'
      activeImageIndex += 1;
      domCarousel[activeImageIndex].style.display = 'block'
    }
  };

  const getActiveImageIndex = ()=>{
    return activeImageIndex
  }


  return {getCarousel, changeLeft, changeRight, getActiveImageIndex};
};

export{carouselFactory}

//   <div class="carousel-wrapper">
//   <div class="carousel">
//     <img
//       class="carousel__photo initial"
//       src="images/sine-wave.png"
//     />
//     <img class="carousel__photo" src="images/sawtooth-wave.png" />
//     <img class="carousel__photo" src="images/square_wave.png" />
//     <img class="carousel__photo" src="images/triangle_wave.png" />

//     <div class="carousel-buttons">
//       <button class="btn-osc-l"><</button>
//       <button class="btn-osc-r">></button>
//     </div>
//   </div>
// </div>
