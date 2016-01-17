/*
 * main.js
 * —
 * WHERE YOU PUT YOUR ADVANCED CODE
 *
 */



window.isDesktop = function(){
	var width = $(window).width();
	return width > 1024;
}

window.isTablet = function(){
	var width = $(window).width();
	return width <= 1024 && width > 569;
}

window.isMobile = function(){
	var width = $(window).width();
	return width <= 569;
}

window.isTabletPortrait = function(){
	var width = $(window).width();
	return width <= 800 && width >= 768;
}

var onceDirty = true;
$(document).ready(function(){

		var $sphere = $('#sphere2');
		var $sphereText = $('#sphere-text');
		var $iphoneSphere = $('#iphone-sphere');
		var $iphoneSphereText = $('#iphone-sphere-text');
		var $tabletSphere = $('#sphere-tablet');

		center_element($sphere);
		center_element($sphereText);
		center_element_iphone($iphoneSphere);
		center_element_tablet($tabletSphere);
		//center_element_iphone($iphoneSphereText);

		var percent = 0;
		var $bigpic = isDesktop() ? $('#big-pic') : $('#big-pic-tablet');
		var margins = isDesktop() ? get_basic_margins() : get_basic_margins_tablet();
		console.log("margins: ");
		console.log(margins);
		$bigpic.css("margin-left", margins.marginLeft);
		$bigpic.css("margin-top", margins.marginTop);

		var $bigcontainer;
		if(isDesktop()){
			$bigimgcontainer = $('#img-container-fat');
			$bigimgcontainer.css("margin-left", margins.marginLeft);
			$bigimgcontainer.css("margin-top", margins.marginTop);
		}

		check_percents_text(0);
		check_percents_text_tablet(0);
		if(isDesktop()) check_percents_image(0);
		else if (isTablet()) check_percents_image_tablet(0);
		if(isMobile()) {
			iphone_do_stuff();
		}
		
		calc_positions(percent);



		$(window).load(function(){

			$(window).scroll(function(e) {
				//console.log("Doc Height = "+$(document).height()+", scroll="+$(document).scrollTop());
				percent = $(document.body).scrollTop() * 100 / ($(document.body)[0].scrollHeight - window.innerHeight);
				console.log("percent equals "+percent);

				if(isDesktop()) {
					if(percent > 99.7) {
						$(document.body).scrollTop(0);
						percent=0;
					}
				}
				check_percents_text(percent);
				check_percents_text_tablet(percent);
				if(isDesktop()) check_percents_image(percent);
				else if (isTablet()) check_percents_image_tablet(percent);
				calc_positions(percent);

				if(isMobile()) {
					iphone_do_stuff();
				}

				if((isMobile() || isTablet()) && percent > 100.20) {
						console.log("Percent = "+percent+" and Once dirty = "+onceDirty);
						if(onceDirty) launchAnimation();
						onceDirty = false;
				}
				
			});


		});


		$(window).on("resize", function(e){
			console.log("RESI");
			var $sphere = $('#sphere2');
			var $sphereText = $('#sphere-text');
			var $iphoneSphere = $('#iphone-sphere');
			var $iphoneSphereText = $('#iphone-sphere-text');
			var $tabletSphere = $('#sphere-tablet');

			center_element($sphere);
			center_element($sphereText);
			center_element_iphone($iphoneSphere);
			center_element_tablet($tabletSphere);

			calc_positions(percent);
		});
});

var lastImgIndex = -1;
function iphone_do_stuff() {
	var docTop = $(document.body).scrollTop();

	var images = $('#iphone-container img');
	for (var i = 0; i < images.length; i++) {
		var imageHeight = $(images[i]).height();
		var imgTop = $(images[i]).position().top;

		if(docTop <= imgTop + imageHeight && docTop >= imgTop && lastImgIndex!=i) {
			console.log("SHOWING IMAGE number "+i);
			var $img = $(images[i]);
			var day = $img.attr("data-day");
			var month = $img.attr("data-month");
			var year = $img.attr("data-year");
			$('#iphone-day').html(day);
			$('#iphone-month').html(month);
			$('#iphone-year').html(year);
			lastImgIndex = i;
		}
	};

	
}

function check_percents_text(p) {
	if(p > 6.4 && p < 7.5) {
		show_sphere_text("June", "8th", 1903);
	} else if(p > 11.86 && p < 13) {
		show_sphere_text("December", "11th", 1903);
	} else if(p > 16 && p < 17) {
		show_sphere_text("July", "4th", 1905);
	} else if(p > 25.9 && p < 27.5) {
		show_sphere_text("April", "20th", 1906);
	} else if(p > 27.6 && p < 28.1) {
		show_sphere_text("April", "22th", 1906);
	}
	else {
		$('#sphere-text').fadeOut(100);
	}

}

