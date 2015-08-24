import Ember from 'ember';

const images = {
  haze: 'ICAO_SigWx/WeatherSymbol_ICAO_WidespreadHaze',
  light_rain: 'ICAO_SigWx/WeatherSymbol_ICAO_Drizzle',
  moderate_rain: 'ICAO_SigWx/WeatherSymbol_ICAO_Rain',
  heavy_intensity_rain: 'ICAO_SigWx/WeatherSymbol_ICAO_Rain',
  smoke: 'ICAO_SigWx/WeatherSymbol_ICAO_WidespreadSmoke'
};

export function weatherIcon(params/*, hash*/) {
  if (!params) {
    return '';
  }

  let conditions = params[0];
  if (!conditions.length) {
    conditions = [conditions];
  }

  let image;
  for (let condition of conditions) {
    const formatted = condition.replace(/\s+/g, '_');

    if (images[formatted]) {
      image = images[formatted];
      break;
    }
  }

  if (!image) {
    return '';
  }

  return `<img class='stationModel-current'
      src='/assets/images/weather-symbols/${image}.svg'>`;
}

export default Ember.Helper.helper(weatherIcon);
