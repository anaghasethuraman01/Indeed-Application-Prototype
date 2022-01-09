// Employeer Navigation bar

import React, { Component } from 'react'
import logo from '../../images/indeedemployers_logo.png'
import { IoMdHelpCircle, IoMdChatboxes } from 'react-icons/io';
import { BsFillBellFill, BsPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { IoMdPerson, IoMdSettings } from 'react-icons/io'
import { ImProfile } from 'react-icons/im'

import '../../CSS/EmployerNavbar.css'
import {logout} from '../../reduxutils/actioncreators/useraction';

class EmployerNavbar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    let collection = document.getElementsByClassName("nav-link")
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].href === window.location.href) {
        collection[i].classList.add('active')
      }
      else {
        collection[i].classList.remove('active')
      }
    }
  }
  logoutAction =  (e) => {
    e.preventDefault();
    this.props.logout(true);
    const {history} = this.props;
    history.push('/landingPage');
   // window.location.href='/landingPage';
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              <img
                src={logo}
                alt=""
                width="120"
                height="30"
                class="d-inline-block align-text-top"
              />
            </a>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul
                class="navbar-nav me-auto mb-2 mb-lg-0"
                style={{ marginTop: '15px' }}
              >

                <li class="nav-item">

                  <a class="nav-link active" aria-current="page" href="#">
                    <Link to="/employer"
                      style={{
                        textDecoration: 'none',
                        color: '#474747',
                      }}
                    >
                      <h5>Applicant Page</h5>
                    </Link>
                    <h5></h5>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" >
                    <Link to="/featuredReviews"
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
                  <a class="nav-link" >
                    <Link to="/employerAnalytics"
                      style={{
                        textDecoration: 'none',
                        color: '#474747',
                      }}
                    >
                      <h5>Report</h5>
                    </Link>
                  </a>
                </li>
              </ul>
              <form class="d-flex">
                <ul
                  class="navbar-nav me-auto mb-2 mb-lg-0"
                  style={{ marginTop: '15px' }}
                >
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <h5 style={{ color: 'black' }}>Help Center <IoMdHelpCircle /></h5>
                    </a>
                  </li>
                  <li class="nav-item">
                    <h3 style={{ color: 'black' }}>|</h3>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <h5 style={{ color: 'black' }}>test</h5>
                    </a>
                  </li>
                  <li class="nav-item">
                    <h3 style={{ color: 'black' }}>|</h3>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <h5 style={{ color: 'black' }}><BsFillBellFill /></h5>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link">
                    <Link to="/messenger"
                      style={{
                        textDecoration: 'none',
                        color: '#474747',
                      }}
                    >
                      <h5 style={{ color: 'black' }}><IoMdChatboxes /></h5>
                      </Link>
                    </a>
                  </li>
                  {/* <li class="nav-item">
                    <a class="nav-link">
                      <Link to="/employerUpdateProfile"
                        style={{
                          textDecoration: 'none',
                          color: '#474747',
                        }}
                      >
                        <h5 style={{ color: 'black' }}><BsPersonFill /></h5>
                      </Link>

                    </a>
                  </li> */}
                  <li class="nav-item dropdown" >
                    <a class="nav-link" data-bs-toggle="dropdown" >
                      <h5
                        style={{
                          color: 'black',
                          marginLeft: '5px',
                          marginRight: '5px',
                        }}
                      >
                        <IoMdPerson />
                      </h5>
                    </a>
                    <div class="dropdown-menu dmenu">
                      <div class="dropemail">{this.state.userEmail}</div>

                      <a class="dropdown-item ditems">
                        <Link
                          to="/employerUpdateProfile"
                          style={{
                            textDecoration: 'none',
                            color: '#474747',
                          }}
                        >
                          <ImProfile
                            style={{ width: '40px', height: '25px' }}
                          />
                          <span >Profile</span>
                        </Link>
                      </a>
                      <div class="dropdown-divider ditems"></div>
                      <a class="dropdown-item" onClick={this.logoutAction}>
                        <span className="signoutdrop">Sign Out</span>
                      </a>
                    </div>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
      logout: val => dispatch(logout(val))
  };
}
const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
})


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(EmployerNavbar))
