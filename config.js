var config = {
  site: {
    url: process.env.BASE_URL || 'http://eddywashere.com',
    title: 'eddy was here',
    comments: true,
    disqus: 'eddywashere',
    googleAnalytics: 'UA-7686535-1'
  }
};

config.baseUrl = '';//config.site.url;

module.exports = config;