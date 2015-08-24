/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    dotEnv: {
      clientAllowedKeys: [
        'AERIS_API_KEY', 'AERIS_API_SECRET', 'FORECAST_API_KEY',
        'OPENWEATHERMAP_API_KEY'
      ]
    },

    sassOptions: {
      includePaths: [
        'app'
      ]
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import(app.bowerDirectory + '/d3-transform/src/d3-transform.js', {
    'd3Transform': ['d3Transform']
  });

  var weather_symbols = new Funnel('bower_components/weather-symbols', {
    srcDir: '/symbols',
    include: ['**/*.svg'],
    destDir: '/assets/images/weather-symbols/'
  });

  return app.toTree(weather_symbols);
};
