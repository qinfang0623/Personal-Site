/* ------------------------------------------------------
             Check for Page loaded already
------------------------------------------------------ */

$(window).on("load", function() {
    $("body").css("opacity",1);
});

$(document).ready(function(){
    //Check if the current URL contains '#'
    if($("body").css("opacity") === 1){
        // Set the URL to whatever it was plus "#".
        url = document.URL+"#";
        location = "#";

        //Reload the page
        location.reload(true);
    }
});





/* ------------------------------------------------------
                       Music
------------------------------------------------------ */

/* background music */

document.querySelector(".bg-music-btn").addEventListener("click", function(event) {
  var backgroundMusic = new Audio("music/background-music.mp3");
  backgroundMusic.play();
  console.log(event);
})


/* click button sound */

for (var i=0; i<document.querySelectorAll(".btn-sound").length; i++) {
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






// wallpapers
wallPaper();

function wallPaper() {
  if (document.querySelector(".ampm").textContent === "AM" && ["12", "1", "2", "3", "4", "5"].includes(document.querySelector(".hms").textContent.split(":")[0])) {
    document.body.style.backgroundImage = "url('image/night.jpg')";
    document.querySelector(".pop-up-heading").innerHTML = "Night, sweet dreams!";
  }

  if (document.querySelector(".ampm").textContent === "AM" && ["6", "7", "8"].includes(document.querySelector(".hms").textContent.split(":")[0])) {
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





// cover flash

buttonAnimation();

function buttonAnimation() {
  $("#pop-up").animate({opacity: 0}, 10000, 'linear');
  setTimeout(function() {
    $("#title").animate({opacity: 1}, 2000, 'linear');
    $("#infor-personal").animate({opacity: 1}, 2000, 'linear');
    $("#education").animate({opacity: 1}, 2000, 'linear');
    $("#skill").animate({opacity: 1}, 2000, 'linear');
    $("#hobby").animate({opacity: 1}, 2000, 'linear');
    $("#contact").animate({opacity: 1}, 2000, 'linear');
    $("#footer").animate({opacity: 1}, 2000, 'linear');
  }, 10000);
}
