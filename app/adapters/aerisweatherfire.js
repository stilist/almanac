import AerisWeatherAdapter from './aerisweather-base';

export default AerisWeatherAdapter.extend({
  namespace: 'fires/closest',

  buildURL(modelName, id) {
    const params = `p=${id}&limit=25`;

    return this._super(params);
  },

  handleResponse: function (status, headers, payload) {
    if (this.isSuccess(status, headers, payload)) {
      return { aerisweatherfire: { reports: payload.response } };
    } else {
      return this._super(status, headers, payload);
    }
  }
});
