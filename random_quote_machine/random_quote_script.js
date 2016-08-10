function randQuote(){

$.ajax({
            url: 'http://quotes.stormconsultancy.co.uk/random.json?callback=my_method',
            type: 'GET',
            dataType: 'jsonp',
            error: function(xhr, status, error) {
                $('#quote').text("Error occured while trying to get the quote, sorry!");
            },
            success: function(json) {
                $('#quote').text(json.quote);
		$('#author').text(json.author);
            }


 
})



}

