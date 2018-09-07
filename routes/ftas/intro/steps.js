module.exports = {
    '/': {
        backLink: '../filter/summary',
        next: '/what-you-need',
        forks: [{
            target: '/you-need-a-photo',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['passport-before'] == true &&
                req.session['hmpo-wizard-common']['old-blue'] == false;
            }
        }]
    },
    '/before-you-continue-overseas': {
        backLink: '/../overseas/give-contact-details',
        next: '/what-you-need-overseas'
    },
    '/what-you-need': {
        backLink: './',
        fields: ['what-you-will-need-declaration'],
        next: '/you-need-a-photo'
    },
    '/you-need-a-photo': {
        next: '/choose-photo-method'
    },
    '/choose-photo-method': {
        fields: ['choose-photo'],
        next: '/../upload'
    },
    '/photo-retrieved': {
        next: '/../uploadphoto'
    },
    '/get-photo-code': {
        fields: ['photo-code-photo'],
        backLink: './choose-photo-method',
        next: '/retrieving'
    },
    '/retrieving': {
        backLink: './get-photo-code',
    },
    '/fetch-result': {
        controller: require('../../../controllers/fetch-result')
    },
    '/error': {
        backLink: './get-photo-code',
    }
};
