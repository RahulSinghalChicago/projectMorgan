

Template.godView.destroyed = function() {
	//remove dirty marker here.
	//TODO, when drivers become inactive, but not necessarily unavailable, 
	//then their marker should also be removed. inactivity should be defined by length
	//of time that a marker has not been updated
	handle.stop();
	_.each(maps.markers, function(marker) {
		marker.clearLayers();
	});
}


