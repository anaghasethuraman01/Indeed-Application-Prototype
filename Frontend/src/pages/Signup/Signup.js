import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router';
import axios from 'axios';
import backendServer from '../../webConfig';
import logo from '../../images/Indeed_logo.png';
import { bindActionCreators } from 'redux';
import ErrorMsg from '../Error/ErrorMsg';
import { userActionCreator } from '../../reduxutils/actions.js'
import { useDispatch } from 'react-redux'

function Signup(props) {
    const dispatch = useDispatch()
    const[errMsg,setErrMsg] = useState('');
    const [redirectVal, redirectValFn] = useState(null);
    let redirectToLogin = () => {
        redirectValFn(<Redirect to="/login" />);
    }
    const showErrorModal = bindActionCreators(userActionCreator.showErrorModal,dispatch);

    let signUp = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const fullname = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const accountType = formData.get('accountType') == 'Employer' ? 'Employer' : 'JobSeeker';

        axios.post(`${backendServer}/api/signup`, {
            name: fullname,
            email: email,
            password: password,
            accountType: accountType
        }).then(res => {
            console.log(res);
            if (res.data.code != '200') {
                console.log('error for signing up');
                setErrMsg(res.data.msg);
                showErrorModal(true);
            } else {
                //adding job seeker model in mongoDB after successful signup
                console.log("signup data ", res.data);
                if ("JobSeeker" === accountType) {
                    console.log("calling mongo signup")
                    axios.post(backendServer+"/api/signupJobSeekerMongo", {
                        jobSeekerId: res.data.row.id,
                        resumeUrl: "",
                        jobPreference: {},
                        savedJobs: []
                    }).then((response1) => {
                        if (response1.data.code != '203') {
                            //alert('Successfully signed up');
                            redirectToLogin();
                        }
                    })
                        .catch((err) => {
                            setErrMsg('Failed to signup');
                            showErrorModal(true);
                            console.log(err);
                        });
                }
                //alert('Successfully signed up');
                redirectToLogin();
            }
        }, error => {
            setErrMsg('Failed to signup. Please refer console for more details.');
            showErrorModal(true);
            console.log(error);
        })
    }
    return (
        <div className="container-fullwidth" style={{ margin: 'auto', marginTop: '5%', width: '30%' }}>
            {redirectVal}
            <ErrorMsg err={errMsg}></ErrorMsg>
            <div className="row">
                <a class="navbar-brand" href="/landingPage">
                    <img
                        src={logo}
                        alt=""
                        width="120"
                        height="30"
                        class="d-inline-block align-text-top"
                    />
                </a>
            </div><br></br><br></br>
            <div className="row" style={{ background: 'whitesmoke', padding: '10% 5% 5% 5%' }}>
                <div className="row">
                    <h5><b>Create an account(it's free)</b></h5>
                </div><br></br>
                <div className="row">
                    <Form onSubmit={signUp}>
                        <Form.Group className="mb-3" >
                            <Form.Label><b>Name</b></Form.Label>
                            <Form.Control type="text" placeholder="Full Name" name="name" maxLength="45" required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label><b>Email Address</b></Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" name="email" maxLength="45" required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><b>Password</b></Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" maxLength="8" required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <p><small><b>Your Role</b></small><br></br>
                                <small style={{ color: 'gray' }}>Let us know how you'll be using our products</small></p>
                            <Form.Check type="radio" label='Job Seeker' name="accountType" value="Job Seeker" required /><br></br>
                            <Form.Check type="radio" label='Employer' name="accountType" value="Employer" />
                        </Form.Group>
                        <Button bsStyle="primary" bsSize="large" block style={{ width: '100%' }} type='submit'>
                            Create Account
                        </Button>
                    </Form>
                </div>
            </div>
            <div className="row"  style={{marginTop: '5%', textAlign:'center'}}>
                <span style={{color:'blue',fontSize:'17px', cursor:'pointer'}}><small onClick={redirectToLogin}>Have an account? Sign In</small></span><br></br>
                <span style={{color:'blue',fontSize:'17px'}}><small>Forgot Your Password?</small></span><br></br>
                <span style={{color:'blue',fontSize:'17px'}}><small>Help Center</small></span>
            </div>
        </div>
    )
}

export default Signup;
