import Ember from 'ember';

function celcius2fahrenheit(temperature) {
  return (temperature * 1.8) + 32;
}
function kilometers2miles(distance) {
  return distance * 0.621;
}

export default Ember.Component.extend({
  classNames: ['stationModel'],

  currently: Ember.computed('forecast', 'id', function () {
    return this.get('forecast.currently');
  }),

  dewPoint: Ember.computed('currently', function () {
    const dewPoint = this.get('currently.dewPoint');

    return ~~(celcius2fahrenheit(dewPoint));
  }),
  pressure: Ember.computed('currently', function () {
    const pressure = ~~(this.get('currently.pressure') * 10);
    const truncated = (pressure + '').replace(/^(9|10)/, '');

    return truncated;
  }),
  temperature: Ember.computed('currently', function () {
    const temperature = this.get('currently.temperature');

    return ~~(celcius2fahrenheit(temperature));
  }),
  visibility: Ember.computed('currently', function () {
    const visibility = this.get('currently.visibility');
    const converted = kilometers2miles(visibility);

    return (converted > 1) ? Math.round(converted) : converted;
  }),

  // TODO remove when the model is figured out v
  windBearing: Ember.computed('currently', function () {
    return this.get('currently.windBearing');
  }),
  windSpeed: Ember.computed('currently', function () {
    const speed_mps = this.get('currently.windSpeed');

    // convert from M/s to knots
    return speed_mps * 1.94;
  }),
  cloudCover: Ember.computed('currently', function () {
    let cover = Math.round(this.get('currently.cloudCover') * 10);
    cover = Math.min(cover, 9);

    return cover;
  })
  // TODO remove when the model is figured out ^
});
