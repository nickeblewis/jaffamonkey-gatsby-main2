---
title: Optimal Gherkin
date: "2017-08-14"
layout: post
author: jaffamonkey
tags:
    - protractor
    - cucumberjs
draft: false
---

Gherkin, the much maligned and ridiculed speciafcation language has been around for a few years now.  Because I work in projects that at least aspire to a BDD metnality, Gherkin is the default specificatino language used.  Ask a developer how to do it, and they will put most test steps in code, not in the transparent Gherkin format. For example, for a test test that require filling in a valid form, a developer will most likely bundle this into one step:

```
Given I submit a valid form
```

There is noithing wrong with this, in fact it's a smart approach if its a form unlikely to change and no inter-dependencies.  The general approach to take is bundle steps only when required - while Gherkin features may look overly verbose, they are also documenting actual steps a user takes.