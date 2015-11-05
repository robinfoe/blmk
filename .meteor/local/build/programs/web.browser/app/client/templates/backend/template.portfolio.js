(function(){
Template.__checkName("portfolioList");
Template["portfolioList"] = new Template("Template.portfolioList", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("portfolioTitle")), "\n\n	", HTML.DIV({
    "class": "wrapper-md"
  }, "\n		", HTML.DIV({
    "class": "panel panel-default"
  }, "\n			", HTML.DIV({
    id: "table",
    style: "margin-top:10px;"
  }, "\n			    ", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("portfolios")),
      settings: Spacebars.call(view.lookup("tableSettings"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("reactiveTable"));
  }), "\n			  "), "\n			", HTML.Raw('<div class="clearfix"></div>'), "\n   		"), "	 \n	") ];
}));

Template.__checkName("portfolioMaintain");
Template["portfolioMaintain"] = new Template("Template.portfolioMaintain", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("portfolioTitle")), "\n	", HTML.DIV({
    "class": "wrapper-md"
  }, "\n		\n			", Blaze.If(function() {
    return Spacebars.call(view.templateInstance().subscriptionsReady());
  }, function() {
    return [ "\n			", Spacebars.With(function() {
      return Spacebars.call(view.lookup("item"));
    }, function() {
      return [ "\n			", HTML.FORM({
        "class": "portfolio-maintain"
      }, "\n			", HTML.DIV({
        "class": "panel panel-default"
      }, "\n			", HTML.DIV({
        "class": "panel-body"
      }, "\n			\n				", HTML.INPUT({
        type: "hidden",
        value: function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        name: "id"
      }), "\n				", HTML.INPUT({
        type: "hidden",
        value: function() {
          return Spacebars.mustache(view.lookup("splash_image"));
        },
        name: "splash_image"
      }), "\n				", HTML.DIV({
        "class": "row"
      }, "\n					", HTML.LABEL({
        "class": "col-md-2 control-label"
      }, "Title"), "\n		          	  ", HTML.DIV({
        "class": "col-md-4"
      }, HTML.INPUT({
        name: "title",
        value: function() {
          return Spacebars.mustache(view.lookup("title"));
        },
        type: "text",
        "class": "form-control"
      })), "\n		        "), "\n				", HTML.DIV({
        "class": "row",
        style: "padding-top:10px"
      }, "\n		          ", HTML.LABEL({
        "class": "col-md-2 control-label"
      }, "Client"), "\n		          ", HTML.DIV({
        "class": "col-md-4"
      }, HTML.INPUT({
        name: "client",
        value: function() {
          return Spacebars.mustache(view.lookup("client"));
        },
        type: "text",
        "class": "form-control"
      })), "\n		        "), "\n\n		        ", HTML.DIV({
        "class": "row",
        style: "padding-top:10px"
      }, "\n		          ", HTML.LABEL({
        "class": "col-md-2 control-label"
      }, "Description"), "\n		          ", HTML.DIV({
        "class": "col-md-6"
      }, "\n		          	", HTML.TEXTAREA({
        name: "description",
        "class": "form-control",
        value: function() {
          return Spacebars.mustache(view.lookup("description"));
        }
      }), "\n		        	"), "\n		    	"), "\n\n		    	", HTML.DIV({
        "class": "row",
        style: "padding-top:10px"
      }, "\n		          ", HTML.LABEL({
        "class": "col-md-2 control-label"
      }, "Video Url"), "\n		          ", HTML.DIV({
        "class": "col-md-6"
      }, HTML.INPUT({
        name: "video_url",
        value: function() {
          return Spacebars.mustache(view.lookup("video_url"));
        },
        type: "text",
        "class": "form-control"
      })), "\n		    	"), "\n\n\n		    	", HTML.DIV({
        "class": "row",
        style: "padding-top:10px"
      }, "\n		          ", HTML.LABEL({
        "class": "col-md-2 control-label"
      }, "Published"), "\n		          ", HTML.DIV({
        "class": "col-md-6"
      }, "\n		          	", HTML.LABEL({
        "class": "i-switch i-switch-md  bg-primary m-t-xs m-r"
      }, "\n              			", HTML.INPUT(HTML.Attrs({
        value: "Y",
        name: "published",
        type: "checkbox"
      }, function() {
        return Spacebars.attrMustache(view.lookup("publishedChecked"), view.lookup("published"));
      })), "\n              			", HTML.I(), "\n            		"), "\n		        	"), "\n		    	"), "\n\n		    	\n		    	\n		    	", HTML.HR(), "\n\n		    	", HTML.DIV({
        "class": "row"
      }, "\n		    		", HTML.DIV({
        "class": "col-md-12"
      }, "\n		          		", HTML.SPAN({
        "class": "pull-left"
      }, "\n							", HTML.BUTTON({
        "class": "btn m-b-xs w-xs btn-info btnback",
        type: "button"
      }, "Back"), "\n							", HTML.BUTTON({
        "class": "btn m-b-xs w-xs btn-primary btnsubmit",
        type: "submit"
      }, "Submit"), "\n							", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("isEdit"), view.lookup("."));
      }, function() {
        return [ "\n							", HTML.BUTTON({
          "class": "btn m-b-xs w-xs btn-danger btndelete",
          type: "button"
        }, "Delete"), "\n							" ];
      }), "\n						"), "\n		        	"), "\n		        "), "\n		        \n				"), "\n			"), "\n				", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("isEdit"), view.lookup("."));
      }, function() {
        return [ "\n				", Spacebars.include(view.lookupTemplate("portfolioImageUpload")), "\n				" ];
      }), "\n				"), "\n		    " ];
    }), "\n			\n			" ];
  }, function() {
    return "\n		    	Loading... \n			";
  }), "\n\n	") ];
}));

