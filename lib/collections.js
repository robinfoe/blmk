Portfolios = new Mongo.Collection("portfolio",{idGeneration:'MONGO'});

Portfolios.allow({
	insert: function (userId, doc) {return (Meteor.user()) ? true : false;},
	update: function (userId, doc, fields, modifier) {return (Meteor.user()) ? true : false;},
	remove : function(userId, document){return (Meteor.user()) ? true : false;}
});


/** UPLOADS ****************/
Uploads = new Mongo.Collection('uploads');
Uploads.allow({
	insert: function (userId, doc) {return true;},
	update: function (userId, doc, fields, modifier) {return true;}
});
