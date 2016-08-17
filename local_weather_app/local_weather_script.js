$( document ).ready(go);

$('#degsBtn').on('click', changeDegs);

var myJSON = null;
var degC = null;
var degF = null;

function go(){

 $('#location').text("Loading location data...");
 $('#weather').text("Make sure you're using http, not https!"); 
  
$.getJSON("http://ip-api.com/json/?callback=?",function(result){   
  $('#location').text(result.city + ", " + result.countryCode);   
getWeather(result.city + "," + result.countryCode);                                                            
})}

function getWeather(loc){

 $('#weather').text("Loading weather data..."); 
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + loc + "&APPID=d6a50d743e455ef9a573d33c339c225b&units=metric",function(data){   
myJSON = data;
degC = Math.round(data.main.temp);   
var myImg = "<img src=\"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png\">"
    $('#image').append(myImg);    $('#weather').text(Math.round(data.main.temp) + " °C, " + data.weather[0].main);
$('#degsBtn').show();
  });
    }

function changeDegs(){
 if(myJSON !== null && degC !== null){
   degF = degC*9/5+32;
   degC = null; $('#weather').text(Math.round(degF) + " °F, " + myJSON.weather[0].main);
     }else if(myJSON !== null && degF !== null){
     degC = (degF-32)*5/9;  
     degF = null;     $('#weather').text(Math.round(myJSON.main.temp) + " °C, " + myJSON.weather[0].main);  
     } 
}