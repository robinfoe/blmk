(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections.js                                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Portfolios = new Mongo.Collection("portfolio", { idGeneration: 'MONGO' });
                                                                       //
Portfolios.allow({                                                     // 3
	insert: function (userId, doc) {                                      // 4
		return Meteor.user() ? true : false;                                 // 4
	},                                                                    //
	update: function (userId, doc, fields, modifier) {                    // 5
		return Meteor.user() ? true : false;                                 // 5
	},                                                                    //
	remove: function (userId, document) {                                 // 6
		return Meteor.user() ? true : false;                                 // 6
	}                                                                     //
});                                                                    //
                                                                       //
/** UPLOADS ****************/                                          //
Uploads = new Mongo.Collection('uploads');                             // 11
Uploads.allow({                                                        // 12
	insert: function (userId, doc) {                                      // 13
		return true;                                                         // 13
	},                                                                    //
	update: function (userId, doc, fields, modifier) {                    // 14
		return true;                                                         // 14
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=collections.js.map
