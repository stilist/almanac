import Ember from 'ember';

// TODO extract to user config
const coords = [45.5234515, -122.6762071];

export default Ember.Route.extend({
  setupController(controller, models) {
    if (!models) {
      return;
    }

    for (let key of Object.keys(models)) {
      controller.set(`${key}_model`, models[key]);
    }
  },

  model() {
    const forecast = this.store.findRecord('forecast', coords.join(','));
    const openweathermap = this.store.findRecord('openweathermap',
        coords.join(','));

    return Ember.RSVP.hash({
      forecast: forecast,
      openweathermap: openweathermap
    });
  }
});
