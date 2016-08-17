

  $(".img-thumbnail").hover(function(){
    $(this).css("opacity", "1.0");
    }, function(){
    $(this).css("opacity", "0.8");
});

var targetOffset1 = $("#aboutAnchor").offset().top - 10;
var targetOffset2 = $("#projectsAnchor").offset().top - 10;
var targetOffset3 = $("#contactsAnchor").offset().top - 10;

var $w = $(window).scroll(function(){
    if ( $w.scrollTop() >= targetOffset1 ) {   
        $('#about-btn').addClass("active");
        $('#projects-btn').removeClass("active");
         $('#contacts-btn').removeClass("active");
    } if ($w.scrollTop() >= targetOffset2) {
        $('#projects-btn').addClass("active");
        $('#about-btn').removeClass("active");
        $('#contacts-btn').removeClass("active");
    } if ($w.scrollTop() >= targetOffset3) {
        $('#contacts-btn').addClass("active");
        $('#about-btn').removeClass("active");
        $('#projects-btn').removeClass("active");
    }
});