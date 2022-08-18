/* ------------------------------------------------------
             Check for Page loaded already
------------------------------------------------------ */

$(window).on("load", function() {
  $("body").css("opacity", 1);
});

// $(document).ready(function() {
//   //Check if the current URL contains '#'
//   if ($("body").css("opacity") === 1) {
//     // Set the URL to whatever it was plus "#".
//     url = document.URL + "#";
//     location = "#";
//     //Reload the page
//     location.reload(true);
//   }
// });


/* ------------------------------------------------------
                       Music
------------------------------------------------------ */

/* background music */

window.onload = function() {

  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");

  audio.src = "music/music.flac";
  audio.load();

  function myMusic() {
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#F6E7D8";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 2;
        const red = (i * barHeight) / 10;
        const green = i * 4;
        const blue = barHeight / 4 - 12;
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
      }
    }

    audio.play();
    renderFrame();
  }

  audio.onpause = function() {
    $("#music-player").animate({
      height: 0
    }, 1000, 'linear');
    document.getElementById("canvas").style.opacity = 0;
    document.getElementById("audio").style.width = "150px";
    document.getElementById("audio").style.opacity = 0.2;
  };

  audio.onplay = function() {
    $("#music-player").animate({
      height: 350
    }, 2000, 'linear');
    document.body.style.backgroundImage = "url('image/music-player.jpg')";
    document.getElementById("canvas").style.opacity = 0.4;
    document.getElementById("audio").style.width = "350px";
    document.getElementById("audio").style.opacity = 0.5;
    document.getElementById("music-player").scrollIntoView({behavior: 'smooth'});
    myMusic();
  };

  file.onchange = function() {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
  };
};


/* click button sound */

for (var i = 0; i < document.querySelectorAll(".btn-sound").length; i++) {
  document.querySelectorAll(".btn-sound")[i].addEventListener("click", function(event) {
    var clickSound = new Audio("music/click-btn-sound.wav");
    clickSound.play();
    console.log(event);
  })
}



/* ------------------------------------------------------
                     Create Clock
----------------------------------------------------- */

function updateTime() {
  var dateInfo = new Date();

  /* time */
  var hr,
    _min = (dateInfo.getMinutes() < 10) ? "0" + dateInfo.getMinutes() : dateInfo.getMinutes(),
    sec = (dateInfo.getSeconds() < 10) ? "0" + dateInfo.getSeconds() : dateInfo.getSeconds(),
    ampm = (dateInfo.getHours() >= 12) ? "PM" : "AM";

  // replace 0 with 12 at midnight, subtract 12 from hour if 13–23
  if (dateInfo.getHours() == 0) {
    hr = 12;
  } else if (dateInfo.getHours() > 12) {
    hr = dateInfo.getHours() - 12;
  } else {
    hr = dateInfo.getHours();
  }

  var currentTime = hr + ":" + _min + ":" + sec;

  // print time
  document.getElementsByClassName("hms")[0].innerHTML = currentTime;
  document.getElementsByClassName("ampm")[0].innerHTML = ampm;
  var year = dateInfo.getFullYear();
  document.getElementsByClassName("copyright")[0].innerHTML = "© " + year + " Qinfang Li.";
  document.getElementsByClassName("pop-time")[0].innerHTML = hr + ":" + _min + " " + ampm;


  /* date */
  var dow = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    day = dateInfo.getDate();

  // store date
  var currentDate = dow[dateInfo.getDay()] + ", " + month[dateInfo.getMonth()] + " " + day;

  document.getElementsByClassName("date")[0].innerHTML = currentDate;
};

// print time and date once, then update them every second
updateTime();
setInterval(function() {
  updateTime()
}, 1000);



/* ------------------------------------------------------
                     wallpapers
----------------------------------------------------- */

wallPaper();

