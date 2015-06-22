---
title: Ironsmith, a yeoman generator for metalsmith
template: post.html
date: 2015-06-22
author: Eddy Hernandez
tags: metalsmith, gulp, static site, yeoman, generator
---

Looking to give [metalsmith](http://metalsmith.io) a try but don't want to deal with configuration? Try out [Ironsmith](https://github.com/eddywashere/generator-ironsmith), a [yeoman generator](http://yeoman.io/) that packages common features for building out a blog with metalsmith, gulp and scss. Also included is a beautiful theme ported from jekyll called [pixyll](https://github.com/johnotander/pixyll). Check out the live demo [here](http://eddywashere.github.io/ironsmith-demo).

### System Prerequisites

Before we go on, you'll need node.js installed. Check out the following links for installing node for your operating system.

- [OSX](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#osx)
- [Windows](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#windows)
- [Debian/Ubuntu](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#debian-and-ubuntu-based-linux-distributions)
- [Other options](https://nodejs.org/download/)

### Install the tools

From your terminal, enter the following commands to install yeoman, ironsmith and gulp globally.

```sh
npm install -g yo generator-ironsmith gulp
```

### Building the project

With that out of the way, let's create an empty directory to work in.

```sh
mkdir myawesomesite
```

Next let's scaffold out the content for the project with ironsmith.

```sh
yo ironsmith
```

After running that command the generator will ask you a series of questions. Type in your answers to the right of the questions and hit enter to submit them.

```sh
? enter a project name: (Ironsmith) myawesomesite
? enter a default author name: (Tyler Durden) Robert Paulson
```

Next you'll see a __ton__ of console output and when it's over you'll be ready to build out your site.

### Preview with Gulp

If everything went ok, you'll be able to preview your site at [http://localhost:8000](http://localhost:8000) by running the following command:

```sh
gulp preview
```

Your site should look very similar to this demo: [eddywashere.github.io/ironsmith-demo/](https://eddywashere.github.io/ironsmith-demo/).

### Understanding the project structure

The metalsmith content and templates are located in `src` and `templates`. Here's a breakdown of what those directories contain.

```sh
/src
/src/* # pages
/src/posts/* # blog posts
/templates
/templates/* # page templates to be reference from posts & pages
/templates/partials/* # partial html files
```

The frontend assets are located in `js`, `scss` and `images`.

```sh
/images
/js
/scss
```

Included in the project is a configuration file, `config.js`. Use this to include information details about your site while running in development mode or production mode.

### Create additional posts & pages

To create a new page, type the following command:

```sh
yo ironsmith:page
```

To create a new post, type the following command:

```sh
yo ironsmith:post
```

### Deploying to github pages

If you link this project to a github repo, you'll be able to deploy to github pages with the following task:

```sh
gulp build:prod deploy
```

### Staying up to date

To install updates to ironsmith, run the following command:

```sh
npm update generator-ironsmith -g
```

Then run `yo ironsmith` to regenerate any files like `ironsmith.js` or `Gulpfile.js`.

### That's it!

Hopefully I covered everything you need to get started with metalsmith. In the future, I'd like Ironsmith to support options for more themes, better upgrades and last, but not least, refactor the build script. If I missed anything or if you find a bug, please feel free to submit a pr or create an issue at [github.com/eddywashere/generator-ironsmith](https://github.com/eddywashere/generator-ironsmith). Thanks!