(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/publish.js                                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.publish('publicPortfolios', function (pub) {                    // 1
	return Portfolios.find({ published: pub });                           // 2
});                                                                    //
                                                                       //
Meteor.publish('portfolios', function () {                             // 6
	return Portfolios.find({});                                           // 7
});                                                                    //
                                                                       //
Meteor.publish('portfolioById', function (id) {                        // 10
	return Portfolios.find({ _id: new Mongo.ObjectID(id) });              // 11
});                                                                    //
                                                                       //
Meteor.publish('uploads', function () {                                // 14
	return Uploads.find();                                                // 15
});                                                                    //
                                                                       //
Meteor.methods({                                                       // 20
	'upsertPortfolio': function (item) {                                  // 21
		delete item.isEdit;                                                  // 22
		item.updatedDate = new Date();                                       // 23
		if (!item._id || 0 === item._id.length) {                            // 24
			delete item._id;                                                    // 25
			item.createdDate = new Date();                                      // 26
                                                                       //
			Portfolios.insert(item);                                            // 28
		} else {                                                             //
			item._id = new Mongo.ObjectID(item._id);                            // 30
			Portfolios.update(item._id, { $set: {                               // 31
					title: item.title,                                                // 32
					client: item.client,                                              // 33
					description: item.description,                                    // 34
					splash_image: item.splash_image,                                  // 35
					video_url: item.video_url,                                        // 36
					published: item.published,                                        // 37
					updatedDate: item.updatedDate                                     // 38
				} });                                                              //
		}                                                                    //
	},                                                                    //
                                                                       //
	'removePortfolio': function (id) {                                    // 44
		id = new Mongo.ObjectID(id);                                         // 45
		Portfolios.remove(id);                                               // 46
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=publish.js.map
