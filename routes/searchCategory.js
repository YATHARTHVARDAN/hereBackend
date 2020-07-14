const express = require('express');
const bodyParser = require('body-parser');
const Router = express.Router();
const request = require('request');
const config = require('../config');

Router.use(bodyParser.json());

Router.route('/')
.post((req,res,next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Allow-Credentials','true');
    request(
        { url: 'https://discover.search.hereapi.com/v1/discover?in=circle:'+req.body.lat+','+req.body.lng+';r='+req.body.radius+'&q='+req.body.category+'&apiKey='+config.apiKey},
        (er, response, body) => {
          if (er || response.statusCode !== 200) {
              console.log('Error from the apis' + er);
            return res.status(response.statusCode).json({ type: 'error', message: er });
          }
          res.statusCode = 200;
          res.setHeader('Content-Type','application/json');
          res.json(JSON.parse(body));
        }
      )
});

module.exports = Router;