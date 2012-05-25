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
		
function handleDocumentReady()
{
	//HOME PAGE
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
          $db.saveDoc(document, {
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

		function refreshProjects()
		{
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
									'<h2 class="name">' + name + '</h2>' +
									'</a>' +
									'<p class="tags">' + tags + '</p>' +
									'<p class="comments">' + comments + '</p>' +
									'</li>';
	                    $("#projects").append(listItem);
	                }
	                $("#projects").listview("refresh");
	                //$.fixedToolbars.show();
	            }
	        });
	      }

} //end handleDocumentReady

$(document).ready(handleDocumentReady);

	    

		
		// VALIDATE
		var validateForm = function (e) {
		var getProjectName = $("#name").val();
		var formErrors = $('#formErrors');
	
		// RESET ERRORS
		$(".error").hide();
		var hasError = false;
		$('#errors').empty();
		$('#name').css("border", "none");

		// GET ERRORS
		var messageArray = [];
		//Project Name validation
		if (getProjectName === "") {
			$('#name').after('<br/><span class="error">Enter Project Name.</span>');
			$('#name').css("border", "1px solid yellow") ;
			hasError = true;
		}

		// SET ERRORS
		if (hasError === true) 
		{
			$('#submit').before('<br/><span class="error">Enter info above.</span>');
			$('body,html').animate({scrollTop:0}, 800);
			e.preventDefault();
			return false;
			} else {
				saveProject();
			}
		}		
		
		//$('#submit').on('click', validateForm);		
	
	//CONTACT PAGE
	$('#contact').live('pageshow', function()
	{console.log("Contact Page Loaded");}); //end contact pageinit

	//INFO PAGE
	$('#info').live('pageshow', function()
	{console.log("Info Page Loaded");}); //end info pageinit
	
	