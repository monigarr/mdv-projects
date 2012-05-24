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
	
	$('#contact').live('pageinit', function()
	{console.log("Contact Page Loaded");}); //end contact pageinit

	$('#info').live('pageinit', function()
	{console.log("Info Page Loaded");}); //end info pageinit
	
	/*$.couch.db("asdproject").view("app/courses", 
	{
		cache: false,
		success: function(data)
		{
			$('#homeItems').empty();
			$.each(data.rows, function(index, value)
			{
				var item = (value.value || value.doc);
				$('#homeItems').append($('<li>').text(item.title));
			});
			$('#homeItems').listview();
		}
	});
	*/
	
	
	
	//app is name of this app see _id file
	//programs is name of db objects
	$.couch.db("asdproject").view("app/programs", 
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
							.attr("href", "program.html?program=" + item.acronym)
							.text(item.acronym)
						)
					);
				});
				$('#homeItems').listview();
		}
	});
	
	$.couch.db("asdproject").view("app/projects", 
	{
		cache: false,
		success: function(data)
		{
			$('#projectItems').empty();
			$.each(data.rows, function(index, value)
			{
				var item = (value.value || value.doc);
				$('#projectItems').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "project.html?project=" + item.tag)
							.text(item.name)
						)
					);
				});
				$('#projectItems').listview();
		}
	});

	$('#program').live("pageshow", function()
	{
		//app is name of this app see _id file
		//courses is name of db objects
		$.couch.db("asdproject").view("app/courses", 
		{
			cache: false,
			
			beforeSend: function(data)
			{
				$('#error').hide();
				//$('#loading').show();
			},
			
			complete: function(data)
			{
				$('#loading').hide();
			},
			
			success: function(data)
			{
				$('#courseItems').empty();
				$.each(data.rows, function(index, value)
				{
					var item = (value.value || value.doc);
					$('#courseItems').append(
						$('<li>').append(item)
							.text(item.title)
						);
					});
					$('#courseItems').listview();
			},
			
			error: function(data)
			{
				$('#error').show();
			}
		});
	});
	
	$('#project').live("pageshow", function()
	{
		//app is name of this app see _id file
		//courses is name of db objects
		$.couch.db("asdproject").view("app/projects", 
		{
			cache: false,
			
			beforeSend: function(data)
			{
				$('#error').hide();
				//$('#loading').show();
			},
			
			complete: function(data)
			{
				$('#loading').hide();
			},
			
			success: function(data)
			{
				$('#projectDetails').empty();
				$.each(data.rows, function(index, value)
				{
					var item = (value.value || value.doc);
					$('#projectDetails').listview().append($('<li>').append(item).text("Project:" + item.name + "Tag:" + item.tag + "Comments:" + item.comment));
				});
				$('#projectDetails').listview();
			},
			
			error: function(data)
			{
				$('#error').show();
			}
		});
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
			
		var parseForm = function(data)
		{
			console.log(data);
		}
		
		var form = $("#form");		
		form.validate({
			invalidHandler: function(form, validator){},
			submitHandler: function(){
				var data = form.serializeArray();
				parseForm(data);
			}
		});
		
		
		var clearLink = $("clear");;
		var save = $("submit");
		clearLink.on("click", clearLocal);
		save.on("click", saveProject);
		

		
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
			

}); //end home page init