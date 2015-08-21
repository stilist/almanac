import Ember from 'ember';
import DS from 'ember-data';

const inflector = Ember.Inflector.inflector;

inflector.uncountable('forecast');

export default DS.RESTAdapter.extend({
});
