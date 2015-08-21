import Ember from 'ember';

function generateElement(name, attrs) {
  let out = [`<${name}`];

  for (let key in attrs) {
    out.push(`${key}='${attrs[key]}'`);
  }

  out.push('/>');

  return out.join(' ');
}

function addClasses(elem, classes) {
  const $elem = Ember.$(elem);
  const $wrapper = Ember.$('<div></div>');

  $elem.addClass(classes);
  $wrapper.append($elem);

  return $wrapper.html();
}

function getCoordinatesForAngle(angle, radius) {
  const radians = angle * Math.PI / 180;

  // [x, y]
  return [
    radius + (radius * Math.cos(radians)),
    radius + (radius * Math.sin(radians))
  ];
}

function getArc(percent, radius) {
  percent = Math.max(percent, 0);
  percent = Math.min(percent, 100);

  if (percent === 100) {
    return generateElement('circle', {
      class: 'okta-arc',
      cx: radius + 1,
      cy: radius + 1,
      r: radius
    });
  }

  const degrees = (percent / 100) * 360;
  const large_arc = (degrees > 180) ? 1 : 0;
  // TODO I don’t understand why the `-90` is needed, but it’s wrong otherwise.
  // See: http://stackoverflow.com/a/18473154/672403
  const end_coords = getCoordinatesForAngle(degrees - 90, radius);

  const data = `M${radius},0
      A${radius},${radius} 0 ${large_arc} 1 ${end_coords[0]},${end_coords[1]}
      L${radius},${radius} z`;

  return generateElement('path', {
    class: 'okta-arc',
    d: data
  });
}

function getLine(start_pct, radius) {
  const start_angle = (start_pct / 100) * 360;
  const start_coords = getCoordinatesForAngle(start_angle, radius);

  let end_pct = start_pct + 50;
  if (end_pct > 100) {
    end_pct -= 100;
  }
  const end_angle = (end_pct / 100) * 360;
  const end_coords = getCoordinatesForAngle(end_angle, radius);

  return generateElement('line', {
    class: 'okta-line',
    x1: start_coords[0] + 1,
    x2: end_coords[0] + 1,
    y1: start_coords[1] + 1,
    y2: end_coords[1] + 1
  });
}

function getClasses(n, current) {
  let classes = ['okta-symbol', `okta-symbol--${n}`];

  if (n !== current) {
    classes.push('is-hidden');
  }

  return classes.join(' ');
}

function drawPartialCover(n, ctx) {
  const has_line = !!(n % 2);
  const fill_pct = ~~(n / 2) * 25;
  const has_circle = fill_pct > 0;
  const radius = ctx.get('radius');
  const classes = getClasses(n, ctx.get('okta'));

  let circle;
  if (has_circle) {
    circle = getArc(fill_pct, radius);
  }

  let line;
  if (has_line) {
    const start_pct = (n === 1) ? 25 : fill_pct;

    line = getLine(start_pct, radius);
  }

  let out;
  if (has_circle && has_line) {
    out = `<g class='${classes}'>
      ${circle}
      ${line}
    </g>`;
  } else {
    const $out = has_circle ? Ember.$(circle) : Ember.$(line);
    out = addClasses($out, classes);
  }

  return out;
}

export default Ember.Component.extend({
  classNames: ['okta'],
  tagName: 'svg',

  attributeBindings: ['height', 'width'],
  height: Ember.computed('radius', function () {
    return 4 + (this.get('radius') * 2);
  }),
  width: Ember.computed('radius', function () {
    return 4 + (this.get('radius') * 2);
  }),

  position: Ember.computed('radius', function () {
    // account for 2px stroke
    return this.get('radius') + 1;
  }),

  oktas: Ember.computed('radius', 'okta', function () {
    const okta = this.get('okta');
    const radius = this.get('radius');

    let oktas = [];
    for (var i = 1; i < 7; i++) {
      oktas.push(drawPartialCover(i, this));
    }

    const okta_7 = `<g class='${getClasses(7, okta)}'>
      ${getArc(100, radius)}
      ${getLine(25, radius)}
    </g>`;
    oktas.push(okta_7);

    let okta_8 = getArc(100, radius);
    okta_8 = addClasses(okta_8, getClasses(8, okta));
    oktas.push(okta_8);

    const okta_9 = `<g class='${getClasses(9, okta)}'>
      ${getLine(12.5, radius)}
      ${getLine(37.5, radius)}
    </g>`;
    oktas.push(okta_9);

    return oktas.join('');
  })
});
