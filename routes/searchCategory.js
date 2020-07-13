const express = require('express');
const bodyParser = require('body-parser');
const Router = express.Router();
const request = require('request');
const config = require('../config');

Router.use(bodyParser.json());

Router.route('/:category')
.get((req,res,next) => {
  res.set('Access-Control-Allow-Origin', 'https://yatharthvardan.github.io');
  res.set('Access-Control-Allow-Credentials','true');
    request(
        { url: 'https://discover.search.hereapi.com/v1/discover?incircle:'+req.lat+','+req.lng+';r='+req.radius+'&q='+req.params.category+'&apiKey='+config.apiKey},
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: err.message });
          }
          res.statusCode = 200;
          res.setHeader('Content-Type','application/json');
          res.json(JSON.parse(body));
        }
      )
});

module.exports = Router;