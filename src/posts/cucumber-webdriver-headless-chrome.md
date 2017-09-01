---
title: Google Chrome Canary - Headless Browser
date: "2017-08-27"
layout: post
author: jaffamonkey
tags:
    - webdriver
    - cucumberjs
    - chrome
draft: false
---
Firstly, in order to use this headless browser in your webdriver tests, you will need to install specific version of Chrome 59 (Canary), as headless feature is not yet part of main branch.

[Google Chrome Canary Download](https://www.google.co.uk/chrome/browser/canary.html) 

Then all you need to do is tweak the webdriver config file, to use this version of Chrome

``` javacript
capabilities: {
    browserName: 'chrome',
    # specify location of Chrome Canary app
    binary: '/Applications/Google Chrome Canary.app',
    chromeOptions: {
        args: ['headless', 'no-sandbox', 'disable-gpu'],
    },
};
```