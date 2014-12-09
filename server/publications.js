Meteor.publish('drivers', function() {
	return Meteor.users.find();
});