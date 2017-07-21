module.exports = {
    '/': {
        next: '/applicant-info'
    },
    '/applicant-info': {
        next: '/csig-info'
    },
    '/csig-info': {
        fields: ['passport-number','expiry-month','expiry-year', 'phoneno'],
        next: '/csig-identity-check'
    },
    '/csig-identity-check': {
        fields: ['name', 'lastname','age-day','age-month','age-year','national-insurance'],
        back:'csig-info',
        next: '/confirm-applicant'
    },
    '/confirm-applicant': {
        fields: ['applicant-check', 'applicant-check-friend', 'applicant-check-address', 'knowntime'],
        next: '/csig-details-work'
    },
    '/csig-details': {
        fields: ['title'],
        back:'confirm-applicant',
        next: '/csig-details-work'
    },
    '/csig-details-work': {
        back:'confirm-applicant',
        next: '/declaration'
    },
    '/declaration': {
        back:'csig-details-work',
        next: '/confirmation'
    },
    '/confirmation': {
        back:'declaration',
        next: '/confirmation'
    },
    '/exceptions': {

    }

};