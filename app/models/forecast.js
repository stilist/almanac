import DS from 'ember-data';

const attr = DS.attr;

export default DS.Model.extend({
  currently: DS.hasOneFragment('forecast-data', { defaultValue: null }),
  daily: DS.hasOneFragment('forecast-time-segment', { defaultValue: null }),
  hourly: DS.hasOneFragment('forecast-time-segment', { defaultValue: null }),
  latitude: attr('number'),
  longitude: attr('number'),
  minutely: DS.hasOneFragment('forecast-time-segment', { defaultValue: null })
});
