import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeHash: {
    forecast(hash) {
      // only keep the data that’s interesting
      const data = {
        id: `${hash.coord.lat},${hash.coord.lon}`,
        weather: hash.weather
      };

      return data;
    }
  }
});
