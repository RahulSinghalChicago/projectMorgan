Router.configure({
  layoutTemplate: 'layout',
  /*yeildRegions: {
  	'driverHistory': {to: 'driverHistory'}
  }*/
});

//Router.route('/replay', {name: 'Replay'}); 


Router.map(function() {
	this.route('login');
	this.route('home', {
		path: '/',
		waitOn: function() {
			return [Meteor.subscribe('drivers'),Meteor.subscribe('messages')];
		}
	});
});
