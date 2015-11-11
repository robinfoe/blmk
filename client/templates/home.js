//Meteor.subscribe('publicPortfolios', 'Y');

var VideoPlayer = {
	CACHE : {
		player : null
	},

	playVideo : function(target){

		$('#video-wrap > #video').remove();
		$('.overlay').css('left', 0)
    	$('.overlay').addClass('show')

		var iframe = $('<iframe id="video" src="'+target.video_url+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
		$('#video-wrap').append(iframe);

		iframe.load(function(){
			var iframe = $('#video')[0];
			VideoPlayer.CACHE.player = $f(iframe);
    		VideoPlayer.CACHE.player.api("play");
		}); 
	},

	stopVideo : function(){
		$('.overlay').removeClass('show');
    	setTimeout(function() { $('.overlay').css('left', '-100%') }, 300);
    	VideoPlayer.CACHE.player.api("pause");
    	//VideoPlayer.CACHE.player = null;
	}
}


Template.home.helpers({
    portfolios: function () {
      return Portfolios.find();
    }
});

Template.home.events({
	'click .play, fastclick .play' : function(event){
		VideoPlayer.playVideo(Blaze.getData(event.target));
	},

	'click .close,click .overlay,fastclick .overlay, fastclick .close' : function(event){
		VideoPlayer.stopVideo();
	}
});

Template.home.rendered = function(){
	$(".video-container").fitVids();
};
