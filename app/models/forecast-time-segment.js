import DS from 'ember-data';

const attr = DS.attr;

export default DS.ModelFragment.extend({
  timeSeries: DS.hasManyFragments('forecast-data', { defaultValue: null }),
  icon: attr('string'),
  summary: attr('string')
});
