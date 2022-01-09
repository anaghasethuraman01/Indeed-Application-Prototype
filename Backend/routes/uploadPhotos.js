const express = require("express");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const dotenv = require("dotenv");
var mysql = require("mysql");
const connection = require("../config/mysql_connection");
const { response } = require("express");
var kafka = require("../kafka/client");
const { checkAuth } = require("../config/passport");
dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: "273indeed",
});

router.post("/api/upload", (req, res) => {
  console.log("key" + s3.accessKeyId);
  console.log("secretAccessKey" + s3.secretAccessKey);
  uploadImg(req, res, (error) => {
    if (error) {
      console.log("Error on image upload", error);
      res.json({ error: error });
    } else {
      if (req.file === undefined) {
        res.json("No File Selected");
      } else {
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        if (isEmpty(imageName) || isEmpty(imageLocation)) {
          return res.status(400).send("Image data doesn't exist");
        } else {
          console.log("Image loc from backend" + imageLocation);
          return res.status(200).json({ imageLocation: imageLocation });
        }
      }
    }
  });
});

const uploadImg = multer({
  storage: multerS3({
    s3: s3,
    bucket: "273indeed",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 8000000 }, // 2 MB
  fileFilter: function (req, file, cb) {
    console.log(file.originalname);
    validateFileType(file, cb);
  },
}).single("file");

function validateFileType(file, cb) {
  const allowedFileType = /jpeg|jpg|png|gif|jfif/;
  const mimeType = allowedFileType.test(file.mimetype);
  const extname = allowedFileType.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

function isEmpty(value) {
  return value === undefined || value == null || value.length <= 0
    ? true
    : false;
}

router.post("/api/uploadCompanyPhotos", checkAuth, async (req, res) => {
  let msg = {};
  msg.route = "uploadCompanyPhotos";
  msg.body = req.body;
  kafka.make_request("jobseeker", msg, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      return res.status(results.status).json({ photoDtls: response.photoDtls });
    }
  });
});

router.post("/api/uploadCompanyProfilePic", async (req, res) => {
  try {
    const compid = req.body.companyId;
    const logo = req.body.imageLocation;
    let sql1 =
      "UPDATE Company SET logo = " +
      mysql.escape(logo) +
      "WHERE companyId = " +
      mysql.escape(compid);
    console.log(sql1);
    let query = connection.query(sql1, (error, result) => {
      if (error) {
        return res.status(400).json({ error: "error" });
      } else {
        console.log("uploaded");
        return res.status(200).json({ message: "Company Image Uploaded" });
      }
    });
  } catch (err) {
    return res.status(400).json({ error: "error" });
  }
});

module.exports = router;
