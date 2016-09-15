$(document).ready(function() {
  $('#searchBtn').on('click', getSnippets);
  
  $(document).keypress(function(e) {
    if(e.which == 13) {
       getSnippets();
    }
});
});

$(document).keypress(function(e) {
    if(e.which == 13) {
       $('#searchBtn').on('click', getSnippets);
    }
});
    
    
    function getSnippets() {
    
var input =  $("#input").val();
$('#results').text("Searching for " + input + "...");    

    
$.ajax({
            url:  
  'http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=' + input +'&callback=?',
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            error: function(xhr, status, error) {
                $('#results').text("Error occured while loading data, sorry!");
            },
            success: function(json) {
              
var str = "";              
for(var i=0; i<json.query.search.length;i++){
  var snippet; 
  if(json.query.search[i].snippet.slice(-1) === "."){
    snippet = json.query.search[i].snippet + "..";
  }else{
    snippet = json.query.search[i].snippet + "..."
  }
  
  str += "<a href=\"https://en.wikipedia.org/wiki/" + json.query.search[i].title + "\" target=\"_blank\"><div class=\"snippets\">" + "<h2>" + json.query.search[i].title + "</h2>" + "<p>" + snippet + "</p>" + "</div></a>";
};

$('#results').html(str);                          
              
if($('#results').text() === ""){
  $('#results').text("Sorry, couldn't find such entry. Check for spelling mistakes or search for something else.");
}              

            },//end of success function
  
 });    
  
  };
