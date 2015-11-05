CREDENTIAL = {

	isLoggedIn : function(){
		return (Meteor.user()) ? true : false;
	},

	currentUser : function(){
		return Meteor.user();
	},

	isAdminUser : function(){
		return (CREDENTIAL.isLoggedIn()) ? Roles.userIsInRole(Meteor.user(), 'admin') : false;
	}
}

WEBUTIL = {
	isStringEmpty : function(text){
		return (!text || 0 === text.length);
	}
}


Accounts.config({
   loginExpirationInDays: 30
}) 