function check_percents_text_tablet(p) {
	if(p >= 0 && p < 4.71) {
		show_sphere_text_tablet("April", "19th", 1906);
	} else if(p > 4.72 && p < 5.72) {
		show_sphere_text_tablet("April", "21st", 1906);
	} else if(p > 5.73 && p < 12.32) {
		show_sphere_text_tablet("November", "23th", 1911);
	} else if(p > 12.33 && p < 13.32) {
		show_sphere_text_tablet("November", "24th", 1911);
	} else if(p > 13.33 && p < 36.48) {
		show_sphere_text_tablet("November", "28th", 1911);
	} else if(p > 36.49 && p < 39.16) {
		show_sphere_text_tablet("January", "3rd", 1912);
	} else if(p > 39.17 && p < 39.57) {
		show_sphere_text_tablet("January", "4th", 1912);
	} else if(p > 39.68 && p < 40.56) {
		show_sphere_text_tablet("January", "5th", 1912);
	} else if(p > 40.57 && p < 41.11) {
		show_sphere_text_tablet("January", "25th", 1912);
	} else if(p > 41.12 && p < 41.62) {
		show_sphere_text_tablet("July", "22nd", 1912);
	} else if(p > 41.63 && p < 46.8) {
		show_sphere_text_tablet("February", "2nd", 1921);
	} else if(p > 46.9 && p < 48.04) {
		show_sphere_text_tablet("February", "28th", 1921);
	} else if(p > 48.05 && p < 48.96) {
		show_sphere_text_tablet("March", "3rd", 1921);
	} else if(p > 48.97 && p < 49.79) {
		show_sphere_text_tablet("March", "10th", 1921);
	} else if(p > 49.8 && p < 51.59) {
		show_sphere_text_tablet("March", "12th", 1921);
	} else if(p > 51.6 && p < 53.98) {
		show_sphere_text_tablet("March", "13th", 1921);
	} else if(p > 53.99 && p < 55.42) {
		show_sphere_text_tablet("March", "20th", 1921);				
	} else if(p > 55.43 && p < 56.42) {
		show_sphere_text_tablet("March", "31th", 1921);
	} else if(p > 56.43 && p < 57.55) {
		show_sphere_text_tablet("Avril", "13th", 1921);
	} else if(p > 57.56 && p < 58.55) {
		show_sphere_text_tablet("Avril", "20th", 1921);			
	} else if(p > 58.56 && p < 60.09) {
		show_sphere_text_tablet("Avril", "26th", 1921);
	} else if(p > 60.10 && p < 60.92) {
		show_sphere_text_tablet("May", "3th", 1921);
	} else if(p > 60.93 && p < 63.57) {
		show_sphere_text_tablet("May", "4th", 1921);
	} else if(p > 63.58 && p < 64.81) {
		show_sphere_text_tablet("May", "11th", 1921);
	} else if(p > 64.82 && p < 70.82) {
		show_sphere_text_tablet("May", "21th", 1921);
	} else if(p > 70.83 && p < 75.02) {
		show_sphere_text_tablet("June", "6th", 1921);
	} else if(p > 75.03 && p < 75.67) {
		show_sphere_text_tablet("July", "2nd", 1921);
	} else if(p > 75.68 && p < 76.46) {
		show_sphere_text_tablet("April", "2nd", 1932);
	} else if(p > 76.47 && p < 76.89) {
		show_sphere_text_tablet("June", "4th", 1934);
	} else if(p > 76.9 && p < 94.96) {
		show_sphere_text_tablet("July", "4th", 1934);
	} else if(p > 94.97 && p < 97.28) {
		show_sphere_text_tablet("July", "5th", 1934);
	} else if(p > 97.29 && p < 98.13) {
		show_sphere_text_tablet("July", "8th", 1934);
	} else if(p > 98.14 && p < 99.55) {
		show_sphere_text_tablet("November", "11th", 1934);
	} else if(p > 99.56 && p < 100) {
		show_sphere_text_tablet("February", "28th", 1935);





	} 

	else {
		$('#sphere-text_tablet').fadeOut(300);
	}
}

