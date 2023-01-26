var gamePattern=[];
var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


// to get the button color in an array which is clicked by user 
$(".btn").click(function(){                                    
    var userChosenColour= this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
});

function nextSequence(){
    level++; 
    $("h1").text("Level : " + level);
    
    //Empty  the click pattern aaray
    userClickedPattern.splice(0,userClickedPattern.length);
    
    var randomNumber= Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);   // to animate the color button 
    
    
}



function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");    // to play sound of color 
    audio.play();
}

function animatePress(currentColour){
    $("." + currentColour ).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour ).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(){
    if(!started){
        $("level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    { 
        if(userClickedPattern.length === gamePattern.length) { 
            
            setTimeout(function() { 
                nextSequence();
            }, 1000);
        }
          }
    else{
        playSound("Wrong");
        $("h1").text("Game Over, Press Any Key to Restart ");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
}