var winners = [ [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
var available = [5,1,3,7,9,2,4,6,8];

var player = [];
var ai = [];
var blank = null;

$(document).ready(go());

function go(){
//player makes move by cliking button
	$('button').on('click', function(){
		var moveP = $(this).attr('id');
		$('#' + moveP).html('X');
		player.push(Number(moveP));
		checkWin(player.sort(), 'Player');
		available.splice(available.indexOf(Number(moveP)), 1);
		aiMove();
})}

//AI makes its move
function aiMove(){
	var moveAI = 0;
	if(checkWin(ai.sort(), 'AI')){
		moveAI = blank;
	}else if(checkWin(player.sort(), 'Player')){
		moveAI = blank;
	}else{
		moveAI = available[0];
	}
	$('#' + moveAI).html('O');
	ai.push(Number(moveAI));
	checkWin(ai.sort(), 'AI');
	available.splice(available.indexOf(Number(moveAI)), 1);
}

//checking for winner or for good blank place to mark
function checkWin(arr, who){
	for(var i = 0; i < winners.length; i++){
		var check = 0;
		var x = null;
		for(var j = 0; j < 3; j++){
			if(arr.includes(winners[i][j])){
				check++;
			}else{
				x = winners[i][j];
			}
		}
		if(check === 3){
			alert(who + ' wins!');
			return null;
		}else if(check === 2 && available.includes(x)){
			blank = x;
		}
	}
	return blank;
}
