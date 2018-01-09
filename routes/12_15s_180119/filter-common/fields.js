const _ = require('lodash');
const countries = require('../../../config/countries');

module.exports = {
  'application-for': {
    legend: {
      value: 'Who is the new passport for?',
      className: 'visuallyhidden'
    },
    options: [
      { value: true, label: 'Myself' },
      { value: false, label: 'Someone else'}
    ],
    formatter: ['boolean'],
    validate: [
      'required'
    ],
    className: 'inline'
  },
  'what-to-do': {
    legend: {
      value: 'What to you want to do?',
      className: 'visuallyhidden'
    },
    options: [
      {value: 'First', label: 'Apply for a first British passport'},
      {value: 'Change', label: 'Make a change to a current British passport (including a change of name)'},
      {value: 'Renew', label: 'Renew a British passport'},
      {value: 'Replace', label: 'Replace a lost or stolen British passport'}
    ],
    validate: [
      'required',
      {
        type:'equal',
        arguments:['Renew'], /* if the arguments are NOT selected */
        redirect:'https://passportapplication.service.gov.uk/ips-olc/'
      }
    ]
  },
  'what-to-do-overseas': {
    legend: {
      value: 'What to you want to do?',
      className: 'visuallyhidden'
    },
    options: [
      {value: 'First', label: 'Apply for a first British passport'},
      {value: 'Change', label: 'Make a change to a current British passport (including a change of name)'},
      {value: 'Renew', label: 'Renew a British passport'},
      {value: 'Replace', label: 'Replace a lost or stolen British passport'}
    ],
    validate: [
      'required',
      {
        type:'equal',
        arguments:['Renew', 'Change', 'Replace'], /* if the arguments are NOT selected */
        redirect:'/../overseas-first'
      },
      {
        type:'equal',
        arguments:['Renew', 'First'], /* if the arguments are NOT selected */
        redirect:'/../overseas-lost-change'
      }
    ]
  },
'apply-uk': {
  legend: {
    value: 'Are you applying from the UK?',
    className: 'visuallyhidden'
  },
  options: [
    { value: true, label: 'Yes' },
    { value: false, label: 'No', toggle: 'application-country', child: 'select' }
  ],
  formatter: ['boolean'],
  validate: [
    'required'
  ],
  className: 'inline'
},
'16-or-older': {
  legend: {
    value: 'Are you 16 or older?',
    className: 'visuallyhidden'
  },
  options: [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ],
  formatter: ['boolean'],
  validate: [
    'required',
    {
      type:'equal',
      arguments:[true], /* if the arguments are NOT selected */
      redirect:'https://passportapplication.service.gov.uk/ips-olc/'
    }
  ],
  className: 'inline'
},
'passport-before': {
  legend: {
    value: 'Have you had a passport before?',
    className: 'visuallyhidden'
  },
  options: [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ],
  formatter: ['boolean'],
  validate: [
    'required',
    {
      type:'equal',
      arguments:[true], /* if the arguments are NOT selected */
      redirect:'https://passportapplication.service.gov.uk/ips-olc/'
    }
  ],
  className: 'inline'
},
'lost-stolen': {
  legend: {
    value: 'Lost stolen?',
    className: 'visuallyhidden'
  },
  options: [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ],
  formatter: ['boolean'],
  validate: [
    'required',
    {
      type:'equal',
      arguments:[false], /* if the arguments are NOT selected */
      redirect:'/lost'
    }
  ],
  className: 'inline'
},
'name-changed': {
  legend: {
    value: 'Lost stolen?',
    className: 'visuallyhidden'
  },
  options: [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ],
  formatter: ['boolean'],
  validate: [
    'required',
    {
      type:'equal',
      arguments:[false], /* if the arguments are NOT selected */
      redirect:'/application-method'
    }
  ],
  className: 'inline'
},
'application-country': {
  options: [{ value: '', label: ' ' }].concat(_.map(countries, function (c) {
    return {
      value: c.id,
      label: c.name,
      attributes: [
        {
          attribute: 'data-synonyms', value: Array.isArray(c.altName) ? c.altName.join(',') : c.altName
        }
      ]
    }
  })),
  validate: [
    'required'
  ],
  dependent: {
    field: 'apply-uk',
    value: false
  }
},
  'age-day': {
    labelClassName: 'form-label',
    formatter: 'removehyphens',
      validate: [
          'numeric',
          'required'
      ]
  },
  'age-year': {
    labelClassName: 'form-label',
    formatter: 'removehyphens',
      validate: [
          'numeric',
          'required'
      ]
  },
  'age-month': {
      labelClassName: 'form-label',
      formatter: 'removehyphens',
      validate: [
          'numeric',
          'required'
      ]
  }
};