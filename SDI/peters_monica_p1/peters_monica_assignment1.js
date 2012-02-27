// Monica Peters
// November 22, 2011
// Project 1 :: SDI 1111
// Deliverable 1
// Tell a personal story in Code.
// This story is based on actual common events 
// in and around the Akwesasne Mohawk Reservation.

/* Pseudocode
Initial variables
MohawkName: Monica
MohawkFullName: Monica Peters
Interrogators: [cbp //customs border protection
	cbsa //canadian border services agency
	akwesasne mohawk police 
	tribal police
	new york state police
	rcmp // royal canadian mounted police
	cornwall police
	massena police
	united states army
	federal bureau investigation
	central intelligence agency
	united states border patrol
	franklin county police]
MohawkID: [status usa, status canada]
MohawkMembership: [srmt,mca,council of chiefs]
MohawkReceipts: 1
MohawkReceiptsValue: 97.22
MohawkPocketCash: 22.97
RunErrandsStart: true
RunErrandsReturn: false


Initial output
Print "Show your blood quantum card ", MohawkName
Print Interrogator ," will question ", MohawkFullName
Print "Tell me how you received your MohawkMembership "
Print "What is the purpose of your travel?"
Print "How much money do you have on you?"
Print "Do you have any weapons, firearms, cash, alcohal, or tobacco with you?"
Print "Do you have anything to declare?"
Print "You are not allowed to enter my country according to Immigration & Refuge Act"
Print "Your Haudenosaunee passport is a fantasy document"

If RunErrandStart
	If MohawkID is not available
		stop, search, detain and threaten Mohawk.
	Else
		continue interrogation
	End If
Else
	If MohawkMembership is available
		continue interrogation
	Else
		Taunt: How much of your blood is pure mohawk?
		Print Taunt
		Detain, search, threaten, fine, ticket, create huge court costs 
		for the Mohawk.
	End If
End If
*/

//SET VARIABLES
var mohawkName = "Monica"; 				//string
var mohawkHome = "Kawehno\:ke ko\:wa"; 	//string with escapes
var mohawkReceiptsValue = 23;			//number
var runErrandsStart = true;				//boolean

//OUTPUT EACH VARIABLE
console.log("Name:" + mohawkName +  ", Home:" + mohawkHome +  ", Receipts Value:" + mohawkReceiptsValue +  ", Running Errands:" + runErrandsStart);

//BOOLEAN CONDITIONAL TRUE
if (runErrandsStart === true)
{

	//NUMBER CONDITIONAL TRUE
	if(mohawkReceiptsValue >= 23)
		{
			//math action add 7 to receipt value
			mohawkReceiptsValue += 7; 
			//OUTPUT A
			console.log("Receipts might show possible minimum value of " + mohawkReceiptsValue);
		}else{
		//NUMBER CONDITIONAL FALSE
		if(mohawkReceiptsValue <= 1)
			{
				//OUTPUT B
				console.log("Alert! We want more mohawk receipts!");
			};
		};
		
//BOOLEAN CONDITIONAL FALSE
if (runErrandsStart === false)
{
	
	//STRING CONDITIONAL TRUE
	if(mohawkName === Monica) 
	{
		//OUTPUT C
		console.log("Pass. " + mohawkName + " is Mohawk.");
		//STRING CONDITIONAL FALSE
		}else{
			//OUTPUT D
			console.log("Alert! " + mohawkName + " is not Mohawk.");
		};
	};
	
	
	//STRING CONDITIONAL WITH ESCAPES
	if(mohawkHome === "Kawehno\:ke ko\:wa")
	{
		//OUTPUT C
		console.log("Pass. \"Kawehno\:ke ko\:wa\" is in the Mohawk Reservation"); 
		}else{
		//OUTPUT D
		console.log("Alert! Mohawk is coming from location outside of reservation");
	};
};