function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

doReplay = function() {
	for (j = 0; j < allPos.length; j++) {
		for (i = 0; i < 3; i++) {
			// TODO: replace line below to update user current position.
			console.log(allPos[j][i]);
			sleep(1000);
		}
	}
}

Template.replay.events({
	'click submit': function(e,t) {
		e.preventDefault();
		doReplay();
	}
});