/*
 * main.js
 * —
 * WHERE YOU PUT YOUR ADVANCED CODE
 *
 */

$(document).ready(function(){

		
		var $sphere = $('#sphere2');
		var $sphereText = $('#sphere-text');
		center_element($sphere);
		center_element($sphereText);

		var percent = 0;
		var margins = get_basic_margins();
		$('#big-pic').css("margin-left", margins.marginLeft);
		$('#big-pic').css("margin-top", margins.marginTop);
		
		calc_positions(percent);

		$(window).scroll(function(e) {
			//console.log("Doc Height = "+$(document).height()+", scroll="+$(document).scrollTop());
			percent = $(document.body).scrollTop() * 100 / ($(document.body)[0].scrollHeight - window.innerHeight);
			//percent = 100*$(document).scrollTop() / $(document).height();
			if(percent > 99.7) {
				$(document.body).scrollTop(0);
				percent=0;
			}
			check_percents_text(percent);
			calc_positions(percent);
		});


		$(window).on("resize", function(e){
			var $sphere = $('#sphere2');
			var $sphereText = $('#sphere-text');
			center_element($sphere);
			center_element($sphereText);
			calc_positions(percent);
		});
});




function check_percents_text(p) {
	if(p > 3 && p < 4) {
		show_sphere_text(12, "June", 1930);
	} else if(p > 10 && p < 14) {
		show_sphere_text(11, "February", 1920);
	}
	else {
		$('#sphere-text').fadeOut(500);
	}

}

function show_sphere_text(day, month, year) {
	$('#date-day').html(day);
	$('#date-month').html(month);
	$('#date-year').html(year);
	center_element($("#sphere-text"));
	$('#sphere-text').fadeIn(500);
}


function center_element(element) {

		console.log("Element width = "+element.width());
		var elementLeft =  (window.innerWidth/2 - element.outerWidth()/2);
		var elementTop = (window.innerHeight/2 - element.outerHeight()/2);
		element.css({left: elementLeft, top: elementTop});
}

function get_basic_margins() {
	return {
		marginLeft: -($('#big-pic').innerWidth() - $(document).innerWidth())/2,
		marginTop: window.innerHeight/2
	}
}

function calc_positions(percent_down_the_line){
	


	var $svg = $('#path_1');
	var $path = $svg.find('path');

	var percent = percent_down_the_line / 100; // le path va de 0 à 1

	//get the viewbox
	var box = $svg[0].getAttribute('viewBox');
	box = box.split(/\s+|,/);

	//setup path
	var p = $path[0];
	var len = p.getTotalLength();

	var $bigpic = $('#big-pic');

	var starting_point = p.getPointAtLength(percent*len);

	var x_point_percent = (((starting_point.x  / box[2] ) * 100 ) - 50);
	var y_point_percent = (((starting_point.y  / box[3] ) * 100 ));

	var margins_base = get_basic_margins();
	var w_img = $bigpic.innerWidth();
	var h_img = $bigpic.innerHeight();
	var w_decal = w_img * x_point_percent/100;
	var h_decal = -h_img * (1-y_point_percent/100);

	//console.log("Percent = "+(percent*100).toFixed(2)+"; w_decal="+w_decal.toFixed(1)+", hdecal = "+h_decal.toFixed(1)+", x: "+starting_point.x.toFixed(2)+", y: "+starting_point.y.toFixed(1));
	$bigpic.css("margin-left", margins_base.marginLeft + w_decal);
	$bigpic.css("margin-top", margins_base.marginTop + h_decal);
}

