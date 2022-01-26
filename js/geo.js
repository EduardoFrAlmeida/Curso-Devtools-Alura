(function(){
	"use strict"

	navigator.geolocation.getCurrentPosition(function(position){
		console.log(position)
		var lat = position.coords.latitude
		var lng = position.coords.longitude
		$.getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true?callback=?", function(res){
			console.log(res);
		})
	});

})();