import Ember from 'ember';

// TODO extract to user config
const coords = [45.5234515, -122.6762071];

export default Ember.Route.extend({
  setupController(controller, models) {
    if (!models) {
      return;
    }

    if (models.forecast) {
      controller.set('forecast_model', models.forecast);
    }
  },

  model() {
    const forecast = this.store.findRecord('forecast', coords.join(','));

    return {
      forecast: forecast
    };
  }
});
