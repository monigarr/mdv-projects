function(doc) {
//return courses in my db
//loop over docs & call function
  if (doc._id.substr(0, 7) === "course:") {
    emit(doc._id.substr(7), {
     "title": doc.title,
     "acronym": doc.acronym,
     "months": doc.months
    });
  }
};
