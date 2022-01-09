//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import EmployerNavbar from './EmployerNavbar'
import {
    Form, Button, Row, Col, Card, Container, FormControl,
  } from 'react-bootstrap';
import { CountryDropdown } from 'react-country-region-selector';
import backendServer from '../../webConfig';
import { connect } from "react-redux";
import { withRouter } from 'react-router';


class PostJob extends Component {
    constructor(props) {
      super(props);
      this.state = {
          companyName: '',
          industry: '',
          jobTitle: '',
          streetAddress: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          jobMode: 'Remote',
          jobType: 'Part-time',
          salaryDetails: '',
          shortJobDescription: '',
          responsibilities: '',
          qualifications: '',
          loveJobRole: '',
          errors: {},
          successMsg: '',
          errorMsg: '',
      };
    }
    handleChangeCountry = (val) => {
        this.setState({ country: val });
        this.setState({
            errors: {},
          });
      }

      handleChangeIndustry = (e) => {
        this.setState({
          industry: e.target.value,
        });
        this.setState({
          errors: {},
        });
      }
    
      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
        this.setState({
          errors: {},
        });
      }
      handleDashBoard = (e)=>{
        e.preventDefault();
        const { history } = this.props;
		    history.push("/employer");
      }
      findFormErrors = () => {
        var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?0-9]/);
        const {  jobTitle, industry, city, shortJobDescription, salaryDetails,
            streetAddress, state, zipcode,country, jobMode, jobType, errors } = this.state;
            console.log(zipcode.length)
        
        if (!jobTitle || jobTitle === '') errors.jobTitle = 'Job Title cannot be blank!';
        if (!industry || industry === '') errors.industry = 'Please select a industry!';
        if (!city || city === '') errors.city = 'City cannot be blank!';
        if (!shortJobDescription || shortJobDescription === '') errors.shortJobDescription = 'Job Description cannot be blank!';
        if (!salaryDetails || salaryDetails === '' || salaryDetails < 0) errors.salaryDetails = 'Salary Details cannot be blank or negative!';
        if (!streetAddress || streetAddress === '') errors.streetAddress = 'Street Address cannot be blank!';
        if (!state || state === '' ) errors.state = 'State cannot be blank!';
        if (!zipcode || zipcode === '' || zipcode < 0) errors.zipcode = 'Zip code cannot be blank or negative!';
        if (!(zipcode.length === 5) ) errors.zipcode = 'Zip code should be 5 digits!';
        if (!country || country === '') errors.country = 'Please select a country!';
        if (!jobMode || jobMode === '') errors.jobMode = 'Please select a Job Mode!';
        if (!jobType || jobType === '') errors.jobType = 'Please select a Job Type!';
        if (pattern.test(state)) errors.state = 'State cannot contain digits and special characters!';
        if (pattern.test(city)) errors.city = 'City cannot contain digits and special characters!';
        return errors;
      }
    handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = this.findFormErrors();
        if (Object.keys(newErrors).length > 0) {
        this.setState({
            errors: newErrors,
        });
        } else {
            // To-DO : Get logged in company id
            const companyId = this.props.company.compid;
            const employeeId = this.props.userInfo.id;
            const companyName = this.props.company.compName;
            const {  jobTitle, industry, city, shortJobDescription, salaryDetails,
                streetAddress, state, zipcode,country, jobMode, jobType,responsibilities,
                qualifications, loveJobRole} = this.state;
            const inputData = {
                companyId,
                employeeId,
                companyName,
                jobTitle,
                industry,
                salaryDetails,
                shortJobDescription,
                jobMode,
                jobType,
                city,
                streetAddress,
                state,
                zipcode,
                country,
                responsibilities,
                qualifications, 
                loveJobRole,
                jobPostedDate : Date().toLocaleString(),

            };
           // console.log(inputData);
           axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
            axios
            .post(`${backendServer}/postNewJob`, inputData)
            .then((response) => {
              console.log("Response")
                console.log(response)
              if (response.status === 200) {
                
                this.setState({
                  successMsg: response.data,
                  
                  jobTitle: '',
                  industry: '',
                  salaryDetails: '',
                  shortJobDescription: '',
                  city: '',
                  streetAddress: '',
                  state: '',
                  zipcode: '',
                  country: '',
                  responsibilities:'',
                  qualifications:'',
                  loveJobRole:''
                });
              } else {
                this.setState({ errorMsg: response.data });
              }
            })
            .catch((err) => {
              this.setState({ errorMsg: "Internal Server Error!" });
            });

        }
    }
  
    render() {
        const {  jobTitle, industry, city, shortJobDescription, salaryDetails,
            streetAddress, state, zipcode,country, errors,successMsg, errorMsg,
            qualifications, responsibilities, loveJobRole } = this.state;
            // console.log(successMsg)
            // console.log(errors)
      return (
        <div>
              <EmployerNavbar/>
            <br></br>
            <Container style={{ display: 'flex', justifyContent: 'center' }}>
            
            <Card style={{ width: '50rem', margin: '0.8em' }}>
            <Card.Title>
               <Row><Col> Enter the job opening details</Col></Row>
            </Card.Title>
            <Card.Body>   
            <div data-testid="msgDiv">
              {(successMsg !== undefined && successMsg != null)
                ? <h4 style={{ color: 'green' }}>{successMsg}</h4> : null}
              {(errorMsg !== undefined && errorMsg != null)
                ? <h4 style={{ color: 'brown' }}>{errorMsg}</h4> : null}
            </div>
            <span style={{color:'red'}}>* </span> <span style={{color:'gray'}}>Required Fields</span>
             <Row>
              <Col><b>Company Name</b></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="companyName" type="text" placeholder="Enter your Company Name" 
                  className="mr-sm-2" disabled value={this.props.company.compName} isInvalid={!!errors.companyName} />
                  <Form.Control.Feedback type="invalid">
                   
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
            <Row>
              <Col><b>Job Title</b><span style={{color:'red'}}>* </span></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="jobTitle" type="text" maxLength="50" className="mr-sm-2" onChange={this.handleChange} placeholder="Enter Job title" value={jobTitle} isInvalid={!!errors.companyName}/>
                   <Form.Control.Feedback type="invalid">
                    { errors.jobTitle }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
            <Row>
              <Col><b>Industry</b><span style={{color:'red'}}>* </span></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control as="select" value={industry} onChange={this.handleChangeIndustry} isInvalid={!!errors.industry}>
                    <option>Choose the job industry</option>
                    <option value="Software">Software</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Electrical">Electrical</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    { errors.industry }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
            <Col><b>Select Job Mode</b><span style={{color:'red'}}>* </span></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Check inline value="Remote" label="Remote" name="jobMode" type="radio" id="Remote" onChange={this.handleChange} isInvalid={!!errors.jobMode} defaultChecked/>
                  <Form.Check inline value="In-person" label="In-person" name="jobMode" type="radio" id="In-person" onChange={this.handleChange} isInvalid={!!errors.jobMode} />
                  <Form.Control.Feedback type="invalid">
                    { errors.jobMode }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
            <Col><b>Select Job Type</b><span style={{color:'red'}}>* </span></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Check required inline value="Part-time" label="Part-time" name="jobType" type="radio" id="Part-time" onChange={this.handleChange} isInvalid={!!errors.jobType} defaultChecked/>
                  <Form.Check required inline value="Full-time" label="Full-time" name="jobType" type="radio" id="Full-time" onChange={this.handleChange} isInvalid={!!errors.jobType}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.jobType }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
                <Col><b>Enter Job Description</b><span style={{color:'red'}}>* </span></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="shortJobDescription" as="textarea" rows={5} className="mr-sm-2" 
                   maxLength="1000"
                  onChange={this.handleChange} value={shortJobDescription} isInvalid={!!errors.shortJobDescription}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.shortJobDescription }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                <Col><b>Responsibilities</b></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="responsibilities" as="textarea"
                  maxLength="1000" 
                  rows={5} className="mr-sm-2" onChange={this.handleChange} value={responsibilities} isInvalid={!!errors.responsibilities}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.responsibilities }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                <Col><b>Qualifications</b></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="qualifications" 
                   maxLength="1000" as="textarea" rows={5} className="mr-sm-2" onChange={this.handleChange} value={qualifications} isInvalid={!!errors.qualifications}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.qualifications }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                <Col><b>Reasons for loving this job</b></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="loveJobRole" as="textarea"
                   maxLength="1000"  rows={5} className="mr-sm-2" onChange={this.handleChange} value={loveJobRole} isInvalid={!!errors.loveJobRole}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.loveJobRole }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row>
                    <Row>
              <Col><b>Salary Details</b><span style={{color:'red'}}>* </span></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="salaryDetails" type="number" className="mr-sm-2" min="0" onChange={this.handleChange} placeholder="Enter Salary Details" value={salaryDetails} isInvalid={!!errors.salaryDetails}/>
                  <Form.Control.Feedback type="invalid">
                    { errors.salaryDetails }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
            <Row>
              <Col><b>Street Address</b><span style={{color:'red'}}>* </span></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="streetAddress" placeholder="Enter Street Address" 
                  maxLength="50"
                  type="text" className="mr-sm-2" onChange={this.handleChange} value={streetAddress} isInvalid={!!errors.streetAddress} />
                  <Form.Control.Feedback type="invalid">
                    { errors.streetAddress }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col><b>City</b><span style={{color:'red'}}>* </span></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="city" 
                  maxLength="50" type="text" placeholder="Enter City" className="mr-sm-2" onChange={this.handleChange} value={city} isInvalid={!!errors.city} />
                  <Form.Control.Feedback type="invalid">
                    { errors.city }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col><b>State</b><span style={{color:'red'}}>* </span></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="state"
                  maxLength="50" type="text" placeholder="Enter State" className="mr-sm-2" onChange={this.handleChange} value={state} isInvalid={!!errors.state} />
                  <Form.Control.Feedback type="invalid">
                    { errors.state }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col><b>Zip</b><span style={{color:'red'}}>* </span></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="zipcode" type="number" maxLength="5" placeholder="Enter Zipcode" className="mr-sm-2" onChange={this.handleChange} value={zipcode} isInvalid={!!errors.zipcode} />
                  <Form.Control.Feedback type="invalid">
                    { errors.zipcode }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col><b>Country </b><span style={{color:'red'}}>* </span></Col>
              </Row>
              <Row>
              <Col>
                <Form.Group className="mb-3">
                  <CountryDropdown 
                    value={country}
                    onChange={(val) => this.handleChangeCountry(val)}
                    isInvalid={!!errors.country}
                  /> 
                  <br/>
                   <label style={{color:"red"}}>{errors.country}</label>
                </Form.Group>
               
              </Col>
            </Row>
            <Row>
              <Col colSpan="2">
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                  Post Job
                </Button>
              </Col>
              </Row>
              <br/>
              <Row>
              {/* <Col colSpan="2">
                <Button variant="primary" type="submit" onClick={this.handleDashBoard}>
                  DashBoard
                </Button>
              </Col> */}
              </Row>
              </Card.Body>
              </Card>
              </Container>
        </div>
      );
    }
  }
  //export default PostJob;
  const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    company: state.company
  })
  
  export default connect(mapStateToProps)(withRouter(PostJob));