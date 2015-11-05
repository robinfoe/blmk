var ListHelper = {
  shortenSentences : function(text){
    return (!text) ? '' : (text.length > 40) ? text.substring(0,40) + '...' : text;  
  },

  isImageUploaded : function(value){
   return new Spacebars.SafeString( (value) ? "<i class='glyphicon glyphicon-ok text-success-lter '></i>" : "<i class='glyphicon glyphicon-remove text-danger-lter'></i>" );
  },

  isPublished : function(value){
    return new Spacebars.SafeString( (value && value === 'Y') ? "<i class='glyphicon glyphicon-ok text-success-lter '></i>" : "<i class='glyphicon glyphicon-remove text-danger-lter'></i>" );
  },

  generateAddEdit : function(value){
    if(value){
      return new Spacebars.SafeString("<a class='btn btn-primary' href='/backend/portfolio/maintain/"+value._str+"'>Maintain</a>")
    }else
      return new Spacebars.SafeString("<a href='/backend/portfolio/maintain/add'><i class='fa fa-plus-square icon text-primary-dker fa-2x'></i></a>");
  }

}; 

Template.portfolioList.onCreated(function () {
	this.subscribe('portfolios');
});

Template.portfolioList.helpers({
	portfolios: function () {
      return Portfolios.find();
  },

  tableSettings : function(){
    return {
        rowsPerPage: 10,
        showNavigation: 'auto',
        showRowCount:false,
        showNavigationRowsPerPage:false,
        showColumnToggles: false,
        fields: [
          { key: 'title',label: 'Title'},
          { key: 'client', label: 'Client'},
          { key: 'description', label: 'Description', fn: ListHelper.shortenSentences  },
          { key: 'splash_image', label: 'Image', fn: ListHelper.isImageUploaded },
          { key: 'published', label: 'Published', fn: ListHelper.isPublished },
          { key : '_id', 
            label : ListHelper.generateAddEdit , 
            fn: ListHelper.generateAddEdit 
          }
        ]
      };
  }
});


Template.portfolioList.events({
    "click .button-update": function () {
      return Portfolios.find();
    }
});


/** PORTFOLIO Maintain*****/
// TODO :: what should i do here ?
var PortfolioEntity = {
	constructEntity : function(item){
		if(typeof item != "undefined" && item != null){
			item._id = item._id._str;
			return item;
		}
		return { _id : '',
    			title: '',
    			client : '',
    			description : '',
    			splash_image : '',
    			published : 'N',
          video_url : '',
    			createdDate : new Date()
    		};
	},
	constructEntityByEvent : function(event){
		var item = PortfolioEntity.constructEntity(null);
		item._id=event.target.id.value;
    item.title=event.target.title.value;
    item.client=event.target.client.value;
    item.description=event.target.description.value;
    item.splash_image=event.target.splash_image.value;
    item.video_url=event.target.video_url.value;
    item.published= (event.target.published.checked)  ? "Y" : "N";
    return item;
	}
};


Template.portfolioMaintain.onCreated(function () {
	var controller = Iron.controller();
	this.subscribe("portfolioById",controller.params._id);
	this.subscribe('uploads');
});

Template.portfolioMaintain.events({
	"submit .portfolio-maintain": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      var item = PortfolioEntity.constructEntityByEvent(event);
      Meteor.call('upsertPortfolio',item);
      GROWL.success('Information Successfully Saved');
      Router.go('/backend/portfolio');
    },

    "click .btnback": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      Router.go('/backend/portfolio');
    },

  "click .btndelete": function (event) {
   // Prevent default browser form submit
    event.preventDefault();
    Meteor.call('removePortfolio',Blaze.getData(event.target)._id);
    GROWL.info('Information Successfully Deleted');
    Router.go('/backend/portfolio');
  },  



});

Template.portfolioMaintain.helpers({
    item : function () {
    	return  PortfolioEntity.constructEntity(Portfolios.findOne())  ;
    },
    publishedChecked : function(text){
        return ("Y" === text) ? 'checked' : '';

    },
    isEdit : function(item){
      return !(!item._id || 0 === item._id.length);
    }   
});



/** UPLOAD template ****************/

Template.customUpload.created = function() {
  Uploader.init(this);
}

Template.customUpload.rendered = function () {
  Uploader.render.call(this);
};

Template.customUpload.events({
  'click .start': function (e) {
   // console.log(Template.instance());
    Uploader.startUpload.call(Template.instance(), e);
  }
});

Template.customUpload.helpers({
  'infoLabel': function() {
    var instance = Template.instance();

    // we may have not yet selected a file
    var info = instance.info.get()
    if (!info) 
      return;
    
    var progress = instance.globalInfo.get();
    // we display different result when running or not
    return progress.running ?
      info.name + ' - ' + progress.progress + '% - [' + progress.bitrate + ']' :
      info.name + ' - ' + info.size + 'B';
  },
  
  'progress': function() {
    return Template.instance().globalInfo.get().progress + '%';
  }
})