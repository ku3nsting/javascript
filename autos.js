// Automobile sorting program - CS 290
// Rebecca Kuensting
// run with node.js using the command "node automobile.js"
// from name/290Example/diagnostic/

function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

Automobile.prototype.logMe = function(isThereType) {
    if (isThereType == true) {
      //print current automobile details (year, make, model, type)
      console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
    }
    else if (isThereType == false) {
	  //no type value, so skip it
      //print current automobile details (year, make, model)
      console.log(this.year + " " + this.make + " " + this.model);
    }
};


Automobile.prototype.gotType = function(){
	if (this.type){
		return true;
	}
	else{
		return false;
	}
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){
	//console.log("Begin Sorting");
	var swaps = 1;

	//keep sorting as long as unsorted indexes exist
	while(swaps != 0){
		swaps = 0;
		
		for(var i = 0; i < (array.length - 1); i++){
		
			//call comparison
			var comparison = comparator(array[i], array[i+1]);
		
			//swap if not sorted
			if (comparison == false){
				//console.log("swapping " + array[i].type + " for " + array[i+1].type);
				var temp = array[i];
				array[i] = array[i+1];
				array[i+1] = temp;
				swaps++;
				
				//console.log("swap made " + i + " " + array.length);
				
				/*
				//print array for testing
				console.log("PRINT TEST WITHIN SORT METHOD:");
				for(var i = 0; i < array.length; i++){
					console.log(array[i])
					}*/
		}
	}
	
	}
	
	
	return array;
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}


/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    if(auto1.year >= auto2.year){
		return true;
	}
	else{
		return false;
	}
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    if(auto1.make[1] < auto2.make[1]){
		return true;
	}
	else if(auto1.make[1] == auto2.make[1] && auto1.make[2] < auto2.make[2]){
		return true
}
	else{
		return false;
	}
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    priorityArray = ["roadster", "pickup", "suv", "wagon"];
	//console.log("\nFRESH CALL");
	var priority1 = 4;
	var priority2 = 4;
	
	//rewrite to use forEach
	//automobiles.forEach(function (x) {
   // x.logMe(true);
	//});
	
	//function using a loop
	for(var i = 0; i < priorityArray.length; i++){
		//console.log("from array: " + auto1.type.toLowerCase());
		//console.log(priorityArray[i]);
		if ((auto1.type.toLowerCase()) == priorityArray[i]){
			priority1 = i;
			//console.log("match, p1! " + priority1);
		}
		if ((auto2.type.toLowerCase()) == priorityArray[i]){
			priority2 = i;
			//console.log("match, p2! " + priority2);
		}
	}
	if(priority1 < priority2){
		return true;
	}
	else if(priority1 == priority2){
		var yearCheck = yearComparator(auto1, auto2);
		return yearCheck;
	}
	else{
		return false;
	}
}

//header:
console.log("*****");

	//sort by year:
	console.log("\nThe cars sorted by year are: ");
	
	var yearArr = sortArr(yearComparator, automobiles);
	
	//print array for testing
	//for(var i = 0; i < yearArr.length; i++){
	//	console.log(yearArr[i])
	//}
	//console.log("sorting is working");
	
	//print all in list
	yearArr.forEach(function(x){
			x.logMe(x.gotType())
			});
			
	//sort by make:
	console.log("\nThe cars sorted by make are: ");
	var makeArr = sortArr(makeComparator, automobiles);
	//print all in list:
	makeArr.forEach(function(x){
		x.logMe(true)
			});
	
	//sort by type:
	console.log("\nThe cars sorted by type are: ");
	var typeArr = sortArr(typeComparator, automobiles);
	//print all in list:
	typeArr.forEach(function(x){
		x.logMe(true)
			});

//closing:	
console.log("\n*****");

/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.


Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */