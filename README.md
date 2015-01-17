# Rabbitlive
Source files for www.rabbitlive.com

## Build Caveats
- If SVG strokes need to be animated, they need to be embedded so DrawSVG can access them in the DOM.

## Prerequisite Applications
- npm
- bower
- grunt

## Client-side Dependencies
- GreenSock TweenMax / DrawSVGPlugin
  - Used to animate SVG paths.
  - Used TweenMax because it contains Greensock's TimelineLite, TweenLite & CSS plugins

## Locally Develop
- Make sure dependencies are resolved using `npm install` and `bower install`
- Execute `grunt serve`

## Create Package Instructions
- Make sure dependencies are resolved using `npm install` and `bower install`
- Execute `grunt build`

## Build to Server Instructions
- Make sure dependencies are resolved using `npm install` and `bower install`
- Execute `grunt promote`