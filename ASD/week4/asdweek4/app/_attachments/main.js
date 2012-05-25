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
	
//	tutorials: http://custardbelly.com/blog/2010/12/13/jquery-mobile-couchdb-part-2-document-view/
	
$db = $.couch.db("showoff_cloudant_week4");
var projectId;
		
function handleDocumentReady()
{
	$('#home').bind("pagebeforeshow", refreshProjects);
	refreshProjects();
	
	//LOGO TOP
	$('#header').empty();
	$(function()
	{$('#header').append('<center>ASD Week 4 Couch</center>');});
	
	//FOOTER
	$('#footer').empty();
	$(function()
	{$('#footer').append('');});

	$("#addSubmitButton").live("click", function(event) 
	{
          event.preventDefault();
          var document = {};
          document.name = $("input#name").val();
          document.tags = $("input#tags").val();
          document.comments = $("textarea#comments").val();
          document.creation_date = (new Date()).getTime();
          $.projects.saveDocument(document, {
              success: function() {
                  $.mobile.changePage("#home", "slidedown", true, true);
                  alert("Project Saved");
              },
              error: function(status, error, reason) {
                  alert("Did Not Save New Project.\n" +status+","+reason+","+error);
              }
          });
          return false;
      });
 
      $("#additem").bind("pagehide", function() 
      {
          $("input#name").val("");
          $("input#tags").val("");
          $("textarea#comments").val("");
      });	
		

		//$("#projectview").bind("pagebeforeshow", openProject);
	
		
		function refreshProjects()
		{
			//empty list of projects
			//to start with clean slate
			$("#projects").empty();
			
			//app is name of this app see _id file
			//projects is name of db objects
			$db.view("app/projects",
			{
				success: function(data)
				{
					var i;
					var project;
					var name;
					var tags;
					var comments;
					var listItem;
					var header;
					var externalPage;
					var projectLink;
					data.rows.reverse(); //list projects based on creation_date
					for(i in data.rows)
					{
						project = data.rows[i].value;
						name = project.name;
						tags = project.tags;
						comments = project.comments;
						//_show/project-edit/ edit form
						//_show/project/  only show details
						externalPage = "_show/project/" + project._id;
						listItem = '<li class="project">' +
									'<a href="' + externalPage + '">' + 
									'<h2 class="project">' + name + '</h2>' +
									'</a>' +
									'<p class="tags">' + tags + '</p>' +
									'<p class="comments">' + comments + '</p>' +
									//'<p class="creation_date">' + creation_date + '</p>' +
									'</li>';
	                    $("#projects").append(listItem);
	                }
	                $("#projects").listview("refresh");
	                //$.fixedToolbars.show();
	            }
	        });
	      }
	      
	      /*
	      function openProject()
	      {
	      	$("#projectcontent").children().remove();
	      		$db.openDoc(projectId,
	      		{
	      			success: function(data)
	      			{
	      				var name = data.name;
	      				var tags = data.tags;
	      				var comments = data.comments;
	      				var html = '<h2 class="name">' + name + '</h2>' +
	                                    '<p class="tags">' + tags + '</p>' +
	                                    '<p class="comments">' + comments + '</p>';
	                      $("#projectcontent").append(html);
	                      $("#projectheader .projectname").text(name);
	      			}
	      		});
	      }
	      */
	
	// ADD ITEM PAGE
	$('#additem').live('pageinit', function()
	{		
		console.log("Add Item Page Loaded");

		
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
			$db = $.couch.db("showoff_cloudant_week4");
			$.couch.db('showoff_cloudant_week4').saveDoc(item,
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
	
	//PROJECT VIEW PAGE
	$('#projectview').live("pageinit", function()
	{console.log("Project View Page Loaded.");}); //end project view pageinit
	
	//CONTACT PAGE
	$('#contact').live('pageshow', function()
	{console.log("Contact Page Loaded");}); //end contact pageinit

	//INFO PAGE
	$('#info').live('pageshow', function()
	{console.log("Info Page Loaded");}); //end info pageinit

} //end handleDocumentReady

$(document).ready(handleDocumentReady);
	
	