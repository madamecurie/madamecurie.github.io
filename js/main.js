/*
 * main.js
 * —
 * WHERE YOU PUT YOUR ADVANCED CODE
 *
 */


 window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

function c(word) {
	console.log(word);
}

window.isDesktop = function(){
	var width = window.outerWidth;
	return width > 1024;
}

window.isTablet = function(){
	var width = window.outerWidth;
	return width <= 1024 && width > 736;
}

window.isMobile = function(){
	var width = window.outerWidth;
	return width <= 736;
}


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
		c("margins: ");
		c(margins);
		$bigpic.css("margin-left", margins.marginLeft);
		$bigpic.css("margin-top", margins.marginTop);
		
		calc_positions(percent);

		$(window).load(function(){

			$(window).scroll(function(e) {
				//console.log("Doc Height = "+$(document).height()+", scroll="+$(document).scrollTop());
				percent = $(document.body).scrollTop() * 100 / ($(document.body)[0].scrollHeight - window.innerHeight);
				console.log("percent = "+percent);

				if(isDesktop()) {
					if(percent > 99.7) {
						$(document.body).scrollTop(0);
						percent=0;
					}
				}
				check_percents_text(percent);
				check_percents_text_tablet(percent);
				check_percents_image(percent);
				calc_positions(percent);

				if(isMobile()) {
					iphone_do_stuff();
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
		$('#sphere-text').fadeOut(300);
	}

}

function check_percents_text_tablet(p) {
	if(p > 0 && p < 4.55) {
		show_sphere_text_tablet("April", "20th", 1906);
	} else if(p > 4,56 && p < 5.53) {
		show_sphere_text_tablet("April", "22nd", 1906);
	} else if(p > 5.54 && p < 11.88) {
		show_sphere_text_tablet("November", "24th", 1911);
	} else if(p > 11.89 && p < 12.86) {
		show_sphere_text_tablet("November", "25th", 1911);
	} else if(p > 12.87 && p < 35.25) {
		show_sphere_text_tablet("November", "28th", 1911);
	} else if(p > 35.26 && p < 37.02) {
		show_sphere_text_tablet("January", "3rd", 1912);
	} else if(p > 37.03 && p < 37.80) {
		show_sphere_text_tablet("January", "4th", 1912);
	} else if(p > 37.81 && p < 38.32) {
		show_sphere_text_tablet("January", "5th", 1912);
	} else if(p > 38.33 && p < 39.18) {
		show_sphere_text_tablet("January", "6th", 1912);
	} else if(p > 39.19 && p < 39.68) {
		show_sphere_text_tablet("January", "26th", 1912);
	} else if(p > 39.67 && p < 40.21) {
		show_sphere_text_tablet("July", "23rd", 1912);
	} else if(p > 40.22 && p < 45.27) {
		show_sphere_text_tablet("February", "7th", 1921);
	} else if(p > 45.28 && p < 46.39) {
		show_sphere_text_tablet("February", "28th", 1921);
	} else if(p > 46.40 && p < 47.27) {
		show_sphere_text_tablet("March", "3rd", 1921);
	} else if(p > 47.28 && p < 48.08) {
		show_sphere_text_tablet("February", "10th", 1921);
	} else if(p > 48.09 && p < 49.8) {
		show_sphere_text_tablet("February", "13th", 1921);

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
	console.log("Shjoing");
	$('#date-day-tablet').html(day);
	$('#date-month-tablet').html(month);
	$('#date-year-tablet').html(year);
	$('#sphere-text-tablet').fadeIn(300);
}

function check_percents_image(p) {
	if(p > 0.4 && p < 1.6) {
		show_image(0);
	}
	else {
		$("#image-container img").fadeOut(300);
		imageIndex = -1;
	}
}

var imageIndex = -1;

function show_image(index) {
	var image = $("#image-container").children()[index];
	imageIndex = index;
	$(image).fadeIn(300);
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
	$bigpic.css("margin-left", margins_base.marginLeft + w_decal);
	$bigpic.css("margin-top", margins_base.marginTop + h_decal);

	var $moveMe;
	if(imageIndex != -1){
		$moveMe = $("#image-container").children()[imageIndex];
		// $moveMe.offset({
		// });
	}
}

