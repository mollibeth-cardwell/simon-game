var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
  if (started === false) {
    $("h1").text("Level 0");
    nextSequence();
    started = true;
  }
});

function checkAnswer (index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1200)
      userClickedPattern = [];
    } else {
      console.log("not done");
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over! Press any key to restart");
    startOver();
  }

}


function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  level++
  $("h1").text("Level " + level);

}


function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}


$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});


function playSound (name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress (currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100)
}
