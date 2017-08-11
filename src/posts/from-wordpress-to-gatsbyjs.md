---
title: From Wordpress to GatsbyJS
date: "2017-06-27"
layout: post
author: jaffamonkey
tags:
    - testengineering
    - devops
draft: false
---

Switching from Wordpress to using GatsbyJS framework for my own site, and using markdown for content, I realised I had almost missed an evolution. The switch was easy, and posts conversion I used https://github.com/dreikanter/wp2md.  Not an active project, but worked very well.  Most sites do not need heavy-duty b/e, databases are used by default, but rarely warrant the overall effort/maintenance.

The quick way to get started:
- Download gatsbyjs starter repo (that includes some demo content)
- Use https://github.com/dreikanter/wp2md to convert Wordpress XML export fields for posts and pages.  You will have to do some tweaking of the summary info at the top of file, in order for posts to appear on your site.
- Copy your converted content into the content directory of the site