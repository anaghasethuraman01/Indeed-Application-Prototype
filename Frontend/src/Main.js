import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './pages/Login/Login.js'
import Home from './common/Home'
import Signup from './pages/Signup/Signup.js'
import Employer from './pages/Employer/Employer'
import PostJob from './pages/Employer/PostJob'
import JobSeekerLandingPage from './pages/JobSeeker/JobSeeker.js'
import CompanyTabs from './pages/Company/CompanyTabs.js'
import JoinUs from './pages/Company/JoinUs'
import Snapshot from './pages/Company/Snapshot'
import UploadPhotos from './pages/JobSeeker/UploadPhotos.js'
import CompanyPhotos from './pages/JobSeeker/CompanyPhotos'
import AdminPhoto from './pages/Admin/AdminPhoto.js'
import EmployerProfile from './pages/Employer/EmployerProfile'
import EmployerUpdateProfile from './pages/Employer/EmployerUpdateProfile'
import Reviews from './pages/JobSeeker/Reviews'
import AdminReview from './pages/Admin/AdminReview.js'
import AddSalaryReview from './pages/Company/AddSalaryReview'
import Resume from './pages/JobSeeker/Resume.js'
import FindSalaries from './pages/JobSeeker/FindSalaries'
import EmployerAnalytics from './pages/Employer/EmployerAnalytics'
import Preferences from './pages/JobSeeker/Preferences.js'
import CompanyJobs from './pages/Company/Jobs.js'
import Header from './common/Header'
import FeaturedReview from './pages/Employer/featuredReview'
import CompanyReviews from './pages/JobSeeker/companyReviews'
import AdminCompany from './pages/Admin/AdminCompany'
import FindSalByTitle from './pages/JobSeeker/FindSalByTitle'
import AdminAnalytics from './pages/Admin/AdminAnalytics.js'
import Messenger from './pages/Messenger/Messenger'
import ReviewProfile from './pages/JobSeeker/reviewProfile'
import MyPhotos from './pages/JobSeeker/MyPhotos'
import SavedJobs from './pages/JobSeeker/SavedJobs.js'
import AppliedJobs from './pages/JobSeeker/AppliedJobs.js'
import AdminRoute from './ProtectedRoute/AdminRoute.js'
import EmployerRoute from './ProtectedRoute/EmployerRoute.js'
import CompanyRoute from './ProtectedRoute/CompanyRoute'
import MessageRoute from './ProtectedRoute/MessageRoute.js'
import ApplyJobs from './pages/Company/ApplyJob.js'
import { connect } from 'react-redux'

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route exact path="/" component={JobSeekerLandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/header" component={Header} />
        <Route path="/snapshot" component={Snapshot} />
        <Route path="/whyJoinUs" component={JoinUs} />
        <Route path="/signup" component={Signup} />
        {/* <Route path="/postJob" component={PostJob} />
        <Route path="/employer" component={Employer} /> */}
        {/* <Route path="/employerprofile" component={EmployerProfile} /> */}
        {/* <Route
          path="/employerupdateprofile"
          component={EmployerUpdateProfile}
        /> */}
        <Route path="/landingPage" component={JobSeekerLandingPage} />
        {/* <Route path="/company" component={CompanyTabs} /> */}
        <Route path="/photos" component={UploadPhotos} />
        {/* <Route path="/companyPhotos" component={CompanyPhotos} /> */}
        {/* <Route path="/adminPhotos" component={AdminPhoto} /> */}
        <Route path="/jobs" component={CompanyJobs} />
        {/* <Route path="/reviews" component={Reviews} /> */}
        {/* <Route path="/featuredReviews" component={FeaturedReview} /> */}
        {/* <Route path="/adminReviews" component={AdminReview} /> */}
        {/* <Route path="/addSalaryReview" component={AddSalaryReview} /> */}
        <Route path="/resume" component={Resume} />
        <Route path="/applyJobs" component={ApplyJobs} />
        <Route path="/findSalaries" component={FindSalaries} />
        {/* <Route path="/employerAnalytics" component={EmployerAnalytics} /> */}
        {/* <Route path="/preferences" component={Preferences} /> */}
        <Route path="/allReviews" component={CompanyReviews} />
        {/* <Route path="/adminCompany" component={AdminCompany} /> */}
        {/* <Route path="/findSalByTitle/:id" component={FindSalByTitle} /> */}
        <Route path="/findSalByTitle/:jobTitle" component={FindSalByTitle} />
        {/* <Route path="/adminAnalytics" component={AdminAnalytics} /> */}
        {/* <Route path="/messenger" component={Messenger} /> */}
        {/* <Route path="/profileReviews" component={ReviewProfile} />
        <Route path="/myPhotos" component={MyPhotos} />
        <Route path="/savedjobs" component={SavedJobs} />
        <Route path="/appliedjobs" component={AppliedJobs} /> */}

        {/* Protected paths */}
        <AdminRoute
          path="/adminCompany"
          component={AdminCompany}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        <AdminRoute
          path="/adminPhotos"
          component={AdminPhoto}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        <AdminRoute
          path="/adminReviews"
          component={AdminReview}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        <AdminRoute
          path="/adminAnalytics"
          component={AdminAnalytics}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />

        <EmployerRoute
          path="/postJob"
          component={PostJob}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        <EmployerRoute
          path="/employer"
          component={Employer}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        <EmployerRoute
          path="/employerprofile"
          component={EmployerProfile}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        <EmployerRoute
          path="/employerupdateprofile"
          component={EmployerUpdateProfile}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        <EmployerRoute
          path="/featuredReviews"
          component={FeaturedReview}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        <EmployerRoute
          path="/employerAnalytics"
          component={EmployerAnalytics}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />

        <CompanyRoute
          path="/company"
          component={CompanyTabs}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        {/* <CompanyRoute path="/snapshot" component={Snapshot} email={this.props.userInfo.email} accountType={this.props.userInfo.accountType}/>
        <CompanyRoute path="/whyJoinUs" component={JoinUs} email={this.props.userInfo.email} accountType={this.props.userInfo.accountType}/> */}
        <CompanyRoute
          path="/reviews"
          component={Reviews}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        <CompanyRoute
          path="/addSalaryReview"
          component={AddSalaryReview}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        <CompanyRoute
          path="/companyPhotos"
          component={CompanyPhotos}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        {/* <CompanyRoute path="/jobs" component={CompanyJobs} email={this.props.userInfo.email} accountType={this.props.userInfo.accountType}/> */}

        <CompanyRoute
          path="/preferences"
          component={Preferences}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        <CompanyRoute
          path="/profileReviews"
          component={ReviewProfile}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        <CompanyRoute
          path="/myPhotos"
          component={MyPhotos}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        <CompanyRoute
          path="/savedjobs"
          component={SavedJobs}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
        <CompanyRoute
          path="/appliedjobs"
          component={AppliedJobs}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />

        <MessageRoute
          path="/messenger"
          component={Messenger}
          email={this.props.userInfo.email}
          accountType={this.props.userInfo.accountType}
        />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
})
//Export The Main Component
export default connect(mapStateToProps)(Main)
