/*<---------------Developed By Firoz Ansari--------------->*/

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenColour = []; //userChosenColour to store the id of the button that got clicked.
var userClickedPattern = [];
var started = false;
var level = 0;
var soundOn = true;

$(".btn").click(function(){
	var userChosenColour = this.getAttribute("id")
	userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);

})
//add action on keypress
$(document).on('keypress', function(){
	startGame();
})
//action on start btn 
$(".startBtn").click(function(){
	if($(this).text()=='Start'){
		startGame();	
		$(this).text("Reset");
	}else{
		starOver();
		level = 0;
		nextSequence();
	}
});
function startGame(){
	$("#level-title").text("Level " + level)
	if(started==false){
		nextSequence();
		started = true;
	}
}


function nextSequence(){
	  userClickedPattern = [];
	  $("#level-title").text("Level " + ++level)
	  var randomNumber = Math.floor(Math.random() * 4);
	  var randomChosenColour = buttonColours[randomNumber];
	  gamePattern.push(randomChosenColour);
	  $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
	  playSound(randomChosenColour)
}

function playSound(argument) {
	if(soundOn){
		var audio = new Audio("sounds/" + argument + ".mp3");
		audio.play();		
	}
}
function animatePress(ele) {
	$("#"+ele).addClass("pressed");
	setTimeout(function(){
 		$("#"+ele).removeClass("pressed");
	},200);
}
function checkAnswer(currentLevel){
	if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
		if(gamePattern.length === userClickedPattern.length){
			setTimeout(function(){
				nextSequence()
			},300)
		}
	}else{
		starOver(); 	
	}		
}
function starOver(){
	started = false;
	gamePattern = [];
	level = 0;
	$("body").addClass("game-over");
	setTimeout(()=>{
		$("body").removeClass("game-over");
	},200)
	//alert game over
	$("#level-title").text("Game Over, Press Any Key to Restart");
	playSound("wrong2")
}
//on off sound
$(".btnDiv img").click(function(){
	if($(this).attr("src") == "images/soundOff.png"){
		$(this).attr("src","images/soundOn.png");
		soundOn = true;
	}else{
		$(this).attr("src","images/soundOff.png");
		soundOn = false; 
	} 
})

/*<---------------Developed By Firoz Ansari--------------->*/