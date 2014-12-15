Template.leaderboard.helpers({
	drivers: function() {
    //return Drivers.find({}, {sort: {score: -1, name: 1}});
    return Meteor.users.find({}, {sort: {score:-1, name:1}});

  },
  selected_name: function() {
    var driver = Drivers.findOne(Session.get("selected_driver"));
    return driver && driver.name;
  }
});

Template.leaderboard.events({
  'click input.inc': function(e,t) {
    Drivers.update(Session.get("selected_driver"), {$inc: {score: 5}});
  }
});


Template.driver.helpers({ 
  selected: function () {
    return Session.equals("selected_driver", this._id) ? "selected" : '';
  }
});

Template.driver.events({
  'click': function () {
    Session.set("selected_driver", this._id);
  }
});