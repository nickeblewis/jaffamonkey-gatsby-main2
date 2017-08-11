---
title: Test Engineering Guide
date: "2017-06-27"
layout: post
author: jaffamonkey
tags:
    - testengineering
    - devops
draft: false
---

I never use a zebra crossing in London - or anywhere else. Why? Because I don't trust the system.  Whatever idea you put in place, with as many rules and indicators as you like, there is still a chance you will get flattened, by someone who either like challenging rules, or too much of an idiot to get what they are.  

In tech, breaking rules can a healthier learning process. but still with it's fair share of the self-serving and the idiot. If like me, you avoid third-party commerical software monstrosities, and follow open source route, you will appreciate not only the wealth of code out there for test engineering and devops, but very active communities around certain opensource projects. Cucumber is a great example of this.

If you try test engineering with some decent programming skills, you will lurch from one peice of opensource to another. A common failure is to approach test engineering as a process of selecting a product. Open source is a different form of development, inlcuding entire frameworks. As an Angular developer would use addtional libraries and plugins to help deliver features, the test engineer should follow same principles.

As with the toadying developer, creating illusions of grandeur to the more tech-baffled amongst senior management ("Why is he a rockstar developer? because he says so!"), a toadying test engineer will swamp test framework with enough plugins to generate unnessceary but pretty reports, and create hundreds of pointless tests. The team can be happy with this for a while, as no-one will delve too deep into test engineering. I have seen this way too much, sometimes tasked with retrieving a tangled framework, a result of many peoples "play and run" contributions.

Here are a few of the dangers in test engineering:
- Becoming dependant of open source framework that does not suit your future needs.
- Selecting open source plugins/extensions in order to solve problems rather than enhance.
- Failing to realise test engeering is part of devops.
- The test engineer and the team getting lost in illusion that more tests, are more useful.
- Focusing on repetitively testing features, instead of overall journeys. Start early.
- Dependencies on framework and tools you do not truly understand.

An good way to orientate yourself in test engineering, in terms of project flow, is learning when to consolidate/conbine tests. It's not a matter of deleting irrelevant tests, its a matter of maintaining their evolution with development progress.

When to consolidate tests:
- As journeys evolve
- When you find yourself copy/pasting too much
- Tests have too many similar test steps