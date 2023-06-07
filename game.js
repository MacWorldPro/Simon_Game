var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio(randomChosenColour + ".mp3");
  audio.play();
  $("h1").text("Level"+" "+level);
  level=level+1;
}

userClickedPattern=[];
$(".btn").click(function(){
  useChosenColour=this.id;
  userClickedPattern.push(useChosenColour);
  playSound(useChosenColour);
  function playSound(name)
  {
    var audi = new Audio(name + ".mp3");
    audi.play();
  }

  animatePress(useChosenColour);
  function animatePress(currentColour)
  {
    $("#"+currentColour).addClass("pressed");
  }

  setTimeout(function(){
    $("#"+useChosenColour).removeClass("pressed");
  },100);
  checkAnswer(userClickedPattern.length-1);
})


function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {



      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      var audi = new Audio("wrong.mp3");
      audi.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();

    }

}
function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
