
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector} from 'react-redux';
import JobSeekerNavbar from './JobSeekerNavbar';
import JobSeekerLoggedInNavbar from './JobSeekerLoggedInNavbar';

function Profile(props) {

    const about = useSelector((state)=>state.company.about);
    const values = useSelector((state)=>state.company.values);
    const culture = useSelector((state)=>state.company.culture);
    return (
        <div className="container-fullwidth" style={{marginLeft:'20%',marginRight:'20%'}}>
            <div className="row">
                <JobSeekerLoggedInNavbar/>
            </div><br></br>
            <div className="row">
                
            </div><br></br>
            <div className="row">
                <h2><b>Company Values</b></h2>
                {values}
                
            </div><br></br>
        </div>
    )
}

export default Profile;