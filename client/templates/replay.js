function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

doReplay = function() {
	for (i = 0; i < 10; i++) {
		console.log(ary[i]);
		sleep(4000);
	}
}

Template.replay.events({
	'click submit': function(e,t) {
		e.preventDefault();
		doReplay();
	}
});