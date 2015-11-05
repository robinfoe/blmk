(function(){
Template.__checkName("home");
Template["home"] = new Template("Template.home", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "wrapper"
  }, "\n\n		", HTML.UL({
    id: "works"
  }, "\n			", HTML.Raw('<li class="logo">\n				<img class="blmk-logo" src="images/logo-s.png">\n				<div><h1>BRANDON LOH . Director<br>+6012 3291 9293  <a href="mailto:info@blmk.tv">info@blmk.tv</a></h1></div>\n				<img class="logoblank" src="images/blank.png">\n			</li>'), "\n\n			", Blaze.Each(function() {
    return Spacebars.call(view.lookup("portfolios"));
  }, function() {
    return [ "\n				", Spacebars.include(view.lookupTemplate("portfolioHome")), "\n      		" ];
  }), "\n		"), "\n\n	"), "\n\n	", HTML.DIV({
    "class": "overlay"
  }, "\n	    ", HTML.DIV({
    id: "video-container",
    "class": "video-container"
  }, "\n			", HTML.Raw("<!-- SVG Close (X) Icon -->"), "\n	    	", HTML.SVG({
    "class": "close",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "39.2 22.3 25 24.5"
  }, HTML.PATH({
    d: "M39.5,46.4c0.2,0.2,0.6,0.4,0.9,0.4c0.3,0,0.6-0.1,0.9-0.4l10.3-10.3L62,46.4c0.2,0.2,0.6,0.4,0.9,0.4c0.3,0,0.6-0.1,0.9-0.4c0.5-0.5,0.5-1.3,0-1.8L53.5,34.3l9.8-9.8c0.5-0.5,0.5-1.3,0-1.8c-0.5-0.5-1.3-0.5-1.8,0l-9.8,9.8l-9.8-9.8c-0.5-0.5-1.3-0.5-1.8,0c-0.5,0.5-0.5,1.3,0,1.8l9.8,9.8L39.5,44.6C39,45.1,39,45.9,39.5,46.4z"
  })), "\n\n	    	", HTML.Raw("<!-- Embedded video -->"), "\n	    	", HTML.Raw('<div id="video-wrap" class="fluid-width-video-wrapper" style="padding-top: 49.6667%;"></div>'), "\n	    	", HTML.Raw("<!-- \n	    	-->"), "\n	    "), "\n    ") ];
}));

Template.__checkName("portfolioHome");
Template["portfolioHome"] = new Template("Template.portfolioHome", (function() {
  var view = this;
  return HTML.LI("\n		", HTML.DIV({
    "class": "title"
  }, "\n  			", HTML.H3(Blaze.View("lookup:title", function() {
    return Spacebars.mustache(view.lookup("title"));
  })), "\n  			", HTML.H5(Blaze.View("lookup:client", function() {
    return Spacebars.mustache(view.lookup("client"));
  })), "\n  			", HTML.P(Blaze.View("lookup:description", function() {
    return Spacebars.mustache(view.lookup("description"));
  })), "\n			", HTML.Raw('<h4><span class="play">Watch</span></h4>'), "\n		"), HTML.Raw('\n		<div class="nulloverlay"><img src="images/null.png"></div>\n		'), HTML.IMG({
    src: function() {
      return Spacebars.mustache(view.lookup("splash_image"));
    }
  }), "\n    ");
}));

}).call(this);
