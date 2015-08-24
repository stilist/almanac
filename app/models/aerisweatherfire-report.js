import DS from 'ember-data';

const attr = DS.attr;

export default DS.ModelFragment.extend({
  area: attr('number'),
  bearing: attr('number'),
  cause: attr('string'),
  confidence: attr('number'),
  contained_by_date: attr('date'),
  distance: attr('number'),
  fire_type: attr('string'),
  fuels: attr('string'),
  incident_team: attr('number'),
  lat: attr('number'),
  lng: attr('number'),
  location_name: attr('string'),
  percent_contained: attr('number'),
  started_date: attr('date'),
  terrain: attr('string')
});
