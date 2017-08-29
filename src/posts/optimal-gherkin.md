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

<a data-pin-do="embedPin" data-pin-width="large" href="https://www.pinterest.com/pin/191543790374090387/"></a>

Working males average 2000-3000, females from 10,000-20000. However, both average about 500-700 words of actual value (i.e. words which have intent to communicate to another person an item of importance to both). - Men are Pigs, (fortunately women like pork) : Jeff Steele, Melbourne, Florida, US

### what are we trying to say

`Nonverbal communication involves the conscious and unconscious processes of encoding and decoding. Encoding is the act of generating information such as facial expressions, gestures, and postures. Encoding information utilizes signals which we may think to be universal. Decoding is the interpretation of information from received sensations given by the encoder. Decoding information utilizes knowledge one may have of certain received sensations.`

An area that UX touches on, is non-verbal communication which introduces subtext to what we say.  It may come in form on body language, but also in tone of langauge we use. But when it comes to specifications, is this so relevant?  Or desired, even.  With costs and deadlines, it’s a fair point to make, that pandering to personalities and different styles of communicating are not desirable. In a conversation our minds are not in a state to make bullet-pointed lists. When you asked to define what you want, in form of user story, subtext becomes useless. But if people specify using examples, i.e. specifying using acceptance criteria, then subtext can come into play.  Either in how people perceive certain activities, or even roles. 

### how much do we need to say

Gherkin, a sometimes maligned, ridiculed and underused specification language, has been around for a few years now.  Because I work in projects that at least aspire to a BDD metnality, Gherkin is the default specificatino language used.  Ask a developer how to do it, and they will put most test steps in code, not in the transparent Gherkin format. For example, for a test test that require filling in a valid form, a developer will most likely bundle this into one step:

```
Given I submit a valid contact form
```

There is nothing wrong with this, in fact it's a smart approach if its a form unlikely to change and no inter-dependencies.  The general approach to take is bundle steps only when required - while Gherkin features may look overly verbose, they are also documenting actual steps a user takes.

```
Given I click on the button Contact
And I fill in #email-address
And I fill in #contact-name
And I fill in #email-address
When I press Submit
Then I should see message Form has been submitted successfully
```

### how much of what we say, is useful

While there are many advocates of free form Gherkin writing, there is no harm in focusing on generic step-by-step Gherkin, rather than the aesthetically pleasing, but not necessarily helpful, bundled steps. If there are no rules, the test framework becomes at risk of looking like a showcase of different coding styles, and a pain to maintain.  We think we are original, but there are only so many ways to truly explain ourselves. You could spend a lifetime persuading everyone to write the Gherkin, but we are still locked in user story lifeboat mode. But it isn't a big shift to think user journeys, while is far closer to specification by example. A far easier way for people to explain themselves in terms of examples. And easier to write down. So firstly you have clear user story with clear acceptance criteria. 

There is no need to get precious about keeping Gherkin readable. Infinitely quicker to update element references and data in Gherkin files than in code. Pragmatism over coding showcase.  After a project the most useful thing to reuse is the framework itself and if your Gherkin is granular enough, easily portable to different projects.  Specification language was aimed at a means to draw more into the acceptance criteria of specifications. The acceptance criteria commonly provides more clarity to specs.

Is there are danger in being constrictive? While it may seem we communicate complex things, a lot of what we say that is actually useful is a lot smaller vocabulary than you would imagine. The actual language used to communicate something to someone is small.
