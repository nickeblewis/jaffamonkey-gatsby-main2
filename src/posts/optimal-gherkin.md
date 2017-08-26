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
Nonverbal communication involves the conscious and unconscious processes of encoding and decoding. Encoding is the act of generating information such as facial expressions, gestures, and postures. Encoding information utilizes signals which we may think to be universal. Decoding is the interpretation of information from received sensations given by the encoder. Decoding information utilizes knowledge one may have of certain received sensations.

We think we are original, but there are only so many ways to specify what you want.  Where UX touches on is non-verbal communication which frequently creates subtext to what we say.  Maybe that does extend to writing Gherkin, but that process puts out minds in a different attempted logical approach. This is kind of what causes one of the pitfalls of using a specification language, in that it can become too specific, too quickly. While there are many advocates of free form writing, there is no harm in focusing on generic step-by-step Gherkin, rather than the aesthetically pleasing, but not necessarily helpful, bundled steps. If there are no rules, the test framework becomes at risk of looking like a showcase of different coding styles, and a pain to maintain.

You could spend a lifetime persuading everyone to writes the Gherkin, but we are still locked in user story lifeboat mode. But it isn't a big shift to think user journeys, while is far closer to specification by example. A far easier way for people to explain themselves in terms of examples. And easier to write down. So firstly you have clear user story with clear acceptance criteria. 

There is no need to get precious about keeping Gherkin readable. Infinitely quicker to update element references and data in Gherkin files than in code. Pragmatism over coding showcase.  After a project the most useful thing to reuse is the framework itself and if your Gherkin is granular enough, easily portable to different projects.  Specification language was aimed at a means to draw more into the acceptance criteria of specifications. The acceptance criteria commonly provides more clarity to specs.

Gherkin, the much maligned and ridiculed specification and underused language, has been around for a few years now.  Because I work in projects that at least aspire to a BDD metnality, Gherkin is the default specificatino language used.  Ask a developer how to do it, and they will put most test steps in code, not in the transparent Gherkin format. For example, for a test test that require filling in a valid form, a developer will most likely bundle this into one step:

```
Given I submit a valid contact form
```

There is nothing wrong with this, in fact it's a smart approach if its a form unlikely to change and no inter-dependencies.  The general approach to take is bundle steps only when required - while Gherkin features may look overly verbose, they are also documenting actual steps a user takes.

```Given I click on the button "Contact"
And I fill in "#email-address"
And I fill in "#contact-name"
And I fill in "#email-address"
When I press "Submit"
Then I should see message "Form has been submitted successfully"````

