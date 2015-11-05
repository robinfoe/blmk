(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/global.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
CREDENTIAL = {                                                         // 1
                                                                       //
	isLoggedIn: function () {                                             // 3
		return Meteor.user() ? true : false;                                 // 4
	},                                                                    //
                                                                       //
	currentUser: function () {                                            // 7
		return Meteor.user();                                                // 8
	},                                                                    //
                                                                       //
	isAdminUser: function () {                                            // 11
		return CREDENTIAL.isLoggedIn() ? Roles.userIsInRole(Meteor.user(), 'admin') : false;
	}                                                                     //
};                                                                     //
                                                                       //
WEBUTIL = {                                                            // 16
	isStringEmpty: function (text) {                                      // 17
		return !text || 0 === text.length;                                   // 18
	}                                                                     //
};                                                                     //
                                                                       //
Accounts.config({                                                      // 23
	loginExpirationInDays: 30                                             // 24
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=global.js.map
