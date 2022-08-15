/* ------------------------------------------------------
             Check for Page loaded already
------------------------------------------------------ */

// $(window).on("load", function() {
//   $("body").css("opacity", 1);
// });
//
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
    // document.getElementById("nav-bar").style.opacity = 1;
  };

  audio.onplay = function() {
    $("#music-player").animate({
      height: 350
    }, 1000, 'linear');
    document.body.style.backgroundImage = "url('image/music-player.jpg')";
    document.getElementById("canvas").style.opacity = 0.4;
    document.getElementById("audio").style.width = "350px";
    document.getElementById("audio").style.opacity = 0.5;
    // document.getElementById("nav-bar").style.opacity = 0.5;
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

buttonAnimation();

function buttonAnimation() {

  $("#pop-up").animate({
    opacity: 0
  }, 7000, 'linear');

  setTimeout(function() {
    document.querySelector("#pop-up").style.display = "none";
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
  }, 7000);

  setTimeout(function() {
    document.body.style.backgroundImage = "url('image/music-player.jpg')";
  }, 20000);
}
