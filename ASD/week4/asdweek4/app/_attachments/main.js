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
	
	$.couch.db("showoff_cloudant_week4").view("app/projects", 
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
							.attr("href", "project.html?project=" + item.tags)
							.text(item.name)
						)
					);
				});
				$('#projectItems').listview();
		}
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
					$('#projectDetails').listview().append($('<li>').append(item).text(item.comment));
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
	
	//GET URL VALUE
	var getUrlVars = function()
	{
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m,key,value)
		{
			vars[key] = value;
		});
		return vars;
	}

	$('#search').live('pageinit', function()
	{
		console.log("Search Page Loaded");
	}); //end search pageinit

	$('#browse').live('pageshow', function()
	{
		console.log("Browse Page Loaded");
		var projectId = getUrlVars()["id"];
			var projectUrl = '/showoff_cloudant_week4/_all_docs?include_docs=true&key="project:'+projectId+'"';
			$('<div></div>').addClass('content-container ui-btn  ui-li ui-corner-top ui-corner-bottom ui-btn-up-c '+projectId).prependTo('#viewProject #content');
		
			$.ajax({
				"url": projectUrl,
				"dataType": "json",
				"success": function(data) {
					//console.log(data);
					//var rev = data.rows[0].doc._rev;
					$.each(data.rows, function(index,project){
						var name = project.doc.name[1];
						var tag = project.doc.tag[1];
						var comment = project.doc.comment[1];
						var id = project.doc._id;
						var rev = project.doc._rev;
						//create the DOM insertion just like json data
						var projectString = $('<div data-role="collapsible" data-theme="c">' +
						  '<h3>' + name + '</h3>' +
						  '<p><strong>Tag:</strong> ' + tag + '</p>' +
						  '<p><strong>Notes:</strong> ' + comment + '</p>' +
						  '</div>').appendTo('#viewProject #content .content-container');
						//Add ID's to Edit and Delete button
						$('#viewProject #edit').attr('href', 'additem.html?projectId='+projectId+'&op=edit');
						$('#viewProject #delete').attr('rel', name);
		
					});
				},
				"error": function(result){
					console.log(result);
				} 
			});
		
	}); //end browse pageshow

	$('#additem').live('pageinit', function()
	{		
		console.log("Add Item Page Loaded");
		var parseForm = function(data)
		{
			console.log(data);
			
			$("form").submit(function() 
		  	{
		    	$.mobile.showPageLoadingMsg();
		    });
			
			var clearLink = $("clear");
			var save = $("submit");
			clearLink.on("click", clearLocal);
			save.on("click", saveProject);
		}
		
		// VALIDATE
		var validateForm = function (e) {
		var getProjectName = $("#project-name").val();
		var formErrors = $('#formErrors');
	
		// RESET ERRORS
		$(".error").hide();
		var hasError = false;
		$('#errors').empty();
		$('#project-name').css("border", "none");

		// GET ERRORS
		var messageArray = [];
		//Project Name validation
		if (getProjectName === "") {
			$('#project-name').after('<br/><span class="error">Enter Project Name.</span>');
			$('#project-name').css("border", "1px solid yellow") ;
			hasError = true;
		}

		// SET ERRORS
		if (hasError === true) 
		{
			$('#submit-container').before('<br/><span class="error">Enter info above.</span>');
			$('body,html').animate({scrollTop:0}, 800);
			e.preventDefault();
			return false;
			} else {
				saveProject();
			}
		}		
		
		// SAVE PROJECT
		var saveProject = function(_id)
		{
			// get project id to edit
			if($('#project-id').val().length > 0)
			{
			var projectIdSet = $('#project-id').val();
			} else {
			var projectIdSet = 'project:'+($('#project-name').val().toLowerCase()).replace( /\s/g, "").split(',').join('').replace(/[^a-zA-Z 0-9]+/g,'');

			//Gather up all our form field values and store in object.
			//Object properties contain array with form label and input value
			var item = {};
				item.name = ["Project Name:",$('#name').val()];
				item.tag = ["Project Tags:",$('#tag').val()];
				item.comment = ["Project Notes:",$('#comment').val()];
			
			// get rev of existing project
			if($('#project-rev').val().length > 0)
			{
				var revText = {_rev:$('#project-rev').val()};
				$.extend(newProject, revText);
			}
			
			//save to couch db
			$db.saveDoc(newProject,
			{
				success: function(data)
				{
					console.log(data);
				},
				error: function(status)
				{
					console.log(status);
				}
			});
			alert("Project was Saved");
			document.location.href='#projects';
		};


		//DELETE PROJECT
		$("#delete").on('click', function()
		{
			var projectId = 'project:'+getUrlVars()["id"];
			var page = ("#" + $(this).attr('rel')).toLowerCase();
			
			confirm("Project will be Deleted.", "Delete Project", function()
			{
				$db.openDoc(projectId, 
				{
					success: function(document)
					{
						//console.log(document);
						$db.removeDoc(document,
						{
							success: function()
							{
							alert("Project was Deleted.");
							history.back();
							},
							error: function(status)
							{
								alert("Unable to delete project" + projectId);
							}
						});
					},
					error: function(status)
					{
						console.log(status);
						alert("Can't find project" + projectId);
					}
				});
			});
		});
		
		//EDIT PROJECT
		var editProject = function(projectId)
		{
			var projectUrl = '/showoff_cloudant_week4/_all_docs?include_docs=true&key="project:'+projectId+'"';
			$.ajax(
			{
				"url": projectUrl,
				"dataType": "json",
				"success": function(data) 
				{
					var rev = data.rows[0].doc._rev;
					$.each(data.rows, function(index,project)
					{
						//populate the form fields with current values
						$('#project-name').val(project.doc.name[1]);
						$('#tag').val(project.doc.tag[1]);
						$('#comment').val(project.doc.comment[1]);
						$('#project-id').val(project.doc._id);
						$('#project-rev').val(project.doc._rev);
					});
				},
				"error": function(result)
				{
					console.log(result);
				} 
			});
		}
		
		var op = getUrlVars()["op"];
		var projectId = getUrlVars()["projectId"];
		if(op === 'edit') {
			$('input[name=name');
			//Change submit button to edit button
			$('#submit').addClass('edit-button').text('Edit Project');
			editProject(projectId);
		}
		$('#submit').on('click', validateForm);

		
		var confirm = function(text1, text2, button, callback) 
		{
			$("#confirm .confirm-1").text(text1);
			$("#confirm .confirm-2").text(text2);
			$("#confirm .confirm-do").text(button).on("click.confirm", function() 
			{
				callback();
				$(this).off("click.confirm");
			});
			$.mobile.changePage("#confirm");
		}
	}
	}); //end additem pageinit		
			

}); //end home page init
	
	