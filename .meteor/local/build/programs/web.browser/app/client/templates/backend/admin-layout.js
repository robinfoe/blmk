(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/backend/admin-layout.js                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
if (Meteor.isClient) {                                                 // 1
	Template.adminLayout.rendered = function () {                         // 2
		//console.log('new layout');                                         //
		$('.__meteor-css__').remove();                                       // 4
		$('head').prepend("<link rel='stylesheet' href='/styles/app.min.css' type='text/css' media='screen'>");
		$('head').prepend("<link rel='stylesheet' href='/styles/font.css' type='text/css' media='screen'>");
		$('head').prepend("<link rel='stylesheet' href='/styles/material-design-icons.css' type='text/css' media='screen'>");
		$('head').prepend("<link rel='stylesheet' href='/styles/md.css' type='text/css' media='screen'>");
                                                                       //
		$('head').prepend("<link rel='stylesheet' href='/styles/animate/animate.css' type='text/css' media='screen'>");
		$('head').prepend("<link rel='stylesheet' href='/styles/font-awesome/css/font-awesome.min.css' type='text/css' media='screen'>");
		$('head').prepend("<link rel='stylesheet' href='/styles/simple-line-icons/css/simple-line-icons.css' type='text/css' media='screen'>");
                                                                       //
		$('head').prepend("<link rel='stylesheet' href='/styles/backend.css' type='text/css' media='screen'>");
	};                                                                    //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
