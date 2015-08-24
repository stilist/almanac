import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: 'http://api.openweathermap.org',
  namespace: 'data/2.5/weather',

  buildURL: function (modelName, id) {
    const [lat, lng] = id.split(',');
    const url = `${this.get('host')}/${this.get('namespace')}`;
    const params = `lat=${lat}&lon=${lng}&APPID=${config.OPENWEATHERMAP_API_KEY}`;

    return `${url}?${params}`;
  },

  handleResponse: function (status, headers, payload) {
    if (this.isSuccess(status, headers, payload)) {
      payload.id = `${payload.latitude},${payload.longitude}`;

      return { openweathermap: payload };
    } else {
      this._super(status, headers, payload);
    }
  }
});
