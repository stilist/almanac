import Ember from 'ember';
import d3 from 'd3';

const canvas_size = 250;
const center = ~~(canvas_size / 2);
const line_length = ~~(canvas_size / 2.5);
const full_flag_length = ~~(line_length / 5);
const half_flag_length = ~~(full_flag_length / 2);
const animation_duration = 250;

function generateElement(name, attrs) {
  let out = [`<${name}`];

  for (let key in attrs) {
    out.push(`${key}='${attrs[key]}'`);
  }

  out.push('/>');

  return out.join(' ');
}

export default Ember.Component.extend({
  classNames: ['windBarb'],

  canvas_size: canvas_size,

  oktaRadius: Ember.computed('canvas_size', function () {
    return this.get('canvas_size') / 12.5;
  }),
  windBarb: Ember.computed('windSpeed', 'windBearing', function () {
    return this.get('roundedSpeed') ? this.drawBarb() : this.drawCalm();
  }),
  groupedBarbs: Ember.computed('windSpeed', function () {
    const speed = this.get('roundedSpeed');

    let remainder = speed;
    let pennant = 0;
    let full = 0;
    let half = 0;

    if (remainder >= 50) {
      pennant = ~~(remainder / 50);
      remainder -= (pennant * 50);
    }

    if (remainder >= 10) {
      full = ~~(remainder / 10);
      remainder -= (full * 10);
    }

    if (remainder >= 5) {
      half = ~~(remainder / 5);
    }

    return [pennant, full, half];
  }),
  roundedSpeed: Ember.computed('windSpeed', function () {
    return 5 * Math.round(this.get('windSpeed') / 5);
  }),
  speed: 0,

  drawFlag: function (flag_start, flag_length) {
    return generateElement('line', {
      class: 'windBarb-flag',
      x1: center,
      x2: center + flag_length,
      y1: flag_start,
      y2: flag_start - flag_length
    });
  },

  drawPennant: function (flag_start, flag_length) {
    const points = [
      [center, flag_start],
      [center + flag_length, flag_start],
      [center, flag_start + flag_length]
    ];
    const point_string = points.map((pairs) => pairs.join(',')).join(' ');

    return generateElement('polygon', {
      class: 'windBarb-pennant',
      points: point_string,
    });
  },

  drawBarb: function () {
    const shaft = generateElement('line', {
      class: 'windBarb-shaft',
      x1: center,
      x2: center,
      y1: center - this.get('oktaRadius'),
      y2: center - line_length
    });

    const barbs = this.get('groupedBarbs');
    let flag_start = center - line_length;
    let flags = [];
    barbs.forEach((group_size, groups_idx) => {
      let flag_length;
      if (groups_idx === 2) {
        flag_length = half_flag_length;

        // Special case: if there’s only a half flag, it’s pushed in from the
        // end to avoid confusion over whether it’s a half flag or full flag.
        if (!flags.length) {
          flag_start += full_flag_length;
        }
      } else {
        flag_length = full_flag_length;
      }

      for (let n = 0; n < group_size; n++) {
        let flag;

        if (!groups_idx) {
          flag = this.drawPennant(flag_start, flag_length);
        } else {
          // Push the first flag in 1px from the end to avoid a minor visual
          // gap
          if (!flags.length) {
            flag_start += 1;
          }

          flag = this.drawFlag(flag_start, flag_length);
        }

        flags.push(flag);

        if (!groups_idx) {
          if (n === (group_size - 1)) {
            flag_start += (full_flag_length + half_flag_length);
          } else {
            flag_start += full_flag_length;
          }
        } else {
          flag_start += half_flag_length;
        }
      }
    });

    let antipode = 180 + this.get('windBearing');
    if (antipode > 360) {
      antipode -= 360;
    }
    const transform = d3.svg.transform().
        rotate(antipode, center, center);
    const wrapped = `<g class='windBarb-barb' transform='${transform()}'>
      ${shaft}
      ${flags.join('\n')}
    </g>`;

    return wrapped;
  },

  drawCalm: function () {
    return generateElement('circle', {
      class: 'windBarb-calm',
      cx: center + 1,
      cy: center + 1,
      r: this.get('oktaRadius') * 1.3
    });
  }
});
