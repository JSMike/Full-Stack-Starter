var mongoInfo = function(host, port) {
	return {
		'url': 'mongodb://' + host + ':' + (port || 27017) + '/starter'
	};
};

module.exports = mongoInfo;
