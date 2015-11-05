(function(){
Template.__checkName("mainLayout");
Template["mainLayout"] = new Template("Template.mainLayout", (function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("yield"));
}));

}).call(this);
