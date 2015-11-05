(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/init.js                                                      //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.startup(function () {                                           // 1
	Uploader.finished = function (index, file) {                          // 2
		GROWL.info('Information is updated with new image');                 // 3
		Uploads.insert(file);                                                // 4
	};                                                                    //
});                                                                    //
                                                                       //
UI.registerHelper('parseToJson', function (context, options) {         // 9
	if (context) return JSON.stringify(context);                          // 10
});                                                                    //
                                                                       //
/** NOTIFICATIONS ******************/                                  //
GROWL = {                                                              // 16
	TYPE: {                                                               // 17
		SUCCESS: 'success', INFO: 'info', WARN: 'warning', ERROR: 'error'    // 18
	},                                                                    //
                                                                       //
	dictionary: new ReactiveDict('message', null),                        // 21
                                                                       //
	show: function (title, message, type) {                               // 23
		toastr[type](message, title);                                        // 24
	},                                                                    //
                                                                       //
	success: function (message) {                                         // 27
		GROWL.dictionary.set('message', { title: 'Success', text: message, type: GROWL.TYPE.SUCCESS });
	},                                                                    //
                                                                       //
	info: function (message) {                                            // 31
		GROWL.dictionary.set('message', { title: 'Info', text: message, type: GROWL.TYPE.INFO });
	},                                                                    //
                                                                       //
	warn: function (message) {                                            // 35
		GROWL.dictionary.set('message', { title: 'Warning', text: message, type: GROWL.TYPE.WARN });
	},                                                                    //
                                                                       //
	error: function (message) {                                           // 39
		GROWL.dictionary.set('message', { title: 'Error', text: message, type: GROWL.TYPE.ERROR });
	}                                                                     //
};                                                                     //
                                                                       //
Tracker.autorun(function () {                                          // 47
	var message = GROWL.dictionary.get('message');                        // 48
	// console.log(message);                                              //
	if (message != null) {                                                // 50
		// if(!(typeof message === 'undefined') || message != null ){        //
		GROWL.show(message.title, message.text, message.type);               // 51
		GROWL.dictionary.set('message', null);                               // 52
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
