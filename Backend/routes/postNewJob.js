//employeer api to post a new job
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");
const { checkAuth } = require("../config/passport");

router.post("/postNewJob", checkAuth, (req, res) => {
	console.log(req.body)
	let postJob_sql = 'INSERT INTO Job(companyId, id, jobTitle, streetAddress, city, state, country, zip, salaryDetails, shortJobDescription, jobType, jobMode, companyName,industry,responsibilities,qualifications,loveJobRole, jobPostedDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURDATE())';
	let jobDetails = [req.body.companyId, req.body.employeeId, req.body.jobTitle, req.body.streetAddress, req.body.city, req.body.state, req.body.country, req.body.zipcode, req.body.salaryDetails, req.body.shortJobDescription, req.body.jobType, req.body.jobMode, req.body.companyName, req.body.industry,
	req.body.responsibilities, req.body.qualifications, req.body.loveJobRole];

	connection.query(postJob_sql, jobDetails, (error, result) => {
		if (error) {
			res.writeHead(500, {
				'Content-Type': 'application/json'
			});
			console.log(error.message);
			res.end("Server Error. Please Try Again! ");
		} else {
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			console.log("Job posted")
			res.end("Job posted successfully!");
		}
	});
});

module.exports = router;