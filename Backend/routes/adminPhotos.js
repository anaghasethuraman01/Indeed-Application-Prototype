const express = require('express')
const router = express.Router()
const kafka = require('../kafka/client');
const { checkAuth } = require("../config/passport");

router.get('/api/getAdminPhotos/', checkAuth, function (req, res) {
    console.log("inside backend admin photos")
   let msg = {};
   msg.route = "getAdminPhotos";
   msg.query = req.query;
   kafka.make_request("admin", msg, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(err.status).send({...results, err:err});
       }
       else {
           console.log("results" + JSON.stringify(results))
           res.status(results.status).json({ photos: results.photos, count: results.count })           
       }
   });
});

router.post('/api/setPhotoStatus/', checkAuth, function (req, res) {
   let msg = {};
   msg.route = "setPhotoStatus";
   msg.body = req.body;
   kafka.make_request("admin", msg, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(err.status).send({...results, err:err});
       }
       else {
           console.log(results)
           res.status(results.status).json({ photos: results.photos })           
       }
   });
});

module.exports = router