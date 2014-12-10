Meteor.methods({
	updateDriverPos: function(j, location) {
		Meteor.users.update({driverNumber: j}, {$set: {location: location}});

	}
});
