window.addEventListener('DOMContentLoaded', function() {
    	'use strict';
	var video = document.querySelector('video');

	function successCallback(stream) {
	    if (video.mozSrcObject !== undefined) {
		video.mozSrcObject = stream;
	    } else {
		video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
	    };
	    video.play();
	}

	 function errorCallback(error) {
		console.error('An error occurred: [CODE ' + error.code + ']');
		// Display a friendly "sorry" message to the user
	 }

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;


	if (navigator.getUserMedia) {
	    // Call the getUserMedia method here
	    navigator.getUserMedia({video: true}, successCallback, errorCallback);

	} else {
	    console.log('Native device media streaming (getUserMedia) not supported in this browser.');
	    // Display a friendly "sorry" message to the user.
	}

}, false);
