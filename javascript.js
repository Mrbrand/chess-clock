var player1 ={};
var player2 ={};
var active_player = "none";
var sound_on = true;
var dead = new Audio('audio/dead.mp3');

player1.timer = 6000;
player2.timer = 6000;
player1.reset = 6000; 
player2.reset = 6000; 
player1.plus = 50; 
player2.plus = 50; 


var click1 = new Audio("audio/click.wav"); //två pga snabba byten 
var click2 = new Audio("audio/click.wav");


// RESET
$(document).on('click', "#reset", function() {
    active_player = "none";
    $("#player2").removeClass("active");
    $("#player1").removeClass("active");

    $("#player2").removeClass("dead");
    $("#player1").removeClass("dead");
  
  if(confirm("Really reset?")){
        player1.timer = player1.reset;
        player2.timer = player2.reset;
        $("#player1").html(timer_output(player1.timer));
        $("#player2").html(timer_output(player2.timer));
    }
    
});

// PLAYER 1
$(document).on('touchstart', "#player1", function() {
     if (player1.timer >0 & player2.timer >0){ 
		$("#player1").removeClass("active");
		$("#player2").addClass("active");
		if(active_player=="player1") {	
			player1.timer += parseInt(player1.plus);
			if(sound_on) click1.play();
		}
		$("#player1").html(timer_output(player1.timer));
		active_player = "player2";
    }
});

// PLAYER 2
$(document).on('touchstart', "#player2", function() {
    if (player1.timer >0 & player2.timer >0){ 
		$("#player2").removeClass("active");
		$("#player1").addClass("active");
		if(active_player=="player2") {
			player2.timer += parseInt(player2.plus);
			if(sound_on) click2.play();
		}
		$("#player2").html(timer_output(player2.timer));
		active_player = "player1";
    }
});

// PAUSE
$(document).on('touchstart', "#pause", function() {
    if(active_player!="none") {
			if(sound_on) click2.play();
		}
    $("#player2").removeClass("active");
    $("#player1").removeClass("active");
    active_player = "none";
});


// SETTINGS
$(document).on('click', "#settings", function() {
    $("#player2").removeClass("active");
    $("#player1").removeClass("active");
    active_player = "none";
    
    $(".page").hide();
    $("#menu").show();
});

// SETTINGS
$(document).on('click', "#settings", function() {
    $("#player2").removeClass("active");
    $("#player1").removeClass("active");
    active_player = "none";
    
    
    $("#reset1_min").val(parseInt(player1.reset/600));
    $("#reset2_min").val(parseInt(player2.reset/600));
    $("#reset1_sec").val(zeropad(parseInt((player1.reset%600)/10)));
    $("#reset2_sec").val(zeropad(parseInt((player2.reset%600)/10)));
    
    $("#plus1").val(parseInt(player1.plus/10));
    $("#plus2").val(parseInt(player2.plus/10));

    $(".page").hide();
    $("#menu").show();
});

// SUBMIT
$(document).on('click', "#submit", function() {
    
    player1.reset = parseInt(($("#reset1_min").val()*600))+parseInt(($("#reset1_sec").val()*10));
    player2.reset = parseInt(($("#reset2_min").val()*600))+parseInt(($("#reset2_sec").val()*10));
   
    player1.plus = parseInt(($("#plus1").val()*10));
    player2.plus = parseInt(($("#plus2").val()*10));
    
    sound_on = $("#sound").is(':checked');

    $(".page").show();
    $("#menu").hide();
});

// SUBMIT
$(document).on('click', "#cancel", function() {
    
    $(".page").show();
    $("#menu").hide();
});


setInterval(function () {
    
    if(active_player == "player1"){
        player1.timer--;
       $("#player1").html(timer_output(player1.timer));
    }
    else if (active_player == "player2"){
        player2.timer--;
        $("#player2").html(timer_output(player2.timer));
    }
    
    if(player1.timer == 0) {
        $("#player1").addClass("dead");
        if(active_player=="player1") dead.play();
        active_player = "none";
    }
    else if(player2.timer == 0) {
        $("#player2").addClass("dead");
        if(active_player=="player2") dead.play();
        active_player = "none";
    }
    
    
}, 100);

function timer_output(timer) {
   return parseInt(timer/600)+":"+zeropad(parseInt((timer%600)/10)); 
}


function zeropad(n) {
    return (n < 10) ? ("0" + n) : n;
}
