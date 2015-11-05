(function(){
Template.__checkName("adminLayout");
Template["adminLayout"] = new Template("Template.adminLayout", (function() {
  var view = this;
  return HTML.DIV({
    "class": "app app-header-fixed"
  }, HTML.Raw('\n	<header id="header" class="app-header navbar" role="menu">\n      <!-- navbar header -->\n      <div class="navbar-header bg-dark">\n        <button class="pull-right visible-xs dk" ui-toggle-class="show" target=".navbar-collapse">\n          <i class="glyphicon glyphicon-cog"></i>\n        </button>\n        <button class="pull-right visible-xs" ui-toggle-class="off-screen" target=".app-aside" ui-scroll="app">\n          <i class="glyphicon glyphicon-align-justify"></i>\n        </button>\n        <!-- brand -->\n        <a href="#/" class="navbar-brand text-lt">\n          <img src="img/logo.png" alt="." class="hide">\n          <span class="hidden-folded m-l-xs">BLMK - backend</span>\n        </a>\n        <!-- / brand -->\n      </div>\n      <!-- / navbar header -->\n\n      <!-- navbar collapse -->\n      <div class="collapse pos-rlt navbar-collapse box-shadow bg-white-only">\n       \n       </div>\n      <!-- / navbar collapse -->\n  </header>\n\n  '), HTML.ASIDE({
    id: "aside",
    "class": "app-aside hidden-xs bg-dark"
  }, "\n      ", HTML.DIV({
    "class": "aside-wrap"
  }, "\n        ", HTML.DIV({
    "class": "navi-wrap"
  }, "\n          ", HTML.Raw("<!-- nav -->"), "\n          ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("isInRole"), "admin");
  }, function() {
    return [ "\n          ", HTML.NAV({
      "ui-nav": "",
      "class": "navi clearfix"
    }, "\n            ", HTML.UL({
      "class": "nav"
    }, "\n              ", HTML.LI({
      "class": "hidden-folded padder m-t m-b-sm text-muted text-xs"
    }, "\n                ", HTML.SPAN("Navigation"), "\n              "), "\n              ", HTML.LI("\n                ", HTML.A({
      href: "/backend/portfolio",
      "class": "auto"
    }, "      \n                  ", HTML.SPAN({
      "class": "pull-right text-muted"
    }, "\n                    ", HTML.I({
      "class": "fa fa-fw fa-angle-right text"
    }), "\n                    ", HTML.I({
      "class": "fa fa-fw fa-angle-down text-active"
    }), "\n                  "), "\n                  ", HTML.I({
      "class": "glyphicon glyphicon-th-list icon text-primary-dker"
    }), "\n                  ", HTML.SPAN({
      "class": "font-bold"
    }, "Portfolio"), "\n                "), "\n              "), "\n\n              ", HTML.LI({
      "class": "line dk"
    }), "\n              ", HTML.LI({
      "class": "hidden-folded padder m-t m-b-sm text-muted text-xs"
    }, "\n                ", HTML.SPAN("Features"), "\n              "), "\n              ", HTML.LI("\n                ", HTML.A({
      href: "/backend/logout",
      "class": "auto"
    }, "      \n                  ", HTML.SPAN({
      "class": "pull-right text-muted"
    }, "\n                    ", HTML.I({
      "class": "fa fa-fw fa-angle-down text-active"
    }), "\n                  "), "\n                  ", HTML.I({
      "class": "glyphicon glyphicon-log-out icon text-danger-dker"
    }), "\n                  ", HTML.SPAN({
      "class": "font-bold"
    }, "Logout"), "\n                "), "\n              "), "\n              \n            "), "\n          "), "\n          ", HTML.Comment(" nav "), "\n          " ];
  }), "\n          ", HTML.Raw("<!-- aside footer -->"), "\n          ", HTML.Raw('<div class="wrapper m-t">\n            \n          </div>'), "\n          ", HTML.Raw("<!-- / aside footer -->"), "\n        "), "\n      "), "\n  "), "\n\n  	", HTML.DIV({
    "class": "app-content",
    role: "main"
  }, "\n      ", HTML.DIV({
    "class": "app-content-body ",
    role: "main"
  }, " \n       ", Spacebars.include(view.lookupTemplate("yield")), "\n      "), "  \n      \n    "), HTML.Raw('\n\n    <footer id="footer" class="app-footer" role="footer">\n    <div class="wrapper b-t bg-light">\n      <span class="pull-right">- BLMK - <a href="" ui-scroll="app" class="m-l-sm text-muted"><i class="fa fa-long-arrow-up"></i></a></span>\n      © 2015 Copyright.\n    </div>\n  </footer>\n'));
}));

}).call(this);
