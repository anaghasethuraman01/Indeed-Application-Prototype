
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector} from 'react-redux';
import CompanyTabs from './CompanyTabs';

function JoinUs(props) {

    const about = useSelector((state)=>state.company.about);
    const values = useSelector((state)=>state.company.values);
    const culture = useSelector((state)=>state.company.culture);
    return (
        <div>
            <CompanyTabs></CompanyTabs>
                <div className="container-fullwidth" style={{marginLeft:'20%',marginRight:'20%'}}>
                    <div className="row">
                        <h2><b>About Us</b></h2>
                        <p>{about}</p>
                    </div><br></br>
                    <div className="row">
                        <h2><b>Work Culture</b></h2>
                        <p>{culture}</p>
                    </div><br></br>
                    <div className="row">
                        <h2><b>Company Values</b></h2>
                        {values}
                        
                    </div><br></br>
                </div>
        </div>
    )
}

export default JoinUs;