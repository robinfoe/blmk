if (Meteor.isClient) {
	Template.adminLayout.rendered = function () {
		//console.log('new layout');
		$('.__meteor-css__').remove();
		$('head').prepend("<link rel='stylesheet' href='/styles/app.min.css' type='text/css' media='screen'>");
		$('head').prepend("<link rel='stylesheet' href='/styles/font.css' type='text/css' media='screen'>");
		$('head').prepend("<link rel='stylesheet' href='/styles/material-design-icons.css' type='text/css' media='screen'>");
		$('head').prepend("<link rel='stylesheet' href='/styles/md.css' type='text/css' media='screen'>");
		
		$('head').prepend("<link rel='stylesheet' href='/styles/animate/animate.css' type='text/css' media='screen'>");
		$('head').prepend("<link rel='stylesheet' href='/styles/font-awesome/css/font-awesome.min.css' type='text/css' media='screen'>");
		$('head').prepend("<link rel='stylesheet' href='/styles/simple-line-icons/css/simple-line-icons.css' type='text/css' media='screen'>");
		
		$('head').prepend("<link rel='stylesheet' href='/styles/backend.css' type='text/css' media='screen'>");
		
	}
}