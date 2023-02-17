# Scroll Tracking for Single-Page Applications

This code provides a simple way to track user scroll events in a single-page application (SPA). It uses Google Tag Manager to track user scrolling and sends custom events to the data layer when a user reaches a certain percentage of the page.

## Installation

To use this code, you will need to have Google Tag Manager installed on your site and have created a Google Tag Manager container. Once you have a container, you can import 'custom_scroll_spa_container.json' file, which will contain all the tags, triggers, and variables for your container.

## Usage
Once you have installed the scroll tracking code on your site, you can use it to track user scroll events. The code will automatically track user scrolling and send custom events to the Google Tag Manager data layer when a user reaches a certain percentage of the page.


### Customize the scroll Percentage
To customize the scroll tracking, you can modify the scrollDepth array in the tag [Custom HTML] and find percentages array in initiateTracker() function below. This array contains the percentages of the page at which to send a scroll tracking event. For example, if you want to send a scroll tracking event when the user reaches 50% and 75% of the page, you can modify the scrollDepth array to be:

```Javascript
var percentages = [50, 75];
```

### Customize the scroll EventName
As it same, you can modify the custom event name.
For example, if you want to set custom event name 'someting' you can modify:

```Javascript
var eventName = 'something';
```

## Contributing
If you find any bugs or issues with the scroll tracking code, please report them in the issues section of this repository. If you would like to contribute to the code, please fork the repository and submit a pull request.
