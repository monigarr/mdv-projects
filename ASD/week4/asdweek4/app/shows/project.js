function(doc, req) {
  var html = "<div data-role=\"page\" id=\"projectview\">" +
                       "<div data-role=\"header\" id=\"projectheader\">" +
                           "<h2 class=\"projectname\">" + doc.name + "<\/h2>" +
                       "<\/div>" +
                       "<div data-role=\"content\" id=\"projectcontent\">" +
                           "<h2 class=\"name\">" + doc.name + "<\/h2>" +
                           "<p class=\"tags\">" + doc.tags + "<\/p>" +
                           "<p class=\"comments\">" + doc.comments + "<\/p>" +
                       "<\/div>" +
                       "<div data-role=\"footer\" \/>" +
                   "<\/div>";
  return html;
}