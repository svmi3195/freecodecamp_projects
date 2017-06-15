var round = 1;
var seriesComputer = [];
var seriesPlayer = [];
var strict = false;

$('button').on('click', function(e){  
  switch(e.target.className){
    case('red'): 
    case('green'): 
    case('blue'): 
    case('yellow'): 
      seriesPlayer.push(e.target.className);
      if(seriesPlayer.length == seriesComputer.length){
        if(checkSeries() && round == 20){
          $('h1').text('You won!!!');
          $('.score').text(round);
        }else if(checkSeries()){
          $('.score').text(round < 10 ? '0' + round : round);
          round++;
          compRound(true);
        }else if(strict){
          start();
        }else{
          compRound(false);
        }
      }
      break;
    case('start'):
      start(); 
      break;
    case('strict'):
    case('strict on'):
      if(!strict){
        strict = true;
        $(this).addClass('on');
      }else{
        strict = false;
        $(this).removeClass('on');
      }
      break;
  };
});

function getRandomBtn(){
  var rand = Math.random();
  if(rand < 0.25){
    return 'red';
  }else if(rand < 0.5){
    return 'green';
  }else if(rand < 0.75){
    return 'blue';
  }else{
    return 'yellow';
  }
};

function start(){
  round = 1;
  seriesComputer = [];
  $('.score').text('00');
  compRound(true);
};

function compRound(isNext){
  $('button').prop('disabled', true);
  if(isNext){
    $('h1').text('Now listen...');
    seriesComputer.push(getRandomBtn());
  }else{
    $('h1').text('Mistake! Listen again...');
  }
  for(var j = 0; j < seriesComputer.length; j++){
    play('.' + seriesComputer[j], j);    
  }
};

function play(btnClass, j){
  setTimeout(function(){
    $(btnClass).addClass('pressed');
    setTimeout(function(){ 
      $(btnClass).removeClass('pressed');
      if(j == seriesComputer.length - 1){
        playerStartRound();
      }
    }, 500);
  }, 1000 * j);
};

function playerStartRound(){
  $('h1').text('Repeat sequence!');
  $('button').prop('disabled', false);
  seriesPlayer = [];  
};

function checkSeries(){
  for(var i = 0; i < seriesPlayer.length; i++){
    if(seriesPlayer[i] != seriesComputer[i]){
      return false;
    }
  }  
  return true;
};