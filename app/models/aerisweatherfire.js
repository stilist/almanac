import DS from 'ember-data';

export default DS.Model.extend({
  reports: DS.hasManyFragments('aerisweatherfire-report', { defaultValue: [] })
});
