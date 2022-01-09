import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';

import {companyActionCreator} from '../../reduxutils/actions.js';

function MyJobs(props) {
    const dispatch = useDispatch();
    return (
        <div>
            <div className="container-fullwidth" style={{marginLeft:'20%',marginRight:'20%'}}>
                <div className="row">
                    <h2><b>My Jobs</b></h2>
                </div><br></br><br></br>
                <div className="row">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <div class="container-fluid">
                            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul
                                    class="navbar-nav me-auto mb-2 mb-lg-0"
                                    style={{ marginTop: '15px' }}>
                                    <li class="nav-item">
                                        <a class="nav-link active">
                                            <Link
                                            to="/savedjobs"
                                            style={{
                                                textDecoration: 'none',
                                                color: '#474747',
                                            }}
                                            >
                                            <h5>Saved</h5>
                                            </Link>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link">
                                            <Link
                                            to="/appliedjobs"
                                            style={{
                                                textDecoration: 'none',
                                                color: '#474747',
                                            }}
                                            >
                                            <h5>Applied</h5>
                                            </Link>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default MyJobs;