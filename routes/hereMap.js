const express = require('express');
const bodyParser = require('body-parser');
const Router = express.Router();
const request = require('request');

Router.use(bodyParser.json());

// Router.route('/sP/:place')
// .get((req,res,next) => {
//   res.set('Access-Control-Allow-Origin', 'https://yatharthvardan.github.io');
//   res.set('Access-Control-Allow-Credentials','true');
//     request(
//         { url: 'https://geocode.search.hereapi.com/v1/geocode?q=' + req.params.place + '&apiKey=Yd-fnbk9FQ9yAsp35VV5rXMlCnMVJTS4eBk2f3wIkns'},
//         (error, response, body) => {
//           if (error || response.statusCode !== 200) {
//             return res.status(500).json({ type: 'error', message: err.message });
//           }
//           res.json(JSON.parse(body));
//         }
//       )
// });

Router.route('/sC/:category')
.get((req,res,next) => {
  res.set('Access-Control-Allow-Origin', 'https://yatharthvardan.github.io');
  res.set('Access-Control-Allow-Credentials','true');
  request(
    {
      url: 'https://discover.search.hereapi.com/v1/discover/?in=circle:' + req.lat + ','+req.lng+';r='+req.radius+'&q='+req.params.category+'&apiKey=Yd-fnbk9FQ9yAsp35VV5rXMlCnMVJTS4eBk2f3wIkns'
    },
    (err,response,body) => {
      if(err || response.statusCode!==200)
      {
        return res.status(response.statusCode).json({type:'error',message:err.message});
      }
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(JSON.parse(body));
    }
  )
});

module.exports = Router;