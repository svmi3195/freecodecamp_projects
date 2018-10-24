$(document).ready(function(){

$('input[type=radio][name=show]').on('change', function() {
  if(this.value === "online"){
    $('.online').slideDown();
    $('.offline').slideUp();
  }
  else if(this.value === "offline"){
    $('.offline').slideDown();
    $('.online').slideUp();
  }
  else {
    $('.online').slideDown();
    $('.offline').slideDown();
  }
});  

  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "BLIZZARD", "HearthstoneFR", "GamingLive_TV1", "orKsTV"];
  var streamers = [];  
  
  var str = "";
  for(var i=0; i<channels.length; i++){
    str += channels[i] + ",";
  };  
str = str.substring(0, str.length - 1);  

  $.ajax({
            url:  
  'https://api.twitch.tv/kraken/streams?channel='+ str +'&callback=?',
            type: 'GET',
            dataType: 'json',
            error: function(xhr, status, error) {
                $('#streamers').text("Error occured while loading data...");
            },
            success: function(json) {
              //$('#streamers').text(JSON.stringify(json)); <- to get text of json for testing
              for(var i=0; i<json._total; i++){
                $('#streamers').append("<div class=\"channels online row text-center \"><div class=\"col-sm-2\"><img src=\"" + json.streams[i].channel.logo + "\"  width=\"50\"></div><div class=\"col-sm-3 content\"><a href=\"https://www.twitch.tv/" +  json.streams[i].channel.display_name +"\">" +json.streams[i].channel.display_name + "</a></div><div class=\"col-sm-7 content text-left\"><span class=\"streamGame\">" + json.streams[i].game + ": </span><span class=\"streamDesc\">" + json.streams[i].channel.status + "</span></div></div>");
                streamers.push(json.streams[i].channel.display_name);
              }
              for(var j=0; j<(channels.length);j++){               
                if(streamers.indexOf(channels[j]) === -1){  
                              $.ajax({
            url:  
  'https://api.twitch.tv/kraken/channels/' + channels[j],
            type: 'GET',
            dataType: 'json',
            error: function(xhr, status, error) {
                
            },
            success: function(json) {
              $('#streamers').append("<div class=\"channels offline row  text-center \"><div class=\"col-sm-2 \">" + "<img src=\"" + json.logo + "\"  width=\"50\">" + "</div><div class=\"col-sm-3 content\"><a href=\"https://www.twitch.tv/" + json.display_name + "\">" + json.display_name + "</a></div><div class=\"col-sm-7 content\"><div class=\"isOffline\">is offline</div></div>");
              
                //var parentHeight = $('.row').height();
                //var childHeight = $('.content').height();
                //$('.content').css('margin-top', (parentHeight - childHeight) / 2);
              $( ".content" ).each(function( index ) {
                var parentHeight = $('.row').height();
                var childHeight = $(this).height();
                $(this).css('margin-top', (parentHeight - childHeight) / 2); 
              });
              
            }//end of success for getting offline logos
});//end of ajax for getting offline logos  
                }
            }                                        
              $('#streamers').slideDown();
            }//end of success function
 });//end of ajax
  

  
});//end of doc ready