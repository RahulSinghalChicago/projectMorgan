function indexOfId(array, id) {
    for (var i=0; i<array.length; i++) {
        if (array[i].options.id==id) return i;
    }
    return -1;
}
var handle;

Template.godView.rendered = function() {
	//make the map full screen
	//var w = window.innerWidth;
    var h = window.innerHeight;
    $('#map_canvas').css({height: h/1.15+'px'});
    $('#leaderboard-view').css({height: h/2+'px'});
    $('#driverHistory-view').css({height: h/2+'px'});

    //initialize the map with given lat, lng
   	maps.initialize(41.8889690, -87.6363);	
   	
    var availableDrivers = Meteor.users.find({}, {fields: {location:1}});
    console.log('1');
    console.log('number of available drivers: ' + availableDrivers.fetch().length);
    handle = availableDrivers.observeChanges({
        added: function(id, fields) {
            var user = Meteor.users.findOne(id);
            console.log('added called');
            if (typeof fields.location !== 'undefined' ) { 
                    var objMarker = {
                        id: id, //Meteor UserId is set to markerData.id
                        lat: fields.location[0],
                        lng: fields.location[1],
                        fname: user.profile.fname
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
                lat: fields.location[0],
                lng: fields.location[1]
            };
            //check if marker already exists
            var test = (maps.markerExists('id', objMarker.id))
            console.log('does marker exist for this user?: ' + test)
            if (test) {
                //marker already exists, set new position 
                var markers = maps.markers
                var result = indexOfId(markers, id);
                console.log('changed marker is at index: ' + result)
                maps.markers[result].setLatLng([fields.location[0], fields.location[1]]);

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
	});
}

Template.godView.events({
	'click button': function(e,t) {
		$('#loginModal').modal('show'); 
	},
	'click #replay-btn-container': function(e,t) {
		doReplay(); 
	},
    'click #be-there-btn-container': function(e,t) {
        console.log('clicked!');
        var messageId = Messages.insert({
            to: '+16302543868',
            from: '+12193211731',
            body: 'Hey there this is ' + Meteor.user().profile.fname + '. Please prepare for my arrival, be there in 10 min!',
            sentOn: new Date().getTime(),
            sentById: Meteor.userId()
        });
        Meteor.call('sendMessage', messageId );
        Meteor.call('updateDriverMessages', messageId);
    },
    'click #im-at-btn-container': function(e,t) {
        console.log('clicked!');
        var messageId = Messages.insert({
            to: '+16302543868',
            from: '+12193211731',
            body: 'Hey there this is ' + Meteor.user().profile.fname + '. I some location. I should be there in about an hour.',
            sentOn: new Date().getTime(),
            sentById: Meteor.userId()
        });
        Meteor.call('sendMessage', messageId);
        Meteor.call('updateDriverMessages', messageId);
    },
    'click #zoom-nation-btn-container': function(e,t) {
        maps.map.setZoom(5);
    },
    'click #zoom-local-btn-container': function(e,t) {
        maps.map.setZoom(12);
    }
});

