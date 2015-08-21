import DS from 'ember-data';

function fixTimeSeries(hash) {
  hash.timeSeries = hash.data;
  delete hash.data;

  return hash;
}

export default DS.RESTSerializer.extend({
  normalizeHash: {
    forecast: function (hash) {
      const time_series = ['daily', 'hourly', 'minutely'];

      for (let series of time_series) {
        if (hash[series]) {
          hash[series] = fixTimeSeries(hash[series]);
        }
      }

      return hash;
    }
  }
});
