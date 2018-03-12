
$(document).ready(function(){
  var config = {
    apiKey: "AIzaSyDnrUxMR-svPLRcePtpdtwAyCjQSOi68R0",
    authDomain: "trains-d6135.firebaseapp.com",
    databaseURL: "https://trains-d6135.firebaseio.com",
    projectId: "trains-d6135",
    storageBucket: "trains-d6135.appspot.com",
    messagingSenderId: "891514712055"
  };
	firebase.initializeApp(config);
	var database = firebase.database();

$('#submitButton').on('click', function(){
event.preventDefault();

  var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var firstTime = moment($('#timeInput').val().trim(), "HH:mm").format("");
	var frequency = $('#frequencyInput').val().trim();

	var newTrains = {
		name: trainName,
		tdestination: destination,
		tFirst: firstTime,
		tfreq: frequency,

	}
	database.ref().push(newTrains)

	console.log(newTrains.name);
	console.log(newTrains.tdestination);
	console.log(newTrains.tFirst);
	console.log(newTrains.tfreq);

	alert("Train successfully added!");

	$('#trainNameInput').val("");
	$('#destinationInput').val("");
	$('#timeInput').val("");
	$('#frequencyInput').val("");

	return false;
});

  database.ref().on('child_added', function(childSnapshot){

  console.log(childSnapshot.val());

 	var trainName = childSnapshot.val().name;
 	var destination = childSnapshot.val().tdestination;
	var firstTime = childSnapshot.val().tFirst;
	var frequency = childSnapshot.val().tfreq;

	console.log(destination);
 	console.log(firstTime);
	console.log(frequency);

	var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	console.log(firstTimeConverted);

  var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	var tRemainder = diffTime % frequency;
	console.log(tRemainder);

	var tMinutesTillTrain = frequency - tRemainder;
	console.log("MINUTES TIL TRAIN: " + tMinutesTillTrain);

	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextTrainConverted = moment(nextTrain).format("hh:mm a");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  })
})
