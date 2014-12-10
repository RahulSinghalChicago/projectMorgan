Accounts.onCreateUser(function(options, user) {
	var count = 2
	user.score = 0;
	user.driverNumber = count;
	if (options.profile)
		user.profile = options.profile;
	count ++;
	return user;
});