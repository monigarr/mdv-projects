//
//    Full Sail University
//    Advanced Scalability & Design Interfaces
//    Monica Peters
//    Week 1 Project 1
//    Due Thursday May 3rd 2012
//    main.js
	
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

	
		//Week 3 MIU
		var parseProjectForm = function(data)
		{
			// uses form data here;
			console.log(data);
		}
		
	// Wait until DOM is ready
	//window.addEventListener("DOMContentLoaded", function()
	window.on("DOMContentLoaded", function()
	{
		function noDollarSign(x)
		{
			//var theElement = document.getElementById(x);
			//http://jsperf.com/jquery-attr-vs-native-setattribute
			var theElement = $("x");
			return theElement;
		}
		
		// Create page header
		function makeHeader()
		{
			var $myNewHeader = $('<h1>Farmers Market</h1><small><center>Organic, Local, Farm Fresh.</center></small>');
			$myNewHeader.appendTo('#header');
		}
		
		// Create page footer
		function makeFooter()
		{
		
		}
		
		// Create select field element
		function makeProduceTypes() 
		{
			//formTag is an array of all form tags
			//var formTag = document.getElementsByTagName("form"),
			var formTag = $("form"),
				selectLi = $("type"),
				makeSelect = $("select");
				//makeSelect.setAttribute("class", "required");
				makeSelect.setAttribute("id", "type");
				makeSelect.setAttribute("name", "type");
				makeSelect.setAttribute("data-native-menu", "false");
			//populate with options
			for(var i=0, j=produceGroups.length; i<j; i++) 
			{
				//create option for each string in array
				var makeOption = $("option");
				var optText = produceGroups[i];
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
			var radios = document.forms[0].topics;
			for(var i=0; i<radios.length; i++)
			{
				if(radios[i].checked)
				{
					topicsValue = radios[i].value;
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
		
		function getXML()
		{
			// assume that the XML above is in a string named "xml"
			var data = $.parseXML(xml);
			// wrap the XML in a jQuery object to make it easier to work with
			var items = $( data );
			items.find("item").each(function(){
				var item = $(this);
				console.log("Name: ", item.find("name"));
				});
		}
		
		function saveProduce(key)
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
					item.type 		= ["Type:",noDollarSign("type").value];
					item.graphic   = ["Image:",noDollarSign("graphic").value];
					item.name 		= ["Name:",noDollarSign("name").value];
					item.date  	= ["Ripe Date:",noDollarSign("date").value];
					item.rating 	= ["Rating:",noDollarSign("rating").value];
					//radio button
					item.topics 	= ["Benefit:",topicValue];
					item.tags		= ["Tags:",noDollarSign("tags").value];
					item.comments	= ["Notes:",noDollarSign("comments").value];
				//Save Data to Local Storage: Use Stringify to convert our object to a string
				//json.org
				localStorage.setItem(id, JSON.stringify(item));
				alert("Produce Saved");
		}
		
		//Auto Populate local storage
		//EDIT NEEDED HERE
		//TO PULL DATA FROM data.json, data.xml, and data.csv
		function autoFillData()
		{
			//actual JSON Object data was coming from json.js file.
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
				alert("No Produce in local Storage. Test Data was Added.");
				//populate with test data
				autoFillData();
			}
			
			//http://jqfundamentals.com/book/index.html#example-3.19
			// example 3.32
			var Items = [], $myList = $('#Items');
							
			for(var i=0, len=localStorage.length; i<len; i++)
			{
				Items.push('<li>item ' + i + '</li>');
				$Items.append(Items.join(''));
			}
		}
		
		//Get icon for the relevant project type displayed
		function getImage(produceType, makeSubList)
		{
			var imageLi = document.createElement("div");
			imageLi.setAttribute("align", "left");		
			makeSubList.appendChild(imageLi);
			var newImg = document.createElement("img");
			var setSrc = newImg.setAttribute("src", "images/" + produceType + ".jpg");
			var alignImg = newImg.setAttribute("class", "projectIconAlign");
			imageLi.appendChild(newImg);
			
			/*$('<img src="images/+produceType+.jpg" class="projectIconAlign">')
				.appendto("#six");
				*/
			
		}
		
		
		//Get graphic url for project.
		function getProjectGraphic(projectName, makeSubList)
		{	
			$('<div>').appendTo("#projectGraphicLi");
			$('<img src="projectName" class="projectScreenshotAlign" width="75px" height="75px"')
				.appendTo("#newImg");
		}
		
		//Get youtube video review url for project.
		
		//Make Item Links
		//Create Edit and Delete links for each stored item when displayed
		function makeItemLinks(key, linksLi)
		{
			//create line break to create space 
			//around elements
			//var breakTag = document.createElement("br");
			var breakTag = $('br');
			
			//add edit single item link
			/*var editLink = document.createElement("a");*/
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
			noDollarSign("type").value = item.type[1];
			noDollarSign("ripedate").value = item.ripedate[1];
			noDollarSign("name").value = item.name[1];
			noDollarSign("rating").value = item.rating[1];
			// handle radio buttons
			var radios = document.forms[0].topics;
			for(var i=0; i<radios.length; i++)
			{
				if(radios(i).value === "organic" && item.topics(1) === "organic")
				{
					radios(i).setAttribute("checked", "checked");
				}
				else if(radios(i).value === "nopesticide" && item.topics(1) === "nopesticide")
				{
					radios(i).setAttribute("checked", "checked");
				}
				else if(radios(i).value === "all" && item.topics(1) === "all")
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
			save.removeEventListener("click", saveProduce);
			
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
				alert("Produce was Deleted");
				window.location.reload();
			}
			else
			{
				alert("Produce was Not Deleted");
			}
		}
		
		function clearLocal()
		{
			if(localStorage.length === 0)
			{
				alert("No Produce in local storage to Delete.");
			}
			else
			{
				localStorage.clear();
				alert("All Produce Deleted from local storage.");
				window.location.reload();
				return false;
				//populate with test data
				//autoFillData();
			}
		}
		
		
		function validate(e)
		{
			//Define elements we want to check
			var getType = noDollarSign("type");
			var getName = noDollarSign("name");
			var getRipeDate = noDollarSign("ripedate");
			
			//Reset error messages
			errMsg.innerHTML = "";
				$('#type :input').css('border','1px solid yellow');
				$('#name :input').css('border','1px solid yellow');
				$('#ripedate :input').css('border','1px solid yellow');
				
				/*
				getType.style.border = "1px solid yellow";
				getName.style.border = "1px solid yellow";
				getRipeDate.style.border = "1px solid yellow";
				*/
			
			//Get error messages
			var messageAry = [];
			//Check Type Validation
			
			if(getType.value === "-- Choose Produce Type--")
			{
				var TypeError = "Choose Produce Type";
				getType.style.border = "1px solid yellow";
				messageAry.push(TypeError);
			}
			
			// Project Name Validation
			if(getName.value === "")
			{
				var NameError = "Enter Produce Name";
				getName.style.border = "1px solid yellow";
				messageAry.push(NameError);
			}
			
			// Project Date Validation
			if(getRipeDate.value === "")
			{
				var RipeDateError = "Enter Produce Ripe Date";
				getRipeDate.style.border = "1px solid yellow";
				messageAry.push(RipeDateError);
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
				saveProduce(this.key);
			}
		}
		
		
		// Variable defaults
		// store values of dropdown in array
		var produceGroups = ["-- Choose Produce Type--", "fruit", "vegetable", "herb", "other"],
			topicValue,
			errMsg = noDollarSign("errors");
			
		// Show Header & Logo
		makeHeader();
			
		// Show Produce Types
		makeProduceTypes();
		
			// Show Content 
			
			// Set Link & Submit Click Events
			var displayLink = noDollarSign("displayLink");
			displayLink.addEventListener("click", getData);
			
			var clearLink = noDollarSign("clear");
			clearLink.addEventListener("click", clearLocal);
			
			var displayFruitLink = noDollarSign("displayFruitLink");
			displayFruitLink.addEventListener("click", getData);
			
			var displayVegetableLink = noDollarSign("displayVegetableLink");
			displayVegetableLink.addEventListener("click", getData);
			
			var displayHerbLink = noDollarSign("displayHerbLink");
			displayHerbLink.addEventListener("click", getData);
		
			var displayOtherLink = noDollarSign("displayOtherLink");
			displayOtherLink.addEventListener("click", getData);
			
			var save = noDollarSign("submit");
			
			save.addEventListener("click", saveProduce);
			//save.addEventListener("click", validate);
			
		// Show Footer
		makeFooter();
	});
});