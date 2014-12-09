Meteor.methods({
	updateDriverPos: function(j, location) {
		Meteor.users.update({driverNumber: j}, {$addToSet: {location: location}});

	}
});
