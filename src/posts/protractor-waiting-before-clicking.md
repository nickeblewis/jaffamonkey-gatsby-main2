---
title: Protractor - waiting before clicking
date: "2017-03-20"
layout: post
author: jaffamonkey
tags:
    - protractor
    - cucumberjs
draft: false
---

# Protractor: waiting before clicking

If you have been working with CucumberJS/Protractor, you may have come up with common issue of waits. Protractor has this feature this built in, but it doesn't always get it right. So after attempting several different approaches, with partial successes, the code below (appears) to do a solid job.

```this.Given(/^I click the (.*) (button|filter|radio|tab|checkbox|link|icon|record|person|asset|accordion)$/, 
function (buttonName, buttonType, callback) { var elm = element(by.css('#button_id')); 
var EC = protractor.ExpectedConditions; 
var isClickable = EC.elementToBeClickable(elm); 
browser.wait(isClickable, 20000); 
elm.click().then(callback); });
```