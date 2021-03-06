var util = require('util')
var Base = require('hmpo-form-wizard').Controller

var Controller = function() {
	Base.apply(this, arguments)
}

util.inherits(Controller, Base)

Controller.prototype.successHandler = function successHandler(req, res, callback) {

		if (req.session['hmpo-wizard-common']['renominate']) {
			req.sessionModel.set('csig-email-old', req.session['hmpo-wizard-common']['csig-email']);
		} else {
			req.sessionModel.set('csig-email-old', 'test@thundercats.com');
		}

    Base.prototype.successHandler.call(this, req, res, callback);
};

module.exports = Controller
