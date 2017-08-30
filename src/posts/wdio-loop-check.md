---
title: WebdriverIO - loop text check
date: "2017-08-29"
layout: post
author: jaffamonkey
tags:
    - webdriverio
    - cucumberjs
draft: false
---

As with most test engineering, the path to success usually ends up with something a lot simpler than you would imagine. 

It's part of it; approaching  a puzzle, then finding the optimal way to complete it. 

A common check is to verify results in a tabular format (commonly search results). Below is a simple example of a search followed by a check on each search result row.

``` javacript
    browser.setValue('#search-keywords', 'test');
    browser.click('#search-button');
    const links = $$('#search-result-row');
    links.forEach(function (link) {
        let elem = link.getText();
        expect(elem).to.contain('test');
    });
```