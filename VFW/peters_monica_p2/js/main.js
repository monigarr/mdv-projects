//    Full Sail University
//    Visual Frameworks
//    Monica Peters
//    Web App Part 2
//    Week 2 Project 2
//    Due Thursday Feb. 8th 2012
//

// Wait until DOM is ready
window.addEventListener("DOMContentLoaded", function()
{

	// getElementById Function
	function $(x)
	{
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	// Create select field element
	function makeMediaTypes() 
	{
		//formTag is an array of all form tags
		var formTag = document.getElementsByTagName("form"),
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "mtype");
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
	
	function toggleControls(n)
	{
		switch(n)
		{
			case "on":
				$("mediaForm").style.display = "none";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "none";
				$("addNew").style.display = "inline";
				break;
			case "off":
				$("mediaform").style.display = "block";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function saveMedia()
	{
		//can only store strings. arrays will be converted to strings
		//localStorage.setItem("test", "hello");
		//alert(localStorage.key(0));
		var id 				= Math.floor(Math.random()*10000001);
		
		// run function to find Selected Radio Button
		getSelectedRadio();
		
		//Gather up all our form field values and store in object.
		//Object properties contain array with form label and input value
		var item 			= {};
			item.mtype 		= ["Media Type:",$("mtype").value];
			item.mname 		= ["Media Name:", $("mname").value];
			item.mdate  	= ["Date:", $("mdate").value];
			item.mrating 	= ["Rating:", $("mrating").value];
			//radio button
			item.mtopics 	= ["Topics:", mtopicsValue];
			item.mtags		= ["Tags:", $("mtags").value];
			item.mcomments	= ["Comments:", $("mcomments").value];
		//Save Data to Local Storage: Use Stringify to convert our object to a string
		//json.org
		localStorage.setItem(id, JSON.stringify(item));
		alert("Media Saved");
	}
	
	function getData()
	{
		toggleControls("on");
		if(localStorage.length === 0)
		{
			alert("No Data in local Storage");
		}
		//Write Data from Local Storage to the Browswer.
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id","items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "display";
		
		for(var i=0, len=localStorage.length; i<len; i++)
		{
			var makeli = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key[i];
			var value = localStorage.getItem(key);
			//convert string back to object so it won't be one long string
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			for(var n in obj)
			{
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
			}
		}
	}
	
	function clearLocal()
	{
		if(localStorage.length === 0)
		{
			alert("No Data to Clear");
		}
		else
		{
			localStorage.clear();
			alert("All Media Deleted");
			window.location.reload();
			return false;
		}
	}
	
	// Variable defaults
	// store values of dropdown in array
	var mediaGroups = ["-- Choose Media Type--", "book", "document", "music", "movie", "pdf", "doc", "audio", "video"],
		mtopicValue;
	makeMediaTypes();
	
	// Set Link & Submit Click Events
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", saveMedia);
	
});

