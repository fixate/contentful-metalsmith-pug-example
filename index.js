const Metalsmith    = require('metalsmith');
const markdown      = require('metalsmith-markdown');
const dataMarkdown  = require('metalsmith-data-markdown');
const layouts       = require('metalsmith-layouts');
const permalinks    = require('metalsmith-permalinks');
const contentful    = require('contentful-metalsmith');
const jstransformer = require('metalsmith-jstransformer');

Metalsmith(__dirname)
  .metadata({
    title: "My Static Site & Blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .use(contentful({
    access_token : 'd458f6a1b1a62464b483ef600449977135d8e62b76bdbcbee674f3f4f0ded156',
    space_id: 'yqxk7rbdn4p7',
    common: {
      posts: {
        content_type: "2wKn6yEnZewu2SCCkus4as",
      },
    },
  }))
  .source('./src')
  .destination('./build')
  .use(permalinks())
  .use(markdown())
  .use(layouts({
    engine: 'pug',
    pretty: true,
  }))
  .use(jstransformer())
  .use(dataMarkdown({
    removeAttributeAfterwards: true
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
