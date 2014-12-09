Router.configure({
  layoutTemplate: 'layout',
  data: function() {
  	return Meteor.subscribe('drivers')
  }
});


Router.map(function() {
	this.route('login');
});
