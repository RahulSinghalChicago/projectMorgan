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
				if (cnt < 3) { done = false; }
				// TODO: replace line below to update user current position.
				Meteor.call('updateDriverPos', j, allPos[j][cnt]);
				console.log(allPos[j][cnt]);				
			}
		}
		sleep(1000);
		cnt++;
	}
}

Template.replay.events({
	'click submit': function(e,t) {
		e.preventDefault();
		doReplay();
	}
});