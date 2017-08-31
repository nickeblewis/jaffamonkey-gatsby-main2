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

Switching from Wordpress to using GatsbyJS framework for my own site, and using markdown for content, I realised I had almost missed an evolution. Most sites do not need heavy-duty backend, and this framework is based on simple flat file structure.

#### The quick way to get started:

* Download a gatsbyjs starter repo (https://github.com/jaffamonkey/jaffamonkey-gatsby-main2.git)
* Use https://github.com/dreikanter/wp2md to convert Wordpress XML export fields for posts and pages.
* You will have to do some tweaking of the summary info at the top of exported markdown files, in order for posts to appear on your site.
* Copy your converted posts and page into the corresponding directories in the repo you cloned.
* Signup for account on https://app.netlify.com
* Follow guide to add new site from git, and check successfully deployed

#### Using Netlify CMS (optional)

If you prefer a UI for editing your content, Netflify provide hosted service you can hook into.

* Login to your github account and add new OAuth application for your new website url
* Create admin folder under the static folder
* Add index.html

``` html
<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Manager</title>

    <link rel="stylesheet" href="https://unpkg.com/netlify-cms@~0.4/dist/cms.css" />

</head>
<body>
<script src="https://unpkg.com/netlify-cms@~0.4/dist/cms.js"></script>
</body>
</html>
```
* Add config.yml to define posts directory and fields
``` html
backend:
  name: github
  repo: jaffamonkey/jaffamonkey-gatsby-main2 # Path to your Github repository
  branch: master # Branch to update

media_folder: "src/img"
public_folder: "/public/static"

collections:
  - name: "blog" # Used in routes, e.g., /admin/collections/blog
    label: "Blog" # Used in the UI
    folder: "src/posts" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: "{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
    fields: # The fields for each document, usually in front matter
      - {label: "Layout", name: "layout", widget: "hidden", default: "post"}
      - {label: "Tags", name: "tags", widget: "string"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Draft", name: "draft", widget: "markdown"}
      - {label: "Author", name: "author", widget: "markdown"}
      - {label: "Body", name: "body", widget: "markdown"}
```
* Once deployed, access your admin area by navgiating to http://site.url/admin