# Ember-test

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* Add `.env` file in the project’s root directory.
* Add API keys to `.env`:
  * `AERIS_API_KEY=<client_id>` / `AERIS_API_SECRET=<client_secret>` ([AerisWeather](http://www.aerisweather.com/signup/); choose ‘API Developer’, then add an app)
  * `FORECAST_API_KEY=<key>` ([Dark Sky Forecast API](https://developer.forecast.io/))
  * `OPENWEATHERMAP_API_KEY=<key>` ([OpenWeatherMap](http://openweathermap.org/register))
* `ember server`
* Visit your app at [http://localhost:4100](http://localhost:4100).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

