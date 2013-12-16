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
        if (event.data === YT.PlayerState.PLAYING){
            _gaq.push([
                '_trackEvent',
                'Videos',
                'Play',
                getTitle(event)
            ]);
        }
        if (event.data === YT.PlayerState.ENDED){
            _gaq.push([
                '_trackEvent',
                'Videos',
                'Watched to End',
                getTitle(event)
            ]);
        }
        if (event.data === YT.PlayerState.PAUSED){
            _gaq.push(['_trackEvent',
                'Videos',
                'Paused at: ' + event.target.getCurrentTime() + ' seconds',
                getTitle(event)]);
        }
    }

    // -------------------
    // Utility functions
    // -------------------

    function makeID(videosrc){
        var index = videosrc.lastIndexOf('/') + 1;
        var id = decodeURI(videosrc.slice(index).slice(0, 4));
        return id;
    }

    function getTitle(event) {
        var id = event.target.a.id;
        return $('#' + id).data('title');
    }
}(window, jQuery));