youtube-ga-analytics
====================

A script to auto-magically track your YouTube videos. The original concept comes from lunametrics at http://www.lunametrics.com/blog/2012/10/22/automatically-track-youtube-videos-events-google-analytics, I've just updated the logic/pattern. I've also added in a data-title requirement for the iFrame embed  - I really don't like having the URL's as the title in Google Analytics. Google plz expose title?

This script is still for the older ga.js, not analytics.js. 

## Requirements

jQuery

## Versions

There are two different versions of the script. 

### youtube.js

The first (youtube.js) requires zero setup - just drop it in and follow the syntax below. The only addition to the standard YouTube embed is the added data-title attribute.

```
<iframe width="560" height="315" src="//www.youtube.com/embed/k7Ilpnhr0kM" frameborder="0” allowfullscreen data-title=“TITLE"></iframe>
```

### youtube-with-key.js

The second requires a Google API key and drops the data-title syntax - it uses the YouTube Data API to grab the title. The API's are free to use (up to a certain quota), and instructions can be found https://developers.google.com/youtube/registering_an_application. When you set up your project you'll probably want to use the Browser Key, but make your decision based on your project. 

Syntax is the standard iFrame embed seen below

```
<iframe width="560" height="315" src="//www.youtube.com/embed/k7Ilpnhr0kM" frameborder="0” allowfullscreen></iframe>
```