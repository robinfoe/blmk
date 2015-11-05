(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/router.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Router.configure({                                                     // 1
	// the default layout                                                 //
	layoutTemplate: 'mainLayout'                                          // 3
});                                                                    //
                                                                       //
Router.onBeforeAction(function () {                                    // 7
	var backendPrefix = "/backend";                                       // 8
	var backendLogin = backendPrefix + '/login';                          // 9
	var isBackend = this.url.substring(0, backendPrefix.length) === backendPrefix;
	var isBackendLogin = this.url.substring(0, backendLogin.length) === backendLogin;
                                                                       //
	if (backendLogin && !isBackendLogin && !CREDENTIAL.isAdminUser()) this.router.go(backendLogin);
                                                                       //
	this.layout(isBackend ? 'adminLayout' : 'mainLayout');                // 16
                                                                       //
	/*                                                                    //
 if(!isBackend)                                                        //
 	this.layout('mainLayout');                                           //
 else{                                                                 //
 	if( !isBackendLogin && !CREDENTIAL.isAdminUser())                    //
 		router.go(backendLogin);                                            //
 	else                                                                 //
 		this.layout('adminLayout');                                         //
 }                                                                     //
                                                                       //
 if(this.url.substring(0, backendPrefix.length) === backendPrefix){    //
 	this.layout('adminLayout');                                          //
 }else{                                                                //
 	this.layout('mainLayout');                                           //
 }                                                                     //
 */                                                                    //
                                                                       //
	this.next();                                                          // 37
});                                                                    //
                                                                       //
Router.route('/', {                                                    // 40
	waitOn: function () {                                                 // 41
		return [Meteor.subscribe('publicPortfolios', 'Y'), Meteor.subscribe('uploads')];
	},                                                                    //
	action: function () {                                                 // 44
		if (this.ready()) {                                                  // 45
			this.render('home');                                                // 46
		} else {                                                             //
			//this.next();                                                      //
			//render splash screen... .                                         //
		}                                                                    //
	}                                                                     //
                                                                       //
});                                                                    //
                                                                       //
/*** BACK END Router *****************/                                //
/*                                                                     //
preload : {                                                            //
	'verbose': true,                                                      //
	'timeOut': 5000,                                                      //
	'sync'   : 'scripts/froogaloop/script.js',                            //
}                                                                      //
*/                                                                     //
Router.route('/backend/login', {                                       // 65
	action: function () {                                                 // 66
		if (this.ready()) {                                                  // 67
			this.render('backendLogin');                                        // 68
		} else {                                                             //
			//this.next();                                                      //
			//render splash screen... .                                         //
		}                                                                    //
	}                                                                     //
});                                                                    //
                                                                       //
Router.route('/backend/logout', function () {                          // 77
	Meteor.logout(function (message) {                                    // 78
		Router.go('/backend/login');                                         // 79
	});                                                                   //
});                                                                    //
                                                                       //
Router.route('/backend/portfolio', {                                   // 84
	action: function () {                                                 // 85
		if (this.ready()) {                                                  // 86
			this.render('portfolioList');                                       // 87
		} else {                                                             //
			//this.next();                                                      //
			//render splash screen... .                                         //
		}                                                                    //
	}                                                                     //
});                                                                    //
                                                                       //
Router.route('/backend/portfolio/maintain/:_id', {                     // 96
	action: function () {                                                 // 97
		if (this.ready()) {                                                  // 98
			this.render('portfolioMaintain');                                   // 99
		} else {                                                             //
			//this.next();                                                      //
			//render splash screen... .                                         //
		}                                                                    //
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=router.js.map
