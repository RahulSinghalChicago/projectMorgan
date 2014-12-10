Meteor.methods({
	updateDriverPos: function(j, location) {
		Meteor.users.update({driverNumber: j}, {$set: {location: location}});

	},
	updateDriverMessages: function(messageId) {
		Meteor.users.update(Meteor.userId(), {$addToSet: {sentMessages: messageId}});
	}
});
