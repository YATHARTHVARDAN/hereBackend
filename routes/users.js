var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var authenticate = require('../authenticate');

router.use(bodyParser.json());
var User = require('../models/user');
const passport = require('passport');

/* GET users listing. */
router.post('/signUp',(req,res,next) => {
  User.register(new User({username:req.body.username}),req.body.password,(err,user) => {
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type','application/json');
      res.json({err:err});
    }
    else{
      user.save((err,user) => {
        if(err)
        {
          res.statusCode = 500;
          res.setHeader('Content-Type','application/json');
          res.json({err:err});
          return;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type','application/json');
          res.json({success:true, status:'Registration Successful'});
        });
      });
    }
  });
});

router.post('/login',passport.authenticate('local'),(req,res) => {
  var token = authenticate.getToken({_id:req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.json({success:true,status:'You have logged in ',token:token});
});

router.route('/places')
.post(authenticate.verifyUser,(req,res,next) => {
  User.findById(req.user._id)
  .then((user) => {
    if(req.body.category == 'home')
    {
      for(var i = (user.places.length-1); i>=0; i--)
      {
        if(user.places[i].category == 'home')
        {
          user.places.id(user.places[i]._id).remove();
        }
      }
    }
    user.places.push(req.body);
    user.save()
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(user.places);
    })
  },(err) => next(err))
  .catch((err) => next(err));
})
.get(authenticate.verifyUser,(req,res,next) => {
  User.findById(req.user._id)
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(user.places);
  })
});

router.route('/places/:placeId')
.put(authenticate.verifyUser,(req,res,next) => {

})
.delete(authenticate.verifyUser,(req,res,next) => {

});

module.exports = router;
