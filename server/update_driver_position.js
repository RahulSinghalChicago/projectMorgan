
function updateScorePos(j, loc) {
	usr = Meteor.users.find({driverNumber: j}, {fields: {sCtr: 1, score: 1, location: 1} }).fetch()[0];
	var sCtr = 0;
	var score = usr.score;
	if (usr.location[0] == loc[0] && usr.location[1] == loc[1]) {
		sCtr = usr.sCtr + 1;
	} else if (usr.sCtr >= 5) {
		score += Math.floor(Math.random() * 100) + 1;	
	}	
	//if (j == 0){ console.log(usr.location[0] +"\t"+ loc[0] +"\t"+ usr.location[1] +"\t"+ loc[1] +"\t"+ sCtr +"\t"+ score) }
	Meteor.users.update({driverNumber: j}, {$set: {sCtr: sCtr, score: score, location: loc} });
}



Meteor.methods({
	updateDriverPos: function(j, location) {
		updateScorePos(j, location);
	},
	updateDriverMessages: function(messageId) {
		Meteor.users.update(Meteor.userId(), {$addToSet: {sentMessages: messageId}});
	}
});
