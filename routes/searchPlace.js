const express = require('express');
const bodyParser = require('body-parser');
const Router = express.Router();
const request = require('request');
const config = require('../config');

Router.use(bodyParser.json());

Router.route('/sP/:place')
.get((req,res,next) => {
  res.set('Access-Control-Allow-Origin', 'https://yatharthvardan.github.io');
  res.set('Access-Control-Allow-Credentials','true');
    request(
        { url: 'https://geocode.search.hereapi.com/v1/geocode?q=' + req.params.place + '&apiKey='+config.apiKey},
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: err.message });
          }
          res.json(JSON.parse(body));
        }
      )
});

module.exports = Router;