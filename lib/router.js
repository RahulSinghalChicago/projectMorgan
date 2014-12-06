Router.configure({
  layoutTemplate: 'layout',
  yieldRegions: {
    'login': {to: 'login'}
  }
});


Router.map(function() {
	this.route('login');
});
