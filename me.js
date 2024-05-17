var color =["red","green","blue","yellow"];

var gamePattern=[];
var userPattern=[];

var started=false;

var level = 0;


$(document).keypress(function(){
    if(!started){
     $("#level-title").text("level : "+level);
     nextSequence();
     started=true;
    }

});

$(".btn").click(function(e){
    var btnclick = this.id;

    userPattern.push(btnclick);

    soundEffect(btnclick);
    animate(btnclick);

    checkAnswer(userPattern.length-1);
} ); 

function checkAnswer(currentLevel){
    if(userPattern[currentLevel]===gamePattern[currentLevel]){
        // console.log("suc");
        if(userPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();},
                1000);
        }
    }else{
        soundEffect("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");   
        },100);

        $("#level-title").text("game over press any key to restrart");

        gameOver();
    }
}


function animate(name){
    $("#"+name).addClass("pressed");
    setTimeout(function (){
        $("#"+name).removeClass("pressed");
    },100);
}

function soundEffect(name){
    var a = new Audio("sounds/"+name+".mp3");
    a.play();
}

function nextSequence(){
    userPattern=[];

    level++;
    $("#level-title").text("level : "+level);

    var rannum = Math.floor(Math.random()*4);
    var rancolor =color[rannum];
    $("#"+rancolor).fadeOut(100).fadeIn(100);

    gamePattern.push(rancolor);

    soundEffect(rancolor);
}
function gameOver(){
    started=false;
    level=0;
    gamePattern=[];
}
