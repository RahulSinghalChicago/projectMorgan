Template.driverHistory.helpers({
	drivers: function() {
		if (!Session.get('selected_driver') == '')
			return Meteor.users.find({_id: Session.get('selected_driver')});
		else return Meteor.users.find()
	}
});