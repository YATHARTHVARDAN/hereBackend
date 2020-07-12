const express = require('express');
const bodyParser = require('body-parser');
const Router = express.Router();
const request = require('request');

Router.use(bodyParser.json());

Router.route('/sC/:category')
.get((req,res,next) => {
    request(
        { url: 'https://geocode.search.hereapi.com/v1/geocode?q=nirankaricolony&apiKey=Yd-fnbk9FQ9yAsp35VV5rXMlCnMVJTS4eBk2f3wIkns'},
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: err.message });
          }
          res.json(JSON.parse(body));
        }
      )
});

module.exports = Router;