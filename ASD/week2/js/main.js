//
//    Full Sail University
//    ASD Advanced Scalable Data Infrastrucutres
//    Monica Peters
//    Week 2 Project 2
//    Due Thursday May 10th 2012
//    main.js
	
/*	Correct week 1 issues with week 2 project:
 Try http://wddbs.com/jshero/ to find errors. 
 Unclosed quote on line 318 is breaking a lot of the code.
	* Change all uses of $ to the jQuery equivalent.
    * Coding/Manipulation: 
		Line 59 creation would be $("); 
		setAttribute would become .attr, 
		.html will be .html, 
		.appendChild would be .append, 
		.css would be .css.
		 
    *** Check out .val to set your values. 
    	http://api.jquery.com/val/
    
    * Change addEventListener to .on
    
    * Coding/Functionality: Poor (0/10pts) 
    		Points can be refunded when CRUD is functional.
 
*/
	
	var parseProjectForm = function(data)
	{
		// uses form data here;
		console.log(data);
	}
	
	$(document).ready(function()
	{
		var projectForm = $("#projectForm");
		projectForm.validate(
		{
		//options to change behavior of validator
			invalidHandler: function(form, validator)
			{
				//error messages
				
			},
			submitHandler: function()
			{
				//when valid form is submitted
				//store all data
				//target form
				var data = projectForm.serializeArray();
				//call function & pass data in
				parseProjectForm(data);
			}
		})
	});
		
