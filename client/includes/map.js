function indexOfId(array, id) {
    for (var i=0; i<array.length; i++) {
        if (array[i].options.id==id) return i;
    }
    return -1;
}
var handle;
Template.godView.rendered = function() {
	var availableDrivers = Meteor.users.find({});
    handle = availableDrivers.observeChanges({
        added: function(id, fields) {
            if (typeof fields.location.lat !== 'undefined' &&
                typeof fields.location.lng !== 'undefined' ) { 
                    var objMarker = {
                        id: id, //Meteor UserId is set to markerData.id
                        lat: fields.location.lat,
                        lng: fields.location.lng,
                        fname: fields.profile.fname
                    };
	                //check if marker already exists
	                var test = (maps.markerExists('id', objMarker.id))
	                console.log('does marker exist for this user?: ' + test)
	                if (test) {
	                	//marker already exists do nothing
	                	console.log('marker exists.')
	                } 
	                else {
	                    //marker doesnt exist, add it
	                    maps.addDriverMarker(objMarker);
	                }
            }         
        },
        changed: function(id, fields) {
            console.log('avail driver and/or user doc changed, printing changed fields: ');
            console.dir(fields);
            var objMarker = {
                id: id, //Meteor UserId is set to markerData.id
                lat: fields.location.lat,
                lng: fields.location.lng,
            };
            //check if marker already exists
            var test = (maps.markerExists('id', objMarker.id))
            console.log('does marker exist for this user?: ' + test)
            if (test) {
                //marker already exists, set new position 
                var markers = maps.markers
                var result = indexOfId(markers, id);
                console.log('changed marker is at index: ' + result)
                maps.markers[result].setLatLng([fields.location.lat,fields.location.lng]);

            } else {
                //marker doesnt exists, add it
                maps.addDriverMarker(objMarker);
            }    
        },
        removed: function(id, fields) {

        }
    });// end meteor users observe changes	
}

Template.godView.destroyed = function() {
	//remove dirty marker here.
	//TODO, when drivers become inactive, but not necessarily unavailable, 
	//then their marker should also be removed. inactivity should be defined by length
	//of time that a marker has not been updated
	handle.stop();
	_.each(maps.markers, function(marker) {
		marker.clearLayers();
	})
}


