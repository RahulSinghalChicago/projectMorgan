// Local (client-only) collection
Errors = new Meteor.Collection(null);

//We create a throwError function that simply inserts an error into our new local collection:
throwError = function(message) {
  Errors.insert({message: message})
}

//Errors is a local collection and like all collections, it is reactive. Therefore we can 
//declaritvely display errors like we can declaritvely display other collections.

Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

Template.error.rendered = function() {
  var error = this.data;
  Meteor.setTimeout(function () {
    Errors.remove(error._id);
  }, 4000);
};