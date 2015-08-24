/* jshint node: true */

const data_apis = [
  {
    env: ['AERIS_API_KEY', 'AERIS_API_SECRET'],
    host: 'http://api.aerisapi.com'
  },
  {
    env: ['FORECAST_API_KEY'],
    host: 'https://api.forecast.io'
  },
  {
    env: ['OPENWEATHERMAP_API_KEY'],
    host: 'http://api.openweathermap.org'
  }
];

var csp_domains = ["'self'"];
for (var data_api of data_apis) {
  if (data_api.host) {
    csp_domains.push(data_api.host);
  }
}
csp_domains = csp_domains.join(' ');

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'almanac',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    contentSecurityPolicy: {
      'connect-src': csp_domains,
      'script-src': csp_domains
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  for (var data_api of data_apis) {
    if (!data_api.env) {
      return;
    }

    for (var env_var of data_api.env) {
      ENV[env_var] = process.env[env_var];
    }
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
