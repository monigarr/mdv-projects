//
//    Full Sail University
//    Visual Frameworks
//    Monica Peters
//    Web App Part 4
//    Week 4 Project 4
//    Due Thursday Feb. 23rd 2012
//	  json.js

// Add Test Data 
// One object for each file type
// book, document, music,  movie, pdf, word doc, audio, video

var json = 
{
	//object name
	"html51": 
		{
			//object properties and value
			"mtype": ["Type:", "html5"],
			"mname": ["Name:", "Test html5 01"],
			"mdate": ["Date:", "2012-02-16"],
			"mrating": ["Rating:", "8"],
			"mtopics": ["Incentive:", "work"],
			"mtags": ["Tags:", "worktag"],
			"mcomments": ["Comments:","Case study details about how and why I created this html5 app."]
		},
	"android2": 
		{
			//object properties and value
			"mtype": ["Type:", "android"],
			"mname": ["Name:", "Test Android App 02"],
			"mdate": ["Date:", "2009-05-20"],
			"mrating": ["Rating:", "3"],
			"mtopics": ["Incentive:", "personaltag"],
			"mtags": ["Tags:", "gardening"],
			"mcomments": ["Comments:","Case study details about how and why I created this android app."]
		},
	"ios3": 
		{
			//object properties and value
			"mtype": ["Type:", "ios"],
			"mname": ["Name:", "Test ios 03"],
			"mdate": ["Date:", "1970-04-01"],
			"mrating": ["Rating:", "8"],
			"mtopics": ["Incentive:", "school"],
			"mtags": ["Tags:", "schooltag"],
			"mcomments": ["Comments:","Case study details about how and why I created this ios app."]
		},
	"html54": 
		{
			//object properties and value
			"mtype": ["Type:", "html5"],
			"mname": ["Name:", "Test html5 04"],
			"mdate": ["Date:", "1970-02-01"],
			"mrating": ["Rating:", "10"],
			"mtopics": ["Incentive:", "school"],
			"mtags": ["Tags:", "dog"],
			"mcomments": ["Comments:","Case study details about how and why I created this html5 app."]
		},
	"html55": 
		{
			//object properties and value
			"mtype": ["Type:", "html5"],
			"mname": ["Name:", "Test html5 05"],
			"mdate": ["Date:", "1970-09-01"],
			"mrating": ["Rating:", "8"],
			"mtopics": ["Incentive:", "work"],
			"mtags": ["Tags:", "mobile"],
			"mcomments": ["Comments:","Case study details about how and why I created this html5 app."]
		},
	"html56": 
		{
			//object properties and value
			"mtype": ["Type:", "html5"],
			"mname": ["Name:", "Test html5 06"],
			"mdate": ["Date:", "1976-04-01"],
			"mrating": ["Rating:", "8"],
			"mtopics": ["Incentive:", "work"],
			"mtags": ["Tags:", "cat"],
			"mcomments": ["Comments:","Case study details about how and why I created this html5 app."]
		},
	"html57": 
		{
			//object properties and value
			"mtype": ["Type:", "html5"],
			"mname": ["Name:", "Test html5 07"],
			"mdate": ["Date:", "1979-04-01"],
			"mrating": ["Rating:", "5"],
			"mtopics": ["Incentive:", "school"],
			"mtags": ["Tags:", "bird"],
			"mcomments": ["Comments:","Case study details about how and why I created this html5 app."]
		},
	"html58": 
		{
			//object properties and value
			"mtype": ["Type:", "html5"],
			"mname": ["Name:", "Test html5 08"],
			"mdate": ["Date:", "1982-04-01"],
			"mrating": ["Rating:", "9"],
			"mtopics": ["Incentive:", "school"],
			"mtags": ["Tags:", "duck"],
			"mcomments": ["Comments:","Case study details about how and why I created this html5 app."]
		},
	"html59": 
		{
			//object properties and value
			"mtype": ["Type:", "html5"],
			"mname": ["Name:", "Test html5 09"],
			"mdate": ["Date:", "2012-02-16"],
			"mrating": ["Rating:", "8"],
			"mtopics": ["Incentive:", "work"],
			"mtags": ["Tags:", "robot"],
			"mcomments": ["Comments:","Case study details about how and why I created this html5 app."]
		},
	"html510": 
		{
			//object properties and value
			"mtype": ["Type:", "html5"],
			"mname": ["Name:", "Test html5 10"],
			"mdate": ["Date:", "2009-05-20"],
			"mrating": ["Rating:", "3"],
			"mtopics": ["Incentive:", "work"],
			"mtags": ["Tags:", "gardening"],
			"mcomments": ["Comments:","Case study details about how and why I created this html5 app."]
		},
	"android11": 
		{
			//object properties and value
			"mtype": ["Type:", "android"],
			"mname": ["Name:", "Test Android 11"],
			"mdate": ["Date:", "1970-04-01"],
			"mrating": ["Rating:", "8"],
			"mtopics": ["Incentive:", "inspiration"],
			"mtags": ["Tags:", "fishing"],
			"mcomments": ["Comments:","Case study details about why I find this android app inspirational."]
		},
	"android12": 
		{
			//object properties and value
			"mtype": ["Type:", "android"],
			"mname": ["Name:", "Test Android 12"],
			"mdate": ["Date:", "1970-02-01"],
			"mrating": ["Rating:", "10"],
			"mtopics": ["Incentive:", "school"],
			"mtags": ["Tags:", "zen"],
			"mcomments": ["Comments:","Case study details about how and why I created this android app."]
		},
	"android13": 
		{
			//object properties and value
			"mtype": ["Type:", "android"],
			"mname": ["Name:", "Test Android 13"],
			"mdate": ["Date:", "1970-09-01"],
			"mrating": ["Rating:", "8"],
			"mtopics": ["Incentive:", "work"],
			"mtags": ["Tags:", "green"],
			"mcomments": ["Comments:","Case study details about how and why I created this android app."]
		},
	"android14": 
		{
			//object properties and value
			"mtype": ["Type:", "android"],
			"mname": ["Name:", "Test Android 14"],
			"mdate": ["Date:", "1976-04-01"],
			"mrating": ["Rating:", "8"],
			"mtopics": ["Incentive:", "work"],
			"mtags": ["Tags:", "purple"],
			"mcomments": ["Comments:","Case study details about how and why I created this android app."]
		},
	"android15": 
		{
			//object properties and value
			"mtype": ["Type:", "android"],
			"mname": ["Name:", "Test Android 15"],
			"mdate": ["Date:", "1979-04-01"],
			"mrating": ["Rating:", "5"],
			"mtopics": ["Incentive:", "school"],
			"mtags": ["Tags:", "orange"],
			"mcomments": ["Comments:","Case study details about how and why I created this android app."]
		},
	"ios16": 
		{
			//object properties and value
			"mtype": ["Type:", "ios"],
			"mname": ["Name:", "Test ios 16"],
			"mdate": ["Date:", "1982-04-01"],
			"mrating": ["Rating:", "9"],
			"mtopics": ["Incentive:", "school"],
			"mtags": ["Tags:", "white yellow"],
			"mcomments": ["Comments:","Case study details about how and why I created this ios app."]
		},
	"ios17": 
		{
			//object properties and value
			"mtype": ["Type:", "ios"],
			"mname": ["Name:", "Test ios 17"],
			"mdate": ["Date:", "1970-09-01"],
			"mrating": ["Rating:", "8"],
			"mtopics": ["Incentive:", "work"],
			"mtags": ["Tags:", "black blue"],
			"mcomments": ["Comments:","Case study details about how and why I created this ios app."]
		},
	"ios18": 
		{
			//object properties and value
			"mtype": ["Type:", "ios"],
			"mname": ["Name:", "Test ios 18"],
			"mdate": ["Date:", "1976-04-01"],
			"mrating": ["Rating:", "8"],
			"mtopics": ["Incentive:", "work"],
			"mtags": ["Tags:", "yellow blue"],
			"mcomments": ["Comments:","Case study details about how and why I created this ios app."]
		},
	"ios19": 
		{
			//object properties and value
			"mtype": ["Type:", "ios"],
			"mname": ["Name:", "Test ios 19"],
			"mdate": ["Date:", "1979-04-01"],
			"mrating": ["Rating:", "5"],
			"mtopics": ["Incentive:", "school"],
			"mtags": ["Tags:", "gold pink"],
			"mcomments": ["Comments:","Case study details about how and why I created this ios app."]
		},
	"ios20": 
		{
			//object properties and value
			"mtype": ["Type:", "ios"],
			"mname": ["Name:", "Test ios 20"],
			"mdate": ["Date:", "1982-04-01"],
			"mrating": ["Rating:", "9"],
			"mtopics": ["Incentive:", "school"],
			"mtags": ["Tags:", "white black"],
			"mcomments": ["Comments:","Case study details about why I am inspired by this ios app."]
		}
}
