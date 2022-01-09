import 'bootstrap/dist/css/bootstrap.min.css';
import { ToggleButtonGroup, ToggleButton, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import backendServer from '../../webConfig';
import CompanyTabs from './CompanyTabs';
import Card from "react-bootstrap/Card";
import '../../CSS/FindSalary.css'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@material-ui/core/TextField';
import {   Row, Col} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { Link,useParams  } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {companyActionCreator} from '../../reduxutils/actions';
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";


const AddSalaryReview = (props) => {
  const [show, setShow] = useState(false);
  const [salary, setSalary] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showOtherBenefits, setShowOtherBenefits] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleVisible = () => setVisible(true);
  const token = useSelector((state) => state.userInfo.token);
  const revCompId = useSelector((state) => state.company.compid);
  const revCompName = useSelector((state) => state.company.compName);
  const dispatch = useDispatch();
  const setCompId = bindActionCreators(companyActionCreator.setCompId,dispatch);
  const setCompName = bindActionCreators(companyActionCreator.setCompName,dispatch);
  let history = useHistory();
  const [errors,setErrors] = useState("");
  const [openSuccessModal,setOpenSuccessModal]=useState(false);
  const handleCloseSuccessModal = () => setOpenSuccessModal(false);

  const handleCloseVisible = () => {
    // console.log("func called");
    setVisible(false);
    setShow(false);
    setShowEndDate(false);
    setShowOtherBenefits(false);
    setErrorMessage("");
    setErrors("");
  }
  const [companyDtls, setCompanyDtls] = useState([]);
  // const [jobDtls, setJobDtls] =useState([]);
  const [nameComp, setNameComp] =useState(null);
  const [titleJob, setTitleJob] =useState(null);
  const [locJob, setLocJob] =useState(null);
  console.log('visible' ,visible);
  const companyId = useSelector((state)=>state.company.compid);
  const jobSeekerId = useSelector((state)=>state.userInfo.id);
  const [jobTitleOption, setJobTitleOption] =useState([]);
  const [cityOption, setCityOption] = useState([]);

  const handleCompanyLink = (e) => {
    setCompId(revCompId);
    setCompName(revCompName);
  }

  useEffect(() => {
    console.log("companyid",companyId);
    axios.defaults.headers.common["authorization"] = token;
    axios.get(`${backendServer}/jobSeeker/getSalaryReview`,{
      params: {
        companyId : companyId
      }
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setSalary(response.data);
          console.log(response.data);
      }
      }).catch((err) => {
        console.log(err);
      });
      axios.get(`${backendServer}/getCompanyDetails`).then((response) => {
        
        console.log("getCompanyDetails:",response);
        if (response.status === 200) {
          setCompanyDtls(response.data);
          console.log(response.data);
      }
      }).catch((err) => {
        console.log(err);
      });


      axios.get(`${backendServer}/jobSeeker/home`).then((response) => {
        console.log(response);
          // setJobDtls(response.data);
          let jobTitleOptionArray = [];
          let cityOptionArray = [];
          // console.log("hiknijnjnjm", jobDtls);
          response.data.forEach((obj)=>{
            console.log("current job title",obj.jobTitle);
            console.log("current city",obj.city);
            if(!jobTitleOptionArray.includes(obj.jobTitle))
            {
              jobTitleOptionArray.push(obj.jobTitle);
              // console.log("options",jobTitleOption);
            }
            if(!cityOptionArray.includes(obj.city))
            {
              cityOptionArray.push(obj.city);
              // console.log("options",jobTitleOption);
            }
            console.log("jobTitleOptionArray: ",jobTitleOptionArray);
            console.log("cityOptionArray: ",cityOptionArray);
          });
          setJobTitleOption(jobTitleOptionArray);
          setCityOption(cityOptionArray);
          // console.log("JobDtls: ",jobTitleOption);
      }).catch((err) => {
        console.log(err);
      });


  },[]);


  const addSalaryReview = (e) => {
    e.preventDefault();
    // const isValid = formValidation();
    
    const formData = new FormData(e.target);
    const currentlyWorking = formData.get('currentlyWorking');
    // const companyName = formData.get('nameComp');
    const companyName=nameComp.companyName;
    const endDate = formData.get('endDate');
    // const jobTitle = formData.get('jobTitle');
    const jobTitle = titleJob.jobTitle;
    // const jobLocation = formData.get('jobLocation');
    const jobLocation = locJob.city;
    const annualPay = formData.get('annualPay');
    const yrsOfExp = formData.get('yrsOfExp');
    // const benefitsObject = {};
    const benefitsObject = [];
    

    if(document.getElementById("paidTimeOff").checked) {
      benefitsObject.push("paidTimeOff");
    }
    if(document.getElementById("healthInsurance").checked) {
      benefitsObject.push("healthInsurance");
    }
    if(document.getElementById("lifeInsurance").checked) {
      benefitsObject.push("lifeInsurance");
    }
    if(document.getElementById("dentalVision").checked) {
      benefitsObject.push("dentalVision");
    }
    if(document.getElementById("retirement").checked) {
      benefitsObject.push("retirement");
    }
    if(document.getElementById("otherBenefits").checked) {
      benefitsObject.push(formData.get("otherBenefitsText"));
    }

    const benefits = JSON.stringify(benefitsObject);
 
    console.log(  'currentlyWorking', currentlyWorking);
      console.log( 'companyName', companyName);
        console.log( 'endDate',  endDate,);
          console.log( 'jobTitle', titleJob);
            console.log( 'jobLocation',  locJob);
              console.log(' annualPay',  annualPay);
   
              

  if (!currentlyWorking || currentlyWorking === '') {
    setErrors('Please select an option!');
  }else{

    axios.post(`${backendServer}/jobSeeker/postSalaryReview`,{
        currentlyWorking: currentlyWorking,
        companyName:  companyName,
        endDate:  endDate,
        jobTitle: titleJob,
        jobLocation:  locJob,
        annualPay:  annualPay,
        yrsOfExp: yrsOfExp,
        benefits: benefits,
        jobSeekerId: jobSeekerId
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log("returned");
            console.log(response.data);
            handleCloseVisible();
            setOpenSuccessModal(true);
            // history.push('/addSalaryReview');
          }
        }).catch((err) => {
          console.log("caught an error");
          console.log(err.response);
          setErrorMessage(err.response.data);
        });
      }
    };

  return (
    <div>
       <CompanyTabs />

            <Row>
                <Col xs={8}>              
                <div className="card-container" style={{marginLeft:"50px"}}>
                {salary.map((salaryDetails, index) => {
                  return (
                    <div class="card" key={index} style={{marginTop:'20px',marginInline:'1.5rem',width:'250px'}}>
                    <div class="card-body">
                  <div class="card-title"><b>{salaryDetails.jobTitle}</b></div>
                  <div class="card-text"> ${salaryDetails.annualPay} per year</div>
                  </div>
                  </div>
               
                  );
                        })}
                          </div>
                       
                     
              </Col>
              <Col xs={3}> 
          <button type="button" class="btn btn-outline-primary btn-lg" style={{width:'100%'}} onClick={handleShow}>
          Add Salary Review
           </button>
             
           {/* <button type="button" class="btn btn-outline-info" style={{width:'100%'}} onClick={handleVisible}>
           Claimed Profile
             <i class="bi bi-check-circle-fill" style={{color:'green', marginLeft:'4px'}}></i>
           </button> */}

          <Card  style={{marginTop:'20px'}}>
           <Card.Body>
            <Card.Title onClick={handleVisible}>Claimed Profile
             <i class="bi bi-check-circle-fill" style={{color:'green', marginLeft:'4px'}}></i>
             </Card.Title>
             </Card.Body>
          </Card>

          <Card style={{marginTop:'20px'}}>
           <Card.Body>
            <Card.Title>Salary satisfaction</Card.Title>
            {/* <Card.Text> <a href='/reviews'>Add your rating</a> </Card.Text> */}
            <Link style={{textDecoration: 'none'}} to="/reviews" onClick={(e) => {handleCompanyLink(e) }}>Add your rating</Link>
             </Card.Body>
          </Card>
     </Col>
     <Col></Col>
 </Row>     

      <Modal
        visible={visible}
        onHide={handleCloseVisible}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton>
          <Modal.Title>Can you tell us about yourself?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      An individual from this business has claimed this profile. However,
                Indeed does not verify the accuracy of this information, and not all information found on this profile has been provided by 
                or verified by the business.
        </Modal.Body>
      </Modal> 

      <Modal
        show={show}
        onHide={handleCloseVisible}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton>
          <Modal.Title>Can you tell us about yourself?*</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form onSubmit={addSalaryReview}>
              <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>What’s your company name?*</Form.Label>
                    <Autocomplete
                      id="nameComp"
                      options={companyDtls}
                      renderInput={params => (
                        <TextField {...params} required label="Company Name" variant="outlined" style={{dispaly:"flex"}}/>
                      )}
                      getOptionLabel={option => option.companyName}
                      style={{ width: 270 }}
                      // value={nameComp}
                      name="nameComp"
                      onChange={(_event, companyName) => {
                        setNameComp(companyName);
                      }}
                 /><br/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Are you currently working at this company?*</Form.Label>
                  <br/>
                  <ToggleButtonGroup type="radio" name="currentlyWorking">
                    <ToggleButton id="tbg-btn-1" value="Yes" onChange={()=>setShowEndDate(false)}>
                      Yes
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-2" value="No" onChange={()=>setShowEndDate(true)} >
                      No
                    </ToggleButton>
                    <br/>
                    <br/>
                    <Form.Control.Feedback style={{color:"red"}} type="invalid">
                    {errors}
                  </Form.Control.Feedback>
                  </ToggleButtonGroup>
                
                  <br/>
                  <br/>
              </Form.Group>
              { showEndDate ?
              <Form.Group>
                  <Form.Label >End date</Form.Label>
                  <Form.Control type="date" placeholder="End Date" name="endDate" required/><br/>
              </Form.Group> : null
              }
              <Form.Group>
                  <Form.Label>What’s your job title?*</Form.Label>
                  <Autocomplete
                      id="jobtitle"
                      // options={jobDtls.filter(companyName => nameComp)}
                      options={jobTitleOption.map((option) => option)}
                      renderInput={params => (
                        <TextField {...params} required label="Job Title" variant="outlined" />
                      )}
                      getOptionLabel={option => option}
                      style={{ width: 270 }}
                      // value={titleJob}
                      name="jobTitle"
                      onChange={(_event, jobtitle) => {
                        setTitleJob(jobtitle);
                      }}
                 /><br/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Where’s your job location?*</Form.Label>
                  <Autocomplete
                      id="jobloc"
                      options={cityOption.map((option) => option)}
                      renderInput={params => (
                        <TextField {...params} required label="Job Location" variant="outlined" />
                      )}
                      getOptionLabel={option => option}
                      style={{ width: 270 }}
                      // value={locJob}
                      name="jobLocation"
                      onChange={(_event, jobLoc) => {
                        setLocJob(jobLoc);
                      }}
                 /><br/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>What’s your annual pay at the company?*</Form.Label>
                  <Form.Control type="number" placeholder="Annual Pay" name="annualPay" min="0" required/><br/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>How many years of relevant experience do you have?*</Form.Label>
                  <Form.Control type="number" placeholder="Experience"  name="yrsOfExp"  min="0"  max="50" required/><br/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Which benefits do you receive at the company?* </Form.Label> 
                  <Form.Check type="checkbox" label="Paid time off" id="paidTimeOff"/>
                  <Form.Check type="checkbox" label="Health Insurance" id="healthInsurance"/>
                  <Form.Check type="checkbox" label="Life insurance" id="lifeInsurance"/>
                  <Form.Check type="checkbox" label="Dental / Vision insurance" id="dentalVision"/>
                  <Form.Check type="checkbox" label="Retirement / 401(k)" id="retirement"/>
                  <Form.Check type="checkbox" label="Other benefits" id="otherBenefits" onClick={()=>setShowOtherBenefits(!showOtherBenefits)}/><br/>
                  {
                    showOtherBenefits ?
                    <div>
                  <Form.Label>Other Benefits</Form.Label>
                  <Form.Control as="textarea" rows={3} id="otherBenefitsText" name="otherBenefitsText"/> </div>: null
                  } 
              </Form.Group>   
              <br/>              
            <Button variant="primary" size="sm" type="submit">
              Add
            </Button>
            <h6 style={{ color: "red" }}>{errorMessage} </h6> 
            <Button variant="primary" size="sm" onClick={handleCloseVisible}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal> 
      {openSuccessModal && (
        <Modal show={openSuccessModal} onHide={handleCloseSuccessModal}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Salary Review added successfully!!</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseSuccessModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default withRouter(AddSalaryReview);