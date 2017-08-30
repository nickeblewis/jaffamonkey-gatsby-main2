---
title: Pa11y - testing login-protected urls
date: "2017-08-28"
layout: post
author: jaffamonkey
tags:
    - pa11y
    - accessibility
    - wacg
draft: false
---
### Prerequisites:

* npm install -g phantomjs
* npm install -g pa11y

### Configuration file

Create config.js to circumnavigate login-protected pages:

``` javascript
module.exports = {
    beforeScript: function (page, options, next) {
        var waitUntil = function (condition, retries, waitOver) {
            page.evaluate(condition, function (error, result) {
                if (result || retries < 1) {
                    waitOver();
                } else {
                    retries -= 1;
                    setTimeout(function () {
                        waitUntil(condition, retries, waitOver);
                    }, 200);
                }
            });
        };

        page.evaluate(function () {
            window.open('localhost:8111/user/login');
            document.getElementById("username").value = "username";
            document.getElementById("password").value = "password";
            document.getElementById("submit").click();
        }, function () {
            waitUntil(function () {
                // Wait until the login has been success and the /news.html has loaded
                return window.location.href === 'http://localhost:8111/dv/rd-dashboard';
            }, 20, next);
        });
    }
}
```

### Run pa11y

``` bash
pa11y --config ./path/to/config.json http://example.com
```