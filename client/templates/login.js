Template.login.events({
	'click submit': function(e,t) {
		e.preventDefault();
		var email = t.find('#email').value;
    	var password = t.find('#password').value;
    	
		if (!Meteor.user()) {
			Accounts.createUser({
				email: trimInput(email), 
            	password: password,
			});
		}
	}
});