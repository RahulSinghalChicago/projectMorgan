Accounts.onCreateUser(function(options, user) {
	user.score = 0;
	if (options.profile)
		user.profile = options.profile;
	return user;
});