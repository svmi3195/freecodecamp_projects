var winners = [ [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
var available = [5,1,3,7,9,2,4,6,8];

var player = [];
var ai = [];

$(document).ready(go());

function go(){
$('button').on('click', function(){
	var moveP = $(this).attr('id');
	$('#' + moveP).html('X');
	player.push(Number(moveP));
	checkWin(player.sort());
	available.splice(available.indexOf(Number(moveP)), 1);
	aiMove();
})}

function checkWin(arr){
	for(var i =0; i < winners.length; i++){
		if(winners[i].toString() === arr.toString()){
			alert('winner');
		}
	}
}

function aiMove(){
	var moveAI = available[0];
	$('#' + moveAI).html('O');
	ai.push(Number(moveAI));
	checkWin(ai.sort());
	available.splice(available.indexOf(Number(moveAI)), 1);
}
