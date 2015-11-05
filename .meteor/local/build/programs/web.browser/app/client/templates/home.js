(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/templates/home.js                                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
//Meteor.subscribe('publicPortfolios', 'Y');                           //
                                                                       //
var VideoPlayer = {                                                    // 3
	CACHE: {                                                              // 4
		player: null                                                         // 5
	},                                                                    //
                                                                       //
	playVideo: function (target) {                                        // 8
                                                                       //
		$('#video-wrap > #video').remove();                                  // 10
		$('.overlay').css('left', 0);                                        // 11
		$('.overlay').addClass('show');                                      // 12
                                                                       //
		var iframe = $('<iframe id="video" src="' + target.video_url + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
		$('#video-wrap').append(iframe);                                     // 15
                                                                       //
		iframe.load(function () {                                            // 17
			var iframe = $('#video')[0];                                        // 18
			VideoPlayer.CACHE.player = $f(iframe);                              // 19
			VideoPlayer.CACHE.player.api("play");                               // 20
		});                                                                  //
	},                                                                    //
                                                                       //
	stopVideo: function () {                                              // 24
		$('.overlay').removeClass('show');                                   // 25
		setTimeout(function () {                                             // 26
			$('.overlay').css('left', '-100%');                                 // 26
		}, 300);                                                             //
		VideoPlayer.CACHE.player.api("pause");                               // 27
		VideoPlayer.CACHE.player = null;                                     // 28
	}                                                                     //
};                                                                     //
                                                                       //
Template.home.helpers({                                                // 33
	portfolios: function () {                                             // 34
		return Portfolios.find();                                            // 35
	}                                                                     //
});                                                                    //
                                                                       //
Template.home.events({                                                 // 39
	'click .play': function (event) {                                     // 40
		VideoPlayer.playVideo(Blaze.getData(event.target));                  // 41
	},                                                                    //
                                                                       //
	'click .overlay': function (event) {                                  // 44
		VideoPlayer.stopVideo();                                             // 45
	}                                                                     //
});                                                                    //
                                                                       //
Template.home.rendered = function () {                                 // 49
	$(".video-container").fitVids();                                      // 50
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);
