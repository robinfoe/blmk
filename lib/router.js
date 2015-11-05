Router.configure({
  // the default layout
  layoutTemplate: 'mainLayout'
});  


Router.onBeforeAction(function(){
	var backendPrefix = "/backend";
	var backendLogin = backendPrefix+'/login'
	var isBackend = this.url.substring(0, backendPrefix.length) === backendPrefix;
	var isBackendLogin = this.url.substring(0, backendLogin.length) === backendLogin;

	if(isBackend && !isBackendLogin && !CREDENTIAL.isAdminUser())
		this.router.go(backendLogin);

	this.layout((isBackend) ? 'adminLayout': 'mainLayout');
	

	/*
	if(!isBackend)
		this.layout('mainLayout');
	else{
		if( !isBackendLogin && !CREDENTIAL.isAdminUser())
			router.go(backendLogin);
		else
			this.layout('adminLayout');
	}


	if(this.url.substring(0, backendPrefix.length) === backendPrefix){
		this.layout('adminLayout');
	}else{
		this.layout('mainLayout');
	}
	*/

	this.next();
});

Router.route('/' , {
	waitOn: function () {
    	return [Meteor.subscribe('publicPortfolios','Y'),Meteor.subscribe('uploads')];
	},
	action: function(){
		if (this.ready()){
			this.render('home');
		}else{
		//this.next();
		//render splash screen... .
		}
	},

	/*
	preload : {
		'verbose': true,
		'timeOut': 5000, 
		'sync'   : 'scripts/froogaloop/script.js',
	}
	*/
});



/*** BACK END Router *****************/
Router.route('/backend/login' ,{
	action: function(){
		if (this.ready()){
			this.render('backendLogin');
		}else{
			//this.next();
			//render splash screen... .
		}
	}
});


Router.route('/backend/logout' ,function(){
	Meteor.logout(function(message){
		Router.go('/backend/login');
	});
});


Router.route('/backend/portfolio' ,{
	action: function(){
		if (this.ready()){
			this.render('portfolioList');
		}else{
			//this.next();
			//render splash screen... .
		}
	}
});


Router.route('/backend/portfolio/maintain/:_id' ,{
	action: function(){
		if (this.ready()){
			this.render('portfolioMaintain');
		}else{
			//this.next();
			//render splash screen... .
		}
	}
});


