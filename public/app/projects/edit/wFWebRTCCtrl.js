angular.module('app').controller('wFWebRTCCtrl', ['$scope', function($scope) {



}]).directive('webRtc', function($window) {
  return {
    restrict: 'EA',
    link: function(scope, ele, attrs) {

      var videoStream = null;
      var video = document.getElementById("video");

      // Test browser support
      $window.navigator = $window.navigator || {};
      navigator.getUserMedia = navigator.getUserMedia       ||
                               navigator.webkitGetUserMedia ||
                               navigator.mozGetUserMedia    ||
                               null;
 
      if (navigator.getUserMedia === null) {
        document.getElementById('gum-unsupported').classList.remove('hidden');
        document.getElementById('button-play-gum').setAttribute('disabled', 'disabled');
        document.getElementById('button-stop-gum').setAttribute('disabled', 'disabled');
      } else {
        // Opera <= 12.16 accepts the direct stream.
        // More on this here: http://dev.opera.com/articles/view/playing-with-html5-video-and-getusermedia-support/
        var createSrc = $window.URL ? $window.URL.createObjectURL : function(stream) {return stream;};
    //    console.log($window.URL);
    //    console.log(window.URL.createObjectURL);
        // Opera <= 12.16 support video only.
        var audioContext = $window.AudioContext       ||
                           $window.webkitAudioContext ||
                           null;
        if (audioContext === null) {
          document.getElementById('gum-partially-supported').classList.remove('hidden');
        }
        var playButton = ele.find('#button-play-gum');
        playButton.bind('click', function() {
 
          // Capture user's audio and video source
          navigator.getUserMedia({
            video: true,
            audio: true
          },
          function(stream) {

            videoStream = stream;
            // Stream the data
            video.src = createSrc(stream);
            video.play();
          },
          function(error) {
            console.log("Video capture error: ", error.code);
          });
        });
        var stopButton = ele.find('#button-stop-gum');
        stopButton.bind('click', function() {
          alert('pause');
          // Pause the video
          video.pause();
          // Stop the stream
          videoStream.stop();
        });
      }
    }
  }
});