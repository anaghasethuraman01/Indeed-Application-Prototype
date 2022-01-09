// Admin Navigation bar

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../images/Indeed_logo.png";
import "../../CSS/JobSeekerNavbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../reduxutils/actioncreators/useraction";

class AdminNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let collection = document.getElementsByClassName("nav-link");
//     for (let i = 0; i < collection.length; i++) {
//       if (collection[i].href) === window.location.pathname) {
//         collection[i].classList.add("active");
//       } else {
//         collection[i].classList.remove("active");
//       }
//     }
  }
  logoutAction = (e) => {
    e.preventDefault();
    this.props.logout(true);
    const {history} = this.props;
    history.push('/landingPage');
   // window.location.href = "/landingPage";
  };
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
                style={{ marginTop: "15px" }}
              >
                <li class="nav-item">
                  <a class="nav-link" href="#" myValue="/adminCompany">
                    <Link
                      to="/adminCompany"
                      style={{
                        textDecoration: "none",
                        color: "#474747",
                      }}
                    >
                      <h5>Companies</h5>
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link
                      to="/adminPhotos"
                      style={{
                        textDecoration: "none",
                        color: "#474747",
                      }}
                    >
                      <h5>Photos</h5>
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link
                      to="/adminReviews"
                      style={{
                        textDecoration: "none",
                        color: "#474747",
                      }}
                    >
                      <h5>Reviews</h5>
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link
                      to="/adminAnalytics"
                      style={{
                        textDecoration: "none",
                        color: "#474747",
                      }}
                    >
                      <h5>Analytics</h5>
                    </Link>
                  </a>
                </li>
              </ul>
              <form class="d-flex">
                <ul
                  class="navbar-nav me-auto mb-2 mb-lg-0"
                  style={{ marginTop: "15px" }}
                >
                  <li class="nav-item">
                    <a class="nav-link" onClick={this.logoutAction}>
                      <h5 style={{ color: "blue" }}>Sign Out</h5>
                    </a>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: (val) => dispatch(logout(val)),
  };
}
const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminNavbar));
