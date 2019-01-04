//
// JavaScript for CompanYogi
//
$(document).ready(function() {
    console.log("CompanYogi started...");

    $(".signinbutton").click(function(event) {
        console.log("SignIn button clicked...");
        window.location.href = "instructors.html";
    });

    $(".studentcreatebutton").click(function(event) {
        console.log("Student create button clicked...");
        window.location.href = "instructors.html";
    });

    $(".instructorcreatebutton").click(function(event) {
        console.log("Instructor create button clicked...");
        window.location.href = "instructors.html";
    });

    $(".instructorbutton").click(function(event) {
        console.log("Instructor button clicked...");
        $(".studentcreatebutton").css("display", "none");
        $(".instructorform").css("display", "block");
    });

    $(".studentbutton").click(function(event) {
        console.log("Instructor button clicked...");
        $(".studentcreatebutton").css("display", "block");
        $(".instructorform").css("display", "none");
    });
});
