var app = require('express')();

app.get('/photorules', function (req, res, next) {
	res.render('production/photoguide-static/photorules');
});

module.exports = app;