// Wait until DOM is ready
window.addEventListener("DOMContentLoaded", function()
{
	
	// Create select field element
	var makeMediaTypes = function() 
	{
		//formTag is an array of all form tags
		var formTag = document.getElementsByTagName("form"),
			selectLi = $("mtype"),
			makeSelect = document.createElement("select");
			makeSelect.attr("class", "required");
			makeSelect.attr("id", "mtype");
			makeSelect.attr("name", "mtype");
			makeSelect.attr("data-native-menu", "false");
		//populate with options
		for(var i=0, j=mediaGroups.length; i<j; i++) 
		{
			//create option for each string in array
			var makeOption = document.createElement("option");
			var optText = mediaGroups[i];
			makeOption.attr("value", optText);
			//put text somewhere
			makeOption.html = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//Find value of Selected Radio Button
	var getSelectedRadio = function()
	{
		//create radio array
		var radios = document.forms[0].mtopics;
		for(var i=0; i<radios.length; i++)
		{
			if(radios[i].checked)
			{
				mtopicsValue = radios[i].value;
			}
		}
	}
	
	//Turn nav links off / on
	var toggleControls = function(n)
	{
		/*
		switch(n)
		{
			case "on":
				$("projectForm").css.display = "block";
				$("clear").css.display = "inline";
				$("displayLink").css.display = "inline";
				$("addNew").css.display = "inline";
				$("displayIOSLink").css.display = "inline";
				$("displayAndroidLink").css.display = "inline";
				$("displayHtml5Link").css.display = "inline";
				$("displayWordpressLink").css.display = "inline";
				$("displayGraphicLink").css.display = "inline";
				$("displayAuthorLink").css.display = "inline";
				break;
			case "off":
				$("projectForm").css.display = "block";
				$("clear").css.display = "inline";
				$("displayLink").css.display = "inline";
				//$("displayLink").listview("refresh");
				$("addNew").css.display = "inline";
				$("items").css.display = "inline";
				$("displayIOSLink").css.display = "inline";
				$("displayAndroidLink").css.display = "inline";
				$("displayHtml5Link").css.display = "inline";
				$("displayWordpressLink").css.display = "inline";
				$("displayGraphicLink").css.display = "inline";
				$("displayAuthorLink").css.display = "inline";
				break;
			default:
				return true;
		}
		*/
	}
	
	var saveMedia = function(key)
	{
		//if no key, this is brand new item 
		//so we need new key
		if(!key)
		{
			//can only store strings. arrays will be converted to strings
			//localStorage.setItem("test", "hello");
			//alert(localStorage.key(0));
			var id = Math.floor(Math.random()*10000001);
		}
		
		//Remove Weird Data that creates keys for file directories
		else if(key === "A-Z" || "a-z")
		{
			//delete weird data and move on
			localStorage.removeItem(this.key);
		}
		else
		{
			//set the id to existing key we're editing
			//so it will save over the data
			//key is same key that's passed from the editSubmit event handler
			//to the validate function and then passed here into storeData() function
			id = key;
		}
			// run function to find Selected Radio Button
			getSelectedRadio();
			
			//Gather up all our form field values and store in object.
			//Object properties contain array with form label and input value
			var item 			= {};
				item.mtype 		= ["Project Type:",$("mtype").val];
				item.mgraphic   = ["Project Screenshot:",$("mgraphic").val];
				item.mname 		= ["Project Name:",$("mname").val];
				item.mdate  	= ["Project Date:",$("mdate").val];
				item.mrating 	= ["Project Rating:",$("mrating").val];
				//radio button
				item.mtopics 	= ["Project Incentive:",mtopicValue];
				item.mtags		= ["Project Tags:",$("mtags").val];
				item.mcomments	= ["Project Notes:",$("mcomments").val];
			//Save Data to Local Storage: Use Stringify to convert our object to a string
			//json.org
			localStorage.setItem(id, JSON.stringify(item));
			alert("Project Saved");
	}
	
	//Auto Populate local storage
	var autoFillData = function()
	{
		//actual JSON Object data is coming from json.js file.
		//json.js file is loaded from additem.html
		//Store JSON Object into local storage
		for(var n in json)
		{
			var id = Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
		getData();
	}
	
	var getData = function()
	{
		//Write Data from Local Storage to the Browser
		toggleControls("on");
		
		if(localStorage.length === 0)
		{
			alert("No Projects in local Storage. Test Data was Added.");
			//populate with test data
			autoFillData();
		}

		//Write Data from Local Storage to the Browswer.
		var makeDiv = $("#items");
		makeDiv.attr("id","items");
		makeDiv.attr("data-role", "content");
		makeDiv.attr("data-theme", "d");

		var makeList = document.createElement("#dataList");
		makeList.attr(
		{
			dataRole: "listview",
			dataInset: "true",
			dataFilter: "true"
		});
			
		for(var i=0, len=localStorage.length; i<len; i++)
		{
			var makeli = $("<li></li>");
			var linksLi = $("<li><li>");
			makeList.append(makeLi);
			
			var keyVal = localStorage.key(i);
			var value = localStorage.getItem(keyVal);
			//convert string back to object so it won't be one long string
			var obj = JSON.parse(value);
			var makeSubList = $("<ul></ul>");
			makeLi.append(makeSubList);
			
			//Add Graphic for each Project Name
			getProjectGraphic(obj.mgraphic[1], makeSubList);
				
			for(var n in obj)
			{
				//0 is label, 1 is the value
				//var optSubText = obj[n][0] + " " + obj[n][1];
				var optSubText = obj[n][1];
				makeSubli.append(optSubText);
				makeSubList.append(makeSubli);
				makeSubli.append(linksLi);
			}
			//add edit and delete button from function
			//for each item in local storage.
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	
	//Get icon for the relevant project type displayed
	var getImage = function(mediaType, makeSubList)
	{
		var imageLi = $("<span></span>");
		imageLi.attr("align", "left");		
		makeSubList.append(imageLi);
		var newImg = $("<img>");
		var setSrc = newImg.attr("src", "images/" + mediaType + ".jpg");
		var alignImg = newImg.attr("class", "projectIconAlign");
		imageLi.appendChild(newImg);
	}	
	
	//Get graphic url for project.
	var getProjectGraphic = function(projectName, makeSubList)
	{
		var projectGraphicLi = document.createElement("div");
		makeSubList.appendChild(projectGraphicLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.attr("src", projectName);
		var alignImg = newImg.attr("class", "projectScreenshotAlign");
		var setWidth = newImg.attr("width", "75px");
		var setHeight = newImg.attr("height", "75px");
		projectGraphicLi.appendChild(newImg);
	}
	
	//Get youtube video review url for project.
	
	//Make Item Links
	//Create Edit and Delete links for each stored item when displayed
	var makeItemLinks = function(key, linksLi)
	{
		//create line break to create space 
		//around elements
		var breakTag = document.createElement("br");
		
		//add edit single item link
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Project";
		editLink.addEventListener("click", editItem);
		editLink.html = editText;	
		linksLi.appendChild(editLink);
		
		//add line break after edit project link
		//before delete project link
		linksLi.appendChild(breakTag);
		
		//add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Project";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.html = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	//Edit single item
	var editItem = function()
	{
		//Grab data from Item from local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//show form to edit item
		//toggleControls("off");
		
		//populate form fields with current local storage values
		//1 is value, 0 is label
		$("mtype").val = item.mtype[1];
		$("mdate").val = item.mdate[1];
		$("mname").val = item.mname[1];
		$("mrating").val = item.mrating[1];
		// handle radio buttons
		var radios = document.forms[0].mtopics;
		for(var i=0; i<radios.length; i++)
		{
			if(radios(i).value === "school" && item.mtopics(1) === "school")
			{
				radios(i).attr("checked", "checked");
			}
			else if(radios(i).value === "work" && item.mtopics(1) === "work")
			{
				radios(i).attr("checked", "checked");
			}
			else if(radios(i).value === "inspiration" && item.mtopics(1) === "inspiration")
			{
				radios(i).attr("checked", "checked");
			}
		}
		/*
		// handle yes / no check box
		if(obj.favorite(1) == "Yes")
		{
			$("fav").attrs("checked", "checked");
		}
		*/
		$("mtags").val = item.mtags[1];
		$("mgraphic").val = item.mgraphic[1];
		$("mcomments").val = item.mcomments[1];
		
		// Remove the initial listener from the input 'save project' button
		save.removeEventListener("click", saveMedia);
		
		// Change Submit button value to say Edit Button
		$("submit").val = "Edit Project";
		var editSubmit = $("submit");
		
		// Save the key value established in this Function as a property of the editSubmit event
		// so we can use the value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	var deleteItem = function()
	{
		var ask = confirm("You really want to Delete this Project?");
		if(ask)
		{
			localStorage.removeItem(this.key);
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
			//populate with test data
			//autoFillData();
		}
	}
	
	/*maybe change to this instead
	var clearLocal = function() 
	{
		localStorage.clear();
		location.reload(true);
	} 
	*/
	
	var validate = function(e)
	{
		//Define elements we want to check
		var getMtype = $("mtype");
		var getMname = $("mname");
		var getMdate = $("mdate");
		
		//Reset error messages
		errMsg.html = "";
			getMtype.css.border = "1px solid yellow";
			getMname.css.border = "1px solid yellow";
			getMdate.css.border = "1px solid yellow";
		
		//Get error messages
		var messageAry = [];
		//Check Type Validation
		
		if(getMtype.value === "-- Choose Project Type--")
		{
			var MtypeError = "Choose Project Type";
			getMtype.css.border = "1px solid yellow";
			messageAry.push(MtypeError);
		}
		
		// Project Name Validation
		if(getMname.value === "")
		{
			var MnameError = "Enter Project Name";
			getMname.css.border = "1px solid yellow";
			messageAry.push(MnameError);
		}
		
		// Project Date Validation
		if(getMdate.value === "")
		{
			var MdateError = "Enter Project Date";
			getMdate.css.border = "1px solid yellow";
			messageAry.push(MdateError);
		}
		
		//if errors, show them on screen
		if(messageAry.length >= 1)
		{
			for(var i=0, j=messageAry.length; i<j; i++)
			{
				var txt = document.createElement("li");
				txt.html = messageAry(i);
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			//If everything is good, save the data
			//Send key value that came from editData function
			//Remember key value was passed thru editSubmit even listener 
			//as a property.
			saveMedia(this.key);
		}
	}
	
	// asd week 2 new functions start
	// Load external data files
	var loadXML = function()
	{
		$.get("data.xml", function(d)
		{
			$("body").append("<h2>xml data loaded</h2>");
			$("body").append("<dl />");
			$(d).find("item").each(function()
			{
				var $item = $(this);
				var type = $item.attr("type");
				var name = $item.find("name").text();
				var html = "<dt>" + type + name + date + " /></dt>";
				$("dl").append($(html));
			});
		});	
	};

    var loadJSON = function()
    {
		$('#jsonBtn').bind('click', function(){
			console.log("look here.");
	
			$.ajax({
				url: 'xhr/data.json',
				type: 'GET',
				dataType: 'json',
				success: function(data){
					console.log(data);
					 for (var i=0, j=data.jsonData.length; i<j; i++){
						 var item = data.jsonData[i];
						 console.log(item);
						 $('#archive1').append($(' ' +
							 '<img src="images/cta_logo.png" alt="photo" class="picDefault" />' +
								 '<ul id="jsonList">' +
								 '<li>Type:' + item.type + '</li>' +
								 '<li>Name:' + item.name + '</li>' +
								 '<li>Date:' + item.date + '</li>' +
								 '<li>Rating:' + item.slider + '</li>' +
								 '<li>Incentive:' + item.incentive + '</li>' +
								 '<li>Tags:' + item.tags + '</li>' +
								 '<li>Comments:' + item.comments + '</li></ul><br/><hr/><br/>'));
					 }
				 }
			 });
			$('jsonList').listview('refresh');
			console.log($('#jsonList'));
		 });
     };
	
	var loadCSV = function()
	{	
		var csvData = 1;
		$.ajax(
		{
			url: 'xhr/data.csv',
			type: 'GET',
			data: null,
			success: function(data)
			{
				$('.items').append('<div class="csv"></div>');
				$('.items').append('<h2>CSV Data</h2>');
				var lines = data.split('\n');
				for (var lineNum = 0; lineNum < lines.length; lineNum++) 
				{		
					var itCsvData = "csv" + csvData;	
					var row = lines[lineNum];
					var columns = row.split(",");
					var labels = [
						"Category: ",
						"Workout: ",
						"Reps: ",
						"Favorite: ",
						": "
					]
					$('.items').append('<div class=' + itCsvData + ' id=\"inputDiv\"></div>');
					for (var entry in columns )
					{
						$('.' + itCsvData).append('<label id="label">' + labels[entry] +'</label> <p>' + columns[entry] + '</p>');
					}
					csvData++;    
				} 
			}	
		})	
	};
	
	// asd week 2 new functions stop	
	// Variable defaults
	// store values of dropdown in array
	var mediaGroups = ["-- Choose Project Type--", "ios", "android", "html5", "wordpress", "graphic", "author"],
		mtopicValue,
		errMsg = $("errors");
		
	makeMediaTypes();
	
	// Set Link & Submit Click Events
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	
	var displayIOSLink = $("displayIOSLink");
	displayIOSLink.addEventListener("click", getData);
	
	var displayAndroidLink = $("displayAndroidLink");
	displayAndroidLink.addEventListener("click", getData);
	
	var displayHtml5Link = $("displayHtml5Link");
	displayHtml5Link.addEventListener("click", getData);

	var displayWordpressLink = $("displayWordpressLink");
	displayWordpressLink.addEventListener("click", getData);

	var displayGraphicLink = $("displayGraphicLink");
	displayGraphicLink.addEventListener("click", getData);

	var displayAuthorLink = $("displayAuthorLink");
	displayAuthorLink.addEventListener("click", getData);
	
	var save = $("submit");
	
	save.addEventListener("click", saveMedia);
	//save.addEventListener("click", validate);
});