import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react';
import {Redirect} from 'react-router';
import JobSeekerNavbar from './JobSeekerNavbar';
import MyJobs from './MyJobs';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import backendServer from '../../webConfig';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userActionCreator } from '../../reduxutils/actions.js'
import ErrorMsg from '../Error/ErrorMsg'
import JobSeekerLoggedInNavbar from './JobSeekerLoggedInNavbar';

function AppliedJobs(props) {
    const dispatch = useDispatch()
    const userid = useSelector((state)=>state.userInfo.id);
    const[errMsg,setErrMsg] = useState('');
    const [jobs,setJobs] = useState([]);
    const showErrorModal = bindActionCreators(userActionCreator.showErrorModal,dispatch);
    useEffect(()=> {
        console.log('user id is ',userid);
        axios.get(backendServer+'/api/appliedjobs/'+userid)
        .then(res => {
            console.log('applied job results',res);
            if(res.data.code == '200') {
                setJobs(res.data.row);
            } else {
                setErrMsg(res.data.msg);
                showErrorModal(true);
            }
        }).catch(err => {
            setErrMsg('Failed to get saved job details. Please check console');
            showErrorModal(true);
            console.log(err);
        }); 
    },[]);
    return (
        <div>
            <ErrorMsg err={errMsg}></ErrorMsg>
            <JobSeekerLoggedInNavbar />
            <div class="container-fluid">
                <div class="row">
                    <MyJobs></MyJobs>
                </div>
                <div style={{marginLeft:'20%',marginRight:'20%'}}>
                        {jobs.map(job=>  {
                                    return (
                                    <div className="row border-bottom" style={{padding:'20px 20px 20px 20px'}}>
                                        {/* <div className="row" style={{float:'right'}}>
                                            <h5><b>{job.status}</b></h5>
                                        </div> */}
                                        <div className="row">
                                            <h5><b>{job.jobTitle} <span style={{float:'right'}}>{job.status}</span></b></h5>
                                        </div>
                                        <div className="row">
                                            {job.companyName}
                                        </div>
                                        <div className="row">
                                            {job.jobMode}
                                        </div>
                                        <div className="row">
                                            {job.streetAddress},{job.state}
                                        </div>
                                    </div>)
                        })}
                </div>
            </div>
        </div>
    )
}

export default AppliedJobs;