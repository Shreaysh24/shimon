var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern =[];

var started = false;
var level=0;

$(document).keypress(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click",function(e){

    var userChosenColour=this.id;   
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);  
});

const checkAnswer= (currentLevel)=>{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {

        if(userClickedPattern.length===gamePattern.length){
          setTimeout(function (){
              nextSequence();
          },1000);
        }

    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
        
}

const nextSequence= () =>{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}
const playSound=(name)=>{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

const animatePress=(name)=>{
    $("#"+name).addClass("pressed");
    setTimeout(function () {
        $("#"+name).removeClass("pressed");
    }, 100);
}

const startOver=()=>{
    level =0;
    gamePattern = [];
    started =false;
}
