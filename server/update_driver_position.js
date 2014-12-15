
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
	//Meteor.users.update({driverNumber: j}, {$set: {sCtr: sCtr, score: score, location: loc} }, function(err, res) {if (err) console.log(err);} );
	Meteor.users.update({driverNumber: j}, {$set: {sCtr: sCtr, score: score, location: loc} });
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


function doReplayServer() {
	done = false;
	cnt = 0;
	while (!done) {
		for (j = 0; j < allPos.length; j++) {
			done = true;
			if (cnt < allPos[j].length) {
				done = false;
				updateScorePos(j, allPos[j][cnt]);
				//Meteor.call('updateDriverPos', j, allPos[j][cnt]);
				console.log(allPos[j][cnt]);				
			}
		}
		sleep(100);
		cnt++;
	}
}


Meteor.methods({
	updateDriverPos: function(j, location) {
		updateScorePos(j, location);
	},
	updateDriverMessages: function(messageId) {
		Meteor.users.update(Meteor.userId(), {$addToSet: {sentMessages: messageId}});
	},
	doReplay: function() {
		doReplayServer();
	}
});
