//
//    Full Sail University
//    Mobile Interfaces & Usability
//    Monica Peters
//    Mobile Web App Part 4
//    A
//    Week 4 Project 4
//    Due Thursday March 22nd 2012
//    main.js
	
	//Week 3 MIU
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
	// getElementById Function
	function noDollarSign(x)
	{
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	// Create select field element
	function makeMediaTypes() 
	{
		//formTag is an array of all form tags
		var formTag = document.getElementsByTagName("form"),
			selectLi = noDollarSign("mtype"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("class", "required");
			makeSelect.setAttribute("id", "mtype");
			makeSelect.setAttribute("name", "mtype");
			makeSelect.setAttribute("data-native-menu", "false");
		//populate with options
		for(var i=0, j=mediaGroups.length; i<j; i++) 
		{
			//create option for each string in array
			var makeOption = document.createElement("option");
			var optText = mediaGroups[i];
			makeOption.setAttribute("value", optText);
			//put text somewhere
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//Find value of Selected Radio Button
	function getSelectedRadio()
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
	function toggleControls(n)
	{
		/*
		switch(n)
		{
			case "on":
				noDollarSign("projectForm").style.display = "block";
				noDollarSign("clear").style.display = "inline";
				noDollarSign("displayLink").style.display = "inline";
				noDollarSign("addNew").style.display = "inline";
				noDollarSign("displayIOSLink").style.display = "inline";
				noDollarSign("displayAndroidLink").style.display = "inline";
				noDollarSign("displayHtml5Link").style.display = "inline";
				noDollarSign("displayWordpressLink").style.display = "inline";
				noDollarSign("displayGraphicLink").style.display = "inline";
				noDollarSign("displayAuthorLink").style.display = "inline";
				break;
			case "off":
				noDollarSign("projectForm").style.display = "block";
				noDollarSign("clear").style.display = "inline";
				noDollarSign("displayLink").style.display = "inline";
				//noDollarSign("displayLink").listview("refresh");
				noDollarSign("addNew").style.display = "inline";
				noDollarSign("items").style.display = "inline";
				noDollarSign("displayIOSLink").style.display = "inline";
				noDollarSign("displayAndroidLink").style.display = "inline";
				noDollarSign("displayHtml5Link").style.display = "inline";
				noDollarSign("displayWordpressLink").style.display = "inline";
				noDollarSign("displayGraphicLink").style.display = "inline";
				noDollarSign("displayAuthorLink").style.display = "inline";
				break;
			default:
				return true;
		}
		*/
	}
	
	function saveMedia(key)
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
				item.mtype 		= ["Project Type:",noDollarSign("mtype").value];
				item.mgraphic   = ["Project Screenshot:",noDollarSign("mgraphic").value];
				item.mname 		= ["Project Name:",noDollarSign("mname").value];
				item.mdate  	= ["Project Date:",noDollarSign("mdate").value];
				item.mrating 	= ["Project Rating:",noDollarSign("mrating").value];
				//radio button
				item.mtopics 	= ["Project Incentive:",mtopicValue];
				item.mtags		= ["Project Tags:",noDollarSign("mtags").value];
				item.mcomments	= ["Project Notes:",noDollarSign("mcomments").value];
			//Save Data to Local Storage: Use Stringify to convert our object to a string
			//json.org
			localStorage.setItem(id, JSON.stringify(item));
			alert("Project Saved");
	}
	
	//Auto Populate local storage
	function autoFillData()
	{
		//actual JSON Object data is coming from json.js file.
		//json.js file is loaded from additem.html
		//Store JSON Object into local storage
		for(var n in json)
		{
			var id = Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	function getData()
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
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id","items");
		makeDiv.setAttribute("data-role", "content");
		makeDiv.setAttribute("data-theme", "d");
		
		var makeDivPrimary = document.createElement("div");
		makeDivPrimary.setAttribute("class", "content-primary");

		var makeList = document.createElement("ul");
		makeList.setAttribute("id", "one");
		makeList.setAttribute("data-role", "listview");
		makeList.setAttribute("data-filter", "true");
		makeList.setAttribute("data-inset", "true");
		//$('#items').listview('refresh');	
		//makeList.listview("refresh");
		
		makeDiv.appendChild(makeDivPrimary);
		makeDivPrimary.appendChild(makeList);
		document.body.appendChild(makeDiv);
		noDollarSign("items").style.display = "black";
			
		for(var i=0, len=localStorage.length; i<len; i++)
		{
			var makeli = document.createElement("li");
			makeli.setAttribute("id", "two");
			
			var linksLi = document.createElement("div");
			linksLi.setAttribute("id", "three");
			
			makeList.appendChild(makeli);
			
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//convert string back to object so it won't be one long string
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("a");
			makeSubList.setAttribute("href", "#");
			makeSubList.setAttribute("id", "four");

			makeli.appendChild(makeSubList);
			
			//Add Icon for each Project Type
			//getImage(obj.mtype[1], makeSubList);
			//Add Graphic for each Project Name
			getProjectGraphic(obj.mgraphic[1], makeSubList);
			
			//build p to hold all values for each project
			var makeSubli = document.createElement("p");
			makeSubli.setAttribute("id", "five");
			makeSubList.appendChild(makeSubli);
				
			for(var n in obj)
			{
				//0 is label, 1 is the value
				//var optSubText = obj[n][0] + " " + obj[n][1];
				var optSubText = obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubli.appendChild(linksLi);
			}
			//add edit and delete button from function
			//for each item in local storage.
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	
	//Get icon for the relevant project type displayed
	function getImage(mediaType, makeSubList)
	{
		var imageLi = document.createElement("div");
		imageLi.setAttribute("align", "left");		
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", "images/" + mediaType + ".jpg");
		var alignImg = newImg.setAttribute("class", "projectIconAlign");
		imageLi.appendChild(newImg);
	}
	
	
	//Get graphic url for project.
	function getProjectGraphic(projectName, makeSubList)
	{
		var projectGraphicLi = document.createElement("div");
		makeSubList.appendChild(projectGraphicLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", projectName);
		var alignImg = newImg.setAttribute("class", "projectScreenshotAlign");
		var setWidth = newImg.setAttribute("width", "75px");
		var setHeight = newImg.setAttribute("height", "75px");
		projectGraphicLi.appendChild(newImg);
	}
	
	//Get youtube video review url for project.
	
	//Make Item Links
	//Create Edit and Delete links for each stored item when displayed
	function makeItemLinks(key, linksLi)
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
		editLink.innerHTML = editText;	
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
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	//Edit single item
	function editItem()
	{
		//Grab data from Item from local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//show form to edit item
		//toggleControls("off");
		
		//populate form fields with current local storage values
		//1 is value, 0 is label
		noDollarSign("mtype").value = item.mtype[1];
		noDollarSign("mdate").value = item.mdate[1];
		noDollarSign("mname").value = item.mname[1];
		noDollarSign("mrating").value = item.mrating[1];
		// handle radio buttons
		var radios = document.forms[0].mtopics;
		for(var i=0; i<radios.length; i++)
		{
			if(radios(i).value === "school" && item.mtopics(1) === "school")
			{
				radios(i).setAttribute("checked", "checked");
			}
			else if(radios(i).value === "work" && item.mtopics(1) === "work")
			{
				radios(i).setAttribute("checked", "checked");
			}
			else if(radios(i).value === "inspiration" && item.mtopics(1) === "inspiration")
			{
				radios(i).setAttribute("checked", "checked");
			}
		}
		/*
		// handle yes / no check box
		if(obj.favorite(1) == "Yes")
		{
			noDollarSign("fav").setAttributes("checked", "checked");
		}
		*/
		noDollarSign("mtags").value = item.mtags[1];
		noDollarSign("mgraphic").value = item.mgraphic[1];
		noDollarSign("mcomments").value = item.mcomments[1];
		
		// Remove the initial listener from the input 'save project' button
		save.removeEventListener("click", saveMedia);
		
		// Change Submit button value to say Edit Button
		noDollarSign("submit").value = "Edit Project";
		var editSubmit = noDollarSign("submit");
		
		// Save the key value established in this Function as a property of the editSubmit event
		// so we can use the value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem()
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
	
	function clearLocal()
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
	
	
	function validate(e)
	{
		//Define elements we want to check
		var getMtype = noDollarSign("mtype");
		var getMname = noDollarSign("mname");
		var getMdate = noDollarSign("mdate");
		
		//Reset error messages
		errMsg.innerHTML = "";
			getMtype.style.border = "1px solid yellow";
			getMname.style.border = "1px solid yellow";
			getMdate.style.border = "1px solid yellow";
		
		//Get error messages
		var messageAry = [];
		//Check Type Validation
		
		if(getMtype.value === "-- Choose Project Type--")
		{
			var MtypeError = "Choose Project Type";
			getMtype.style.border = "1px solid yellow";
			messageAry.push(MtypeError);
		}
		
		// Project Name Validation
		if(getMname.value === "")
		{
			var MnameError = "Enter Project Name";
			getMname.style.border = "1px solid yellow";
			messageAry.push(MnameError);
		}
		
		// Project Date Validation
		if(getMdate.value === "")
		{
			var MdateError = "Enter Project Date";
			getMdate.style.border = "1px solid yellow";
			messageAry.push(MdateError);
		}
		
		//if errors, show them on screen
		if(messageAry.length >= 1)
		{
			for(var i=0, j=messageAry.length; i<j; i++)
			{
				var txt = document.createElement("li");
				txt.innerHTML = messageAry(i);
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
	
	
	// Variable defaults
	// store values of dropdown in array
	var mediaGroups = ["-- Choose Project Type--", "ios", "android", "html5", "wordpress", "graphic", "author"],
		mtopicValue,
		errMsg = noDollarSign("errors");
		
	makeMediaTypes();
	
	// Set Link & Submit Click Events
	var displayLink = noDollarSign("displayLink");
	displayLink.addEventListener("click", getData);
	
	var clearLink = noDollarSign("clear");
	clearLink.addEventListener("click", clearLocal);
	
	var displayIOSLink = noDollarSign("displayIOSLink");
	displayIOSLink.addEventListener("click", getData);
	
	var displayAndroidLink = noDollarSign("displayAndroidLink");
	displayAndroidLink.addEventListener("click", getData);
	
	var displayHtml5Link = noDollarSign("displayHtml5Link");
	displayHtml5Link.addEventListener("click", getData);

	var displayWordpressLink = noDollarSign("displayWordpressLink");
	displayWordpressLink.addEventListener("click", getData);

	var displayGraphicLink = noDollarSign("displayGraphicLink");
	displayGraphicLink.addEventListener("click", getData);

	var displayAuthorLink = noDollarSign("displayAuthorLink");
	displayAuthorLink.addEventListener("click", getData);
	
	var save = noDollarSign("submit");
	
	save.addEventListener("click", saveMedia);
	//save.addEventListener("click", validate);
});