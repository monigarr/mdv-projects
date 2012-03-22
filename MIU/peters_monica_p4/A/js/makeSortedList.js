//************************************************************************
// Author: Jeremy Fox
// Please Note: This function requires the underscore.js library
// You can get underscore.js here: http://documentcloud.github.com/underscore/
//
// Usage: Simply call the makeSortedList() function where you want the
// sorted list to be returned to. You will also need to specify which
// object property you would like to sort by. For example, if you have an
// object with properties "id", "name", "date", "price", "type", etc. You
// just need to specify which property you want to sort by where you see
// "yourObjectsPropertyToSortBy" in the code below.
//************************************************************************

var makeSortedList = function() {
    var myList, callbackFunc;
    myList = [];
    _.each(_.keys(localStorage), function(key) {
      var myObj, value;
      value = localStorage.getItem(key);
      myObj = JSON.parse(value);
      myObj.key = key;
      myList.push(myObj);
    });
    callbackFunc = function(a, b) {
      if (a.yourObjectsPropertyToSortBy === b.yourObjectsPropertyToSortBy) {
        if (a.yourObjectsPropertyToSortBy === b.yourObjectsPropertyToSortBy) return 0;
        return (a.yourObjectsPropertyToSortBy < b.yourObjectsPropertyToSortBy ? -1 : 1);
      }
      if (a.yourObjectsPropertyToSortBy < b.yourObjectsPropertyToSortBy) {
        return -1;
      } else {
        return 1;
      }
    };
    return myList.sort(callbackFunc);
  };