function wallPaper() {
  if (document.querySelector(".ampm").textContent === "AM" && ["12", "1", "2", "3"].includes(document.querySelector(".hms").textContent.split(":")[0])) {
    document.body.style.backgroundImage = "url('image/night.jpg')";
    document.querySelector(".pop-up-heading").innerHTML = "Night, sweet dreams!";
  }

  if (document.querySelector(".ampm").textContent === "AM" && ["4", "5", "6", "7", "8"].includes(document.querySelector(".hms").textContent.split(":")[0])) {
    document.body.style.backgroundImage = "url('image/morning1.jpg')";
    document.querySelector(".pop-up-heading").innerHTML = "Morning, lovely day!";
  }

  if (document.querySelector(".ampm").textContent === "AM" && ["9", "10", "11"].includes(document.querySelector(".hms").textContent.split(":")[0])) {
    document.body.style.backgroundImage = "url('image/morning2.jpg')";
    document.querySelector(".pop-up-heading").innerHTML = "Morning, lovely day!";
  }

  if (document.querySelector(".ampm").textContent === "PM" && ["12", "1", "2"].includes(document.querySelector(".hms").textContent.split(":")[0])) {
    document.body.style.backgroundImage = "url('image/afternoon1.jpg')";
    document.querySelector(".pop-up-heading").innerHTML = "Afternoon, lovely day!";
  }

  if (document.querySelector(".ampm").textContent === "PM" && ["3", "4", "5"].includes(document.querySelector(".hms").textContent.split(":")[0])) {
    document.body.style.backgroundImage = "url('image/afternoon2.jpg')";
    document.querySelector(".pop-up-heading").innerHTML = "Afternoon, lovely day!";
  }

  if (document.querySelector(".ampm").textContent === "PM" && ["6", "7", "8"].includes(document.querySelector(".hms").textContent.split(":")[0])) {
    document.body.style.backgroundImage = "url('image/evening1.jpg')";
    document.querySelector(".pop-up-heading").innerHTML = "Evening, good rest!";
  }

  if (document.querySelector(".ampm").textContent === "PM" && ["9", "10", "11"].includes(document.querySelector(".hms").textContent.split(":")[0])) {
    document.body.style.backgroundImage = "url('image/evening2.jpg')";
    document.querySelector(".pop-up-heading").innerHTML = "Evening, good rest!";
  }
}



/* ------------------------------------------------------
                     cover flash
----------------------------------------------------- */

// buttonAnimation();

document.getElementsByClassName("enter-btn")[0].addEventListener("click", function() {
  document.querySelector(".pop-message").innerHTML = "Thank you for visiting!";
  buttonAnimation();
})

function buttonAnimation() {
  $("#pop-up").animate({
    opacity: 0
  }, 5000, 'linear');
  setTimeout(function() {
    document.querySelector("#pop-up").style.display = "none";
    $("#canvas3").animate({
      opacity: 1
    }, 2000, 'linear');
    $("#audio").animate({
      opacity: 0.2
    }, 2000, 'linear');
    $("#title").animate({
      opacity: 1
    }, 2000, 'linear');
    $("#infor-personal").animate({
      opacity: 1
    }, 2000, 'linear');
    $("#education").animate({
      opacity: 1
    }, 2000, 'linear');
    $("#skill").animate({
      opacity: 1
    }, 2000, 'linear');
    $("#hobby").animate({
      opacity: 1
    }, 2000, 'linear');
    $("#contact").animate({
      opacity: 1
    }, 2000, 'linear');
    $("#footer").animate({
      opacity: 1
    }, 2000, 'linear');
    $("hr").animate({
      opacity: 1
    }, 2000, 'linear');
  }, 5000);
  setTimeout(function() {
    document.body.style.backgroundImage = "url('image/music-player.jpg')";
  }, 10000);
}




/* ------------------------------------------------------
                     Pop Up
----------------------------------------------------- */

window.addEventListener('load', function(){
const canvas = document.getElementById("canvas1");
const ctx1 = canvas.getContext("2d");
ctx1.canvas.width  = window.innerWidth;
ctx1.canvas.height = window.innerHeight;
ctx1.fillStyle = '#F9F9F9';
ctx1.strokeStyle = 'yellow';

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
ctx2.canvas.width  = window.innerWidth;
ctx2.canvas.height = window.innerHeight;
ctx2.fillStyle = 'blue';
ctx2.strokeStyle = 'red';

let particleArray = [];
let canvasCenterX = window.innerWidth/2;
let canvasCenterY = window.innerHeight/2;
let radius = window.innerWidth/5;
let angle = 0;

// GET MOUSE POSITION ///////////////////////////////
const mouse = {
	x: null,
	y: null
}
window.addEventListener('mousemove', function(event){
		mouse.x = event.x;
		mouse.y = event.y;
		//console.log(mouse);
});
// SET MOUSE POSITION AS UNDEFINED EVERY 5 SEC(to prevent effect getting stuck in corners when mouse leaves window)//////
setInterval(function(){
	mouse.x = undefined;
	mouse.y = undefined;
}, 10);

// CREATE PARTICLE OBJECT ///////////////////
class Particle {
    constructor(x, y, size, color, weight){
        this.x = x;
        this.y = y;
        this.size = size;
        this.minSize = size;
        this.color = color;
        this.weight = weight;
    }
	draw(){
		ctx1.beginPath();
		ctx1.arc(this.x,this.y,this.size,0,Math.PI * 2, false);
		ctx1.fill();
    ctx1.closePath();
	}
	update(){
        // autopilot when mouse leaves canvas
        if ((mouse.x == undefined) && (mouse.y == undefined)){
          let newX  = radius * 2 * Math.cos(angle * (Math.PI/180));
          let newY = radius * 0.9 * Math.sin(angle * (Math.PI/90));
          mouse.x = newX + canvasCenterX;
          mouse.y = newY + canvasCenterY;
        }

        angle+= (Math.random() * 0.020) + 0.001;//0.001 - 0.021
        this.size-=0.15;
        if (this.size < 0) {
            this.x = (mouse.x + ((Math.random() * 20) - 10));
            this.y = (mouse.y + ((Math.random() * 20) - 10));
            this.size = (Math.random()*25);
            this.weight = (Math.random() * 2) + 0.1;
        }
        this.y += this.weight;
        this.weight += 0.05;

        // if it reaches bottom bounce
        if (this.y > canvas.height-this.size){
                this.weight *= -0.5;
        };
	}
}

function init() {
    particleArray = [];
    for (let i = 0; i < 150; i++){
        let size = (Math.random() * 10) + 5;
        let x = Math.random() * (innerWidth - size * 2) + size;
        let y = Math.random() * (innerHeight - size * 2) + size;
        let color = 'black';
        let weight = 1;
        particleArray.push(new Particle(x, y, size, color, weight));
    }

}

function animate(){
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
}
init();
animate();

// check if particles are close enough to draw line between them
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++){
            let distance = Math.sqrt(((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x))
            +   ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y)));
            if  (distance < 110)
            {
                opacityValue = 1-(distance/100);
                ctx2.strokeStyle='rgb(249, 249, 249,' + opacityValue +')';
                ctx2.beginPath();
                ctx2.lineWidth = 2;
                ctx2.moveTo(particleArray[a].x, particleArray[a].y);
                ctx2.lineTo(particleArray[b].x, particleArray[b].y);
                ctx2.stroke();

            }
    }
    }
}
window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasCenterX = window.innerWidth/2;
  canvasCenterY = window.innerHeight/2;
  radius = window.innerWidth/5;
  ctx1.canvas.width  = window.innerWidth;
  ctx1.canvas.height = window.innerHeight;
  ctx1.fillStyle = '#F9F9F9';
  ctx2.canvas.width  = window.innerWidth;
  ctx2.canvas.height = window.innerHeight;
  init();
})
});




