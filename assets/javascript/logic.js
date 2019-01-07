//
// JavaScript for CompanYogi
//
$(document).ready(function() {
    console.log("CompanYogi started...");

    $(".signinbutton").click(function(event) {
        window.location.href = "instructors.html";
    })

    $(".studentradiobutton").click(function(event) {
        $(".studentcreatebutton").css("display", "block");
        $(".instructorform").css("display", "none");
    });

    $(".instructorradiobutton").click(function(event) {
        $(".studentcreatebutton").css("display", "none");
        $(".instructorform").css("display", "block");
    });

    $(".studentcreatebutton").click(function(event) {
        window.location.href = "instructors.html";
    });

    $(".instructorcreatebutton").click(function(event) {
        window.location.href = "instructors.html";
    });

    $(".resetuserbutton").click(function(event) {
        window.location.href = "instructors.html";
    });
});
