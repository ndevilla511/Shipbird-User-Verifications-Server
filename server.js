require('./db.js');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var userVerification = mongoose.model('userVerification'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
res.send("Hello!");
});

//routes for user phone verification
app.get('/checkVerification/:user_id', function(req, res) {
    console.log("making a get request!");
    var user_id = req.params.user_id;
    console.log(user_id);
    userVerification.findOne({
        user_id: user_id
    }).exec(function(err, user) {
		console.log(err, user);
            var response = {
                status: 200,
                message: {}
            };
            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!user) {
                response.status = 404;
		console.log(response.status);
                response.message = "User " + user_id + " not found.";
            } else {
                response.message = user ? user : {};
            }
            res.status(response.status).json(response.message);
        }

    )


});

app.post('/addVerification', function(req, res) {
    console.log("Making a post request!");
    var user_id = req.body.user_id,
        status  = req.body.status;

    userVerification.create({
        user_id: user_id,
        user_verified: status
    }, function(err, user){
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            console.log('user created', user);
            res.status(201).json(user);
        }
    });

});

app.put('/updateVerification', function(req, res) {
    console.log("Making a put request!");
    var user_id = req.body.user_id,
        new_status = req.body.new_status;
 
    userVerification.findOne({
        user_id: user_id
    }).exec(function(err, user) {
      if (err) {
          res
          .status(500)
          .json(err);
          return;
      }
      user.user_verified = new_status;

      user
        .save(function(err, userUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json(userUpdated);
          }
        });
      });
});

app.listen(3001,'0.0.0.0', function() {
    console.log('Listening on port 3001...');
});


