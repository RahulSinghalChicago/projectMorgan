Template.login.events({
	'click #sign-up': function(e,t) {
		e.preventDefault();
		var email = t.find('#email').value;
    	var password = t.find('#password').value;
    	var fname = t.find('#fname').value;
    	
		if (!Meteor.user()) {
			Accounts.createUser({
				email: trimInput(email), 
            	password: password,
            	profile: {
            		fname: fname
            	}
			});
		}
		else {
			throwError('You are already signed up.');
		}
		
		$('#loginModal').modal('hide');
	},
	'click #login': function(e,t) {
		e.preventDefault();
    	// retrieve the input field values
      	var email = t.find('#email').value;
        var password = t.find('#password').value;
    
	    Meteor.loginWithPassword(trimInput(email), password,
        	function (err) {
	        	if (err) {
	          		Session.set('errorMessage', err.reason || 'Unknown error');
	          		console.log(err);
	          		throwError(Session.get('errorMessage'));
	        	} 
	        	else {
	          		throwAlert("Welcome Back" + "!")
	          		$('#loginModal').modal('hide');
	        	} 
      	});
  	}, //close click .login
});