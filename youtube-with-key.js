// --------------------
// YouTube Analytics
// by: @chrisdhanaraj
// Inspired by http://www.lunametrics.com/blog/2012/10/22/automatically-track-youtube-videos-events-google-analytics
// --------------------

/* globals YT, _gaq */

(function (window, $) {
    'use strict';
    
    // ------------------
    // Load YouTube API
    // ------------------
    var tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    // ---------------------------
    // Construct array of videos 
    // ---------------------------

    var playerArray = [];
    var videoArray = [];

    $('iframe').each(function(index, value) {
        if (value.src.indexOf('//www.youtube.com/embed') !== -1) {
            var id = makeID(value.src);
            $(value).attr('id', id);
            videoArray[index] = id;
        }
    });

    // ----------------------------------------
    // Initialize the player and tracking the
    // state changes
    // ----------------------------------------

    window.onYouTubeIframeAPIReady = function() {
        for (var i = 0; i < videoArray.length; i++) {
            playerArray[i] = new YT.Player(videoArray[i], {
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
        }
    };

    function onPlayerStateChange(event) {
        var youTubeUrl = event.target.getVideoUrl();
        var youTubeId = getYouTubeId(youTubeUrl);
        var youTubeTitle = getYouTubeTitle(youTubeId);

        if (event.data === YT.PlayerState.PLAYING){
            _gaq.push([
                '_trackEvent',
                'Videos',
                'Play',
                youTubeTitle
            ]);
        }
        if (event.data === YT.PlayerState.ENDED){
            _gaq.push([
                '_trackEvent',
                'Videos',
                'Watched to End',
                youTubeTitle
            ]);
        }
        if (event.data === YT.PlayerState.PAUSED){
            _gaq.push([
                '_trackEvent',
                'Videos',
                'Paused at: ' + event.target.getCurrentTime() + ' seconds',
                youTubeTitle
            ]);
        }
    }

    // ----------------
    // Make short #id
    // ----------------

    function makeID(videosrc){
        var index = videosrc.lastIndexOf('/') + 1;
        var id = decodeURI(videosrc.slice(index).slice(0, 4));
        return id;
    }

    // ----------------------------------
    // YouTube identification functions
    // ----------------------------------

    function getYouTubeId(videoUrl) {
        // Original concept at:
        // Stackoverflow: /questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
        var vIndex = videoUrl.indexOf('v=') + 2;
        var videoId = videoUrl.slice(vIndex);
        var ampersandPosition = videoId.indexOf('&');
        if(ampersandPosition !== -1) {
            videoId = videoId.slice(0, ampersandPosition);
        }

        return videoId;
    }

    function getYouTubeTitle(youtubeID) {
        // Documentation on Google API's https://developers.google.com/youtube/v3/
        var apiKey = 'YOUR KEY HERE';
        var urlOptions = 'snippet';
        var googleUrl = 'https://www.googleapis.com/youtube/v3/videos?';
        var param = 'id=' + youtubeID + '&key=' + apiKey + '&part=' + urlOptions;
        var title;

        $.ajax({
            url: googleUrl + param,
            async: false,
            success: function(data) {
                title = data.items[0].snippet.title;
            }
        });
        return title;
    }
}(window, jQuery));