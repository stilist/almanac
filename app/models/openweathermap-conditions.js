import DS from 'ember-data';

const attr = DS.attr;

export default DS.ModelFragment.extend({
  description: attr('string'),
  icon: attr('string'),
  main: attr('string')
});
