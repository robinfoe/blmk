Meteor.publish('publicPortfolios', function(pub) {
	return Portfolios.find({published : pub});
});


Meteor.publish('portfolios', function() {
	return Portfolios.find({});
});

Meteor.publish('portfolioById', function(id) {
	return Portfolios.find({_id: new Mongo.ObjectID(id)});
});

Meteor.publish('uploads', function() {
  return Uploads.find();
});



Meteor.methods({
	'upsertPortfolio' : function(item){
		delete item.isEdit;
		item.updatedDate = new Date();
		if(!item._id || 0 === item._id.length){
			delete item._id;
			item.createdDate = new Date();
			
			Portfolios.insert(item);
		}else{
			item._id = new Mongo.ObjectID(item._id);
			Portfolios.update(item._id, {$set : { 
				title : item.title,
				client : item.client,
				description : item.description,
				splash_image : item.splash_image,
				video_url : item.video_url,
				published : item.published ,
				updatedDate : item.updatedDate
			}});

		}
	},
	
	'removePortfolio' : function(id){
		id = new Mongo.ObjectID(id);
		Portfolios.remove(id);
	}
});