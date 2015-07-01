var Metalsmith = require('metalsmith');
var metadata = require('metalsmith-metadata');
var excerpts = require('metalsmith-better-excerpts');
var feed = require('metalsmith-feed');
var writemetadata = require('metalsmith-writemetadata');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var branch = require('metalsmith-branch');
var tags = require('metalsmith-tags');
var drafts = require('metalsmith-drafts');
var pagination = require('metalsmith-pagination');
var highlight = require('highlight.js');
var htmlMinifier = require("metalsmith-html-minifier");
var join = require('path').join;
var config = require('./config.js');
var http = require('http');
var sitemap = require('metalsmith-sitemap');
var dateFilter = require('nunjucks-date-filter');
var cons = require('consolidate');
var env;

cons.requires.nunjucks = require('nunjucks');
env = cons.requires.nunjucks.configure('./templates', {watch: false});

dateFilter.setDefaultFormat('MMMM D, YYYY');
env.addFilter('date', dateFilter);

function livereload(){
  http.get("http://localhost:35729/changed?files=1", function(res) {})
    .on('error', function(e){});
}

// TODO - reorganize these tasks
function build(production){
  var configData;

  if(production){
    configData = config.production;
  } else {
    configData = config.development;
  }

  return Metalsmith(__dirname)
    .clean(false)
    .metadata(configData)
    .use(drafts())
    .use(templates({
      engine: 'nunjucks',
      inPlace: true,
      pattern: '**/*.md'
    }))
    .use(collections({
      posts: {
        pattern: 'posts/*.md',
        sortBy: 'date',
        reverse: true
      },
      pages: {
        pattern: '*.md',
        sortBy: 'priority'
      }
    }))
    .use(markdown({
      langPrefix: 'hljs ',
      highlight: function (code) {
        return highlight.highlightAuto(code).value;
      }
    }))
    .use(
      branch(function(filename,props,i){
        return props.collection[0] == 'posts';
      }).use(permalinks({
        pattern: 'blog/:title',
        relative: false
      }))
    )
    .use(
      branch(function(filename,props,i){
        return props.collection[0] != 'posts';
      }).use(permalinks({
        pattern: ':title',
        relative: false
      }))
    )
    .use(feed({collection: 'posts'}))
    .use(excerpts({
      pruneLength: 160
    }))
    .use(pagination({
      'collections.posts': {
        perPage: 10,
        template: 'collection.html',
        first: 'blog/index.html',
        path: 'blog/:num/index.html'
      }
    }))
    .use(tags({
      handle: 'tags',
      template:'tags.html',
      path:'tags/:tag/index.html',
      pathPage: 'tags/:tag/:num/index.html',
      perPage: 10,
      sortBy: 'data',
      reverse: true
    }))
    // render template data in markdown files
    .use(templates({
      engine: 'nunjucks'
    }))
    .use(writemetadata({
      bufferencoding: 'utf8',
      collections: {
        posts: {
          output: {
            asObject: true,
            path: 'blog/index.json',
            metadata: {
              "type": "list"
            }
          },
          ignorekeys: ['history', 'stats', 'next', 'template', 'previous', 'collection', 'mode'],
        }
      }
    }))
    .use(sitemap({
      hostname: configData.site.url,
      defaults: {
        lastModified: Date.now()
      },
      root: {
        lastModifed: Date.now()
      }
    }))
    .use(htmlMinifier())
    .destination('build/')
    .build(function(err,files){
      if (err){ console.log(err); }
      livereload();
    });
}

module.exports = build;