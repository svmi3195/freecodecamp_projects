$(document).ready();

$('#quoteBtn').on('click', randQuote);
$('#tweetBtn').on('click', tweetIt);

function randQuote(){

$.ajax({
            url: 'http://quotes.stormconsultancy.co.uk/random.json?callback=my_method',
            type: 'GET',
            dataType: 'jsonp',
            error: function(xhr, status, error) {
                $('#quote').text("Error occured while trying to get the quote, sorry!");
$('#author').text("");
            },
            success: function(json) {
                $('#quote').text(json.quote);
		$('#author').text(json.author);
              
            }
 
});

  var colors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#ff00ff', '#ff0080', '#ffffff', '#999999', '#a64dff', '#3399ff', '#009999', '#669999', '#cc99ff', '#ff6699', '#ffccff', '#ff6600', '#ccff66', '#33cc33', '#00ff99',
               '#8080ff', '#99ccff'];
  var rand = Math.floor((Math.random() * (colors.length))); 
$('body').css('color', colors[rand]);
 
}

function tweetIt(){
  
  var loc = "x";
    
    var quote  = $('#quote').text() + " (" + $('#author').text()+ ")";


  quote = encodeURIComponent(quote);

  window.open('http://twitter.com/share?url=' + loc + '&text=' + quote + '&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
  
}