function show_sphere_text(day, month, year) {
	$('#date-day').html(day);
	$('#date-month').html(month);
	$('#date-year').html(year);
	center_element($("#sphere-text"));
	$('#sphere-text').fadeIn(300);
}

function show_sphere_text_tablet(day, month, year) {
	$('#date-day-tablet').html(day);
	$('#date-month-tablet').html(month);
	$('#date-year-tablet').html(year);
	$('#sphere-text-tablet').fadeIn(300);
}

function check_percents_image(p) {
	var showingSomething = false;

	if(p >= 0 && p <= 9) {
		showingSomething = true;
		show_image(0)
		show_image(1)
		show_image(2);
		console.log("Showing images 0,1,2");
	}
	if(p > 5.1 && p < 9.71) {
		showingSomething = true;
		show_image(3);
	} 
	if(p > 5.1 && p < 9.71) {
		showingSomething = true;
		show_image(4);
	}
	if(p > 9.72 && p < 19.87) {
		showingSomething = true;
		show_image(5);
		show_image(6);
		show_image(7);
	} 
		if(p > 20 && p < 35) {
		showingSomething = true;
		show_image(8);
		show_image(9);
	} 
		if(p > 27.5 && p < 36) {
		showingSomething = true;
		show_image(10);
	} 
		if(p > 33 && p < 39.7) {
		showingSomething = true;
		show_image(11);
	}
		if(p > 34 && p < 40) {
		showingSomething = true;
		show_image(12);
	} 
		if(p > 33.8 && p < 41.7) {
		showingSomething = true;
		show_image(13);
	} 
		if(p > 42 && p < 52.26) {
		showingSomething = true;
		show_image(14);
		show_image(15);
		show_image(16);
	} 
		if(p > 50 && p < 53.29) {
		showingSomething = true;
		show_image(17);
	} 
		if(p > 53.30 && p < 63.4) {
		showingSomething = true;
		show_image(18);
		show_image(19)
		show_image(20)
	} 
		if(p > 63.6 && p < 71.9) {
		showingSomething = true;
		show_image(21);
		show_image(22)
	} 
		if(p > 70 && p < 76.9) {
		showingSomething = true;
		show_image(25)

	} 
		if(p > 73 && p < 77.9) {
		showingSomething = true;
		show_image(23);
	} 
		if(p > 73 && p < 79.24) {
		showingSomething = true;
		show_image(24)

	} 



	if(!showingSomething) {
		console.log("Hidding images");
		$("#img-container-fat img").fadeOut(50);
		imageIndex = -1;
	}
}

function check_percents_image_tablet(p) {
	var showingSomething = false;

	if(p > 2.92 && p < 6.33) {
		showingSomething = true;
		show_image_tablet(0);
	}

	if(p > 10.7 && p < 16) {
		showingSomething = true;
		show_image_tablet(1);
	} 
	if(p > 32 && p < 42){
		showingSomething = true;
		show_image_tablet(2);
	}
	if(p > 45 && p < 48.61){
		showingSomething = true;
		show_image_tablet(3);
	}
	if(p > 48.63 && p < 52){
		showingSomething = true;
		show_image_tablet(4);
	}
	if(p > 56 && p < 69){
		showingSomething = true;
		show_image_tablet(5);
	}
	if(p > 59.5 && p < 66.6){
		showingSomething = true;
		show_image_tablet(6);
	}
	if(p > 63.38 && p < 67){
		showingSomething = true;
		show_image_tablet(7);
	}
	if(p > 67.5 && p < 71.85){
		showingSomething = true;
		show_image_tablet(11);
	}
	if(p > 71.86 && p < 76.1449){
		showingSomething = true;
		show_image_tablet(8);
	}
	if(p > 76.145 && p < 85){
		showingSomething = true;
		show_image_tablet(9);
	}
	if(p > 86 && p <99.99){
		showingSomething = true;
		show_image_tablet(10);
	}

	if(!showingSomething) {
		var string = isTabletPortrait() ? "portait" : "landscape";

		$("#img-container-fat-tablet-"+string+" img").fadeOut(300);
		imageIndexTablet = -1;
	}
}

var imageIndex = -1;
var imageIndexTablet = -1;

function show_image(index) {
	if(imageIndex != index){
		console.log("Showing image desktop"+0);
		var image = $("#img-container-fat").children()[index];
		imageIndex = index;
		$(image).fadeIn(300);
	}
}

