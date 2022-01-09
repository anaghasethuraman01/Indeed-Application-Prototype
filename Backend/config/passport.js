"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
const conn = require("../config/mysql_connection");
const admin = {
  name: "admin user",
  email: "admin@indeed.com",
  password: "admin",
  id: "adminid_1",
};

// Setup work and export for the JWT passport strategy
function auth() {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: secret,
  };
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      const accountType = jwt_payload.accountType;
      console.log("accountType" + jwt_payload.accountType);
      if ("JobSeeker" === accountType) {
        console.log("id" + jwt_payload.id);
        findJobSeekerById(jwt_payload.id, (err, results) => {
          if (err) {
            console.log("err: " + err);
            return callback(err, false);
          }
          if (results) {
            console.log("results");
            callback(null, results[0]);
          } else {
            callback(null, false);
          }
        });
      } else if ("Employer" === accountType) {
        findEmployerById(jwt_payload.id, (err, results) => {
          if (err) {
            return callback(err, false);
          }
          if (results) {
            callback(null, results[0]);
          } else {
            callback(null, false);
          }
        });
      }
      else if ("Admin" === accountType && jwt_payload.id === admin.id) {
        callback(null, admin);
      }
      else {
        callback(null, false);
      }
    })
  );
}

function findJobSeekerById(id, callback) {
  return conn.query("SELECT * from JobSeeker WHERE id = ?", [id], callback);
}

function findEmployerById(id, callback) {
  return conn.query("SELECT * from Employer WHERE id = ?", [id], callback);
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });
