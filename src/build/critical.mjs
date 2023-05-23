import {stream as critical} from 'critical';
import {generate} from 'critical';
import log from 'fancy-log';

let criticalCssConfig = {
  concurrency: 2, //this is the number of tasks that run concurrently, large numbers could lead to errors / memory leaks
  baseUrl: 'https://foac.local.dev',
  strictSSL: false,
  suffix: '.min.css',
  criticalWidth: 2560,
  criticalHeight: 1330,
  criticalIgnore: [
    '@font-face'
  ],
  pages: [
    {
      url: '/',
      template: 'home'
    },
    {
      url: '/our-partners',
      template: 'partners'
    },
    {
      url: '/homeowners',
      template: 'homeowners'
    },
    {
      url: '/about',
      template: 'about'
    },
    {
      url: '/about/leadership',
      template: 'leadership'
    },
    {
      url: '/about/esg',
      template: 'esg'
    },
    {
      url: '/about/dei',
      template: 'dei'
    },
    {
      url: '/about/philanthropy',
      template: 'philanthropy'
    },
    {
      url: '/about/philanthropy/grant-recipients',
      template: 'grant-recipients'
    },
    {
      url: '/about/philanthropy/credit-card-giving',
      template: 'credit-card-giving'
    },
    {
      url: '/about/careers',
      template: 'careers'
    },
    {
      url: '/contact-us',
      template: 'contact'
    },
    {
      url: '/okta-help',
      template: 'okta-help'
    },
    {
      url: '/privacy-policy',
      template: 'privacy'
    },
    {
      url: '/privacy-policy/customer',
      template: 'privacy-customer'
    },
    {
      url: '/privacy-policy/notice-at-collection',
      template: 'privacy-notice-at-collection'
    },
    {
      url: '/privacy-policy/employee',
      template: 'privacy-employee'
    },
    {
      url: '/privacy-policy/vendor',
      template: 'privacy-vendor'
    },
    {
      url: '/terms-of-use',
      template: 'terms-of-use'
    },
    {
      url: '/404-page/',
      template: '404'
    },
  ]
};

criticalCssConfig.pages.forEach(page => {
  const url = criticalCssConfig.baseUrl + page.url + '?criticalcss=false';
  log(`Generating critical CSS for template ${page.template} with URL ${url}`);
  // critical.generate returns a Promise.
  generate({
    // Inline the generated critical-path CSS
    // - true generates HTML
    // - false generates CSS
    inline: false,

    concurrency: 2,

    // Your base directory
    base: './',

    rebase: false,
    request : {
      https: {
        rejectUnauthorized: false
      }

    },

    // HTML source

    // HTML source file
    src: url,

    // Your CSS Files (optional)
    css: [
      'css/foac.css',
    ],

    // Viewport width
    width: 2560,

    // Viewport height
    height: 1330,

    dimensions: [
      {
        height: 1330,
        width: 2560,
      },
      {
        height: 1330,
        width: 1600,
      },
      {
        height: 900,
        width: 1440,
      },
      {
        height: 1180,
        width: 820,
      },
      {
        height: 926,
        width: 428,
      },
      {
        height: 812,
        width: 375,
      }
    ],


    // Output results to file
    target: {
      css: "./critical/" + page.template + criticalCssConfig.suffix,

      // html: 'index-critical.html',
      // uncritical: 'uncritical.css',
    },

    // Minify critical-path CSS when inlining

    // Extract inlined styles from referenced stylesheets
    extract: true,

    // ignore CSS rules
    ignore: {
      // atrule: ['@font-face'],
      // rule: [/some-regexp/],
      // decl: (node, value) => /big-image\.png/.test(value),
    },
  });
});
