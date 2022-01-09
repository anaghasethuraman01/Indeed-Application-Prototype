const conn2 = require('./config/mongo_connection')
const conn1 = require('./config/mysql_connection')
const express = require('express')
const app = express()
const session = require('express-session')
var cors = require('cors')
app.use(cors())

// Connect to MySQL database
conn1.mysqlCon
// Connect to MongoDB
conn2()

// Init Middleware
app.use(express.json({ extended: false }))

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
)

//Define all the models

require('./models/JobSeeker')
require('./models/Company')
require('./models/Photo')
require('./models/Conversation')
require('./models/Message')

//Define all the routes
app.use(require('./routes/loginRoute'))
app.use(require('./routes/companyRoute'))
app.use(require('./routes/postNewJob'))
app.use(require('./routes/signupRoute'))
app.use(require('./routes/jobSeekerHome'))
app.use(require('./routes/jobs'))
app.use(require('./routes/uploadPhotos'))
app.use(require('./routes/getAllPhotos'))
app.use(require('./routes/getJobSeekerPhotos'))
app.use(require('./routes/adminPhotos'))
app.use(require('./routes/getEmployerProfile'))
app.use(require('./routes/editEmployerDetails'))
app.use(require('./routes/addEmployerDetails'))
app.use(require('./routes/editCompanyDetails'))
app.use(require('./routes/salaryReviewRoute'))
app.use(require('./routes/adminReviews'))
app.use(require('./routes/companyReviews'))
app.use(require('./routes/findSalary'))
app.use(require('./routes/addCompanyDetails'))
app.use(require("./routes/getCompanyDetails"))
app.use(require("./routes/addCompanyIdToEmployer"))
app.use(require("./routes/employerAnalytics"))
app.use(require("./routes/jobSeekerProfileRoute"))
app.use(require("./routes/employerFeaturedReviews"))
app.use(require("./routes/getPostedJobs"))
app.use(require("./routes/getApplicantsName"))
app.use(require("./routes/getJobSeekerProfile"))
app.use(require("./routes/getJobSeekerResume"))
app.use(require("./routes/allCompanyReviews"))
app.use(require("./routes/adminAnalytics"))
app.use(require("./routes/updateJobSeekerStatus"))
app.use(require("./routes/getAllReviews"))
app.use(require("./routes/conversationRoute"))
app.use(require("./routes/messageRoute"))
app.use(require("./routes/testRoute"))
app.use(require("./routes/reviewsByProfile"))
app.use(require("./routes/getJobSeekerPhotos"))
app.use(require("./routes/myjobs"));

const PORT = process.env.PORT || 5000

//Server code will be running on port 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))