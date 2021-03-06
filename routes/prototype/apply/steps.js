module.exports = {
    '/': {
        backLink: '../photo/final-checks',
        fields: [
            'passport-number',
            // 'expiry-day',
            // 'expiry-month',
            // 'expiry-year'
        ],
        next: '/name'
    },
    '/name': {
        backLink: './',
        fields: [
            'title',
            'name',
            'lastname',
            'change-name'
        ],
        next: '/previous-names',
        forks: [{
            target: '/change-of-name',
            condition: {
                field: 'change-name',
                value: true
            }
        }, {
            target: '/you-need-a-different-service',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['change-name'] == true &&
                    req.session['hmpo-wizard-common']['16-or-older'] == false &&
                    req.session['hmpo-wizard-common']['rising-16'] == false;
            }
        }]
    },
    '/change-of-name': {
        fields: [
            'change-of-name-reason'
        ],
        next: '/previous-names'
    },
    '/you-need-a-different-service': {},
    '/previous-names': {
        fields: [
            'previous-name',
            'previous-first-name',
            'previous-last-name'
        ],
        next: '/gender'
    },
    '/gender': {
        fields: [
            'gender'
        ],
        next: '/place-of-birth'
    },
    '/place-of-birth': {
        fields: [
            'born-in-uk',
            'town-of-birth',
            'country-of-birth'
        ],
        next: '/family-intro',
        nextAlt: './home-address-overseas',
        forks: [{
            target: '/home-address-manual-prototype',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['passport-before'] == true &&
                    req.session['hmpo-wizard-common']['old-blue'] == false &&
                    req.session['hmpo-wizard-common']['16-or-older'] == true;
            }
        }, {
            target: '/parents',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['passport-before'] == true &&
                    req.session['hmpo-wizard-common']['old-blue'] == false &&
                    req.session['hmpo-wizard-common']['16-or-older'] == false;
            }
        }, {
            target: '/naturalisation-registration-details',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['naturalisation-registration-certificate'] == true;
            }
        }]
    },
    '/naturalisation-registration-details': {
        fields: [
            'naturalisation-registration-certificate-number',
            'naturalisation-registration-certificate-issue-day',
            'naturalisation-registration-certificate-issue-month',
            'naturalisation-registration-certificate-issue-year'
        ],
        next: '/family-intro'
    },
    '/family-intro': {
        next: '/parents'
    },
    '/parents': {
        controller: require('../../../controllers/parents'),
        fields: [
            'parent1-first-names',
            'parent1-last-name',
            'parent1-age-day',
            'parent1-age-month',
            'parent1-age-year',
            'parent1-additional-information',

            'parent2-first-names',
            'parent2-last-name',
            'parent2-age-day',
            'parent2-age-month',
            'parent2-age-year',
            'parent2-additional-information',

            'parents-married',
            'marriage-day',
            'marriage-month',
            'marriage-year'
        ],
        next: '/parent-1-details'
    },
    '/parent-1-details': {
        fields: [
            'parent1-town-of-birth',
            'parent1-country-of-birth',
            'parent1-uk-passport',
            'parent1-country-of-nationality',
            'parent1-passport-number',
            'parent1-passport-issue-day',
            'parent1-passport-issue-month',
            'parent1-passport-issue-year'
        ],
        next: '/parent-2-details'
    },
    '/parent-2-details': {
        fields: [
            'parent2-town-of-birth',
            'parent2-country-of-birth',
            'parent2-uk-passport',
            'parent2-country-of-nationality',
            'parent2-passport-number',
            'parent2-passport-issue-day',
            'parent2-passport-issue-month',
            'parent2-passport-issue-year'
        ],
        next: '/grandparents-intro',
        forks: [{
                target: '/home-address-manual-prototype',
                condition: function (req, res) { // If they are Naturalisated/Registered OR Born Before 01/01/1983 OR Passport issued Before 01/01/1994 (Old blue) Hidden FTA
                    return req.session['hmpo-wizard-common']['naturalisation-registration-certificate'] == true ||
                        req.session['hmpo-wizard-common']['born-before-1983'] == true ||
                        req.session['hmpo-wizard-common']['old-blue'] == true ||
                        req.session['hmpo-wizard-common']['passport-before'] == true;
                }
            }, {
                target: '/home-address-manual-prototype',
                condition: function (req, res) {
                    return req.session['hmpo-wizard-common']['application-for-someone-else'] == true;
                }
            }
            // ,{
            //     target: '/home-address-manual-prototype',
            //     condition: function (req, res) { // Grandparents details logic
            //         return req.session['hmpo-wizard-common']['passport-before'] === false &&
            //             (req.session['hmpo-wizard-common']['parent1-uk-passport'] === 'Yes' && req.session['hmpo-wizard-common']['parents-married'] === 'Yes') ||
            //             (req.session['hmpo-wizard-common']['parent1-uk-passport'] === 'Yes' && req.session['hmpo-wizard-common']['parent2-uk-passport'] === 'Yes')
            //     }
            // }
        ]
    },
    '/grandparents-intro': {
        next: '/parent-1-grandparents'
    },
    '/parent-1-grandparents': {
        controller: require('../../../controllers/validation-parent-1-grandparents'),
        fields: [
            'parent1-parent1-first-names',
            'parent1-parent1-last-name',
            'parent1-parent1-town-of-birth',
            'parent1-parent1-country-of-birth',
            'parent1-parent1-age-day',
            'parent1-parent1-age-month',
            'parent1-parent1-age-year',
            'parent1-parent1-additional-information',

            'parent1-parent2-first-names',
            'parent1-parent2-last-name',
            'parent1-parent2-town-of-birth',
            'parent1-parent2-country-of-birth',
            'parent1-parent2-age-day',
            'parent1-parent2-age-month',
            'parent1-parent2-age-year',
            'parent1-parent2-additional-information',

            'parent1-parents-married',
            'parent1-parents-marriage-day',
            'parent1-parents-marriage-month',
            'parent1-parents-marriage-year'
        ],
        next: '/parent-2-grandparents'
    },
    '/parent-2-grandparents': {
        controller: require('../../../controllers/validation-parent-2-grandparents'),
        fields: [
            'parent2-parent1-first-names',
            'parent2-parent1-last-name',
            'parent2-parent1-town-of-birth',
            'parent2-parent1-country-of-birth',
            'parent2-parent1-age-day',
            'parent2-parent1-age-month',
            'parent2-parent1-age-year',
            'parent2-parent1-additional-information',

            'parent2-parent2-first-names',
            'parent2-parent2-last-name',
            'parent2-parent2-town-of-birth',
            'parent2-parent2-country-of-birth',
            'parent2-parent2-age-day',
            'parent2-parent2-age-month',
            'parent2-parent2-age-year',
            'parent2-parent2-additional-information',

            'parent2-parents-married',
            'parent2-parents-marriage-day',
            'parent2-parents-marriage-month',
            'parent2-parents-marriage-year'
        ],
        next: '/home-address-manual-prototype'
    },
    '/home-address': {
        fields: [
            'postcode'
        ],
        next: '/home-address-select'
    },
    '/home-address-select': {
        next: '/contact-details'
    },
    '/home-address-manual': {
        fields: [
            'address1',
            'address2',
            'town',
            'postcode'
        ],
        backLink: './home-address-select',
        next: '/contact-details'
    },
    '/home-address-manual-prototype': {
        fields: [
            'address1',
            'address2',
            'town',
            'postcode'
        ],
        next: '/contact-details'
    },
    '/home-address-overseas': {
        fields: [
            'address1',
            'address2',
            'address3',
            'address4',
            'address5',
            'town',
            'postcode'
        ],
        next: '/contact-details-overseas'
    },
    '/contact-details': {
        fields: ['email', 'email-confirm', 'mobile'],
        next: '/get-updates'
    },
    '/contact-details-overseas': {
        fields: [
            'email',
            'application-country-code',
            'mobile-overseas'
        ],
        next: '/get-updates-overseas'
    },
    '/get-updates-overseas': {
        next: '/passport-options-overseas'
    },
    '/get-updates': {
        next: '/passport-options'
    },
    '/passport-options': {
        fields: [
            'passport-options',
            'braille'
        ],
        next: '/sign',
        forks: [{
            target: '/passport-special-delivery',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['applicant-age'] <= 11 &&
                    req.session['hmpo-wizard-common']['application-country'] === ''
            }
        }, { // Overseas skip delivery page
            target: '/relationship-applicant',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['applicant-age'] <= 11 &&
                    req.session['hmpo-wizard-common']['application-country'] !== ''
            }
        }]
    },
    '/sign': {
        fields: [
            'can-sign',
            'no-sign-reason'
        ],
        next: '/passport-special-delivery',
        forks: [{
            target: '/who-for',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['application-country'] !== '' &&
                    req.session['hmpo-wizard-common']['16-or-older'] == true ||
                    req.session['hmpo-wizard-common']['rising-16'] == true;
            }
        }, {
            target: '/relationship-applicant',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['application-country'] !== '' &&
                    req.session['hmpo-wizard-common']['16-or-older'] == false &&
                    req.session['hmpo-wizard-common']['rising-16'] == false;
            }
        }]
    },
    '/passport-special-delivery': {
        // next: '/summary-family-details',
        next: '/summary',
        fields: [
            'secure-return'
        ],
        forks: [{
            target: '/who-for',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['16-or-older'] == true ||
                    req.session['hmpo-wizard-common']['rising-16'] == true;
            }
        }, {
            target: '/relationship-applicant',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['16-or-older'] == false &&
                    req.session['hmpo-wizard-common']['rising-16'] == false;
            }
        }]
    },
    '/who-for': {
        fields: [
            'application-for-someone-else'
        ],
        next: '/summary',
        forks: [{
            target: '/relationship-applicant',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['application-for-someone-else'] == true;
            }
        }]
    },
    '/relationship-applicant': {
        fields: [
            'relationship-applicant',
            'relationship-other'
        ],
        next: '/third-party-name'
    },
    '/third-party-name': {
        fields: [
            'third-party-first-name',
            'third-party-last-name',
            'why-cant-apply'
        ],
        next: '/summary'
    },
    // '/summary-family-details': {
    //     controller: require('../../../controllers/confirm-family-details'),
    //     template: 'confirm-family-details',
    //     next: '/summary'
    // },
    '/summary': {
        controller: require('../../../controllers/confirm'),
        template: 'confirm',
        next: '/documents-required',
        forks: [{ // For prototype purpose, set csig vars to false
            condition: function (req, res) {
                req.session['hmpo-wizard-common']['routeFromCsig'] = false
                req.session['hmpo-wizard-common']['trackWaiting'] = false
            }
        }]
    },
    '/documents-required': {
        controller: require('../../../controllers/docs-check-required')
    },
    '/docs-fta': {
        backLink: 'summary',
        next: '/declaration',
        controller: require('../../../controllers/check-query-string'),
        forks: [{
                target: '../../../csig/user/need-csig',
                condition: function (req, res) {
                    return req.session['hmpo-wizard-common']['routeFromCsig'] == true;
                }
            },
            {
                target: '../../../csig/user-contact/tracking-waiting',
                condition: function (req, res) {
                    return req.session['hmpo-wizard-common']['trackWaiting'] == true;
                }
            },
            { // if user decides to check what documents they need to send on confirmation page
                target: '/confirmation',
                condition: function (req, res) {
                    return req.session['hmpo-wizard-common']['tracking-status'] == 'confirm-documents';
                }
            }
        ]
    },
    '/docs-renew': {
        backLink: 'summary',
        next: '/declaration',
        controller: require('../../../controllers/check-query-string'),
        forks: [{
                target: '../../../csig/user/need-csig',
                condition: function (req, res) {
                    return req.session['hmpo-wizard-common']['routeFromCsig'] == true;
                }
            },
            {
                target: '../../../csig/user-contact/tracking-waiting',
                condition: function (req, res) {
                    return req.session['hmpo-wizard-common']['trackWaiting'] == true;
                }
            },
            { // if user decides to check what documents they need to send on confirmation page
                target: '/confirmation',
                condition: function (req, res) {
                    return req.session['hmpo-wizard-common']['tracking-status'] == 'confirm-documents';
                }
            }
        ]
    },
    '/docs-fta-thirdparty': {
        backLink: 'summary',
        next: '/declaration'
    },
    '/docs-thirdparty-over16': {
        backLink: 'summary',
        next: '/declaration'
    },
    '/docs-thirdparty-under16': {
        backLink: 'summary',
        next: '/declaration'
    },
    '/docs-thirdparty-parents': {
        backLink: 'summary',
        next: '/declaration'
    },
    '/declaration': {
        fields: ['declaration'],
        prereqs: [
            '/summary'
        ],
        next: '/payment'
    },
    '/payment': {
        next: '/processing-payment'
    },
    '/processing-payment': {
        next: '/confirmation'
    },
    '/confirmation': {
        next: '/../csig/track'
    }
};