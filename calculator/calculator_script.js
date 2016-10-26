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
  $('.logs').append(pressedBtn);
  
  if(pressedBtn === 'C'){
    leftOp = '';
    rightOp = '';
    $('.current').text(rightOp);
    $('.logs').text(rightOp);
  }else if (pressedBtn === '='){
    result = calculate(leftOp, sign, rightOp);
    $('.current').text(result);
    $('.logs').append(result);
    leftOp = '';
    rightOp = result;
  }else if (pressedBtn === '+' || pressedBtn === '-' || pressedBtn === '*'  || pressedBtn === '/'){
    if(leftOp !== ''){
      leftOp = calculate(leftOp, sign, rightOp);
    }else{
      leftOp = rightOp;
    }    
    rightOp = '';
    sign = pressedBtn;
    $('.current').text(rightOp);
  }else{
    if(rightOp === result){
      rightOp = '';
    }
    rightOp += pressedBtn;
    $('.current').text(rightOp);   
  }
  
  
  if(($('.current').text()).length > 14){
		$('.current').text('Overflow!');
		$('.logs').text('Number too long...');
	}

	if(($('.logs').text()).length > 23){
		reduced = $('.logs').text().slice(-23);
		$('.logs').text(reduced);
	}
  
})
}