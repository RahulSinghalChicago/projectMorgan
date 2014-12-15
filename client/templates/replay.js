function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


doReplay = function() {
	done = false;
	cnt = 0;
	while (!done) {
		for (j = 0; j < allPos.length; j++) {
			done = true;
			if (cnt < allPos[j].length) {
				done = false;
				Meteor.call('updateDriverPos', j, allPos[j][cnt]);
				//console.log(allPos[j][cnt]);				
			}
		}
		sleep(100);
		cnt++;
	}
}

global_cnt = -1;

replayHelper = function() {
	if (global_cnt < 0) return;
	done = true;
	for (j = 0; j < allPos.length; j++) {
		if (global_cnt < allPos[j].length) {
			done = false;
			Meteor.call('updateDriverPos', j, allPos[j][global_cnt]);
			//console.log(allPos[j][cnt]);				
		}
	}
	if (done) {
		console.log(global_cnt);
		for (j = 0; j < allPos.length; j++) {
			console.log(allPos[j].length);
		}
		global_cnt = -1;
		Meteor.clearInterval(intervalID);
	}
	global_cnt++;
}

//intervalID = null;

doReplay2 = function() {
	global_cnt = 0;
	intervalID = Meteor.setInterval(replayHelper, 100);
}

// not currently used
Template.replay.events({
	'click submit': function(e,t) {
		e.preventDefault();
		doReplay2();
	}
});