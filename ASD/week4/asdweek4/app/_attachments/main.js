//
//    Full Sail University
//    Advanced Scalability & Design Interfaces
//    Monica Peters
//    Week 4 Project 4
//    Due Thursday May 24th 2012
//    main.js

//	change key to _id to work with couch
//  pass revision info and _id to couch to do a save
//  page reload for jqm
//	dont set global vars to pass form data
//  CREATE	form must work
// 	READ	must show data from couch
// 	UPDATE	change id if using custom id. delete entire doc for update.
//	DELETE
	

$('#home').live('pageinit', function()
{
	console.log("Home Page Loaded.");
	
	//app is name of this app see _id file
	//courses is name of db objects
	$.couch.db("asdproject").view("app/courses", 
	{
		cache: false,
		success: function(data)
		{
			$('#homeItems').empty();
			$.each(data.rows, function(index, value)
			{
				var item = (value.value || value.doc);
				$('#homeItems').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "project.html?project=" + item.acronym)
							.text(item.title)
						)
					);
			});
			$('#homeItems').listview();
		}
	});
	
	//LOGO TOP
	$('#header').empty();
	$(function()
	{
		$('#header').append('<center>ASD Week 4 Couch</center>');
	});
	
	//HOME FOOTER
	$('#footer').empty();
	$(function()
	{
		$('#footer').append('');
	});
	
    var toChangePage = function (toPageId) {
        $.mobile.changePage("#" + toPageId , {
            type:"post",
            data:$("form").serialize(),
            reloadPage:true
        });
    };

	var urlVars = function()
	{
		var urlData = $($.mobile.activePage).data("url");
		var urlParts = urlData.split('?');
		var urlPairs = urlParts[1].split('&');
		//loop over the pairs
		var urlValues = {};
		for (var pair in urlPairs)
		{
			var _idValue = urlPairs[pair].split('=');
			var _id = decodeURIComponent(_idValue[0]);
			var value = decodeURIComponent(_idValue[1]);
			urlValues[_id] = value;
		}
		return urlValues;
	};

	$('#search').live('pageinit', function()
	{
		console.log("Search Page Loaded");
	}); //end search pageinit

	$('#browse').live('pageinit', function()
	{
		console.log("Browse Page Loaded");
	}); //end browse pageinit

	$('#additem').live('pageinit', function()
	{
		console.log("Add Item Page Loaded");
			// Var Defaults
		errMsg = $("errors");
		form = $("form");
		displayLink = $("displayLink");
		clearLink = $("clear");
		displayIOSLink = $("displayIOSLink");
		displayAndroidLink = $("displayAndroidLink");
		displayHtml5Link = $("displayHtml5Link");
		displayWordpressLink = $("displayWordpressLink");
		displayGraphicLink = $("displayGraphicLink");
		displayAuthorLink = $("displayAuthorLink");
		save = $("submit");
		
		/*displayLink.on("click", getProjectJSON);
		clearLink.on("click", clearLocal);
		displayIOSLink.on("click", getProjectJSON);
		displayAndroidLink.on("click", getProjectJSON);
		displayHtml5Link.on("click", getProjectJSON);
		displayWordpressLink.on("click", getProjectJSON);
		displayGraphicLink.on("click", getProjectJSON);
		displayAuthorLink.on("click", getProjectJSON);
		*/
		save.on("click", saveProject);
		//save.on("click", validate);
		

		
		//Make Item Links
		//Create Edit and Delete links for each stored item when displayed
		var makeItemLinks = function(_id, linksLi)
		{
			//create line break to create space 
			//around elements
			var breakTag = document.createElement("br");
			
			//add edit single item link
			var editLink = document.createElement("a");
			editLink.href = "#";
			editLink._id = _id;
			var editText = "Edit Project";
			editLink.on("click", editItem);
			editLink.html = editText;	
			linksLi.append(editLink);
			
			//add line break after edit project link
			//before delete project link
			linksLi.append(breakTag);
			
			//add delete single item link
			var deleteLink = document.createElement("a");
			deleteLink.href = "#";
			deleteLink._id = _id;
			var deleteText = "Delete Project";
			deleteLink.on("click", deleteProject);
			deleteLink.html = deleteText;
			linksLi.append(deleteLink);
		}
		
		//Edit single item
		var editItem = function(projectId)
		{
			//Grab data from Item from local storage.
			var value = localStorage.getItem(projectId);
			var item = JSON.parse(value);
			
			//populate form fields with current local storage values
			//1 is value, 0 is label
			$('#title').val() = item.title[1];
			$('#acronym').val() = item.acronym[1];
			$('#month').val() = item.month[1];
		
			// Remove the initial listener from the input 'save project' button
			$("#submit").unbind("click");
			
			// Change Submit button value to say Edit Button
			$('submit').val('Edit Project');
			$("submit").button('refresh');
			$('#form').submit(function()
			{
				validate(projectId);
			});
		}
		
		var deleteProject = function()
		{
			var ask = confirm("You really want to Delete this Project?");
			if(ask)
			{
				localStorage.removeItem(projectId);
				alert("Project was Deleted");
				window.location.reload();
			}
			else
			{
				alert("Project was Not Deleted");
			}
		}
		
		var clearLocal = function()
		{
			if(localStorage.length === 0)
			{
				alert("No Projects in local storage to Delete.");
			}
			else
			{
				localStorage.clear();
				alert("All Projects Deleted from local storage.");
				window.location.reload();
				return false;
			}
		}
		var validate = function(projectId)
		{
			//Define elements we want to check
			var getTitle = $("title").val();
			
			//Reset error messages
			$(".error").hide();
			var hasError = false;
			$('#errors').empty();
			$('#title').css("border", "none");
			
			//Get error messages
			var messageAry = [];
			
			// Project Name Validation
			if(getTitle.value === "")
			{
				$('#title').after('<span class="error">Enter Project Name</span>');
				$('#title').css("border", "1px solid yellow");
				hasError = true;
			}
			
			
			// Set Errors
			if (hasError === true)
			{
				$('#submit-container').after('<span class="error">Enter Required Info</span>');
				event.preventDefault();
				return false;
			}
			else
			{
				saveProject(projectId);
			}
			
			//if errors, show them on screen
			if(messageAry.length >= 1)
			{
				for(var i=0, j=messageAry.length; i<j; i++)
				{
					var txt = document.createElement("li");
					txt.html = messageAry(i);
					errMsg.append(txt);
				}
				e.preventDefault();
				return false;
			}else{
				//If everything is good, save the data
				//Send key value that came from editData function
				//Remember key value was passed thru editSubmit even listener 
				//as a property.
				//CHANGE KEY TO _id because couch db
				saveProject(this._id);
			}
		}

		var saveProject = function(_id)
		{
			//if no key, this is brand new item 
			//so we need new key
			if(!_id)
			{
				var id = Math.floor(Math.random()*10000001);
			}
			else
			{
				var id = _id;
			}

				//Gather up all our form field values and store in object.
				//Object properties contain array with form label and input value
				var item 			= {};
					item.title 		= ["Project Name:",$('#title').val()];
					item.acronym		= ["Project Tags:",$('#acronym').val()];
					item.month	= ["Project Notes:",$('#month').val()];
				//Save Data to Local Storage: Use Stringify to convert our object to a string
				//json.org
				localStorage.setItem(id, JSON.stringify(item));
				alert("Project Saved");
		}

		var getData = function()
		{
			//removed localStorage stuff
		}
	}); //end additem pageinit		
			
	$('#contact').live('pageinit', function()
	{console.log("Contact Page Loaded");}); //end contact pageinit

	$('#info').live('pageinit', function()
	{console.log("Info Page Loaded");}); //end info pageinit

}); //end home page init