var leftOp = '';
var rightOp = '';
var sign = '';
var result = '';

var calculate = function (left, op, right){
  
  //in case user input is 'number=' return number
  if(left === '' || left === '-'){return right;}
  
  left = parseFloat(left);
  right = parseFloat(right);
    
  switch(op){
    case '+': return formatResult(left + right);
    case '-': return formatResult(left - right);
    case '*': return formatResult(left * right);
    case '/': return formatResult(left / right);
  }
}

var formatResult = function (result){
  var resultStr = result.toString();
  var resultInteger = result.toFixed().toString();
  var resultFractional = (result - result.toFixed()).toString();
  
  if(Number.isInteger(result) && resultStr.length > 16){
    return result.toExponential(3)
  }else if(resultInteger.length > 10 && resultFractional.length > 5){
      return result.toPrecision(5);      
  }else if(resultFractional.length > 5 ){
      return result.toPrecision(5);      
  }else if(Number.isNaN(result)){
    return 'Incorrect input';
  }else{
    return result;  
  }
}

var processInput = function(pressedBtn){
  switch(pressedBtn){
	case 'C':
		leftOp = '';
		rightOp = '';
    sign = '';
		$('.current').text(rightOp);
		$('.logs').text(rightOp);
		break;
  case '=':	    
    result = calculate(leftOp, sign, rightOp);
              
		$('.current').text(result);
		$('.logs').append(result + ' ');
		leftOp = '';
		rightOp = result;
    
    if(result === 'Incorrect input'){
      $('.fa').css('-webkit-animation-name', 'glowError');
    }else{
      $('.fa').css('-webkit-animation-name', 'glowResult');
    }    
     
		break;
  case '+':
	case '-':
	case '*':
	case '/':
		if(leftOp !== '' && rightOp !== ''){
		  leftOp = calculate(leftOp, sign, rightOp);
		}else if(pressedBtn === '-' && rightOp === ''){
		  rightOp += '-';
      break;
		}else if(rightOp !== ''){		  
      leftOp = rightOp;
		}    
		rightOp = '';
		sign = pressedBtn;
		$('.current').text(rightOp);
		break;
  default:
    if(pressedBtn === '.' && rightOp.indexOf('.') !== -1){
      break;
    }else if(pressedBtn === '.' && rightOp === ''){
      rightOp = '0.';
      $('.current').text(rightOp);
      break;
    }  
      
		if(rightOp === result){
		  rightOp = '';
		}
		rightOp += pressedBtn;
		$('.current').text(rightOp);   
	    
  }
}



$(document).ready(go());

function go(){	
	
$('button').on('click', function(){
  $('.fa').css('-webkit-animation-name', '');
	
  var pressedBtn = $(this).text();
  $('.logs').append(pressedBtn);
  
   processInput(pressedBtn); 
    
//handling screen overflow for main  
	if(($('.current').text()).length > 16){
		$('.current').text('Overflow!');
		$('.logs').text('Number too long...');
    $('.fa').css('-webkit-animation-name', 'glowError');
	}

//handling screen overflow for logs
	if(($('.logs').text()).length > 23){
		reduced = '...' + $('.logs').text().slice(-20);
		$('.logs').text(reduced);
	}
  
})//end of btn handler
  
}