var express = require('express');
var router = express.Router();


/* GET home page. */

router.get('/', function(req, res) {
  res.render('home');
});

router.get('/team', function(req, res) {
  res.render('team');
});

router.get('/terms', function(req, res) {
  res.render('terms');
});

router.get('/schorty', function(req, res) {
  res.redirect('/#schorty');
});




module.exports = router;
