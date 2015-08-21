import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: 'https://api.forecast.io',
  namespace: `forecast/${config.FORECAST_API_KEY}`,

  // TODO private method
  ajaxOptions: function (url, type, options) {
    let hash = this._super(url, type, options);
    hash.dataType = 'jsonp';

    return hash;
  },

  buildURL: function (modelName, id) {
    return `${this.get('host')}/${this.get('namespace')}/${id}?units=si`;
  },

  // TODO can maybe handle this in the serializer's `normalize`?
  handleResponse: function (status, headers, payload) {
    if (this.isSuccess(status, headers, payload)) {
      payload.id = `${payload.latitude},${payload.longitude}`;

      return { forecast: payload };
    } else {
      this._super(status, headers, payload);
    }
  }
});
