//tutorial: http://custardbelly.com/blog/2011/01/04/jquery-mobile-couchdb-part-4-editing-documents/

function(doc, req) {
    var Mustache = require("vendor/couchapp/lib/mustache");
    var stash = {
            name: doc.name,
            tags : doc.tags,
            comments: doc.comments,
            document: doc._id
    };
    return Mustache.to_html(this.templates.projectedit, stash, this.templates.partials.projectedit);
}