import ApplicationAdapter from './application';
import config from '../config/environment';

export default ApplicationAdapter.extend({
  host: 'http://api.aerisapi.com',

  buildURL(params) {
    const url = `${this.get('host')}/${this.get('namespace')}`;

    params = params ? `${params}&` : '';
    params += `client_id=${config.AERIS_API_KEY}&client_secret=${config.AERIS_API_SECRET}`;

    return `${url}?${params}`;
  }
});
