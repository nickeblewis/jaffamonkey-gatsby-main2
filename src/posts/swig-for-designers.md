---
title: Swig For Designers
template: post.html
date: "2015-06-20"
author: Eddy Hernandez
tags:
    - swig
    - node
    - templating
draft: false
---

## What's Swig?

[Swig](http://paularmstrong.github.io/swig) is a node.js templating engine that includes things like layouts, partials, logic tags and filters out of the box. Simple ingredients to make designing for the web a pleasant experience.

#### Why use Swig over something like handlebars?

Well, when I was rebuilding my site in [metalsmith](http://www.metalsmith.io/) with [metalsmith-templates](https://github.com/segmentio/metalsmith-templates), I needed some logic to live in my templates and proper layout support. With [handlebars](http://handlebarsjs.com/) I ended up writing and registering way too many custom helpers in handlebars to accomplish a fraction of the features that come standard in Swig. Lastly, it's nice to focus on creating content and not writing a templating engine from scratch.

#### Before we get started

This post assumes you already have a project that has Swig integrated or you're working with a project that use [consolidate.js](https://github.com/tj/consolidate.js) to offer plug and play options for [supported templating engines](https://github.com/tj/consolidate.js#supported-template-engines) like Swig. Some examples include [express](http://learnwebtutorials.com/using-swig-templates-with-expressjs), [metalsmith](https://github.com/segmentio/metalsmith-templates#javascript-usage), or [Node Email Templates](https://github.com/niftylettuce/node-email-templates#supported-template-engines). If you don't already have a project, consider going through the [Getting Started](http://paularmstrong.github.io/swig/docs#install) from docs page.

## Getting to know Swig

In order to better understand Swig, I'll break things out the way Shopify documentation did for liquid templating with [Liquid for Designers](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) and sprinkle in the best parts of the Swig docs.

First off, there are two main types of markup in Swig

- Output Tags
- Logic Tags

__Output tags__ are surrounded by double curly brackets and are expected to render content if the data exists.

```python
{{ data }}
```

__Logic tags__ begin with a curly bracket and then percent sign. These tags control output through common logic operators and helpers.

```python
{% if foo %} this is rendered if foo == true {% endif %}
```

## Output Tags

Here's a simple example of Output:

```python
# context = {name: 'world', user: {greeting: 'hello'}};

Hello {{ name }}
# Hello world

Hello {{ user.greeting }}
# Hello hello

Hello {{ 'bob' }}
# Hello bob
```

### Filters

Output tags can process content through filters.  Filters are simple methods.  The first parameter is always the output of the left side of the filter.  The return value of the filter will be the new left value when the next filter is run.  When there are no more filters, the template will receive the resulting string.

```python
context = {name: 'world'};

Hello {{ 'world' | upper }}
# Hello WORLD

Hello world has {{ name.length }} letters!
# Hello world has 5 letters!

Hello {{ Date.now() | date('Y-m-d') }}
# Hello 2015-06-20
```

Here's a list of the available filters in Swig:

* `capitalize` capitalize words in the input sentence - [docs](http://paularmstrong.github.io/swig/docs/filters/#capitalize)
* `lower` convert an input string to lowercase - [docs](http://paularmstrong.github.io/swig/docs/filters/#lower)
* `upper` convert an input string to uppercase - [docs](http://paularmstrong.github.io/swig/docs/filters/#upper)
* `title` capitalizes every word given and lower-cases all other letters [docs](http://paularmstrong.github.io/swig/docs/filters/#title)
* `date` reformat a date - [docs](http://paularmstrong.github.io/swig/docs/filters/#date)
* `default` If the input is `undefined`, `null`, or `false`, a default return value can be specified - [docs](http://paularmstrong.github.io/swig/docs/filters/#default)
* `json` - render a string representation of an JavaScript object - [docs](http://paularmstrong.github.io/swig/docs/filters/#json)
* `striptags` strip html from string - [docs](http://paularmstrong.github.io/swig/docs/filters/#striptags)
* `safe` - forces the input to not be auto-escaped. Use this only on content that you know is safe to be rendered on your page - [docs](http://paularmstrong.github.io/swig/docs/filters/#safe)
* `raw` - ^ see safe [docs](http://paularmstrong.github.io/swig/docs/filters/#safe)
* `replace` replace each occurrence of a string - [docs](http://paularmstrong.github.io/swig/docs/filters/#replace)
* `escape` escape a string - [docs](http://paularmstrong.github.io/swig/docs/filters/#escape)
* `addslashes` - add backslashes to characters that need to be escaped - [docs](http://paularmstrong.github.io/swig/docs/filters/#default)
* `url_encode` - URL-encode a string - [docs](http://paularmstrong.github.io/swig/docs/filters/#url_encode)
* `url_decode` - URL-decode a string - [docs](http://paularmstrong.github.io/swig/docs/filters/#url_decode)
* `first` - get the first element of the passed in array, object or string - [docs](http://paularmstrong.github.io/swig/docs/filters/#first)
* `last` - get the last element of the passed in array, object or string [docs](http://paularmstrong.github.io/swig/docs/filters/#last)
* `reverse` - reverse sort the values passed in - [docs](http://paularmstrong.github.io/swig/docs/filters/#reverse)
* `sort` sort the input in an ascending direction - [docs](http://paularmstrong.github.io/swig/docs/filters/#sort)
* `join` join elements of the array with certain character between them - [docs](http://paularmstrong.github.io/swig/docs/filters/#join)
* `groupBy` group an array of objects by a common key - [docs](http://paularmstrong.github.io/swig/docs/filters/#groupBy)
* `uniq` remove all duplicate items from an array - [docs](http://paularmstrong.github.io/swig/docs/filters/#uniq)

## Logic Tags

These tags include common helpers for dealing with logic in your template. They can also be used to include partials and reference layouts that the current view should be rendered in.

Here's a list of currently supported [tags](http://paularmstrong.github.io/swig/docs/tags/): `autoescape`, `block`, `else`, `elif`, `extends`, `filter`, `for`, `if`, `import`, `include`, `macro`, `parent`, `raw`, `set`, `spaceless`.

### Extends & Blocks (Layouts)

Layouts can define `blocks` of content areas that are placeholders for content from pages. Each page can reference a layout by using the `extends` tag.

__layout.html__

```python
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>{% block title %}My Site{% endblock %}</title>

  {% block head %}
  <link rel="stylesheet" href="main.css">
  {% endblock %}
</head>
<body>
  {% block content %}{% endblock %}
</body>
</html>
```

__page.html__

```python
{% extends 'layout.html' %}

{% block title %}My Page{% endblock %}

{% block head %}
  {% parent %}
  <link rel="stylesheet" href="custom.css">
{% endblock %}

{% block content %}
<p>This is just an awesome page.</p>
{% endblock %}
```

__Output__

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>My Page</title>

  <link rel="stylesheet" href="main.css">
  <link rel="stylesheet" href="custom.css">
</head>
<body>
  <p>This is just an awesome page.</p>
</body>
</html>
```

### Includes (Partials)

You can include a template partial with the current local data available to it or by specifying a specific context.

__partial.html__

```python
<ul>
{% for tag in tags %}<li>{{ tag }}</li>{% endfor %}
</ul>
```

__page.html__

```python
// var tags = ['node', 'swig', 'templating']
{% include "./partial.html" %}
```

__Output__

```html
<!doctype html>
<ul>
  <li>node</li>
  <li>swig</li>
  <li>templating</li>
</ul>
```

### Raw

Raw temporarily disables tag processing. This is useful for generating content (eg, Angular, Mustache, Handlebars) which uses conflicting syntax.

```python
In Angular.js, {% raw %}{{ data }}{% endraw %} will be HTML-escaped.
```

### If / Else

`if / else` should be well-known from any other programming language.
Swig allows you to write simple expressions in the `if` (and
optionally, `elseif`) clause:

```python
{% if user %}
  Hello {{ user.name }}
{% endif %}
```

```python
# Same as above
{% if user != null %}
  Hello {{ user.name }}
{% endif %}
```

```python
{% if user.name == 'tobi' %}
  Hello tobi
{% elseif user.name == 'bob' %}
  Hello bob
{% endif %}
```

```python
{% if user.name == 'tobi' or user.name == 'bob' %}
  Hello tobi or bob
{% endif %}

# or

{% if user.name == 'tobi' || user.name == 'bob' %}
  Hello tobi or bob
{% endif %}
```

```python
{% if user.name == 'bob' and user.age > 45 %}
  Hello old bob
{% endif %}

# or

{% if user.name == 'bob' && user.age > 45 %}
  Hello old bob
{% endif %}
```

```python
{% if user.name != 'tobi' %}
  Hello non-tobi
{% endif %}
```

```python
# Check for the size of an array
{% if user.payments.length %}
   you never paid !
{% endif %}

{% if user.payments.length > 0  %}
   you paid !
{% endif %}
```

```python
{% if user.age > 18 %}
   Login here
{% else %}
   Sorry, you are too young
{% endif %}
```

```python
# array = 1,2,3
{% if array.indexOf(2) > -1 %}
   array includes 2
{% endif %}
```

```python
# string = 'hello world'
{% if string.indexOf('hello world') > -1 %}
   string includes 'hello'
{% endif %}
```

### For loops

Swig allows `for` loops over arrays and objects:

```python
{% for item in ['one', 'two', 'three'] %}
  {{ item }}
{% endfor %}
```

```html
one
two
three
```


```python
{% set obj = {'one': 'value', 'two': 'other value'} %}
{% for x in obj %}
  {% if loop.first %}<ul>{% endif %}
  <li>{{ loop.index }} - {{ loop.key }}: {{ x }}</li>
  {% if loop.last %}</ul>{% endif %}
{% endfor %}
```

```html
<ul>
  <li>1 - one: value</li>
  <li>2 - two: other value</li>
</ul>
```

During every `for` loop, the following helper variables are available for extra
styling needs:

- `loop.index` the current iteration of the loop (1-indexed)
- `loop.index0` the current iteration of the loop (0-indexed)
- `loop.revindex` the number of iterations from the end of the loop (1-indexed)
- `loop.revindex0` the number of iterations from the end of the loop (0-indexed)
- `loop.key` if the iterator is an object, this will be the key of the current item, otherwise it will be the same as the loop.index.
- `loop.first` true if the current object is the first in the object or array.
- `loop.last` true if the current object is the last in the object or array.


Reversing the loop

```python
{% for item in collection | reverse %} {{item}} {% endfor %}
```

### Variable Assignment

You can store data in your own variables, to be used in output or other tags as
desired.  The simplest way to create a variable is with the `set` tag, which
has a pretty straightforward syntax:

```python
{% set name = 'freestyle' %}

{% for t in collections.tags %}{% if t == name %}
  <p>Freestyle!</p>
{% endif %}{% endfor %}
```

Another way of doing this would be to assign `true / false` values to the
variable:

```python
{% set freestyle = false %}

{% for t in collections.tags %}{% if t == 'freestyle' %}
  {% assign freestyle = true %}
{% endif %}{% endfor %}

{% if freestyle %}
  <p>Freestyle!</p>
{% endif %}
```

## Comments

Comments do not adhere to the curly bracket plus percent sign tag or the double curly brackets tag. Comments are possible through the following tag format `{# comment #}`.

Check out the following examples:

```python
We made 1 million dollars {# in losses #} this year
```

Which outputs to

```python
We made 1 million dollars this year
```

Multiline Comments

```python
{#
This is a comment.
It will be fully stripped and ignored during parsing.
#}
```

## Wrapping things up

Swig is a powerful and flexible templating option for node.js. Consider using it the next time you need to support layouts, partials, filters and logic in your node projects. To learn more about swig, give a thorough look through [Swig Docs](http://paularmstrong.github.io/swig).

Have an example of how you use Swig? Share a link in the comment section below :]