function show_image_tablet(index) {
	if(imageIndexTablet != index){
		console.log("Showing image tablet"+0);
		var string = isTabletPortrait() ? "portait" : "landscape";
		var imageCtn = isTabletPortrait() ? $("#img-container-fat-tablet-portrait") : $("#img-container-fat-tablet-landscape"); 
		var image = imageCtn.children()[index];
		imageIndexTablet = index;
		$(image).fadeIn(300);
	}
}

function center_element(element) {

		var elementLeft =  (window.innerWidth/2 - element.outerWidth()/2);
		var elementTop = (window.innerHeight/2 - element.outerHeight()/2);
		element.css({left: elementLeft, top: elementTop});
}

function center_element_tablet(element) {

		var elementLeft =  (window.innerWidth*0.75 - element.outerWidth()/2);
		var elementTop = (window.innerHeight/2 - element.outerHeight()/2);
		element.css({left: elementLeft, top: elementTop});
		element.show();
}

function center_element_iphone(element) {
		var elementLeft =  (window.innerWidth/2 - element.outerWidth()/2);
		console.log("Centering iph = "+elementLeft);
		element.css({left: elementLeft});
}

function get_basic_margins() {
	return {
		marginLeft: -($('#big-pic').innerWidth() - $(document).innerWidth()) /2,
		marginTop: window.innerHeight/2
	}
}

function get_basic_margins_tablet() {
	return {
		marginLeft: -$('#big-pic-tablet').innerWidth()/2 + $(document).innerWidth()*3/4,
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

	var $bigpic = isDesktop() ?  $('#big-pic') : $('#big-pic-tablet');

	

	var starting_point = p.getPointAtLength(percent*len);
	var x_point_percent = (((starting_point.x  / box[2] ) * 100 ) - 50);
	var y_point_percent = (((starting_point.y  / box[3] ) * 100 ));

	var margins_base = isDesktop() ? get_basic_margins() : get_basic_margins_tablet();
	var w_img = $bigpic.innerWidth();
	var h_img = $bigpic.innerHeight();
	var w_decal = w_img * x_point_percent/100;
	var h_decal = -h_img * (1-y_point_percent/100);

	//console.log("Percent = "+(percent*100).toFixed(2)+"; w_decal="+w_decal.toFixed(1)+", hdecal = "+h_decal.toFixed(1)+", x: "+starting_point.x.toFixed(2)+", y: "+starting_point.y.toFixed(1));
	if(!isMobile()){
		$bigpic.css("margin-left", margins_base.marginLeft + w_decal);
		$bigpic.css("margin-top", margins_base.marginTop + h_decal);
	}
	

	if(isDesktop()) {
		var $bigimgcontainer = $('#img-container-fat');
		$bigimgcontainer.css("margin-left", margins_base.marginLeft + w_decal);
		$bigimgcontainer.css("margin-top", margins_base.marginTop + h_decal);
	} else if (isTablet()){
		var $bigimgcontainer = isTabletPortrait() ? $('#img-container-fat-tablet-portrait') : $('#img-container-fat-tablet-landscape');
		$bigimgcontainer.css("margin-left", margins_base.marginLeft + w_decal);
		$bigimgcontainer.css("margin-top", margins_base.marginTop + h_decal);
	}

}

function getPositionFromPercent(percent) {
	var percent = percent/100;
	var $svg = $('#path_1');
	var $path = $svg.find('path');
	var p = $path[0];

	var len = p.getTotalLength();
	//get the viewbox
	var box = $svg[0].getAttribute('viewBox');
	box = box.split(/\s+|,/);

	var starting_point = p.getPointAtLength(percent*len);
	var x_point_percent = (((starting_point.x  / box[2] ) * 100 ));
	var y_point_percent = (((starting_point.y  / box[3] ) * 100 ));
	console.log("LEFT X =~ "+x_point_percent*60+"px, TOP: "+(6000-y_point_percent*60)+"px");
}

function showImages(){
	$("img").show();
}

var ppp= 0;
var anims = [];

function launchAnimation(p) {
	var ppp = p | 0;
	calc_positions(ppp);
	console.log("LAUNCHING ANIMATION, ppp = "+ppp);
	document.body.scrollTop -= ppp;
	if(document.body.scrollTop > 0){
		anims.push(setTimeout(function(){
			ppp+=3000; //pixel ajoutés, yen a 60'000
			launchAnimation(ppp);
		}, 60)); //tous les X millisec
	} else {
		console.log("Once dirty = "+onceDirty);
		onceDirty = true;
	}


}


function stopAnimation() {
	for (var i = anims.length - 1; i >= 0; i--) {
		clearTimeout(anims[i]);
	};
}






