/*
the board looks like:
1 2 3
4 5 6
7 8 9
*/

//all winning combinations
var winners = [ [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
//available spots: center + corners (in random order) + others (in random order)
var available = [5].concat(shuffle([1,3,7,9]), shuffle([2,4,6,8]));

//arrays to store player and ai's marks
var player = [];
var ai = [];

//default is X for player O for ai
var signP = 'X';
var signAI = 'O';

$(document).ready(go());

function go(){
	$('button[class="board"]').on('click', playerMove);
	$('button[id="settings"]').on('click', function(){
		$('.game').hide();
		$('.menu').show();
	});
	$('button[id="X"]').on('click', function(){
		signP = 'X';
		signAI = 'O';
		$('.game').show();
		$('.menu').hide();
		gameStart();
	});
	$('button[id="O"]').on('click', function(){
		signP = 'O';
		signAI = 'X';
		$('.game').show();
		$('.menu').hide();
		gameStart();
	});
}//end of go function

//player makes move by cliking button
function playerMove(){
		var moveP = $(this).attr('id');
		$('#' + moveP).html(signP);
		player.push(Number(moveP));
		var set = checkWin(player);
		if(set && set.length === 3){
			gameOver('player', set);
		}
		available.splice(available.indexOf(Number(moveP)), 1);
		if(available.length === 0){
			gameOver('draw', null);
		}
		aiMove();
	}

//AI makes its move
function aiMove(){
	var moveAI = 0;
	//if ai can win in one move, make that move
	if(checkWin(ai)){
		moveAI = checkWin(ai);
	}
	//if player can win with one move, block it
	else if(checkWin(player)){
		moveAI = checkWin(player);
	}
	//otherwise just mark best available spot (center > any corner > other)
	else{
		moveAI = available[0];
	}

	$('#' + moveAI).html(signAI);
	ai.push(Number(moveAI));
	var set = checkWin(ai);
	if(set && set.length === 3){
		gameOver('ai', set);
	}
	available.splice(available.indexOf(Number(moveAI)), 1);
	if(available.length === 0){
		gameOver('draw', null);
	}
}

//checking for winner or for good blank place to mark
function checkWin(arr){
	var blank = null;
	for(var i = 0; i < winners.length; i++){
		var check = 0;
		var x = null;
		var set = [];
		for(var j = 0; j < 3; j++){
			if(arr.includes(winners[i][j])){
				check++;
				set.push(winners[i][j]);
			}else{
				x = winners[i][j];
			}
		}
		if(check === 3){
			//if someone won, return winning combo
			return set;
		}else if(check === 2 && available.includes(x)){
			blank = x;
		}
	}
	//return null or index of good spot to mark
	return blank;
}

//endgame events
function gameOver(winner, set){
	if(set){
		for(var i = 0; i < set.length; i++){
			$('#' + set[i]).css('background-color', 'red');
		}
	}

	switch(winner){
	case 'player':
		alert('player won');
		break;
	case 'ai':
		alert('ai won');
		break;
	case 'draw':
		alert('it\'s a draw');
		break;
	}
	gameStart();
}

function gameStart(){
	//refresh arrays
	available = [5].concat(shuffle([1,3,7,9]), shuffle([2,4,6,8]));
	player = [];
	ai = [];

	//clear the board of previous marks
	$('button[class="board"]').text('');
	$('button[class="board"]').css('background-color', 'white');
}

//shuffle function for randomizing available spots
function shuffle(array) {
    var counter = array.length;
    while (counter > 0) {
        var index = Math.floor(Math.random() * counter);
        counter--;
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
