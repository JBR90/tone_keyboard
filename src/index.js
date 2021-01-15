import { Destination, Synth } from "tone";
import {carouselFactory} from './imageCarousel'






const modelSynth = (() => {
  // Tone synth
  let synth = new Synth().toDestination();

  let synth2 = new Synth().toDestination();
  synth2.volume.value = 0;

  const oscillators = ["sine","sawtooth","square","triangle"]

  const changeType= (index,osc) => {
    console.log(index)
    console.log(osc)
    if(osc == "osc1"){
      synth.oscillator.type = oscillators[index-1];
    }else{
      synth2.oscillator.type = oscillators[index-1];
    }
  }

  // Keyboard controls
  const keyboardControls = {
    a: { pressed: false, note: "C3" },
    s: { pressed: false, note: "D3" },
    d: { pressed: false, note: "E3" },
    f: { pressed: false, note: "F3" },
    g: { pressed: false, note: "G3" },
    h: { pressed: false, note: "A3" },
    j: { pressed: false, note: "B3" },
    k: { pressed: false, note: "C4" },
  };

  // //Carousel 0sc1
  // const content = document.getElementById('carousel-wrapper')
  const imageArray = ["images/sine-wave.png","images/sawtooth-wave.png","images/square_wave.png","images/triangle_wave.png"]
  const osc1Caro = carouselFactory(imageArray,'100px')
  // const c = cara.getCarousel()
  // content.appendChild(c)

  // NexusUI elements

  var pitchDial1 = new Nexus.Dial("#pitch-dial", {
    size: [44, 44],
    interaction: "vertical", // "radial", "vertical", or "horizontal"
    mode: "absolute", // "absolute" or "relative"
    min: -100,
    max: 100,
    step: 7.76,
    value: 0
  });

  var finePitchDial = new Nexus.Dial("#fine-pitch-dial", {
    size: [44, 44],
    interaction: "vertical", // "radial", "vertical", or "horizontal"
    mode: "absolute", // "absolute" or "relative"
    min: 0,
    max: 12,
    step: 1,
    value: 6
  });




  return { 
          synth,
          synth2,
          pitchDial1,
          finePitchDial,
          changeType,
          osc1Caro
                 };
})();

//Controller

const controllerSynth = (() => {
  let pitchAmount = "0";
  const handleKey = (keyId) => {
    let pitch = Number(keyId)+ Number(pitchAmount)
    let n = pitch.toString();
    console.log(n)
    modelSynth.synth.triggerAttackRelease(n, "4n");
    
    // modelSynth.synth2.triggerAttackRelease(keyId, "4n");
  };

  //ADSR
  const handleEnvelop = (e) => {
    // console.log(e)
    if (e.target.id == "osc1-attack") {
      modelSynth.synth.envelope.attack = e.target.value / 50;
      console.log(e.target.value / 100);
    } else if (e.target.id == "osc1-decay") {
      modelSynth.synth.envelope.decay = e.target.value / 100;
    } else if (e.target.id == "osc1-sustain") {
      modelSynth.synth.envelope.sustain = e.target.value / 200;
    } else if (e.target.id == "osc1-release") {
      console.log("e.target.id")
      modelSynth.synth.envelope.release = e.target.value / 100;
    }   
     if (e.target.id == "osc2-attack") {
      modelSynth.synth2.envelope.attack = e.target.value / 50;
      console.log(e.target.value / 100);
    } else if (e.target.id == "osc2-decay") {
      modelSynth.synth2.envelope.decay = e.target.value / 100;
    } else if (e.target.id == "osc2-sustain") {
      modelSynth.synth2.envelope.sustain = e.target.value / 200;
    } else if (e.target.id == "osc2-release") {
      console.log("e.target.id")
      modelSynth.synth2.envelope.release = e.target.value / 100;
    }
  };

  // OSC1

  // handle image carousel
  const handleOscChangeLeft=(e)=>{
    if(e.currentTarget.id == "OSC1"){
      modelSynth.osc1Caro.changeLeft()
      let currentIndex = modelSynth.osc1Caro.getActiveImageIndex()
      modelSynth.changeType(currentIndex,"osc1")
    }
    
  }
  const handleOscChangeRight=(e)=>{
    if(e.currentTarget.id == "OSC1"){
      modelSynth.osc1Caro.changeRight()
      let currentIndex = modelSynth.osc1Caro.getActiveImageIndex()
      modelSynth.changeType(currentIndex,"osc1")
    }
  }



  modelSynth.pitchDial1.on('change', function(v){
    pitchAmount = v
    // console.log(typeof v)
    // modelSynth.synth.oscillator.detune.value = v;
    // console.log(modelSynth.synth.oscillator.frequency.value)
  })

  return {
    handleKey,
    handleEnvelop,
    handleOscChangeLeft,
    handleOscChangeRight
  };
})();

