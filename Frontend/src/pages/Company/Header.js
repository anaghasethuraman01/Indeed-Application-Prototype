
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import jwt_decode from "jwt-decode";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Snapshot from './Snapshot.js';
import JoinUs from './JoinUs.js';

function Header(props) {

    return (
        <div>
            <Tabs defaultActiveKey="snapshot" transition={'true'} id="companyheader" className="mb-3">
                <Tab eventKey="snapshot" title="Snapshot">
                    <Snapshot></Snapshot>
                </Tab>
                <Tab eventKey="whyjoinus" title="Why Join Us">
                    <JoinUs></JoinUs>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Header;