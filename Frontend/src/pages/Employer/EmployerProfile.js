//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import {
    Form, Button, Row, Col, Card, Container,InputGroup,Modal,Dropdown
  } from 'react-bootstrap';
import { CountryDropdown } from 'react-country-region-selector';
import backendServer from '../../webConfig';
import {useDispatch} from 'react-redux';
import EmployerNavbar from './EmployerNavbar'
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import '../../CSS/EmployerLanding.css'
import PropTypes from "prop-types";
import logo from '../../images/employers.png'
import {setCompId} from '../../reduxutils/actioncreators/companyaction';
import { withRouter } from 'react-router';
import {logout} from '../../reduxutils/actioncreators/useraction';

class EmployerProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {
          employerId : '',
          employerDetails:{},
          empdetails:false,
          compdetails:false,
          companyName: '',
          employerName:'',
          roleInCompany:'',
          address:'',
          industry: '',
          jobTitle: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          errors: {},
          website:'',
          headquarters:'',
          about:'',
          founded:'',
          mission:'',
          companyValues:'',
          workCulture:'',
          companyType:'',
          ceo:'',
          companySize:'',
          revenue:'',
          companyDescription:'',
          update:true,
          empupdated:false,
          companyupdated:false,
          companyDetails:[],
          companyadded:false,
          cmpname:'',
          logo:'',
          successMsg: '',
          empFlag:false,
          compFlag:false
      };
      
    }
    
      componentDidMount() {
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.get(`${backendServer}/getCompanyDetails`).then((response) => {
            //console.log(response.data);
            this.setState({
                companyDetails : this.state.companyDetails.concat(response.data) 
            });
        });
    }
    handleModalClose(){
        this.setState({show:!this.state.show}) 
        if(this.state.compFlag){
            const {history} = this.props;
            history.push('/employer');    
        }
    }
      handleEmpDetails = (e) => {
        e.preventDefault();
        console.log("here")
        const newErrors = this.findFormErrorsEmp();
        if (Object.keys(newErrors).length > 0) {
            this.setState({
                errors: newErrors,
            });
        }else{
            const employerData = {
                employerId : this.props.userInfo.id,
                employerName:this.state.employerName,
                roleInCompany:this.state.roleInCompany,
                address:this.state.address,
                city:this.state.city,
                state:this.state.state,
                country:this.state.country,
                zipcode:this.state.zipcode,
               
            }
            this.sendEmployerAPI(employerData);
            this.setState({
                empupdated : true 
            });
            
        }  
    }
    handleCompDetails = (e) => {
       console.log()
        e.preventDefault();
        if(this.state.empFlag){
            const newErrors = this.findFormErrorsCompany();
            if (Object.keys(newErrors).length > 0) {
                console.log(newErrors)
                this.setState({
                    errors: newErrors,
                });
            } else{
            
                const companyData = {
                    employerId:this.props.userInfo.id,
                    companyName:this.state.companyName,
                    website:this.state.website,
                    companySize:this.state.companySize,
                    about:this.state.about,
                    companyType:this.state.companyType,
                    companyDescription:this.state.companyDescription,
                    headquarters:this.state.headquarters,
                    industry:this.state.industry,
                    mission:this.state.mission,
                    revenue:this.state.revenue,
                    founded:this.state.founded,
                    workCulture:this.state.workCulture,
                    companyValues:this.state.companyValues,
                    ceo:this.state.ceo,
                    logo:this.state.logo
                   
                }
                this.sendCompanyAPI(companyData);
                this.setState({
                    companyupdated : true 
                });
                this.setState({
                    companyadded : false 
                });
        }
      
            
        }  else{
            alert("Add Employer Details First")
        }  
        
    }
    findFormErrorsEmp = () => {
      var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?0-9]/);
      const {errors} = this.state;
      if(!this.state.employerName || this.state.employerName === '') errors.employerName = 'Employer Name cannot be blank!';
      if(!this.state.roleInCompany || this.state.roleInCompany === '') errors.roleInCompany = 'Role cannot be blank!';
      if(!this.state.address || this.state.address === '') errors.address = 'Address cannot be blank!';
      if(!this.state.city || this.state.city === '') errors.city = 'City cannot be blank!';
      if(!this.state.state || this.state.state === '') errors.state = 'State cannot be blank!';
      if(!this.state.country || this.state.country === '') errors.country = 'Country cannot be blank!';
      if (!this.state.zipcode || this.state.zipcode === '' || this.state.zipcode < 0) errors.zipcode = 'Zip code cannot be blank or negative!';
      if (!(this.state.zipcode.length === 5) ) errors.zipcode = 'Zip code should be 5 digits!';  
      if (pattern.test(this.state.state)) errors.state = 'State cannot contain digits and special characters!';
      if (pattern.test(this.state.city)) errors.city = 'City cannot contain digits and special characters!';
      return errors;
    }
    findFormErrorsCompany = () => {
        const {errors} = this.state;
        if(!this.state.companyName || this.state.companyName === '' ) errors.companyName = 'Company Name cannot be blank!';
        if(this.state.cmpname === 'exist') errors.companyName = 'Company Name already exists!';
        if(!this.state.about || this.state.about === '') errors.about = 'Role cannot be blank!';
        if(!this.state.ceo || this.state.ceo === '') errors.ceo = 'CEO Name cannot be blank!';
        if(!this.state.founded || this.state.founded === '') errors.founded = 'Founded details cannot be blank!';
        if(!this.state.companySize || this.state.companySize === '' ||this.state.companySize<0 ) errors.companySize = 'Company Size cannot be blank or negative!';
        if(!this.state.revenue || this.state.revenue === '' || this.state.revenue<0) errors.revenue = 'Revenue cannot be blank or negative!';
        if(!this.state.industry || this.state.industry === '') errors.industry = 'Industry cannot be blank!'; 
        if(!this.state.companyDescription || this.state.companyDescription === '') errors.companyDescription = 'Company Description cannot be blank!';  
        if(!this.state.mission || this.state.mission === '') errors.mission = 'Mission & Vision cannot be blank!';  
        if(!this.state.workCulture || this.state.workCulture === '') errors.workCulture = 'Work Culture cannot be blank!';  
        if(!this.state.companyValues || this.state.companyValues === '') errors.companyValues = 'Comapny values cannot be blank!';  
        if(!this.state.website || this.state.website === '') errors.website = 'Website cannot be blank!';  
        if(!this.state.headquarters || this.state.headquarters === '') errors.headquarters = 'Headquarters cannot be blank!';  
        if(!this.state.companyType || this.state.companyType === '') errors.companyType = 'Company type cannot be blank!';   
        return errors;
      }
    sendEmployerAPI = (data) => {
        console.log("Add Employer Details First!")
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.post(`${backendServer}/addEmployerDetails`, data)
            .then(response=> {
                console.log(response.data)
                if (response.status === 200) {

                    console.log(response)
                    this.setState({
                        successMsg: response.data
                    })
                    this.setState({
                         show : true 
                     });
                     this.setState({
                        empFlag : true 
                    });

                }
                else {
                    this.setState({ errorMsg: response.data });
                  }
            }
            );
    }    
    sendCompanyAPI = (data) => {
        
        console.log(data)
        let compid = '';
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.post(`${backendServer}/addCompanyDetails`, data)
            .then(response=> {
               console.log(response)
               compid = response.data[0].companyId;
               const companyname = response.data[0].companyName;
               const logo = response.data[0].logo;
               console.log(logo)
               this.props.setCompId(compid);
                 
                    axios.post(`${backendServer}/api/createCompanyMongo`,{compid,companyname,logo})
                    .then(response=> {
                        console.log("res")
                        console.log(response.status)
                        if(response.status === 200){
                            this.setState({successMsg:"Company Details Added!"})
                            this.setState({
                                show : true 
                            });
                            console.log("here")
                            this.setState({
                               compFlag : true })
                        }
                        
                        //console.log(response.data)
                      
                    }
                    );
                     
            }
            
            
            );
            // const dispatch = useDispatch();
            // const setId = bindActionCreators(userActionCreator.setId,dispatch);
            // const {history} = this.props;
            // history.push('/employer');    
    }
    updateCompanyId = (data) => {
        var id = {
           employerId:this.props.userInfo.id,
           companyid : data
        }
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.post(`${backendServer}/addCompanyIdToEmployer`, id)
            .then(response=> {
                console.log("response**")
                console.log(response)
                console.log("response**")
                if (response.status === 200) {
                  this.setState({successMsg: response.data})
                  this.setState({
                    show : true 
                });
                this.setState({
                   compFlag : true 
               });
                }
                else {
                    this.setState({successMsg: "Cannot add company details!"})
                    //this.setState({ errorMsg: response.data });
                  }
            }
            );
            // const {history} = this.props;
            // history.push('/employer'); 
    }
    handleCompany = (e)=>{
        e.preventDefault();
        
        const val = e.target.value;
        console.log("val")
        console.log(val)
        if(val === '' ){
            alert("Add a company")
        }
        if(val !== 'Add' && val !== ''){
            this.setState({
                companyadded:false
            })
            if(this.state.empFlag){
           this.updateCompanyId(val)}
           else{
               alert("Add Employer Details First!")
           }
        }else {

            this.setState({
                companyadded:true
            })
            
         }
    }
    handleChangeCountry = (val) => {
        this.setState({ country: val });
        this.setState({
            errors: {},
          });
      }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
            errors: {},
          });
    } 
    handleChangeCompanyName = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        const { companyDetails} = this.state;
        var {errors} = this.state;
        this.setState({ [e.target.name]: e.target.value })
        
        for (var i = 0; i < companyDetails.length ;i++) {
            if (e.target.value === companyDetails[i].companyName) {
                errors.companyName = "Company Already exsists"
                this.setState({cmpname : "exist"})
                return errors;
            }
        }
        this.setState({cmpname : ""})
        this.setState({
            errors: {},
          });
        return errors;
        
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
    logoutAction =  (e) => {
        e.preventDefault();
        this.props.logout(true);
        const {history} = this.props;
        history.push('/landingPage');
        //window.location.href='/landingPage';
      }
    sendImageAPI = (data) => {
       // const {employerDetails} = this.state;
          axios
          .post("/api/upload", data)
          .then((response) => {
            //console.log(response);
            if (response.status === 200) {
              this.setState({logo:response.data.imageLocation})
               
                
              }
          });
       
    }
    render() {
       const {updated,empupdated,companyupdated,errors,companyDetails,companyadded} = this.state;
       var empdetailscol = null;    
       var compdetailscol = null; 
       var companyDetailsDiv = null;
      
       if(empupdated){
        empdetailscol = (
            <div>
                 
                 <label className="dethead1">Name :</label> <label className="dethead">{this.state.employerName}</label>
                 <br/>
                 <br/>
                 <Row>
                     <Col>
                     <label className="dethead1">Role :</label><label className="dethead">{this.state.roleInCompany}</label>
                     </Col>
                     <Col>
                     <label className="dethead1">Address :</label><label className="dethead">{this.state.address}</label>
                     </Col>
                 </Row>  
                 <br/>  
                 <Row>
                     <Col>
                     <label className="dethead1">City :</label><label className="dethead">{this.state.city}</label>
                     </Col>
                     <Col>
                     <label className="dethead1">State :</label><label className="dethead">{this.state.state}</label>
                     </Col>
                 </Row> 
                 <br/>  
                 <Row>
                     <Col>
                     <label className="dethead1">Country :</label><label className="dethead">{this.state.country}</label>
                     </Col>
                     <Col>
                     <label className="dethead1">Zipcode :</label><label className="dethead">{this.state.zipcode}</label>
                     </Col>
                 </Row> 
                
                 
            </div>
        )
           
       }else if(!empupdated){
        empdetailscol = (
            <div className="">
                <Col>
                <span style={{color:'red'}}>* </span> <span style={{color:'gray'}}>Required Fields</span>
                <Row>
                <label>Name<span style={{color:'red'}}>*</span></label>
                 </Row>
                 <span style={{color:'red'}}>{errors.employerName}</span>
                 <Row> 
                 &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="employerName" 
                 value={this.state.employerName} maxLength="45"
                 onChange={this.handleChange}></input>
                 </Row>
                 <br/>
                 <Row>
                     <Col>
                        <Row>
                        <label>Role<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}>{errors.roleInCompany}</span>    
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="roleInCompany" 
                        value={this.state.roleInCompany}  maxLength="50"
                        onChange={this.handleChange}></input>
                        </Row>
                     </Col>
                     <Col>         
                        <Row>
                        <label>Address<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}>{errors.address}</span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="address"
                        value={this.state.address}  maxLength="45"
                        onChange={this.handleChange}></input>
                        </Row>
                     </Col>
                </Row>
                 <br/>
                 <Row>
                     <Col>
                        <Row>
                        <label>City<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}>{errors.city}</span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="city"
                        value={this.state.city}  maxLength="45"
                        onChange={this.handleChange}></input>
                        </Row>
                     </Col>      
                    <Col>
                        <Row>
                        <label>State<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}>{errors.state}</span>
                        
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="state" 
                        value={this.state.state}  maxLength="45"
                        onChange={this.handleChange}></input>
                        </Row>
                    </Col>
                </Row>
                 <br/>
                 <Row>
                     <Col>
                        <Row>
                        <label>Country<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}>{errors.country}</span>
                        
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<CountryDropdown style={{width:'80%'}}
                            value={this.state.country}
                            onChange={(val) => this.handleChangeCountry(val)}      
                        />
                        </Row>
                     </Col>
                     
                     <Col>
                        <Row>
                        <label>zipcode<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}> {errors.zipcode}</span>
                        
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="zipcode" 
                        value={this.state.zipcode} type="number"  maxLength="5"
                        onChange={this.handleChange}></input>
                        </Row>
                      </Col>  
                    </Row>  
                 <br/>
                 </Col>
                 
                 <Button onClick = {this.handleEmpDetails}>Save</Button>
            </div>
        )
    }    
      
   
       if(companyupdated){
        compdetailscol = (
            <div className="">
             <label className="dethead1">Company Name : </label><label className="dethead">{this.state.companyName}</label>
              <br/>
              <br/>
              <Row>
                <Col>
                    <label className="dethead1">Website : </label><label className="dethead"></label><label className="dethead">{this.state.website}</label>
                </Col>
                <Col>
                    <label className="dethead1">Company Size :</label><label className="dethead"></label><label className="dethead">{this.state.companySize}</label>
                </Col>
              </Row>
              <br/>
             
              <label className="dethead1">About :</label><label className="dethead">{this.state.about}</label>
              <br/>
              <br/>
              <Row>
                  <Col>
                  <label className="dethead1">Company Type :</label><label className="dethead">{this.state.companyType}</label>
                  
                  </Col>  
                  <Col>
                  <label className="dethead1">Revenue :</label><label className="dethead">{this.state.revenue}</label>
                 
                  </Col>
              </Row>
              <br/>
             
                  <label className="dethead1"> Description :</label><label className="dethead">{this.state.companyDescription} </label>
              <br/>
              <br/>
              <Row>
                  <Col>
                   <label className="dethead1">Headquarters :</label><label className="dethead">{this.state.headquarters}</label>
                  </Col>
                  <Col>
                  <label className="dethead1"> Industry :</label><label className="dethead">{this.state.industry}</label>
                  </Col>
             </Row>
              <br/>
              <Row>
                  <Col>
                  <label className="dethead1">Founded :</label><label className="dethead">{this.state.founded}</label>
                  </Col>
                  <Col>
                  <label className="dethead1">CEO Name :</label><label className="dethead">{this.state.ceo}</label>
                  </Col>
              </Row>
              <br/>
              <Row>
                  <Col>
                  <label className="dethead1">Company Values :</label><label className="dethead">{this.state.companyValues}</label>
                 
                  </Col>
                  <Col>
                  <label className="dethead1">WorkCulture :</label><label className="dethead">{this.state.workCulture}</label>
                  </Col>
              </Row>    
              
              <br/>
              <label className="dethead1">Mission and Vision :</label><label className="dethead">{this.state.mission}</label>
              <br/>
              
              <br/>
              
              <br/>
               </div>
           )  
       }else 
       if(!companyupdated){
        companyDetailsDiv = (
            <div>
            Select a Company
            <br/>
            <select  onChange={(e) =>{ this.handleCompany(e)}}>
            
            <option value="">Select</option> 
              {this.state.companyDetails.map(companyDetail=>
              <option value={companyDetail.companyId}>{companyDetail.companyName}</option>
              )}
              <option value="Add">Add Company</option> 
            </select>
            &nbsp;
            <Button onClick = {this.handleCompDetails}>Save</Button>
         
            
            </div>
            
       )
    }  if(companyadded){
        compdetailscol = (
            <div className="container">
                <Col>
                  
                <span style={{color:'red'}}>* </span> <span style={{color:'gray'}}>Required Fields</span>
                <Row>
                    <Col> 
                        <Row>
                        <label>Company Name<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}>{errors.companyName}</span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="companyName"
                        value={this.state.companyName } maxLength="50"
                        onChange={this.handleChangeCompanyName}></input>
                        </Row>
                    </Col> 
                    <Col>
                        <Row>
                        <label>Website<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}>{errors.website}</span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="website"
                        value={this.state.website } maxLength="50"
                        onChange={this.handleChange}></input>
                        </Row>
                    </Col> 
                    <Col>
                        <Row>
                        <label>Company Size<span style={{color:'red'}}>*</span></label>    
                        </Row>
                        <span style={{color:'red'}}>{errors.companySize}</span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}}
                        name="companySize" type="number" min="0"
                        value={this.state.companySize }
                        onChange={this.handleChange}></input>
                        </Row>
                    </Col>
                 </Row>
                 <br/>
                 <Row>
                 &nbsp;&nbsp;Company Logo:    
                 <input className="filefolder" type="file" onChange={this.saveFile} />
                 &nbsp;&nbsp;&nbsp;<button onClick={this.uploadFile} style={{width:'100px'}}>Upload</button>  
                 </Row> 
                 <br/>
                 <Row>
                    <Col>    
                        <Row>
                        <label>About<span style={{color:'red'}}>*</span></label>    
                        </Row>
                        <span style={{color:'red'}}>{errors.about}</span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<textarea style={{width:'80%'}}
                        name="about"
                        value={this.state.about } maxLength="1000"
                        onChange={this.handleChange}></textarea>
                        </Row>
                    </Col>      
                    <Col>  
                        <Row>
                        <label>Description<span style={{color:'red'}}>*</span></label>    
                        </Row>
                        <span style={{color:'red'}}>{errors.companyDescription}</span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<textarea style={{width:'80%'}}
                        name="companyDescription" maxLength="1000"
                        value={this.state.companyDescription }
                        onChange={this.handleChange}></textarea>
                        </Row>
                    </Col> 
                 </Row> 
                 <br/>
                 <Row>
                    <Col>    
                        <Row>
                        <label>Company Type<span style={{color:'red'}}>*</span></label> 
                        </Row>
                        <span style={{color:'red'}}>{errors.companyType}</span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}}
                        name="companyType" maxLength="50"
                        value={this.state.companyType }
                        onChange={this.handleChange}></input>
                        </Row>
                    </Col>  
                    <Col>  
                        <Row>
                        <label>Revenue (in billion) <span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}>{errors.revenue}</span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}}
                        name="revenue" type="number" min="0"
                        value={this.state.revenue }
                        onChange={this.handleChange}></input>
                        </Row>
                    </Col> 
                    <Col>
                        <Row>
                        <label>Headquarters<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}>{errors.headquarters}</span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}}
                        name="headquarters" maxLength="50"
                        value={this.state.headquarters }
                        onChange={this.handleChange}></input>
                        </Row>
                    </Col>
                 </Row>
                 <br/>
                 <Row>
                     <Col>
                        <Row>
                        <label>Industry<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}>{errors.industry}</span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}}
                        name="industry"
                        value={this.state.industry } maxLength="50"
                        onChange={this.handleChange}></input>
                        {/* <select  name="industry"   >
                            <option>Choose the job industry</option>
                            <option value="Software">Software</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finance">Finance</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Electrical">Electrical</option>
                        </select> */}
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                        <label>CEO Name<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}>{errors.ceo}</span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}}
                        name="ceo"
                        value={this.state.ceo } maxLength="50"
                        onChange={this.handleChange}></input>
                        </Row>
                      </Col>   
                   </Row>    
                 <br/>
                 <Row>
                     <Col>
                        <Row>
                        <label>Founded<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}>{errors.founded}</span>
                        <Row>
                        &nbsp;&nbsp;&nbsp;<textarea style={{width:'80%'}}
                        name="founded"
                        value={this.state.founded } maxLength="50"
                        onChange={this.handleChange}></textarea>
                        </Row>
                    </Col>  
                    <Col>  
                        <Row>
                        <label>Mission and Vision<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}>{errors.mission}</span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<textarea style={{width:'80%'}}
                        name="mission" maxLength="1000"
                        value={this.state.mission }
                        onChange={this.handleChange}></textarea>
                        </Row>
                    </Col>  
                 </Row> 
                 <br/>
                 <Row>
                     <Col>
                        <Row>
                        <label>Work Culture<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}>{errors.workCulture}</span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<textarea style={{width:'80%'}}
                        name="workCulture" maxLength="1000"
                        value={this.state.workCulture }
                        onChange={this.handleChange}></textarea>
                        </Row>
                     </Col>
                     <Col>
                        <Row>
                        <label>Company Values<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}>{errors.companyValues}</span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<textarea style={{width:'80%'}}
                        name="companyValues" maxLength="1000"
                        value={this.state.companyValues }
                        onChange={this.handleChange}></textarea>
                        </Row>
                     </Col>
                 </Row>       
                 <br/>
                 
                 </Col>  
            </div>
        )
        }

    
      return (
        <div>
            <Button className="signoutbtn" onClick={this.logoutAction} >Sign Out</Button>
             {/* <EmployerNavbar/> */}
             <div className="main-div1">
             <Row>   
                 <Col> 
                     <h2 className="welcome">Welcome to Indeed for employers!</h2>
                  </Col>
                  <Col>   
                    <img
                        src={logo}
                        alt=""
                        width="300"
                        height="100"
                        class="d-inline-block align-text-top"
                    />
                  </Col>
              </Row>      
             
             </div>

            
            <div className="main-div1">
            <div className = "details">   
            <h4>Employer Details</h4><span className="editdetails"/>
            
            </div>   

            {empdetailscol}
            
            </div>
            <div className="main-div1">
            <div className = "details">   
            <h4>Company Details</h4><span className="editdetails"/>
            </div> 
             {companyDetailsDiv} 
              {compdetailscol}
            </div>
            <div>
           
      </div>
      <Modal size="md-down"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.show} onHide={()=>this.handleModalClose()}>
                <Modal.Header closeButton>
                <Modal.Title>{this.state.successMsg}</Modal.Title>
                </Modal.Header>
    </Modal>
           
        </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    company: state.company
  })
  function mapDispatchToProps(dispatch) {
    return {
        setCompId: compid => dispatch(setCompId(compid)),
        logout: val => dispatch(logout(val))
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(EmployerProfile));



