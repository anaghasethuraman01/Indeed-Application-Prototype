
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from 'react-redux';
import JobSeekerNavbar from './JobSeekerNavbar';
import { color } from '@mui/system';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import {Redirect} from 'react-router';
import axios from 'axios';
import backendServer from '../../webConfig.js';
import {bindActionCreators} from 'redux';
import {prefActionCreator} from '../../reduxutils/actions';
import JobSeekerLoggedInNavbar from './JobSeekerLoggedInNavbar';

function Preferences(props) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.userInfo.token);
    const id = useSelector((state)=>state.userInfo.id);
    const title = useSelector((state)=>state.jobPref.title);
    const type = useSelector((state)=>state.jobPref.type);
    const pay = useSelector((state)=>state.jobPref.pay);
    const schedule = useSelector((state)=>state.jobPref.schedule);
    const remote = useSelector((state)=>state.jobPref.remote);
    const relocation = useSelector((state)=>state.jobPref.relocation);

    const setTitle = bindActionCreators(prefActionCreator.setTitle,dispatch);
    const setType = bindActionCreators(prefActionCreator.setType,dispatch);
    const setPay = bindActionCreators(prefActionCreator.setPay,dispatch);
    const setSchedule = bindActionCreators(prefActionCreator.setSchedule,dispatch);
    const setRemote = bindActionCreators(prefActionCreator.setRemote,dispatch);
    const setRelocation = bindActionCreators(prefActionCreator.setRelocation,dispatch);

    const[question, setQuestion] = useState('');
    const[heading, setHeading] = useState('');
    const[modal, showModal] = useState(false);
    const[modalDiv, setModalDiv] = useState(null);
    const[redirectTo, setRedirectTo] = useState(null);
    let submitPreference = (e,type) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let data  = {};
        switch(type) {
            case 'Job Title':
                data[type] = formData.get('jobtitle');
                break;
            case 'Job Types':
                data[type] = formData.get('jobtype');
                break;
            case 'Work Schedules':
                let shiftArr = [];
                let otherArr = [];
                let drArr = [];
                for(let i=1; i<=5;i++) {
                    let val = "shift"+i;
                    if(i<=2 && formData.get("dr"+i)!=null) {
                        drArr.push(formData.get("dr"+i));
                    }
                    if(i<=3 && formData.get("other"+i)!=null) {
                        otherArr.push(formData.get('other'+i));
                    }
                    if(formData.get(val)!=null)
                    shiftArr.push(formData.get(val));
                }
                data[type] = {};
                data[type].shifts = shiftArr;
                data[type].other = otherArr;
                data[type].range = drArr;
                break;
            case 'Remote':
                let remoteArr = [];
                for(let i=1; i<=4;i++) {
                    let val = "rem"+i;
                    if(formData.get(val)!=null)
                        remoteArr.push(formData.get(val));
                }
                data[type] = remoteArr;
                break;
            case 'Pay':
                data[type] = {
                    category: formData.get('paycat'),
                    amount: formData.get('payamount')
                };
                break;
            case 'Relocation':
                data[type] = formData.get('relocate')!=null?true:false;
                break;
        }
        console.log('Sending data ', data);
        axios.defaults.headers.common['authorization'] = token;
        axios.post(backendServer+'/api/setJobPreferences',{
            id: id,
            data: data
        }).then(res=> {
            console.log(res);
            if(res.status==400 || res.data.code!='200') {
                alert(res.data.msg);
            } else {
                showModal(false);
                switch(type) {
                    case 'Job Title':
                        setTitle(formData.get('jobtitle'));
                        break;
                    case 'Job Types':
                        setType(formData.get('jobtype'));
                        break;
                    case 'Work Schedules':
                        setSchedule(data[type]);
                        break;
                    case 'Remote':
                        setRemote(data[type]);
                        break;
                    case 'Pay':
                        setPay(data[type]);
                        break;
                    case 'Relocation':
                        setRelocation(data[type]);
                        break;
                }
                console.log('Updated Job Preferences');
            }
        }).catch(err=> {
            alert('Failed to update job preferences. Refer console for more details');
            console.log(err);
        })
    }

    let initModal = (question, heading) => {
        setQuestion(question);
        setHeading(heading);
        showModal(true);
        switch(heading) {
            case 'Job Types':
                setModalDiv(
                    <Form onSubmit={(e)=>submitPreference(e,'Job Types')}>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" name = "jobtype" defaultValue={type} required maxLength="45"></Form.Control>
                        </Form.Group>
                        <Button variant="primary"  type="submit">
                            Save
                        </Button>&nbsp;
                        <Button variant="primary" onClick={()=>showModal(false)}>
                            Cancel
                        </Button>
                    </Form>
                );
                break;
            case 'Job Title':
                setModalDiv(
                    <Form onSubmit={(e)=>submitPreference(e,'Job Title')}>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" name = "jobtitle" defaultValue={title} required maxLength="45"></Form.Control>
                        </Form.Group>
                        <Button variant="primary"  type="submit">
                            Save
                        </Button>&nbsp;
                        <Button variant="primary" onClick={()=>showModal(false)}>
                            Cancel
                        </Button>
                    </Form>
                );
                break;
            case 'Work Schedules':
                setModalDiv(
                    <Form onSubmit={(e)=>submitPreference(e,'Work Schedules')}>
                        <Form.Group className="mb-3" >
                            <b>Day ranges</b>
                            <Form.Check type="checkbox" label='Weekend availability' value='Weekend availability' name="dr1"  defaultChecked={schedule.range.includes('Weekend availability')}/>
                            <Form.Check type="checkbox" label='Monday to Friday' value='Monday to Friday' name="dr2" defaultChecked={schedule.range.includes('Monday to Friday')}/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <b>Shifts</b>
                            <Form.Check type="checkbox" label='8 hour shift' value='8 hour shift' name="shift1" defaultChecked={schedule.shifts.includes('8 hour shift')}/>
                            <Form.Check type="checkbox" label='10 hour shift' value='10 hour shift' name="shift2" defaultChecked={schedule.shifts.includes('10 hour shift')}/>
                            <Form.Check type="checkbox" label='12 hour shift' value='12 hour shift' name="shift3" defaultChecked={schedule.shifts.includes('12 hour shift')}/>
                            <Form.Check type="checkbox" label='Day shift' value='Day shift' name="shift4" defaultChecked={schedule.shifts.includes('Day shift')}/>
                            <Form.Check type="checkbox" label='Night shift' value='Night shift' name="shift5" defaultChecked={schedule.shifts.includes('Night shift')}/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <b>Other</b>
                            <Form.Check type="checkbox" label='On call' value='On call' name="other1" defaultChecked={schedule.other.includes('On call')}/>
                            <Form.Check type="checkbox" label='Holidays' value='Holidays' name="other2" defaultChecked={schedule.other.includes('Holidays')}/>
                            <Form.Check type="checkbox" label='Overtime' value='Overtime' name="other3" defaultChecked={schedule.other.includes('Overtime')}/>
                        </Form.Group>
                        <Button variant="primary"  type="submit">
                            Save
                        </Button>&nbsp;
                        <Button variant="primary" onClick={()=>showModal(false)}>
                            Cancel
                        </Button>
                    </Form>
                );
                break;
            case 'Remote':
                setModalDiv(
                    <Form onSubmit={(e)=>submitPreference(e,'Remote')}>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" value='Remote' label='Remote' name="rem1" defaultChecked={remote.includes('Remote')}/>
                            <Form.Check type="checkbox" value='Hybrid remote' label='Hybrid remote' name="rem2" defaultChecked={remote.includes('Hybrid remote')}/>
                            <Form.Check type="checkbox" value='In person' label='In person' name="rem3" defaultChecked={remote.includes('In person')}/>
                            <Form.Check type="checkbox" value='Temporarily remote (COVID-19)' label='Temporarily remote (COVID-19)' name="rem4" defaultChecked={remote.includes('Temporarily remote (COVID-19)')}/>
                        </Form.Group>
                        <Button variant="primary"  type="submit">
                            Save
                        </Button>&nbsp;
                        <Button variant="primary" onClick={()=>showModal(false)}>
                            Cancel
                        </Button>
                    </Form>
                );
                break;
            case 'Pay':
                setModalDiv(
                    <Form onSubmit={(e)=>submitPreference(e,'Pay')}>
                        <Form.Group className="mb-3" >
                            <Form.Control type="number" name = "payamount" placeHolder="$" defaultValue={pay.amount} required min="0"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control as="select" name='paycat' defaultValue={pay.category}>
                                <option value="per hour">per hour</option>
                                <option value="per day">per day</option>
                                <option value="per week">per week</option>
                                <option value="per month">per month</option>
                                <option value="per year">per year</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary"  type="submit">
                            Save
                        </Button>&nbsp;
                        <Button variant="primary" onClick={()=>showModal(false)}>
                            Cancel
                        </Button>
                    </Form>
                );
                break;
            case 'Relocation':
                setModalDiv(
                    <Form onSubmit={(e)=>submitPreference(e,'Relocation')}>
                        <Form.Group className="mb-3" >
                            <Form.Check type="checkbox" value="relocate" label="Yes, I'm willing to relocate" name="relocate" defaultChecked={relocation}/>
                        </Form.Group>
                        <Button variant="primary"  type="submit">
                            Save
                        </Button>&nbsp;
                        <Button variant="primary" onClick={()=>showModal(false)}>
                            Cancel
                        </Button>
                    </Form>
                );
                break;
        }
    }
    return (
        <div>
            {redirectTo}
            <JobSeekerLoggedInNavbar/>
            <Modal show={modal} onHide={()=> showModal(false)}>
                <Modal.Header>
                    <Modal.Title>{heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <h5><b>{question}</b></h5><p></p>
                    {modalDiv}
                </Modal.Body>
            </Modal>
            <div className="container-fullwidth" style={{marginTop:'5%',marginRight:'auto',marginLeft:'auto',width:'50%'}}>
                <div className="row border-bottom">
                    <h3><img src="/images/left-arrow.png" onClick={()=>setRedirectTo(<Redirect to="/resume"/>)} height='30px' width='30px' style={{cursor:'pointer'}}/><br></br><p></p><b>Job Preferences</b></h3>
                    <span style={{color:'darkgray'}}>Update preferences as needed to get better recommendations across Indeed.</span>
                    <p></p>
                </div>
                <div className="row" style={{marginTop:'5%'}}>
                    <h5><b>Interested</b></h5><p></p>
                    <span style={{color:'darkgray'}}>We’ll show you more jobs that include these details.</span><br></br>
                    <p></p>
                </div><br></br>
                <div className="row">
                    <img src="/images/prefer.png"></img>
                </div>
                <div className="row">
                    <p><b>Add Preferences</b></p>
                    <ul style={{listStyleType:'none',cursor:'pointer'}}>
                        <li onClick={()=>initModal('What is your job title','Job Title')}><img src="/images/plus.png" height='15px' width='15px'style={{cursor:'pointer'}} />  &nbsp;&nbsp;Job title</li><br></br>
                        <li onClick={()=>initModal('What are your desired job types?','Job Types')}><img src="/images/plus.png" height='15px' width='15px'style={{cursor:'pointer'}} />  &nbsp;&nbsp;Job types</li><br></br>
                        <li onClick={()=>initModal('What are your desired work schedules?','Work Schedules')}><img src="/images/plus.png" height='15px' width='15px'/>  &nbsp;&nbsp;Work schedule</li><br></br>
                        <li onClick={()=>initModal('What is your desired minimum pay?','Pay')}><img src="/images/plus.png" height='15px' width='15px'/>  &nbsp;&nbsp;Pay</li><br></br>
                        <li onClick={()=>initModal('Are you willing to relocate?','Relocation')}><img src="/images/plus.png" height='15px' width='15px'/>  &nbsp;&nbsp;Relocation</li><br></br>
                        <li onClick={()=>initModal('What is your desired work setting?','Remote')}><img src="/images/plus.png" height='15px' width='15px'/>  &nbsp;&nbsp;Remote</li><br></br>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Preferences;