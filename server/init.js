Meteor.startup(function () {

  /** User setup **/
  if(typeof Accounts.findUserByUsername('blmkadm') == 'undefined'){
    var id = Accounts.createUser({username:'blmkadm' , password:'jarvis',profile:{name:'Brandon Loh'}});
    Roles.addUsersToRoles(id, 'admin');
  }
 




	var guidGenerator = {
		generate : function(s){
			var p = (Math.random().toString(16)+"000000000").substr(2,8);
        	return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
		},
		uniqueKey : function(){
			return guidGenerator.generate() + guidGenerator.generate(true) + guidGenerator.generate(true) + guidGenerator.generate();
		}

	}


  UploadServer.init({
    tmpDir: process.env.PWD + '/.upload/images/tmp',
    uploadDir: process.env.PWD + '/.upload/images',
    checkCreateDirectories: true, //create the directories for you
    
	getDirectory: function(fileInfo, formData) {
      return "work/images";
    },
    
    getFileName: function(fileInfo, formData) {
      return guidGenerator.uniqueKey() + fileInfo.name;//formData._id +'_'+fileInfo.name;
    },
    finished: function(fileInfo, formData) {
      if (formData && formData._id != null) {
      		formData.splash_image = Meteor.settings.path.upload + fileInfo.path;
          //formData.splash_image = 'http://188.166.228.29/upload/' + fileInfo.path;
      		Meteor.call('upsertPortfolio', formData);
      }
    }
  });
});

