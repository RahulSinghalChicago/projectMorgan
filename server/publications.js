//---
//if a client is subscribed to these two stream,
//then the records are merged together into the same documents 
//in the users collection.

Meteor.publish('drivers', function() {
	return Meteor.users.find({}, {fields: {score:1, profile:1, location:1, driverNumber:1, sCtr:1}});
});
//this is the publication to set special views on a user document for an 'admin' 
/*Meteor.publish('adminDriverView', function() {
	return Meteor.users.find({adminId: this.userId}, {fields: {someHiddenField:1, another specialFields:1}});
});*/

//---

Meteor.publish('messages', function() {
	return Messages.find();
});