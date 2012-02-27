// Monica Peters
// December 1st, 2011
// Project 2 :: SDI 1111
// Deliverable 2
// Tell a personal story in Code.
// This story is based on actual common events 
// in and around the Akwesasne Mohawk Reservation.


/* Pseudocode
Initialize Variables
string
number
array

Procedure -> 
Boolean Function -> 
		Returned Values -> OUTPUT -> Finish
Number Function -> 
		Returned Values -> OUTPUT -> Finish
String Function -> 
		Returned Values -> OUTPUT -> Finish
Array Function ->
		Returned Values -> OUTPUT -> Finish
		

Argument -> Procedure ->
Arugument
	true - OUTPUT - back
	false - OUTPUT - back
	
	
Number -> Number Function -> Local Variables ->
	While Loop
		True -> Math -> OUTPUT -> back to while loop
		False -> return number
		
Argument 1 / Argument 2 -> Boolean Function -> Comparison ->
	True -> OUTPUT -> return boolean
	False -> OUTPUT -> return boolean
	
String 1 / String 2 -> String Function -> Local Var -> String Concatenation -> Return String

Number / Array -> Array Function -> Local Var ->
	For Loop
		True -> Math -> OUTPUT -> back to For Loop
		False -> Return array
*/

// INITIALIZE VARIABLES
// string
var mohawkCommunity = "Akwesasne";
// number
var mohawkBloodQuantum = 90;
// array
var borderAgents = ["cbsa","cbp","ny state trooper","rcmp","akwesasne mohawk police","tribal police","army","federal agents","cornwall police"];


// PROCEDURE START
// boolean function
// number function
// string function
// array function
// PROCEDURE STOP


//function to reuse later
var borderStop = function(inspect) {
	console.log(inspect);
};

//BOOLEAN FUNCTION
var mohawkStatus = function(bloodQuantum) {
	var bloodPurity = function(mother, father) {
	var bloodResult = mother / father;
		return (bloodResult === Math.floor(bloodResult));
};
	if (bloodPurity(bloodQuantum, 50)) { return false; }
	else if(bloodPurity(bloodQuantum, 81)) { return true; }
	else if(bloodPurity(bloodQuantum, 99)) {return true; }
	else { return false; }
};

//SYNTAX TROUBLES
//function takes boolean arguments & compares them.
/*var mohawkOrigin = function(mother,father)
{
	if ( mother >= 90 ) {
	borderStop("This person might be Mohawk");
	};
	else ( mother <= 49 ) {
	borderStop("This person might not be Mohawk");
	}
	else ( father >= 90 ) {
	borderStop("This person might be Mohawk");
	}
	else ( father <= 49 ) {
	borderStop("This person might not be Mohawk");
	};
};
*/

//NUMBER FUNCTION, LOCAL VARS, WHILE LOOP, MATH, RETURN NUMBER
var goShopping = function(spendCash) {
	var receiptTotal = 5,
		cashTotal;
	if (spendCash < receiptTotal) {
		console.log("Monica might have more cash on her, border agent attempts to force her to sign tax papers.");
		cashTotal = receiptTotal;
	}
	else {
	cashTotal = Math.floor(spendCash - receiptTotal);
	}
	return cashTotal;
};
var gotGoods = goShopping(50);

//STRING FUNCTION, LOCAL VARIABLES, STRING CONCATENTATION, RETURN STRING
var stopsPerErrand = function() {
	var borderAgents = ["cbsa","cbp","ny state trooper","rcmp"];
	inspectionsPerErrand = borderAgents.length;
	borderStop(borderAgents + " stopped Mohawk for inspection, at least " + inspectionsPerErrand + " times today.");
};

/*MONICA HAVING TROUBLE WITH WHILE LOOP FUNCTION
// OUTPUTS THE CODE INSTEAD OF A HUMAN FRIENDLY MEANINGFUL MESSAGE
//function takes single number and uses it in a WHILE loop.
var groceryShoppingTrip = function(leaveReservation) {
	var leaveReservation = 0;
	while (leaveReservation < 3) {
	borderStop("Mohawk left reservation and " + groceryShoppingTrip + " receipt was inspected");
	leaveReservation ++;
	};
};
*/


//ARRAY FUNCTION WITH NUMBER, ARRAY ARGUMENTS, FOR LOOP
var clientProject = ["School","Cdling","Okwaho","Fullers"],
	hoursPerClient = [ 4, 4, 3, 2 ];
	
var workOneProject = function(clientProject, hoursThisClient) {
	console.log("Monica must work on " + clientProject + " project for " + hoursThisClient + " hours. ");
	for (var hours = 1; hours < hoursThisClient; hours += 1) {
		var hoursRemain = hoursThisClient - hours;
		console.log("Monica worked " + hours + " hour on " + clientProject + " project, " + hoursRemain + " hour left to work.  ");
	}
	console.log("Monica finished working on " + clientProject + " project. ");
};
var workAllProjects = function(clientProjects, hoursPerClient) {
	for (var clientNumber = 0; clientNumber < clientProjects.length; clientNumber++)
		var clientProject = clientProjects[clientNumber],
			hoursThisClientProject = hoursPerClient[clientNumber];
		workOneProject(clientProject, hoursThisClientProject);
			console.log("Monica completed all projects. Time to play XBox Kinect UFC Trainer!");
	}

//borderAgents();
//borderStop("Monica carries Mohawk status card: " + mohawkStatus(81));
//borderStop("Mohawk left reservation to run errands and was inspected by " + borderAgents + ".  " );

mohawkStatus(90);
goShopping(50);
stopsPerErrand(5);
borderStop("Monica spent " + gotGoods + " cash for bottled water & groceries, border agent attempts to force Monica to sign papers with threats of not allowing her to return to her reservation.");
workAllProjects(clientProject, hoursPerClient);
//WHILE LOOP TROUBLE borderStop("Mohawk is returning to reservation and receipts were inspected " + groceryShoppingTrip );
//TROUBLES borderStop("Mohawk provided " + receiptNumber + " receipts during inspection.");
//SYNTAX TROUBLE borderStop( + mohawkOrigin );