Template.__checkName("portfolioImageUpload");
Template["portfolioImageUpload"] = new Template("Template.portfolioImageUpload", (function() {
  var view = this;
  return HTML.DIV({
    "class": "panel panel-default"
  }, "\n				", HTML.DIV({
    "class": "panel-body"
  }, "\n					", HTML.DIV({
    "class": "row"
  }, "\n			          ", HTML.DIV({
    "class": "col-md-12"
  }, "\n			          	", HTML.Raw("<!---->"), "\n			          	", Blaze._TemplateWith(function() {
    return {
      fileTypes: Spacebars.call("image/*"),
      formData: Spacebars.call(view.lookup("."))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("upload_bootstrap"));
  }), "\n			          	", HTML.Raw("<!-- {{> customUpload formData=this}} -->"), "\n			          "), "\n			    	"), "\n			    	", HTML.Raw("<hr>"), "\n			    	", HTML.DIV({
    "class": "row"
  }, "\n				    	", HTML.DIV({
    "class": "col-md-12"
  }, "\n				    		", HTML.IMG({
    src: function() {
      return Spacebars.mustache(view.lookup("splash_image"));
    }
  }), "\n				    	"), "\n				    "), "\n				"), "\n				");
}));

Template.__checkName("portfolioTitle");
Template["portfolioTitle"] = new Template("Template.portfolioTitle", (function() {
  var view = this;
  return HTML.Raw('<div class="bg-light lter b-b wrapper-md">\n  		<h1 class="m-n font-thin h3">Portfolio</h1>\n	</div>');
}));

Template.__checkName("customUpload");
Template["customUpload"] = new Template("Template.customUpload", (function() {
  var view = this;
  return HTML.FORM({
    method: "POST",
    enctype: "multipart/form-data"
  }, "\n		", HTML.DIV({
    "class": "form-group col-md-12"
  }, "\n			", HTML.DIV({
    "class": "input-group col-md-12"
  }, "\n				", HTML.INPUT({
    type: "file",
    "class": "jqUploadclass",
    "data-form-data": function() {
      return Spacebars.mustache(view.lookup("parseToJson"), view.lookup("formData"));
    }
  }), "\n				", Spacebars.With(function() {
    return Spacebars.call(view.lookup("infoLabel"));
  }, function() {
    return [ "\n		            ", Blaze.View("lookup:infoLabel", function() {
      return Spacebars.mustache(view.lookup("infoLabel"));
    }), " ", HTML.BUTTON({
      "class": "start"
    }, "StartUpload"), "\n		            ", HTML.DIV({
      style: "width: 100%"
    }, "\n		                ", HTML.DIV({
      "class": "progress-bar bg-success",
      style: function() {
        return [ "width: ", Spacebars.mustache(view.lookup("progress")) ];
      }
    }, "\n		                    ", Blaze.View("lookup:progress", function() {
      return Spacebars.mustache(view.lookup("progress"));
    }), "\n		                "), "\n		            "), "\n		        " ];
  }), "\n			"), "\n		"), "\n\n\n    ");
}));

}).call(this);
