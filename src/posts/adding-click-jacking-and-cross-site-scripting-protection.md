---
title: Adding click-jacking and cross-site scripting protection
date: "2017-03-28"
layout: post
author: jaffamonkey
tags:
    - security
    - owasp
draft: false
---

# Adding click-jacking and cross-site scripting protection

Two of the common found vulnerabilities found by the OWASP ZAP tool are missing X-Frame-Options and X-XSS-Protection response header values. These go some way to prevent clickjacking and cross-site scripting attacks. The fix is to add headers refs to the web server confirmation files. Below is example for Nginx (**nginx.conf**): 
```add_header X-Content-Type-Options nosniff; 
add_header X-XSS-Protection "1; mode=block"; 
add_header X-Frame-Options "SAMEORIGIN" always;```
