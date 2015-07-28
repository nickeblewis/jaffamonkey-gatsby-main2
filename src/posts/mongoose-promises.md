---
title: Switching out callbacks with promises in Mongoose
template: post.html
date: 2015-07-28
author: Eddy Hernandez
tags: mongo node mongoose promises
---

Working with promises and mongoose just became a whole lot easier with the [4.1 release](https://github.com/Automattic/mongoose/blob/master/History.md#410--2015-07-24) which added the ability to specify alternative promise libraries. Prior to that, promise support was limited to the [mpromise](https://github.com/aheckmann/mpromise) way of using promises. For some folks, like myself, this meant there wasn't a friendly `.catch` method available to your promise chain. In this post I'll quickly cover how to switch over to the other supported promise libraries and show how using promises can clean up your mongoose callbacks.

Normally when using mongoose, you just need to require it. In order to switch out the promise provider you'll also need to require the promise library and point `mongoose.Promise` to it. In the following example I set the promise library to bluebird.

```js
var mongoose = require('mongoose');
// set Promise provider to bluebird
mongoose.Promise = require('bluebird');
```

Here's the example for using native promises or `q`.

```js
// q
mongoose.Promise = require('q').Promise;
// native promises
mongoose.Promise = global.Promise;
```

That's as simple and non-hacky as one could hope for. Next up I'll show what typical mongoose callbacks look like and how you can swap that out for promises. In these last examples I'll look up a user by id, update the user's name and finally save it.

```js
// error first callback style
User.findById('123', function(err, user) {
  if (err) {
    return console.log('error:', err);
  }

  user.name = 'Robert Paulson';

  user.save(function(err) {
    // yet another err object to deal with
    if (err) {
      return console.log('error:', err);
    }
    console.log('updated user: ' + user.name);
    // do something with updated user
  });
});
```

The above callback example shows the first level of nesting and multiple error handlers. That's not too bad but with more logic it can easily become overwhelming to look at. In the last example I'll show what the same task looks like using promises. We'll switch to using Model queries that return a promise via the `.exec()` function.

```js
var promise = User.findById('123').exec();

promise.then(function(user) {
  user.name = 'Robert Paulson';

  return user.save(); // returns a promise
})
.then(function(user) {
  console.log('updated user: ' + user.name);
  // do something with updated user
})
.catch(function(err){
  // just need one of these
  console.log('error:', err);
});
```

Note that there was only one error handler for both of the promises, `findById(id).exec()` and `user.save()`. For me, the benefit of using promises is really in the ability to read what's going on in the code and to consolidate error handling into one place with the option to break that out if needed. If that interests you, give promises in mongoose a try.