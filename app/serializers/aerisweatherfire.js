import DS from 'ember-data';

function parseReport(hash) {
  let out = {
    area: hash.report.areaKM,
    bearing: hash.relativeTo.bearing,
    cause: hash.report.cause,
    confidence: hash.report.conf,
    distance: hash.relativeTo.distanceKM,
    fire_type: hash.report.type,
    fuels: hash.report.fuels,
    incident_team: hash.report.imtType,
    lat: hash.loc.lat,
    lng: hash.loc.long,
    location_name: hash.report.name,
    percent_contained: hash.report.perContained,
    terrain: hash.report.terrain
  };

  if (hash.report.expContainedISO) {
    out.contained_by_date = new Date(hash.report.expContainedISO);
  }
  if (hash.report.expContainedISO) {
    out.started_date = new Date(hash.report.startDateISO);
  }

  return out;
}

export default DS.RESTSerializer.extend({
  normalizeHash: {
    aerisweatherfire(hash) {
      if (hash.reports) {
        hash.reports = hash.reports.map(report => parseReport(report));
      }

      return hash;
    }
  }
});
