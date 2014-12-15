twilio = Twilio('ACd6f18e716188c2698c8c03d4c83effd3', '7f6572e4e9b093056a4749cc035cab26');
twiml = new Twilio.TwimlResponse();

Meteor.methods({
	sendMessage: function(messageId) {
		var message = Messages.findOne(messageId);
		twilio.sendMessage({
	      to: message.to, 
	      from: message.from,
	      body: message.body
	      },  function(err, responseData) { 
	        if (!err) { 
	            console.log(responseData.to);
	            console.log(responseData.body); 
	        }
	    });
	}
});