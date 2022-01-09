import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import jwt_decode from 'jwt-decode'
import backendServer from '../../webConfig'
import { userActionCreator } from '../../reduxutils/actions.js'
import {companyActionCreator} from '../../reduxutils/actions.js';
import logo from '../../images/Indeed_logo.png'
import ErrorMsg from '../Error/ErrorMsg'
import {prefActionCreator} from '../../reduxutils/actions';

function Login(props) {
    const [redirectVal, redirectValFn] = useState(null)
    const dispatch = useDispatch()
    const[errMsg,setErrMsg] = useState('');

    const setTitle = bindActionCreators(prefActionCreator.setTitle,dispatch);
    const setType = bindActionCreators(prefActionCreator.setType,dispatch);
    const setPay = bindActionCreators(prefActionCreator.setPay,dispatch);
    const setSchedule = bindActionCreators(prefActionCreator.setSchedule,dispatch);
    const setRemote = bindActionCreators(prefActionCreator.setRemote,dispatch);
    const setRelocation = bindActionCreators(prefActionCreator.setRelocation,dispatch);

    const setEmail = bindActionCreators(userActionCreator.setEmail,dispatch);
    const setId = bindActionCreators(userActionCreator.setId,dispatch);
    const setAccountType = bindActionCreators(userActionCreator.setAccountType,dispatch);
    const setName = bindActionCreators(userActionCreator.setName,dispatch);
    const setPhone = bindActionCreators(userActionCreator.setPhone,dispatch);
    const setResumeUrl = bindActionCreators(userActionCreator.setResumeUrl,dispatch);
    const setToken = bindActionCreators(userActionCreator.setToken,dispatch);
    const showErrorModal = bindActionCreators(userActionCreator.showErrorModal,dispatch);
    const setCompId = bindActionCreators(companyActionCreator.setCompId,dispatch);
    const setCompName = bindActionCreators(companyActionCreator.setCompName,dispatch);
    //const setCompanyId = bindActionCreators(userActionCreator.setCompanyId,dispatch);

  let redirectToSignUp = (e) => {
    redirectValFn(<Redirect to="/signup" />)
  }

  let signIn = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password');
    let accountType = "";
    switch(formData.get('accountType')) {
        case 'Employer':
            accountType = 'Employer';break;
        case 'Job Seeker':
            accountType = 'JobSeeker';break;
        case 'Admin':
            accountType = 'Admin';break;
        default:
            setErrMsg('Please do not mess with the radio button UI.');
            showErrorModal(true);
            break;
    }
    axios.post(`${backendServer}/api/login`,{
        email:email,
        password:password,
        accountType: accountType
    }).then(res=> {   
      if(res.data.code=='203') {
          setErrMsg(res.data.msg);
          showErrorModal(true);
      } else {
            //alert('Successfully logged in');
            //const jwt_decode = require('jwt-decode');
            setToken(res.data);
            var decoded = jwt_decode(res.data.split(' ')[1]);
            const user = decoded.user;
            console.log(decoded);
            setEmail(user.email);
            setName(user.name);
            setAccountType(accountType);
            setId(user.id);
            if(accountType=='JobSeeker')  {
                if(decoded.resumeUrl!=null && decoded.resumeUrl.trim().length>0)
                    setResumeUrl(decoded.resumeUrl);
                if(decoded.jobPreference!=null) {
                  let jobPref = decoded.jobPreference;
                  for(let header in jobPref) {
                    if( !jobPref.hasOwnProperty(header) )
                      continue;
                    switch(header) {
                      case 'Job Title':
                          setTitle(jobPref[header]);
                          break;
                      case 'Job Types':
                          setType(jobPref[header]);
                          break;
                      case 'Work Schedules':
                          setSchedule(jobPref[header]);
                          break;
                      case 'Remote':
                          setRemote(jobPref[header]);
                          break;
                      case 'Pay':
                          setPay(jobPref[header]);
                          break;
                      case 'Relocation':
                          setRelocation(jobPref[header]);
                          break;
                    }
                  }
                }
                setPhone(user.jobSeekerContact);
                redirectValFn(<Redirect to="/landingPage"/>);
            } else if(accountType=='Employer')  {
                if(user.companyId==null) {
                    redirectValFn(<Redirect to="/employerprofile"/>);
                }
                else {
                    setCompId(user.companyId);
                    setCompName(user.companyName);
                    redirectValFn(<Redirect to="/employer"/>);
                }
            } else if(accountType=='Admin')  {
                redirectValFn(<Redirect to="/adminPhotos"/>);
            }
        }
    },
    (error) => {
        setErrMsg('Customer failed to login');
        showErrorModal(true);
        console.log('error is',error)
    },
    )
  }
  return (
    <div
      className="container-fullwidth"
      style={{ margin: 'auto', marginTop: '5%', width: '30%' }}
    >
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
      </div>
      <br></br>
      <br></br>
      <div
        className="row"
        style={{ background: 'whitesmoke', padding: '10% 5% 5% 5%' }}
      >
        <div className="row">
          <p>
            <b>Sign In</b>
          </p>
        </div>
        <br></br>
        <div className="row">
          <p>
            <small>
              By signing in to your account, you agree to Indeed's{' '}
              <u style={{ color: 'blue' }}>Terms of Service </u>and consent to
              our <u style={{ color: 'blue' }}>Cookie Policy </u>and{' '}
              <u style={{ color: 'blue' }}>Privacy Policy</u>.
            </small>
          </p>
        </div>
        <br></br>
        <div className="row">
          <Form onSubmit={signIn}>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Email Address</b>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                maxLength="45"
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Password</b>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                maxLength="8"
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="radio"
                label="Job Seeker"
                name="accountType"
                value="Job Seeker"
                required
              />
              <Form.Check
                type="radio"
                label="Employer"
                name="accountType"
                value="Employer"
              />
              <Form.Check
                type="radio"
                label="Admin"
                name="accountType"
                value="Admin"
              />
            </Form.Group>
            
            <Button
              bsStyle="primary"
              bsSize="large"
              block
              style={{ width: '100%' }}
              type="submit"
            >
              Sign In
            </Button>
          </Form>
        </div>
        <div className="row" style={{ color: 'grey', textAlign: 'center' }}>
          <p>---------------or---------------</p>
          <p style={{ color: 'navy' }} onClick={redirectToSignUp}>
            New to Indeed? Create an account
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
