Template.godView.rendered = function() {
	//make the map full screen
	//var w = window.innerWidth;
    var h = window.innerHeight;
    $('#map_canvas').css({height: h+'px'});
    $('#leaderboard-view').css({height: h/2+'px'});
    $('#driverHistory-view').css({height: h/2+'px'});

    //initialize the map with given lat, lng
   	maps.initialize(41.8889690, -87.6363);	
}

Template.godView.events({
	'click button': function(e,t) {
		$('#loginModal').modal('show'); 
	}
});

