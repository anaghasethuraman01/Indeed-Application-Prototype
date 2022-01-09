// Employer Landing Page
import React, { Component } from 'react'
import EmployerNavbar from './EmployerNavbar'
import {Button,Card,ListGroup,ListGroupItem,Modal,Row,Col,Pagination,Container} from 'react-bootstrap';
import axios from "axios";
import backendServer from '../../webConfig';
import '../../CSS/EmployerLanding.css'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from 'react-router';

// import {companyActionCreator} from '../../reduxutils/actions.js';
// import { setId} from "../../actions/loginActions";
class Employer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: '',
      day: '',
      year: '',
      companyId:null,
      postedJobs: [],
      statusmsg:null,
      show:false,
      applicantsName : [],
      liststatus:null,
      applicantProfile:[],
      jobPreference:[],
      showprofile:false,
      curPage: 1,
      pageSize: 3,
      status:'',
    
    }
    //this.getCurrentDate()
  }
  updatestatusfn = (id,status,jobId) =>{
   
    const statuschange = {
      id:id,
      status:status,
      jobId:jobId
    }
    //console.log(ordertypedata)
   this.updateJobSeekerStatus(statuschange);
    
  }
  updateJobSeekerStatus = (statuschange)=>{
    console.log(statuschange)
    
     axios.post(`${backendServer}/updateJobSeekerStatus`, statuschange)
             .then(response => {
                 if(response.data === 'Job Seeker Status Updated!'){
                  alert("Job Seeker Status Updated!") 
                  //this.setState({updateshow:true})
                  
                 }
             })
             
  }
  componentDidMount() {
      //console.log("here")
      const companyId = this.props.company.compid;
      const userId = this.props.userInfo.id;
      //console.log(companyId)
      const compId = {
        companyId:companyId,
        userId:userId
      }
      axios.post(`${backendServer}/getPostedJobs`,compId).then((response) => {
        console.log(response.data)
        if(response.status === 200){
          
          this.setState({
            postedJobs: this.state.postedJobs.concat(response.data),
          });
          this.setState({
            statusmsg: "Jobs Found"
          });
        }
      });
}
handleModalClose(){
  this.setState({applicantsName : []})
  this.setState({show:false}) 
}
handleModalCloseProfile(){
  this.setState({applicantsName : []})
  this.setState({showprofile:false}) 
  this.setState({applicantProfile : []})
  this.setState({jobPreference : []})
  
  
}
  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/postJob');
  }
  viewJobSeekerProfile = (id) => {
    const jobSeekerId = {
      id : id
    }
    axios.post(`${backendServer}/getJobSeekerProfile`,jobSeekerId).then((response) => {
      console.log(response.data[0])
      if(response.status === 200){
        
        this.setState({
          applicantProfile: this.state.applicantProfile.concat(response.data[0]),
        });
        if(Object.keys(response.data[1]).length === 0){
          this.setState({
            jobPreference: this.state.jobPreference,
          });
        }else{
          this.setState({
            jobPreference: this.state.jobPreference.concat(response.data[1]),
          });
        }
        
        this.setState({show:false})
        this.setState({showprofile:true})
        
      }
    });
  }
  download = (url,resumeUrl) => {
 
    let keyarr = resumeUrl.split('/');
    console.log(keyarr)
    let key = keyarr[keyarr.length-1];
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${key}`);
    document.body.appendChild(link);
    link.click();
}

  viewJobSeekerResume = (id) => {
    const jobSeekerId = {
      id : id
    }
    axios.post(`${backendServer}/getJobSeekerResume`,jobSeekerId).then((response) => {
 
      // if(response.data === " "){
      //   alert("No Resume Added")
      // }
      console.log(response)
      if(response.status === 200){
        
        let resumeUrl = response.data;
        if(resumeUrl != null && resumeUrl.trim().length>0) {
          let keyarr = resumeUrl.split('/');
          let key = keyarr[keyarr.length-1];
          console.log(key)
          axios.get(backendServer+'/api/downloadResume/'+key).then(res=>{
              console.log(res);
              if(res.status == '200') {
                  this.download(res.data,resumeUrl);
              } else {
                alert("No Resume added")
                  // showErrorModal(true);
                  // setErrMsg(res.data);
              }
          })
        }  else {
          alert('No Resume to Download!')
        }
        
      }else{
        alert("No Resume added")
      }
     
        
      // }
    });
  }
  onPage = (e) => {
    console.log("****")
    console.log(e.target.text);
    if(e.target.text === undefined){
      e.target.text = 1;
    }
    console.log("****")
    // console.log("In pagination");
    // console.log(e.target);
    // console.log(e.target.text);
    this.setState({
      curPage: e.target.text,
    });
  };
  viewUsersList = (val) => {
   const JobId = {
     compid : this.props.company.compid,
     jobId : val
   }
   axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
    axios.post(`${backendServer}/getApplicantsName`,JobId).then((response) => {
      if(response.status === 200){
        console.log(response.data)
        if(response.data.length >=1 ) {
          this.setState({liststatus : "Applicants List"})
        }else{
          this.setState({liststatus : null})
        }
        this.setState({
          applicantsName: this.state.applicantsName.concat(response.data),
        });
      }
      
    });
    this.setState({
      show:true
    })
  }
  handleChange = (e, jobseekerid) => {
    console.log(jobseekerid)
    const { applicantsName } = this.state;
    const index = applicantsName.findIndex((applicant) => applicant.id === jobseekerid);
    const orders = [...applicantsName];
    orders[index].status = e.target.value;
    this.setState({ applicantsName: orders });
  }



  render() {
    const {applicantsName,statusmsg,liststatus,applicantProfile,jobPreference} = this.state;
    var jobsList = null; var applicantsList = null; var profile = null;
    let paginationItemsTag = [];
    let items = this.state.postedJobs;
    let pgSize = this.state.pageSize;
    let count = 1;
    let num = items.length / pgSize;
    //console.log(items.length / pgSize);
    //console.log(Number.isInteger(items.length / pgSize));
    if (Number.isInteger(num)) {
      count = num;
    } else {
      count = Math.floor(num) + 1;
    }
  //   console.log("count:", count);
  // console.log("items.length:", items.length);
  let active = this.state.curPage;

  for (let number = 1; number <= count; number++) {
    paginationItemsTag.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  let start = parseInt(pgSize * (this.state.curPage - 1));
        let end = this.state.pageSize + start;
        //   console.log("start: ", start, ", end: ", end);
        let displayitems = [];
        if (end > items.length) {
          end = items.length;
        }
        for (start; start < end; start++) {
          displayitems.push(items[start]);
        }
    
    if(liststatus === "Applicants List"){
      applicantsList = (
        <div>
          {applicantsName.map(applicant=>
          <div>
            <Row>
              <Col>
              <Button
              onClick={() => {
                this.viewJobSeekerProfile(applicant.id);
              }}
               
               variant="Link">{applicant.name}</Button>
              
              </Col>
              <Col>
              <Button variant="link"
              onClick={() => {
                this.viewJobSeekerResume(applicant.id);
              }}
              >Resume</Button>
              </Col>
              <Col>
             <select name="status" value={applicant.status} onChange={(e) => { this.handleChange(e,applicant.id)}}  >
              	<option value="Submitted">Submitted</option> 
              	<option value="Reviewed" >Reviewed</option>
              	<option value="Initial screening"  >Initial screening</option>
              	<option value="Interviewing" >Interviewing</option>
                <option value="Rejected" >Rejected</option>
                <option value="Hired" >Hired</option>
            	</select>
              &nbsp;
              <Button className="statusbtn"
                type="submit" 
                onClick={() => {
                this.updatestatusfn(applicant.id,applicant.status,applicant.jobId);
                }}>
                Change
              </Button>
              </Col>
            </Row></div>
          )}
        </div>
      )
    }else{
      applicantsList = (
        <div>
          Zero Applicants for this job.
        </div>
      )
    }
    if(applicantProfile){
      profile = (
        <div>
          {applicantProfile.map(applicant=>
            <div>
               
                <h5>Profile Details</h5>
                <Container style={{ display: 'flex', justifyContent: 'center' }}>
                <Card style={{ width: '50rem', margin: '0.8em' }}>
               <Row>
                <Col>
                &nbsp;&nbsp; Email : {applicant.email} 
                </Col>
                </Row>
                <Row>
                <Col>
                &nbsp;&nbsp;&nbsp;Phone :
                {(applicant.jobSeekerContact !== '' && applicant.jobSeekerContact !== null)
          ? <h8>{applicant.jobSeekerContact}</h8> : <h8>No Contact Added</h8>}
                {/* &nbsp;&nbsp; {applicant.jobSeekerContact} */}
                </Col>
              </Row>
              </Card>
               </Container>

            </div>
          )}
            <br/>   
        {jobPreference.map(job=>
            <div>
               <h5>Job Preferences</h5>
               <Container style={{ display: 'flex', justifyContent: 'center' }}>
              <Card style={{ width: '50rem', margin: '0.8em' }}>
              <Row>
                <Col>
               Job Title : {job.JobTitle}
                </Col>
                </Row>
                <Row>
                <Col>
                Job Types : {job.JobTypes}
                </Col>
              </Row>
              <br/>
              <h6>Work Schedules :</h6>
               
              <Row>
                <Col>
                <h6>Range:</h6>
                {job.WorkSchedules.range.map(range=>
                <div>
                  {range}
                </div>
                )}
                <br/>
                <h6>Shifts:</h6>
                {job.WorkSchedules.shifts.map(other=>
                <div>
                  {other}
                </div>
                )}
                <br/>
                <h6>Other:</h6>
                {job.WorkSchedules.other.map(other=>
                <div>
                  {other}
                </div>
                )}
                </Col>
              </Row> 
              <br/>
              <h6>Pay:</h6>
              <Row>
                <Col>
               Category : {job.pay.category}
               &nbsp;&nbsp;
               Amount : {job.pay.amount}
                </Col>
                </Row>
               <br/>
              <Row>
                <Col>
                <h6>Relocation:</h6>{(job.relocation)?<h8>YES</h8>:<h8>NO</h8>}
                </Col>
                </Row>
                <br/>
                
                <Row>
                <h6>Remote:</h6>
                <Col>
                {job.remote.map(other=>
                <div>
                  {other}
                </div>
                )}
                </Col>
                </Row>
                </Card>
                </Container>
            </div>
          )}
        </div>
      )

    }
    if(statusmsg === "Jobs Found"){
      
      jobsList = (
      <div >
        {displayitems && displayitems.length > 0 ? (
        <div className="card-list">
            {displayitems.map(job=> {
              return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                 
                  <Card style={{ width: "18rem" }}>
                  <Card.Body>
                  <Card.Title><Button  variant="link" 
                  onClick={() => {
                    this.viewUsersList(job.jobId);
                  }}>
                    <h5>{job.jobTitle}</h5>
                    </Button>
                    </Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>{job.jobType}</ListGroupItem>
                    <ListGroupItem>{new Date(job.jobPostedDate).toDateString()}</ListGroupItem>
                    <ListGroupItem>Total Applicants : {job.applicantsNo}</ListGroupItem>
                  </ListGroup> 
                  </Card.Body> 
                  </Card>                           
                </div>
              )
            } 
        )
      }
        </div>
        ):(
        <div>
          <h4 className="">No Jobs </h4>
        </div>
        )
      }
      </div>
      )
    }
    return (
      <div >
        <EmployerNavbar/>
        <div id="Second" class="row searchNav">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-9">
              <div class="row">
                <div class="col-4">
                  <div class="input-group mb-3">
                  </div>
                </div>
                <div class="col-4">
                  <div class="input-group mb-3">
                  </div>
                </div>
                <div class="col-4">
                </div>
              </div>
            </div>
          </div>
          <div class="row" style={{ marginTop: '10px' }}>
            <div class="col-4"></div>
            <div class="col-4">
              <h5 style={{ marginLeft: '120px' }}>
                Employers:
                <span class="hoverUnderline" style={{ color: '#003399' }}>
                 <Button onClick={this.handleSubmit}>Post a Job</Button>
                </span>
              </h5>
            </div>
           
          </div>
        </div>
        <hr />
        <div className="container">  <h5 style={{ marginLeft: '120px' }}>Jobs Posted</h5></div>
        
            
        {jobsList}
        <Pagination 
                    onClick={this.onPage}
                    className="pageJobs">
                    {paginationItemsTag}
                </Pagination>
        <div>
         <Modal size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.show} onHide={()=>this.handleModalClose()}>
             <Modal.Header closeButton><h4>Applicants List </h4>
             
             </Modal.Header>
             
             
             <Modal.Body>
              
             {applicantsList}
             
             </Modal.Body>
             
           </Modal>
          </div>
         
          <div>
         <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.showprofile} onHide={()=>this.handleModalCloseProfile()}>
             <Modal.Header closeButton><h4>Profile </h4>
             </Modal.Header>
             <Modal.Body>
             
             {profile}
             
             </Modal.Body>
             
           </Modal>
          </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  company: state.company
})

export default connect(mapStateToProps)(withRouter(Employer));


