var util = require('util')
var Base = require('hmpo-form-wizard').Controller

var Controller = function() {
	Base.apply(this, arguments)
}

util.inherits(Controller, Base)

Controller.prototype.get = function successHandler(req, res, callback) {
  if (req.sessionModel.get('parental-responsibility') == false && req.sessionModel.get('relationship-applicant') != "Other") {
		req.sessionModel.set('document-list', true);
    req.sessionModel.set('document-link', 'docs-name-change-for-parents')
    return res.redirect('docs-name-change-for-parents')
  } else if (req.sessionModel.get('parental-responsibility') == true && req.sessionModel.get('relationship-applicant') != "Other") {
    req.sessionModel.set('document-list', false);
    return res.redirect('./declaration')
  } else if (req.sessionModel.get('16-or-older') == false && req.sessionModel.get('relationship-applicant') == "Other") {
		req.sessionModel.set('document-list', true);
    req.sessionModel.set('document-link', 'documents-thirdparty-under16')
    return res.redirect('./documents-thirdparty-under16')
  } else {
		req.sessionModel.set('document-list', true);
    req.sessionModel.set('document-link', 'documents-thirdparty-over16')
    return res.redirect('./documents-thirdparty-over16')
  }
}
module.exports = Controller