/* ------------------------------------------------------
                     Raining
----------------------------------------------------- */

let canvas, ctx, w, h, moon, stars = [], meteors = [];

function init() {
	canvas = document.querySelector("#canvas3");
	ctx = canvas.getContext("2d");
	resizeReset();
	moon = new Moon();
	for (let a = 0; a < w * h * 0.0001; a++) {
		stars.push(new Star());
	}
	for (let b = 0; b < 2; b++) {
		meteors.push(new Meteor());
	}
	animationLoop();
}

function resizeReset() {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;
}

function animationLoop() {
	ctx.clearRect(0, 0, w, h);
	drawScene();
	requestAnimationFrame(animationLoop);
}

function drawScene() {
	// moon.draw();
	stars.map((star) => {
		star.update();
		star.draw();
	});
	meteors.map((meteor) => {
		meteor.update();
		meteor.draw();
	});
}

class Moon {
	constructor() {
		this.x = 150;
		this.y = 150;
		this.size = 100;
	}
	draw() {
		ctx.save();
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.shadowColor = "rgba(254, 247, 144, .7)";
		ctx.shadowBlur = 70;
		ctx.fillStyle = "rgba(254, 247, 144, 1)";
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
}

class Star {
	constructor() {
		this.x = Math.random() * w;
		this.y = Math.random() * h;
		this.size = Math.random() + 1;
		this.blinkChance = 0.005;
		this.alpha = 1;
		this.alphaChange = 0;
	}
	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
		ctx.fill();
		ctx.closePath();
	}
	update() {
		if (this.alphaChange === 0 && Math.random() < this.blinkChance) {
			this.alphaChange = -1;
		} else if (this.alphaChange !== 0) {
			this.alpha += this.alphaChange * 0.05;
			if (this.alpha <= 0) {
				this.alphaChange = 1;
			} else if (this.alpha >= 1) {
				this.alphaChange = 0;
			}
		}
	}
}

class Meteor {
	constructor() {
		this.reset();
	}
	reset() {
		this.x = Math.random() * w + 300;
		this.y = -100;
		this.size = Math.random() * 2 + 0.5;
		this.speed = (Math.random() + 0.5) * 15;
	}
	draw() {
		ctx.save();
		ctx.strokeStyle = "rgba(255, 255, 255, .1)";
		ctx.lineCap = "round";
		ctx.shadowColor = "rgba(255, 255, 255, 1)";
		ctx.shadowBlur = 10;
		for (let i = 0; i < 10; i++) {
			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.lineWidth = this.size;
			ctx.lineTo(this.x + 10 * (i + 1), this.y - 10 * (i + 1));
			ctx.stroke();
			ctx.closePath();
		}
		ctx.restore();
	}
	update() {
		this.x -= this.speed;
		this.y += this.speed;
		if (this.y >= h + 100) {
			this.reset();
		}
	}
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
