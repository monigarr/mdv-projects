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
			"mname": ["Name:", "Black and Yellow html5 01"],
			"mdate": ["Date:", "2012-02-16"],
			"mrating": ["Rating:", "8"],
			"mtopics": ["Incentive:", "work"],
			"mtags": ["Tags:", "black yellow"],
			"mgraphic": ["ScreenShot:", "http://farm2.staticflickr.com/1321/5122136543_ec43cecbe7_s.jpg"],
			"mcomments": ["Comments:","Black and yellow, black and yellow html5 app because black and yellow, black and yellow is just such a catchy phrase."]
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
			"mgraphic": ["ScreenShot:", "http://cdn2.reelstatic.com/wp-content/uploads/2010/09/justin-iphone-75x75.jpg"],
			"mcomments": ["Comments:","Everyone should have a concert ticket buying app on their android device."]
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
			"mgraphic": ["ScreenShot:", "http://jaypeeonline.net/wp-content/themes/freshnews/thumb.php?src=http://jaypeeonline.net/images/wpandroid_nook3.jpg&h=75&w=75&zc=1&q=95"],
			"mcomments": ["Comments:","Wordpress for iOs looks like it can be very useful for managing many wordpress sites from the iPhone and iPad."]
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
			"mgraphic": ["ScreenShot:", "http://www.androidapp101.com/appimg/2700/diceshaker-3d-free.jpeg"],
			"mcomments": ["Comments:","Dicey html5 apps are always a joy to mess around with."]
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
			"mgraphic": ["ScreenShot:", "http://regmedia.co.uk/2011/12/06/gcec_1.jpg"],
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
			"mtags": ["Tags:", "kitten"],
			"mgraphic": ["ScreenShot:", "http://www.whattoexpect.com/Images/socialnetworking/buddyicon_thumb/09_avatar.jpg"],
			"mcomments": ["Comments:","Amazing kitten html5 app created because everyone loves cute kittens!"]
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
			"mgraphic": ["ScreenShot:", "http://www.androidstatic.com/wp-content/uploads/2012/01/unnamed3-75x75.jpg"],
			"mcomments": ["Comments:","Case study details about how and why I created this html5 app."]
		},
	"html58": 
		{
			//object properties and value
			"mtype": ["Type:", "html5"],
			"mname": ["Name:", "Apartment Rental html5 08"],
			"mdate": ["Date:", "1982-04-01"],
			"mrating": ["Rating:", "9"],
			"mtopics": ["Incentive:", "school"],
			"mtags": ["Tags:", "apartment rental"],
			"mgraphic": ["ScreenShot:", "http://www.androidpress.com/wp-content/uploads/2012/01/find-your-new-rental-with-apartments-com-android-app1-75x75.png"],
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
			"mgraphic": ["ScreenShot:", "http://www.androidapp101.com/appimg/2785/quick-app-manager.jpeg"],
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
			"mgraphic": ["ScreenShot:", "http://regmedia.co.uk/2012/01/30/airdroid_1.jpg"],
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
			"mgraphic": ["ScreenShot:", "http://www.androidapp101.com/appimg/2761/alphabet-car.jpeg"],
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
			"mgraphic": ["ScreenShot:", "http://yourotherwheels.com/_images/app/qr-android.png"],
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
			"mgraphic": ["ScreenShot:", "http://ecx.images-amazon.com/images/I/51NEb1QMCHL._SL75_.png"],
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
			"mgraphic": ["ScreenShot:", ""],
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
			"mgraphic": ["ScreenShot:", "http://mcdn.toolking.com/tk_banner_images/AndroidAppIcon.png"],
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
			"mgraphic": ["ScreenShot:", "http://cdn.trickyways.com/wp-content/uploads/2011/07/google-plus-android-app-75x75.jpg"],
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
			"mgraphic": ["ScreenShot:", "http://androiduk.net/wp-content/uploads/2011/04/uk_android_app_tvguideuk.png"],
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
			"mgraphic": ["ScreenShot:", "http://regmedia.co.uk/2011/09/30/sandisk_1.jpg"],
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
			"mgraphic": ["ScreenShot:", "http://www.androidapp101.com/appimg/2779/kayak-flight-hotel-car-search-and-travel-planner.jpeg"],
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
			"mgraphic": ["ScreenShot:", "http://www.androidapp101.com/appimg/2798/priceline-hotel-negotiator.jpeg"],
			"mcomments": ["Comments:","Case study details about why I am inspired by this ios app."]
		}
}
