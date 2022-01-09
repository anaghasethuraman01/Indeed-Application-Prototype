/* eslint-disable jsx-a11y/anchor-is-valid */
// Job Seeker Landing Page
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'
import backendServer from '../../webConfig'
import { RatingView } from 'react-simple-star-rating'
import CompanyImage from '../../images/companyImage.png'
import companyLogo from '../../images/company-logo.jpeg'
import JobSeekerNavbar from '../JobSeeker/JobSeekerNavbar'
import JobSeekerLoggedInNavbar from '../JobSeeker/JobSeekerLoggedInNavbar'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class CompanyTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      companyName: '',
      companyId: 0,
      reviewCount: 0,
      rating: 0,
      CompanyImageURL: '',
    }
  }

  componentDidMount() {
    let companyName = this.props.companyInfo.compName
    let companyId = this.props.companyInfo.compid
    this.setState(
      {
        companyName: companyName,
        companyId: companyId,
      },
      () => {
        this.getAllData()
      },
    )
    this.checkLoggedInStatus()
  }

  checkLoggedInStatus() {
    const userInfo = this.props.userInfo
    console.log(userInfo)
    if (userInfo.email !== '' && userInfo.accountType === 'JobSeeker') {
      console.log('JobSeeker is signed in')
      this.setState({
        isLoggedIn: true,
      })
    }
  }

  async getAllData() {
    let data = { companyId: this.state.companyId }
    axios
      .post(backendServer + '/jobSeeker/getCompanyRatingAndReviews', data)
      .then(
        (response) => {
          console.log('Ratings and Reviews')
          console.log(response.data, response.status)
          if (response.status === 200 && response.data.length > 0) {
            this.setState({
              rating: response.data[0].companyAvgRating,
              reviewCount: response.data[0].noOfReviews,
            })
          }
        },
        (error) => {
          console.log(error)
        },
      )

    console.log('Image........ ' + data)
    await axios.post(backendServer + '/jobs/getCompanyImage', data).then(
      (response) => {
        console.log('Image response ............')
        console.log(response.data, response.status)
        this.setState({
          CompanyImageURL: response.data.logo,
        })
      },
      (error) => {
        console.log(error)
      },
    )
  }

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <JobSeekerLoggedInNavbar />
        ) : (
          <JobSeekerNavbar />
        )}
        <div class="container-fluid">
          <img src={CompanyImage} alt="" width="100%" height="200" />
        </div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-4"></div>
            <div class="col-2">
              <img
                src={this.state.CompanyImageURL}
                alt=""
                width="170"
                height="100"
              />
            </div>
            <div class="col-6">
              <h4 style={{ color: '#003399' }}>{this.state.companyName}</h4>
              <RatingView ratingValue={this.state.rating} />
              <br />
              <h6 class="card-title">{this.state.reviewCount} reviews</h6>
            </div>
            <hr></hr>
            <div class="row">
              <div class="col-2"></div>
              <div class="col-8">
                <nav class="navbar navbar-expand-lg navbar-light">
                  <div class="container-fluid">
                    <div
                      class="collapse navbar-collapse"
                      id="navbarTogglerDemo02"
                    >
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                          <a class="nav-link active">
                            <Link
                              to="/snapshot"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5>Snapshot</h5>
                            </Link>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link">
                            <Link
                              to="/whyJoinUs"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5>Why Join Us</h5>
                            </Link>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link">
                            <Link
                              to="/reviews"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5>Reviews</h5>
                            </Link>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link">
                            <Link
                              to="/addSalaryReview"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5>Salaries</h5>
                            </Link>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link">
                            <Link
                              to="/companyPhotos"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5>Photos</h5>
                            </Link>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link">
                            <Link
                              to="/jobs"
                              style={{
                                textDecoration: 'none',
                                color: '#474747',
                              }}
                            >
                              <h5>Jobs</h5>
                            </Link>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
              <div class="col-2"></div>
            </div>
            <hr></hr>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  companyInfo: state.company,
  userInfo: state.userInfo,
})

export default connect(mapStateToProps)(withRouter(CompanyTabs))
