(function(){
Template.__checkName("backendLogin");
Template["backendLogin"] = new Template("Template.backendLogin", (function() {
  var view = this;
  return HTML.Raw('<div class="wrapper-md login-container">\n		<div class="row">\n			<div class="col-sm-offset-3  col-sm-6">\n		      <div class="panel panel-default">\n		        <div class="panel-heading font-bold">Log-in</div>\n		        <div class="panel-body">\n		          <form role="form">\n		            <div class="form-group">\n		              <label>Username</label>\n		              <input type="text" class="form-control" placeholder="Username" name="username" autocomplete="off">\n		            </div>\n		            <div class="form-group">\n		              <label>Password</label>\n		              <input type="password" class="form-control" placeholder="Password" name="password">\n		            </div>\n		            <button type="submit" class="btn btn-sm btn-primary">Submit</button>\n		          </form>\n		        </div>\n		      </div>\n		    </div>\n		</div>\n	</div>');
}));

}).call(this);
