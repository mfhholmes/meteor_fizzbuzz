if (Meteor.isClient) {
  Template.fizzbuzz.helpers({
    result:function(){
      return Session.get("result") || "";
    }
  });
  Template.fizzbuzz.events({
    'click button': function (event) {
      var number = $("#number").val();
      //check it's a valid number
      number = parseInt(number);
      if(isNaN(number)){
        //didn't enter an actual number, so report it
        Session.set("result","can't fizzbuzz something that isn't a number!");
        return;
      }
      //call the method on the server
      var result = Meteor.call("fizzTheBuzz",number, function(err, result){
        if(err){
          Session.set("result","there was a problem fizzing the buzz: " + err.message);
          console.error("failed to fizz the buzz",err);
        } else {
          console.log("result: " + result);
          Session.set("result",result);
          //$("#result").text(result);
        }
      });
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
Meteor.methods({
  fizzTheBuzz:function (number) {
    // if mod(x,3)==0 then "fizz"
    // if mod(x,5)==0 then "buzz"
    var output = "";
    for(var i = 1; i<= number; i++){
      var addition = "";
      if((i%3)===0){
        addition += "Fizz ";
      }
      if((i%5)===0){
        addition += "Buzz ";
      }
      if(!addition){
        addition = i + " ";
      }
      //we need a trailing space on the "Fizz Buzz" entries, but need to remove it for all others
      output += addition.slice(0,-1)+", ";
    }
    output = output.slice(0,-2);//remove the trailing comma
    console.log("output:" + output);
    return output;
  }
});
