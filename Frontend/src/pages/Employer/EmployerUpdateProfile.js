//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import {
    Form, Button, Row, Col, Card, Container,InputGroup,Modal
  } from 'react-bootstrap';
import { CountryDropdown } from 'react-country-region-selector';
import backendServer from '../../webConfig';
import EmployerNavbar from './EmployerNavbar'
import {MdModeEdit} from 'react-icons/md';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
// import { response } from 'express';

class EmployerProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {
          employerId : '',
          employerDetails:{},
          empdetails:true,
          compdetails:true,
          companyName: '',
          industry: '',
          jobTitle: '',
          streetAddress: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          jobMode: '',
          jobType: '',
          salaryDetails: '',
          shortJobDescription: '',
          errors: {},
          successMsg: '',
          errorMsg: '',
          show:false,
          update:true,
          companyupdated:true,
          imageLocation:''
      };
    }
    
      componentDidMount() {
        const empid = {
            empid: this.props.userInfo.id
        };
        console.log(empid) 
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.post(`${backendServer}/getEmployerProfile`,empid).then((response) => {
            console.log(response.data[0]);
            this.setState({
                employerDetails : response.data[0],
            });
        });
    }
 
    
    handleChangeCompanyName = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.companyName = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
    handleChangeWebsite = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.website = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeCompanySize = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.companySize = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeAbout = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.about = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeCompanyType = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.companyType = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeDescription = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.companyDescription = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeRevenue = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.revenue = e.target.value;
        this.setState({employerDetails});
        this.setState({
            errors: {},
          }); 
      } 
      handleChangeHeadquarters = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.headquarters = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeIndustry = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.industry = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeFounded = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.founded = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeMission = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.mission = e.target.value;
        this.setState({employerDetails});
        this.setState({
            errors: {},
          }); 
      } 
      handleChangeWorkculture = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.workCulture = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeCompanyValues = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.companyValues = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeCeo = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.ceo = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
    handleChangeEmpName = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.name = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeRole = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.roleInCompany = e.target.value;
        this.setState({employerDetails});
        this.setState({
            errors: {},
          }); 
      } 
      handleChangeAddress = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.address = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleChangeCity = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.city = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
          console.log("Errors",this.state.errors)
      } 
      handleChangeState = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.state = e.target.value;
        this.setState({employerDetails});
        this.setState({
            errors: {},
          }); 
      } 
      handleChangeZipcode = (e) =>{
        const { employerDetails }= this.state;
        employerDetails.zipcode = e.target.value;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      
      handleChangeCountry = (val) =>{ 
        const { employerDetails }= this.state;
        employerDetails.country = val;
        this.setState({employerDetails}); 
        this.setState({
            errors: {},
          });
      } 
      handleEmpDetails = (e) => {
        e.preventDefault();
        const newErrors = this.findFormErrorsEmp();
        if (Object.keys(newErrors).length > 0) {
            this.setState({
                errors: newErrors,
            });
        }else{
            this.sendEmployerAPI(this.state.employerDetails);
            this.setState({
                updated : true 
            });
            this.setState({
                show : true 
            });
        }  
    }
    handleCompDetails = (e) => {
        e.preventDefault();
        const newErrors = this.findFormErrorsCompany();
        if (Object.keys(newErrors).length > 0) {
            this.setState({
                errors: newErrors,
            });
        }else{
            this.sendCompanyAPI(this.state.employerDetails);
            this.setState({
                companyupdated : true 
            });
            this.setState({
                show : true 
            });
        }    
        
    }
    findFormErrorsEmp = () => {
      var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?0-9]/);
      const {employerDetails,errors} = this.state;
      if(!employerDetails.name || employerDetails.name === '') errors.employerName = 'Employer Name cannot be blank!';
      if(!employerDetails.roleInCompany || employerDetails.roleInCompany === '') errors.roleInCompany = 'Role cannot be blank!';
      if(!employerDetails.address || employerDetails.address === '') errors.address = 'Address cannot be blank!';
      if(!employerDetails.city || employerDetails.city === '') errors.city = 'City cannot be blank!';
      if(!employerDetails.state || employerDetails.state === '') errors.state = 'State cannot be blank!';
      if(!employerDetails.country || employerDetails.country === '') errors.country = 'Country cannot be blank!';
      //if(!employerDetails.zipcode || employerDetails.zipcode === '') errors.zipcode = 'Zipcode cannot be blank!';
      if (!employerDetails.zipcode || employerDetails.zipcode === '' || employerDetails.zipcode < 0) errors.zipcode = 'Zip code cannot be blank or negative!';
      if (!(employerDetails.zipcode.length === 5) ) errors.zipcode = 'Zip code should be 5 digits!';  
      if (pattern.test(employerDetails.state)) errors.state = 'State cannot contain digits and special characters!';
      if (pattern.test(employerDetails.city)) errors.city = 'City cannot contain digits and special characters!';
      return errors;
    }
    findFormErrorsCompany = () => {
        const {employerDetails,errors} = this.state;
        
        if(!employerDetails.companyName || employerDetails.companyName === '') errors.companyName = 'Company Name cannot be blank!';
        if(!employerDetails.about || employerDetails.about === '') errors.about = 'Role cannot be blank!';
        if(!employerDetails.ceo || employerDetails.ceo === '') errors.ceo = 'CEO Name cannot be blank!';
        if(!employerDetails.founded || employerDetails.founded === '') errors.founded = 'Founded details cannot be blank!';
        if(!employerDetails.companySize || employerDetails.companySize === '' || employerDetails.companySize<0) errors.companySize = 'Company Size cannot be blank or negative!';
        if(!employerDetails.revenue || employerDetails.revenue === ''|| employerDetails.revenue<0) errors.revenue = 'Revenue cannot be blank or negative!';
        if(!employerDetails.industry || employerDetails.industry === '') errors.industry = 'Industry cannot be blank!'; 
        if(!employerDetails.companyDescription || employerDetails.companyDescription === '') errors.companyDescription = 'Company Description cannot be blank!';  
        if(!employerDetails.mission || employerDetails.mission === '') errors.mission = 'Mission & Vision cannot be blank!';  
        if(!employerDetails.workCulture || employerDetails.workCulture === '') errors.workCulture = 'Work Culture cannot be blank!';  
        if(!employerDetails.companyValues || employerDetails.companyValues === '') errors.companyValues = 'Comapny values cannot be blank!';  
        if(!employerDetails.website || employerDetails.website === '') errors.website = 'Website cannot be blank!';  
        if(!employerDetails.headquarters || employerDetails.headquarters === '') errors.headquarters = 'Headquarters cannot be blank!';  
        if(!employerDetails.companyType || employerDetails.companyType === '') errors.companyType = 'Company type cannot be blank!';   
        return errors;
      }
    sendEmployerAPI = (data) => {
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.post(`${backendServer}/editEmployerDetails`, data)
            .then(response=> {
                console.log(response.data)
                if (response.status === 200) {
                    this.setState({
                        successMsg: response.data
                    })
                }
                else {
                    this.setState({ errorMsg: response.data });
                  }
            }
            );
    }    
    sendCompanyAPI = (data) => {
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.post(`${backendServer}/editCompanyDetails`, data)
            .then(response=> {
                if (response.status === 200) {
                    this.setState({
                        successMsg: response.data
                    })
                    
                }
                else {
                    this.setState({ errorMsg: response.data });
                  }
            }
            );
    }
    handleModalClose(){
        this.setState({show:!this.state.show}) 
        this.setState({
            updated : true
        })
        this.setState({
            companyupdated : true
        })
    }
    employerdetails = (e) =>{
        this.setState({
            empdetails : false
        })
        this.setState({
            updated : false
        })
    }
    companydetails = (e) =>{
        this.setState({
            compdetails : false
        })
        this.setState({
            companyupdated : false
        })
    }
    saveFile = (e) => {
        e.preventDefault();
        this.setState({file:e.target.files[0]});
        this.setState({fileName:e.target.files[0].name});
    };
    uploadFile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const compid = this.props.company.compid;
        if(this.state.file !== undefined && this.state.fileName !== undefined){
          formData.append("file", this.state.file,this.state.fileName);
          formData.append("compid", compid);
        }
        else{
          alert("No Image inserted");
          return;
        }

       this.sendImageAPI(formData);        
    }
    sendImageAPI = (data) => {
        const {employerDetails} = this.state;
          axios
          .post("/api/upload", data)
          .then((response) => {
            //console.log(response);
            if (response.status === 200) {
              
               // console.log(response.data.imageLocation);
               
                var data1 = {
                  companyId: this.props.company.compid, //companyId,    
                  imageLocation: response.data.imageLocation,
                };
                employerDetails.logo = response.data.imageLocation;
                this.setState({employerDetails})
                axios.post("/api/uploadCompanyProfilePic", data1)
                  .then((response1) => {
                    //console.log("Response ",response1)
                    if (response1.status === 200) {
                        alert("Company Image Uploaded")
                    }
                  })
                  .catch((err) => {
                    alert("Company Image Upload Failed")
                  });
              }
          });
       
    }
    render() {
       const {successMsg,errorMsg,updated,companyupdated,errors} = this.state;
       var empdetailscol = null;    
       var compdetailscol = null; 
       if(this.state.empdetails || updated){
           empdetailscol = (
               <div>
                    
                    <label className="dethead1">Name :</label> <label className="dethead">{this.state.employerDetails.name}</label>
                    <br/>
                    <br/>
                    <Row>
                        <Col>
                        <label className="dethead1">Role :</label><label className="dethead">{this.state.employerDetails.roleInCompany}</label>
                        </Col>
                        <Col>
                        <label className="dethead1">Address :</label><label className="dethead">{this.state.employerDetails.address}</label>
                        </Col>
                    </Row>  
                    <br/>  
                    <Row>
                        <Col>
                        <label className="dethead1">City :</label><label className="dethead">{this.state.employerDetails.city}</label>
                        </Col>
                        <Col>
                        <label className="dethead1">State :</label><label className="dethead">{this.state.employerDetails.state}</label>
                        </Col>
                    </Row> 
                    <br/>  
                    <Row>
                        <Col>
                        <label className="dethead1">Country :</label><label className="dethead">{this.state.employerDetails.country}</label>
                        </Col>
                        <Col>
                        <label className="dethead1">Zipcode :</label><label className="dethead">{this.state.employerDetails.zipcode}</label>
                        </Col>
                    </Row> 
                   
                    
               </div>
           )
       }else if(!this.state.empdetails){
        empdetailscol = (
            <div>
                <Col>
                <span style={{color:'red'}}>* </span> <span style={{color:'gray'}}>Required Fields</span>
                <Row>
                <label>Name<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.employerName}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="name" 
                 value={this.state.employerDetails.name} maxLength="45"
                 onChange={(e) => { this.handleChangeEmpName(e)}}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>Role<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.roleInCompany}</span>
                 
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="roleInCompany" 
                 value={this.state.employerDetails.roleInCompany} maxLength="50"
                 onChange={(e) => { this.handleChangeRole(e)}}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>Address<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.address}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="address"
                  value={this.state.employerDetails.address} maxLength="45"
                  onChange={(e) => { this.handleChangeAddress(e)}}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>City<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.city}</span>
                 
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="city"
                  value={this.state.employerDetails.city} maxLength="45"
                  onChange={(e) => { this.handleChangeCity(e)}}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>State<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.state}</span>
                 
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="state" 
                 value={this.state.employerDetails.state} maxLength="45"
                 onChange={(e) => { this.handleChangeState(e)}}></input>
                 </Row>
                 
                 <br/>
                 <Row>
                 <label>Country<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.country}</span>
                 
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<CountryDropdown style={{width:'50%'}}
                    value={this.state.employerDetails.country} 
                    onChange={(val) => { this.handleChangeCountry(val)}}       
                  />
                 </Row>
                 <br/>
                 <Row>
                 <label>zipcode<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}> {errors.zipcode}</span>
                
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="zipcode" 
                 type="number" value={this.state.employerDetails.zipcode}
                 maxLength="5"
                 onChange={(e) => { this.handleChangeZipcode(e)}}></input>
                 </Row>
                 <br/>
                 </Col>
                 
                 <Button onClick = {this.handleEmpDetails}>Save</Button>
            </div>
        )
    }    
   
       if(this.state.compdetails || companyupdated ){
        compdetailscol = (
            <div>
            <Row>
                <Col>
                    <label className="dethead1">Company Name : </label><label className="dethead">{this.state.employerDetails.companyName}</label>
                </Col>
                <Col>
                 <img src={this.state.employerDetails.logo} style={{ maxHeight: '5rem', maxWidth: '10rem' }}/>
                </Col>
            </Row>
              <br/>
              <Row>
                <Col>
                    <label className="dethead1">Website : </label><label className="dethead"></label><label className="dethead">{this.state.employerDetails.website}</label>
                </Col>
                <Col>
                    <label className="dethead1">Company Size :</label><label className="dethead"></label><label className="dethead">{this.state.employerDetails.companySize}</label>
                </Col>
              </Row>
              <br/>
             
              <label className="dethead1">About :</label><label className="dethead">{this.state.employerDetails.about}</label>
              <br/>
              <br/>
              <Row>
                  <Col>
                  <label className="dethead1">Company Type :</label><label className="dethead">{this.state.employerDetails.companyType}</label>
                  
                  </Col>  
                  <Col>
                  <label className="dethead1">Revenue (in billion) :</label><label className="dethead">{this.state.employerDetails.revenue}</label>
                 
                  </Col>
              </Row>
              <br/>
             
                  <label className="dethead1"> Description :</label><label className="dethead">{this.state.employerDetails.companyDescription} </label>
              <br/>
              <br/>
              <Row>
                  <Col>
                   <label className="dethead1">Headquarters :</label><label className="dethead">{this.state.employerDetails.headquarters}</label>
                  </Col>
                  <Col>
                  <label className="dethead1"> Industry :</label><label className="dethead">{this.state.employerDetails.industry}</label>
                  </Col>
             </Row>
              <br/>
              <Row>
                  <Col>
                  <label className="dethead1">Founded :</label><label className="dethead">{this.state.employerDetails.founded}</label>
                  </Col>
                  <Col>
                  <label className="dethead1">CEO Name :</label><label className="dethead">{this.state.employerDetails.ceo}</label>
                  </Col>
              </Row>
              <br/>
              <Row>
                  <Col>
                  <label className="dethead1">Company Values :</label><label className="dethead">{this.state.employerDetails.companyValues}</label>
                 
                  </Col>
                  <Col>
                  <label className="dethead1">WorkCulture :</label><label className="dethead">{this.state.employerDetails.workCulture}</label>
                  </Col>
              </Row>    
              
              <br/>
              <label className="dethead1">Mission and Vision :</label><label className="dethead">{this.state.employerDetails.mission}</label>
              <br/>
              
              <br/>
              
              <br/>
               </div>
           )
       }else if(!this.state.compdetails){
        compdetailscol = (
            <div>
              
                <Col>
                <span style={{color:'red'}}>* </span> <span style={{color:'gray'}}>Required Fields</span>
                <Row>
                <Col>
                    <label className="dethead1">Company Name : </label><label className="dethead">{this.state.employerDetails.companyName}</label>
                </Col>
                <Col>
                 <img src={this.state.employerDetails.logo} style={{ maxHeight: '5rem', maxWidth: '10rem' }}/>
                </Col>
                </Row>
                {/* <Row>
                 <label>Company Name<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.companyName}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input className="detinput" name="companyName"
                 value={this.state.employerDetails.companyName }
                 onChange={(e) => { this.handleChangeCompanyName(e)}}></input>
                 </Row> */}
                 <br/>
                 {/* <Row>
                 &nbsp;&nbsp;Company Logo: 
                 <input className="filefolder" type="file" onChange={this.saveFile}/>
                 
                 &nbsp;&nbsp;&nbsp;<button onClick={this.uploadFile} style={{width:'100px'}}>Upload</button>  
                 </Row>     */}
                 <br/>
                 <Row>
                 <label>Website<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.roleInCompany}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="website"
                 value={this.state.employerDetails.website } maxLength="50"
                 onChange={(e) => { this.handleChangeWebsite(e)}}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>Company Size<span style={{color:'red'}}>*</span></label>    
                 </Row>
                 <span style={{color:'red'}}>{errors.companySize}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}}
                 name="companySize" type="number"
                 value={this.state.employerDetails.companySize }
                 onChange={(e) => { this.handleChangeCompanySize(e)}}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>About<span style={{color:'red'}}>*</span></label>    
                 </Row>
                 <span style={{color:'red'}}>{errors.about}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<textarea style={{width:'50%'}}
                 name="about" maxLength="1000"
                 value={this.state.employerDetails.about }
                 onChange={(e) => { this.handleChangeAbout(e)}}></textarea>
                 </Row>
                 <br/>
                 <Row>
                 <label>Company Type<span style={{color:'red'}}>*</span></label> 
                 </Row>
                 <span style={{color:'red'}}>{errors.companyType}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}}
                 name="companyType" maxLength="50"
                 value={this.state.employerDetails.companyType }
                 onChange={(e) => { this.handleChangeCompanyType(e)}}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>Description<span style={{color:'red'}}>*</span></label>    
                 </Row>
                 <span style={{color:'red'}}>{errors.companyDescription}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<textarea style={{width:'50%'}}
                 name="companyDescription" maxLength="1000"
                 value={this.state.employerDetails.companyDescription }
                 onChange={(e) => { this.handleChangeDescription(e)}}></textarea>
                 </Row>
                 <br/>
                 <Row>
                 <label>Revenue (in billion)<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.revenue}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}}
                 name="revenue" type="number"
                 value={this.state.employerDetails.revenue }
                 onChange={(e) => { this.handleChangeRevenue(e)}}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>Headquarters<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.headquarters}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}}
                 name="headquarters" maxLength="50"
                 value={this.state.employerDetails.headquarters }
                 onChange={(e) => { this.handleChangeHeadquarters(e)}}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>Industry<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.industry}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}}
                 name="industry" maxLength="50"
                 value={this.state.employerDetails.industry }
                 onChange={(e) => { this.handleChangeIndustry(e)}}></input>
                 </Row>
                 <br/>
                 <Row>
                 <label>Founded<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.founded}</span>
                 <Row>
                 &nbsp;&nbsp;&nbsp;<textarea style={{width:'50%'}}
                 name="founded" maxLength="100"
                 value={this.state.employerDetails.founded }
                 onChange={(e) => { this.handleChangeFounded(e)}}></textarea>
                 </Row>
                 <br/>
                 <Row>
                 <label>Mission and Vision<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.mission}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<textarea style={{width:'50%'}}
                 name="mission" maxLength="1000"
                 value={this.state.employerDetails.mission }
                 onChange={(e) => { this.handleChangeMission(e)}}></textarea>
                 </Row>
                 <br/>
                 <Row>
                 <label>Work Culture<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.workCulture}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<textarea style={{width:'50%'}}
                 name="workCulture" maxLength="1000"
                 value={this.state.employerDetails.workCulture }
                 onChange={(e) => { this.handleChangeWorkculture(e)}}></textarea>
                 </Row>
                 <br/>
                 <Row>
                 <label>Company Values<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.companyValues}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<textarea style={{width:'50%'}}
                 name="companyValues" maxLength="1000"
                 value={this.state.employerDetails.companyValues }
                 onChange={(e) => { this.handleChangeCompanyValues(e)}}></textarea>
                 </Row>
                 <br/>
                 <Row>
                 <label>CEO Name<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.ceo}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}}
                 name="ceo" maxLength="50"
                 value={this.state.employerDetails.ceo }
                 onChange={(e) => { this.handleChangeCeo(e)}}></input>
                 </Row>
                 </Col>
                 <Button onClick = {this.handleCompDetails}>Save</Button>
            </div>
        )
    }     
      return (
        <div>
             <EmployerNavbar/>
            <br></br>
            
            <div className="main-div1">
            <div className = "details">   
            <h3>Employer Details</h3><span className="editdetails"/><Button onClick={this.employerdetails} variant = "white" ><MdModeEdit/></Button>
            </div>   
             {empdetailscol}
            </div>
            <div className="main-div1">
            <div className = "details">   
            <h3>Company Details</h3><span className="editdetails"/><Button onClick={this.companydetails} variant = "white"><MdModeEdit/></Button>
            </div> 
              {compdetailscol}
            </div>
            <div>
            <Modal size="md-down"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.show} onHide={()=>this.handleModalClose()}>
                <Modal.Header closeButton>
                <Modal.Title>{successMsg} {errorMsg}</Modal.Title>
                </Modal.Header>
            </Modal>
      </div>
       
           
        </div>
      );
    }
  }
  const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    company: state.company
  })
  
  export default connect(mapStateToProps)(EmployerProfile);
