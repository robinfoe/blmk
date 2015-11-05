(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/init.js                                                      //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.startup(function () {                                           // 1
                                                                       //
  /** User setup **/                                                   //
  if (typeof Accounts.findUserByUsername('blmkadm') == 'undefined') {  // 4
    var id = Accounts.createUser({ username: 'blmkadm', password: 'jarvis', profile: { name: 'Brandon Loh' } });
    Roles.addUsersToRoles(id, 'admin');                                // 6
  }                                                                    //
                                                                       //
  var guidGenerator = {                                                // 13
    generate: function (s) {                                           // 14
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;      // 16
    },                                                                 //
    uniqueKey: function () {                                           // 18
      return guidGenerator.generate() + guidGenerator.generate(true) + guidGenerator.generate(true) + guidGenerator.generate();
    }                                                                  //
                                                                       //
  };                                                                   //
                                                                       //
  UploadServer.init({                                                  // 25
    tmpDir: process.env.PWD + '/.upload/images/tmp',                   // 26
    uploadDir: process.env.PWD + '/.upload/images',                    // 27
    checkCreateDirectories: true, //create the directories for you     // 28
                                                                       //
    getDirectory: function (fileInfo, formData) {                      // 30
      return "work/images";                                            // 31
    },                                                                 //
                                                                       //
    getFileName: function (fileInfo, formData) {                       // 34
      return guidGenerator.uniqueKey() + fileInfo.name; //formData._id +'_'+fileInfo.name;
    },                                                                 //
    finished: function (fileInfo, formData) {                          // 37
      if (formData && formData._id != null) {                          // 38
        formData.splash_image = Meteor.settings.path.upload + fileInfo.path;
        //formData.splash_image = 'http://188.166.228.29/upload/' + fileInfo.path;
        Meteor.call('upsertPortfolio', formData);                      // 41
      }                                                                //
    }                                                                  //
  });                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=init.js.map
