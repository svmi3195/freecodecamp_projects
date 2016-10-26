var leftOp = '';
var rightOp = '';
var sign = '';
var result = '';

var calculate = function (left, op, right){
  left = parseFloat(left);
  right = parseFloat(right);
    
  switch(op){
    case '+': return left + right;
    case '-': return left - right;
    case '*': return left * right;
    case '/': return left / right;
  }
}

$(document).ready(go());

function go(){	
	
$('button').on('click', function(){
	
  var pressedBtn = $(this).text();
  
  //clear logs from welcome and add pressed value
  if($('.logs').text() === "Let's do math!"){
	  $('.logs').text('');
  }  
  $('.logs').append(pressedBtn);
  
  switch(pressedBtn){
	case 'C':
		leftOp = '';
		rightOp = '';
		$('.current').text(rightOp);
		$('.logs').text(rightOp);
		break;
    case '=':
		result = calculate(leftOp, sign, rightOp);
		$('.current').text(result);
		$('.logs').append(result);
		leftOp = '';
		rightOp = result;
		break;
    case '+':
	case '-':
	case '*':
	case '/':
		if(leftOp !== ''){
		  leftOp = calculate(leftOp, sign, rightOp);
		}else{
		  leftOp = rightOp;
		}    
		rightOp = '';
		sign = pressedBtn;
		$('.current').text(rightOp);
		break;
    default:
		if(rightOp === result){
		  rightOp = '';
		}
		rightOp += pressedBtn;
		$('.current').text(rightOp);   
	    
  }
  
  

  
//handling screen overflow for main  
	if(($('.current').text()).length > 14){
		$('.current').text('Overflow!');
		$('.logs').text('Number too long...');
	}

//handling screen overflow for logs
	if(($('.logs').text()).length > 23){
		reduced = '...' + $('.logs').text().slice(-21);
		$('.logs').text(reduced);
	}
  
})
}