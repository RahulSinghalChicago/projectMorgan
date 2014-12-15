var numUsers = Meteor.users.find().fetch().length;
Accounts.onCreateUser(function(options, user) {
	console.log(numUsers);
	user.score = 0;
	user.sCtr = 0;
	user.location = [0,0];
	user.driverNumber = numUsers;
	if (options.profile)
		user.profile = options.profile;
	return user;
});