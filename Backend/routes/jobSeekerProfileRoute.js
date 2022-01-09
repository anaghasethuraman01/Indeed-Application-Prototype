"use strict";
const express = require("express");
const router = express.Router();
const { checkAuth } = require("../config/passport");
const JobSeeker = require('../models/JobSeeker');
const kafka = require('../kafka/client')

const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const s3 = new aws.S3({
  accessKeyId: 'AKIAYOG23DSW7KVLQRVN',
  secretAccessKey: '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',
  Bucket: "273indeed",
});

router.post("/api/updateJobSeekerProfile",checkAuth, (req, res) => {
    let msg = {};
    msg.route = "updateJobSeekerProfile";
    msg.id = req.body.id;
    msg.data = req.body.data;
    kafka.make_request("jobseeker", msg, function (err, results) {
        console.log("inside kafka");
        if (err) {
            console.log("inside error");
            return res.send({...results,err:err});
        }
        else {
            return res.send(results);
        }
    });
});

router.post("/api/setJobPreferences",checkAuth, (req, res) => {
    let msg = {};
    msg.route = "setJobPreferences";
    msg.id = req.body.id;
    msg.data = req.body.data;
    kafka.make_request("jobseeker", msg, function (err, results) {
        console.log("inside kafka");
        if (err) {
            console.log("inside error");
            return res.send({...results,err:err});
        }
        else {
            return res.send(results);
        }
    });
});

router.post("/api/uploadResume/:id",checkAuth, (req, res) => {
    console.log("key" + s3.accessKeyId);
    console.log("secretAccessKey" + s3.secretAccessKey);
    let respData = {
        msg: 'success',
        code: '200'
    }
    uploadResume(req, res, (error) => {
      if (error) {
        console.log("Error uploading resume", error);
        respData.code = '400';
        respData.msg = error;
        return res.send(respData);
      } else {
        if (req.file === undefined) {
            console.log("No resume uploaded");
            respData.code = '400';
            respData.msg = 'Please upload a resume';
            return res.send(respData);
        } else {
          const fileName = req.file.key;
          const fileLocation = req.file.location;
          if (isEmpty(fileName) || isEmpty(fileLocation)) {
            console.log("File data does not exist");
            respData.code = '400';
            respData.msg = 'File data does not exist';
            return res.send(respData);
          } else {
            console.log("Image loc from backend" + fileLocation);
            JobSeeker.findOneAndUpdate({jobSeekerId:req.params.id},{resumeUrl:fileLocation}).then(success=>{
                respData.location = fileLocation;
                respData.key = fileName;
                return res.send(respData);
            }).catch(err=> {
                respData.code='203';
                respData.msg = 'Failed to set resume location on database. Please contact admimistrator';
                return res.send(respData);
            })
          }
        }
      }
    });
});

router.get("/api/downloadResume/:key", checkAuth, async(req, res) => {
    try {
        // const { Body } = await s3.getObject({
        //     Key: key,
        //     Bucket: '273indeed'
        // });
        const signedUrlExpireSeconds = 60*2 ;// your expiry time in seconds.

        const url = s3.getSignedUrl('getObject', {
            Bucket: '273indeed',
            Key: req.params.key,
            Expires: signedUrlExpireSeconds
        })
        return res.status(200).send(url);
    } catch(err) {
        console.log('Failed to download  resume:',err);
        return res.status(400).send('Failed to download resume');
    }
})

router.delete("/api/deleteResume/:key/:id", checkAuth, async(req, res) => {
    try {
        const key = req.params.key;
        const id = req.params.id;
        s3.deleteObject({
            Key: key,
            Bucket: '273indeed'
        }, (err,data)=>{
            if(err) {
                console.log('deletion failed',err)
                return res.status(400).send('Failed to delete resume');
            } else {
                console.log('Successfully deleted resume with key ',key);
                JobSeeker.findOneAndUpdate({jobSeekerId:id},{resumeUrl:''}).then(success=>{
                    return res.status(200).send('success');
                }).catch(err=> {
                    return res.status(400).send('Failed to delete resume url from mongo.');
                })
            }
        });
    } catch(err) {
        console.log('Failed to download  resume:',resume);
        return res.status(400).send('Failed to delete resume');
    }
})

const uploadResume = multer({
    storage: multerS3({
      s3: s3,
      bucket: "273indeed",
      acl: "public-read",
      key: function (req, file, cb) {
        file.originalname = 'resume_'+req.params.id;
        cb(
          null,
          path.basename(file.originalname, path.extname(file.originalname))
        );
      },
    }),
    limits: { fileSize: 2000000 }, // 2 MB
    fileFilter: function (req, file, cb) {
      console.log(file.originalname);
      const fileSize = parseInt(req.headers['content-length']);
      console.log('file size is ',fileSize)
      if(fileSize>2000000) {
        return cb("File size must not exceed 2 MB");
      }
      validateFileType(file, cb);
    },
  }).single("file");
  
  function validateFileType(file, cb) {
    const allowedFileType = /pdf|doc|docx/;
    const mimeType = allowedFileType.test(file.mimetype);
    const extname = allowedFileType.test(
      path.extname(file.originalname).toLowerCase()
    );
    
    if (mimeType && extname) {
      return cb(null, true);
    } else {
      cb("Please upload pdf, doc, docx documents only!");
    }
  }
  
  function isEmpty(value) {
    return value === undefined || value == null || value.length <= 0 ? true : false;
  }

module.exports = router;