//View

const viewSynth = (() => {
  // Get keyboad mouse press
  const keyboardPress = document.getElementById("keyboard");
  keyboardPress.addEventListener("mousedown", (e) => {
    // console.log(e.target.id);
    
    controllerSynth.handleKey(e.target.id);
  });
  // OSC 1
  // pitchDial1.on("change", function (v) {
  //   console.log(v);
  // });

  // Get input sliders

  const osc1Env = document.getElementById("osc1Env");
  osc1Env.oninput = controllerSynth.handleEnvelop;
  const osc2Env = document.getElementById("osc2Env");
  osc2Env.oninput = controllerSynth.handleEnvelop;

  // OSC carousel
    //Carousel 0sc1
    const content = document.getElementById('carousel-wrapper')
    // const imageArray = ["images/sine-wave.png","images/sawtooth-wave.png","images/square_wave.png","images/triangle_wave.png"]
    // const cara = carouselFactory(imageArray,'100px')
    const c = modelSynth.osc1Caro.getCarousel()
    content.appendChild(c)



  const btnOscLeft = document.getElementsByClassName("btn-l");
  btnOscLeft[0].setAttribute("id", "OSC1");
  const btnOscRight = document.getElementsByClassName("btn-r");
  btnOscRight[0].setAttribute("id", "OSC1");

  btnOscLeft[0].addEventListener('click', controllerSynth.handleOscChangeLeft )
  
  btnOscRight[0].addEventListener('click', controllerSynth.handleOscChangeRight)
  // btnOscRight.myParam = "osc1"
})();

// const keys = document.querySelectorAll(".key");

// keys.forEach((key) => {
//   key.addEventListener("mousedown", () => {
//     synth.triggerAttackRelease(key.id, "4n");
//   });
// });

// const keyboardPress = document.getElementById("keyboard");
// keyboardPress.addEventListener("mousedown", (e) => {
//   controllerSynth.playKey(e);
// });

// const keys = document.querySelectorAll(".key");

// // const keyboardControls = {
// //   a: { pressed: false, note: "C3" },
// //   s: { pressed: false, note: "D3" },
// //   d: { pressed: false, note: "E3" },
// //   f: { pressed: false, note: "F3" },
// //   g: { pressed: false, note: "G3" },
// //   h: { pressed: false, note: "A3" },
// //   j: { pressed: false, note: "B3" },
// //   k: { pressed: false, note: "C4" },
// // };

// keys.forEach((key) => {
//   key.addEventListener("mousedown", () => {
//     synth.triggerAttackRelease(key.id, "4n");
//   });
// });

// window.addEventListener("keydown", (event) => {
//   let letterKey = event.key.toLowerCase();
//   if (keyboardControls[letterKey] && !keyboardControls[letterKey].pressed) {
//     keyboardControls[letterKey].pressed = true;
//     synth.triggerAttackRelease(keyboardControls[letterKey].note, "4n");
//   }
// });
// window.addEventListener("keyup", (event) => {
//   let letterKey = event.key.toLowerCase();
//   if (keyboardControls[letterKey]) {
//     keyboardControls[letterKey].pressed = false;
//   }
// });



//   const pitchDial1 = new Nexus.Dial("#pitch-dial", {
//     size: [44, 44],
//     interaction: "vertical", // "radial", "vertical", or "horizontal"
//     mode: "absolute", // "absolute" or "relative"
//     min: 0,
//     max: 12,
//     step: 1,
//     value: 6,
//   });

// pitchDial1.colorize("accent","white")
// pitchDial1.colorize("fill","black")

// pitchDial1.on("change", function (v) {
//   console.log(v);
// });
