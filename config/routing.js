var routing = function (router) {

  router.get('/views/:view', function (req, res) {
    res.render(req.params.view);
  });

  router.get('*', function(req, res) {
    res.render('starter.ejs');
  });

};

module.exports = routing;
