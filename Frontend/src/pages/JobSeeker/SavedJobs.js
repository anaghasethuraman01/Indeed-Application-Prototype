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

function SavedJobs(props) {
    const dispatch = useDispatch()
    const userid = useSelector((state)=>state.userInfo.id);
    const[errMsg,setErrMsg] = useState('');
    const [jobs,setJobs] = useState([]);
    const showErrorModal = bindActionCreators(userActionCreator.showErrorModal,dispatch);
    useEffect(()=> {
        console.log('user id is ',userid);
        axios.get(backendServer+'/api/savedjobs/'+userid)
        .then(res => {
            console.log('saved job results',res);
            if(res.data.code == '200') {
                setJobs(res.data.row.savedJobs);
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
        // <div>
        //     <ErrorMsg err={errMsg}></ErrorMsg>
        //     <JobSeekerNavbar></JobSeekerNavbar><br></br>
        //     <div>
        //         <MyJobs></MyJobs>
        //         {jobs.map(job=>  {
        //             if(job!=null)
        //                 job = job[0];
        //             return (
        //             <div >
        //                 <div className="row">
        //                     <b>{job.roleName}</b>
        //                 </div>
        //                 <div className="row">
        //                     {job.jobType}
        //                 </div>
        //                 <div className="row">
        //                     {job.companyName}
        //                 </div>
        //                 <div className="row">
        //                     {job.location},{job.state} - {job.country}
        //                 </div>
        //             </div>)
        //         })}
        //     </div>
        // </div>


        <div>
            <ErrorMsg err={errMsg}></ErrorMsg>
            <JobSeekerLoggedInNavbar />
            <div class="container-fluid">
                <div class="row">
                    <MyJobs></MyJobs>
                </div>
                <div style={{marginLeft:'20%',marginRight:'20%'}}>
                        {jobs.map(job=>  {
                                    if(job!=null)
                                        job = job[0];
                                    return (
                                    <div className="row border-bottom" style={{padding:'20px 20px 20px 20px'}}>
                                        <div className="row">
                                            <h5><b>{job.roleName}</b></h5>
                                        </div>
                                        <div className="row">
                                            {job.companyName}
                                        </div>
                                        <div className="row">
                                            {job.jobType}
                                        </div>
                                        <div className="row">
                                            {job.location},{job.state}
                                        </div>
                                    </div>)
                        })}
                </div>
            </div>
        </div>
    )
}

export default SavedJobs;