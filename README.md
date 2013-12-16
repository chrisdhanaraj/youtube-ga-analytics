youtube-ga-analytics
====================

A script to auto-magically track your YouTube videos. The original concept comes from lunametrics at http://www.lunametrics.com/blog/2012/10/22/automatically-track-youtube-videos-events-google-analytics/#sr=g&m=o&cp=or&ct=-tmc&st=(opu%20qspwjefe)&ts=1386701498, I've just updated the logic/pattern. I've also added in a data-title requirement for the iFrame embed  - I really don't like having the URL's as the title in Google Analytics. Google plz expose title?

This script is still for the older ga.js, not analytics.js. 

## Requirements

jQuery

## Syntax

```
<iframe width="560" height="315" src="//www.youtube.com/embed/k7Ilpnhr0kM" frameborder="0” allowfullscreen data-title=“TITLE"></iframe>
```