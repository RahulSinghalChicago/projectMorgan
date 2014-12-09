// Local (client-only) collection
Alerts = new Meteor.Collection(null);

//We create a throwError function that simply inserts an error into our new local collection:
throwAlert = function(message) {
  Alerts.insert({message: message})
}

Template.alerts.helpers({
  alerts: function() {
    return Alerts.find();
  }
});

Template.alert.rendered = function() {
  var alert = this.data;
  console.log(this.data)
  Meteor.setTimeout(function () {
    Alerts.remove(alert._id);
  }, 4000);
};