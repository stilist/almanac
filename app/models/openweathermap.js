import DS from 'ember-data';

export default DS.Model.extend({
  weather: DS.hasManyFragments('openweathermap-conditions', { defaultValue: [] })
});
