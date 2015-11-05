(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/backend/login.js                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
                                                                       //
Template.backendLogin.events({                                         // 3
                                                                       //
     "submit .login-container": function (event) {                     // 5
          // Prevent default browser form submit                       //
          event.preventDefault();                                      // 7
          var username = event.target.username.value;                  // 8
          var password = event.target.password.value;                  // 9
                                                                       //
          if (WEBUTIL.isStringEmpty(username)) GROWL.error('Username is required');else if (WEBUTIL.isStringEmpty(password)) GROWL.error('Password is required');else {
                                                                       //
               Meteor.loginWithPassword(username, password, function (message) {
                    //console.log(message);                            //
                    if (message) GROWL.error('Invalid Login Information');else Router.go('/backend/portfolio');
               });                                                     //
          }                                                            //
                                                                       //
          /*                                                           //
          var item = PortfolioEntity.constructEntityByEvent(event);    //
          Meteor.call('upsertPortfolio',item);                         //
          GROWL.success('Information Successfully Saved');             //
          Router.go('/backend/portfolio');                             //
          */                                                           //
     }                                                                 //
                                                                       //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
