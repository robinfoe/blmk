(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/backend/portfolio.js                               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var ListHelper = {                                                     // 1
  shortenSentences: function (text) {                                  // 2
    return !text ? '' : text.length > 40 ? text.substring(0, 40) + '...' : text;
  },                                                                   //
                                                                       //
  isImageUploaded: function (value) {                                  // 6
    return new Spacebars.SafeString(value ? "<i class='glyphicon glyphicon-ok text-success-lter '></i>" : "<i class='glyphicon glyphicon-remove text-danger-lter'></i>");
  },                                                                   //
                                                                       //
  isPublished: function (value) {                                      // 10
    return new Spacebars.SafeString(value && value === 'Y' ? "<i class='glyphicon glyphicon-ok text-success-lter '></i>" : "<i class='glyphicon glyphicon-remove text-danger-lter'></i>");
  },                                                                   //
                                                                       //
  generateAddEdit: function (value) {                                  // 14
    if (value) {                                                       // 15
      return new Spacebars.SafeString("<a class='btn btn-primary' href='/backend/portfolio/maintain/" + value._str + "'>Maintain</a>");
    } else return new Spacebars.SafeString("<a href='/backend/portfolio/maintain/add'><i class='fa fa-plus-square icon text-primary-dker fa-2x'></i></a>");
  }                                                                    //
                                                                       //
};                                                                     //
                                                                       //
Template.portfolioList.onCreated(function () {                         // 23
  this.subscribe('portfolios');                                        // 24
});                                                                    //
                                                                       //
Template.portfolioList.helpers({                                       // 27
  portfolios: function () {                                            // 28
    return Portfolios.find();                                          // 29
  },                                                                   //
                                                                       //
  tableSettings: function () {                                         // 32
    return {                                                           // 33
      rowsPerPage: 10,                                                 // 34
      showNavigation: 'auto',                                          // 35
      showRowCount: false,                                             // 36
      showNavigationRowsPerPage: false,                                // 37
      showColumnToggles: false,                                        // 38
      fields: [{ key: 'title', label: 'Title' }, { key: 'client', label: 'Client' }, { key: 'description', label: 'Description', fn: ListHelper.shortenSentences }, { key: 'splash_image', label: 'Image', fn: ListHelper.isImageUploaded }, { key: 'published', label: 'Published', fn: ListHelper.isPublished }, { key: '_id',
        label: ListHelper.generateAddEdit,                             // 46
        fn: ListHelper.generateAddEdit                                 // 47
      }]                                                               //
    };                                                                 //
  }                                                                    //
});                                                                    //
                                                                       //
Template.portfolioList.events({                                        // 55
  "click .button-update": function () {                                // 56
    return Portfolios.find();                                          // 57
  }                                                                    //
});                                                                    //
                                                                       //
/** PORTFOLIO Maintain*****/                                           //
// TODO :: what should i do here ?                                     //
var PortfolioEntity = {                                                // 64
  constructEntity: function (item) {                                   // 65
    if (typeof item != "undefined" && item != null) {                  // 66
      item._id = item._id._str;                                        // 67
      return item;                                                     // 68
    }                                                                  //
    return { _id: '',                                                  // 70
      title: '',                                                       // 71
      client: '',                                                      // 72
      description: '',                                                 // 73
      splash_image: '',                                                // 74
      published: 'N',                                                  // 75
      video_url: '',                                                   // 76
      createdDate: new Date()                                          // 77
    };                                                                 //
  },                                                                   //
  constructEntityByEvent: function (event) {                           // 80
    var item = PortfolioEntity.constructEntity(null);                  // 81
    item._id = event.target.id.value;                                  // 82
    item.title = event.target.title.value;                             // 83
    item.client = event.target.client.value;                           // 84
    item.description = event.target.description.value;                 // 85
    item.splash_image = event.target.splash_image.value;               // 86
    item.video_url = event.target.video_url.value;                     // 87
    item.published = event.target.published.checked ? "Y" : "N";       // 88
    return item;                                                       // 89
  }                                                                    //
};                                                                     //
                                                                       //
Template.portfolioMaintain.onCreated(function () {                     // 94
  var controller = Iron.controller();                                  // 95
  this.subscribe("portfolioById", controller.params._id);              // 96
  this.subscribe('uploads');                                           // 97
});                                                                    //
                                                                       //
Template.portfolioMaintain.events({                                    // 100
  "submit .portfolio-maintain": function (event) {                     // 101
    // Prevent default browser form submit                             //
    event.preventDefault();                                            // 103
    var item = PortfolioEntity.constructEntityByEvent(event);          // 104
    Meteor.call('upsertPortfolio', item);                              // 105
    GROWL.success('Information Successfully Saved');                   // 106
    Router.go('/backend/portfolio');                                   // 107
  },                                                                   //
                                                                       //
  "click .btnback": function (event) {                                 // 110
    // Prevent default browser form submit                             //
    event.preventDefault();                                            // 112
    Router.go('/backend/portfolio');                                   // 113
  },                                                                   //
                                                                       //
  "click .btndelete": function (event) {                               // 116
    // Prevent default browser form submit                             //
    event.preventDefault();                                            // 118
    Meteor.call('removePortfolio', Blaze.getData(event.target)._id);   // 119
    GROWL.info('Information Successfully Deleted');                    // 120
    Router.go('/backend/portfolio');                                   // 121
  }                                                                    //
                                                                       //
});                                                                    //
                                                                       //
Template.portfolioMaintain.helpers({                                   // 128
  item: function () {                                                  // 129
    return PortfolioEntity.constructEntity(Portfolios.findOne());      // 130
  },                                                                   //
  publishedChecked: function (text) {                                  // 132
    return "Y" === text ? 'checked' : '';                              // 133
  },                                                                   //
  isEdit: function (item) {                                            // 136
    return !(!item._id || 0 === item._id.length);                      // 137
  }                                                                    //
});                                                                    //
                                                                       //
/** UPLOAD template ****************/                                  //
                                                                       //
Template.customUpload.created = function () {                          // 145
  Uploader.init(this);                                                 // 146
};                                                                     //
                                                                       //
Template.customUpload.rendered = function () {                         // 149
  Uploader.render.call(this);                                          // 150
};                                                                     //
                                                                       //
Template.customUpload.events({                                         // 153
  'click .start': function (e) {                                       // 154
    // console.log(Template.instance());                               //
    Uploader.startUpload.call(Template.instance(), e);                 // 156
  }                                                                    //
});                                                                    //
                                                                       //
Template.customUpload.helpers({                                        // 160
  'infoLabel': function () {                                           // 161
    var instance = Template.instance();                                // 162
                                                                       //
    // we may have not yet selected a file                             //
    var info = instance.info.get();                                    // 165
    if (!info) return;                                                 // 166
                                                                       //
    var progress = instance.globalInfo.get();                          // 169
    // we display different result when running or not                 //
    return progress.running ? info.name + ' - ' + progress.progress + '% - [' + progress.bitrate + ']' : info.name + ' - ' + info.size + 'B';
  },                                                                   //
                                                                       //
  'progress': function () {                                            // 176
    return Template.instance().globalInfo.get().progress + '%';        // 177
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
