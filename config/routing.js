var People = require('./models/peopleModel');

var routing = function(router) {

	router.get('/views/:view', function(req, res) {
		res.render(req.params.view);
	});

	router.get('/people/', function(req, res) {
		People.find({}, function(err, data) {
			if (err) {
				return res.status(500).send(err);
			}
			return res.send(data);
		});
	});

	router.post('/people/', function(req, res) {
		if (req.body.new) {
			People.create({
				name: req.body.name
			}, function(err, data) {
				if (err) {
					return res.status(500).send(err);
				}
				People.find({}, function(er, dat) {
					if (er) {
						return res.status(500).send(er);
					}
					return res.send(dat);
				});
			});
		} else if (req.body.del) {
			People.remove({
				_id: req.body._id
			}, function(err, data) {
				if (err) {
					return res.status(500).send(err);
				}
				People.find({}, function(er, dat) {
					if (er) {
						return res.status(500).send(er);
					}
					return res.send(dat);
				});
			});
		} else {
			People.findOneAndUpdate({
				_id: req.body._id
			}, {
				name: req.body.name
			}, function(err, data) {
				if (err) {
					return res.status(500).send(err);
				}
				People.find({}, function(er, dat) {
					if (er) {
						return res.status(500).send(er);
					}
					return res.send(dat);
				});
			});
		}
	});

	router.get('*', function(req, res) {
		res.render('starter.ejs');
	});

};

module.exports = routing;
