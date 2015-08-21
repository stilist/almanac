import DS from 'ember-data';

const attr = DS.attr;

export default DS.ModelFragment.extend({
  apparentTemperature: attr('number'),
  cloudCover: attr('number'),
  dewPoint: attr('number'),
  precipIntensity: attr('number'),
  precipIntensityError: attr('number'),
  precipProbability: attr('number'),
  precipType: attr('string'),
  pressure: attr('number'),
  temperature: attr('number'),
  time: attr('number'),
  visibility: attr('number'),
  windBearing: attr('number'),
  windSpeed: attr('number')
});
