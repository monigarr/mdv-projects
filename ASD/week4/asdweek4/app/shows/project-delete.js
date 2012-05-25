function(doc, req) { 
	var Mustache = require("vendor/couchapp/lib/mustache");
   	var stash = {
			name: doc.name,
			comments : doc.comments,
			document: doc._id
    };
	return Mustache.to_html(this.templates.projectdelete, stash, this.templates.partials.projectdelete);
}