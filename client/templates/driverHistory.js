Template.driverHistory.helpers({
	drivers: function() {
		if (!Session.get('selected_driver') == '')
			return Meteor.users.find({_id: Session.get('selected_driver')});
		else return Meteor.users.find()
	},
	sentMessages: function() {
		//var messageIds = Meteor.users.find(Session.get('selected_driver'), {fields: {sentMessages:1}});
		var messages = Messages.find({sentById: Session.get('selected_driver')}, {sort: {sentOn: -1}});
		return messages;
	}
});