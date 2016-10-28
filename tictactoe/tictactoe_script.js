$(document).ready(go());

function go(){
$('button').on('click', function(){	
	var id = '#' + $(this).attr('id');
	$(id).html('x');
	
})}