function go(){
 
$.getJSON("http://ip-api.com/json/?callback=?",function(result){   $('#location').text(result.city + ", " + result.countryCode);   
getWeather(result.city + "," + result.countryCode);                   
})};

function getWeather(loc){
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + loc + "&APPID=d6a50d743e455ef9a573d33c339c225b&units=metric",function(data){   $('#weather').text(Math.round(data.main.temp) + " °C " + data.weather[0].main);});
    };