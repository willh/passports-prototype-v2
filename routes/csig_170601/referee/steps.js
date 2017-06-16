module.exports = {
    '/': {
        fields: ['pex-reference', 'phoneno'],
        next: '/csig-info'
    },
    '/csig-info': {
        next: '/csig-identity-check'
    },
    '/csig-identity-check': {
        fields: ['name', 'lastname','passport-number','expiry-month','expiry-year','age-day','age-month','age-year','national-insurance'],
        back:'csig-info',
        next: '/confirm-applicant'
    },
    '/confirm-applicant': {
        fields: ['applicant-check'],
        next: '/csig-details'
    },
    '/csig-details': {
        fields: ['applicant-check'],
        next: '/csig-identity-check'
    }
};
