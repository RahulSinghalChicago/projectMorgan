Meteor.startup(function () {
  Drivers.remove({});
    var names = ["Brian",
                 "Javier",
                 "Joseph",
                 "Gino",
                 "Rahul",
                 "Duff Man"];
    for (var i = 0; i < names.length; i++) {
      var random = Math.floor(Random.fraction()*10)*5
      Drivers.insert({name: names[i], domain: random, score: random});
    }
  
});