let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$('.start-btn').click(function() { 
  if(!started){
    setTimeout(function(){
      $('#level-title').text(`Level ${level}`)
      nextSequence();
      started = true;
    },500)
  }
  $('.start-btn').hide();

});

$('.btn').click(function() {
  let userChosenColor =$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
  userClickedPattern = [];
  level++
  $("#level-title").text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name){
  let sound = new Audio(`sounds/${name}.mp3`);
  sound.play();
}

function animatePress(currentColor){
  $(`#${currentColor}`).addClass('pressed');
  setTimeout(function() {
    $(`#${currentColor}`).removeClass('pressed')
  }, 100)
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success")
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  }else{
    playSound('wrong');
    
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    }, 200)

    $('#level-title').text(`GAME OVER...
     High Score: ${level}`);
    startOver();
  }
}

function startOver(){
  setTimeout(function(){
    level = 0;
    gamePattern = [];
    started = false;
    $('.start-btn').show();
    $('.start-btn').text('Restart');
  },500)

}