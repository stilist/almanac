import Ember from 'ember';
import _ from 'lodash/collection';
import d3 from 'd3';

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

  currentConditions: Ember.computed('currently', function () {
    const data = this.get('openweathermap.weather');

    return data.map(condition => condition.get('description'));
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
    const conditions_items = this.get('openweathermap.weather');
    const conditions = conditions_items.map(item => item.get('description'));
    const obscured = _.contains(conditions, 'haze', 'smoke');

    if (obscured) {
      return 9;
    }

    let cover = Math.round(this.get('currently.cloudCover') * 10);

    const scale = d3.scale.linear();
    scale.domain([0, 10]);
    scale.range([0, 8]);
    const scaled = Math.round(scale(cover));

    return scaled;
  })
  // TODO remove when the model is figured out ^
});
