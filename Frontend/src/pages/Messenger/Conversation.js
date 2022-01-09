import React, { useEffect, useState } from 'react'
import '../../CSS/Conversation.css'
import axios from "axios";
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import backendServer from "../../webConfig";

function Conversation({conversation, currentUser, role}) {

    const [jobSeeker, setJobSeeker ] = useState();
    const token = useSelector((state) => state.userInfo.token);

    useEffect(() => {
        console.log(role);
        const receiverId = conversation.members.find((conv) => conv !== currentUser);
        console.log("receiverId" +receiverId);
        const getJobSeeker = async () => {
            try {
                axios.defaults.headers.common['authorization'] = token;
                const response = await axios.get(backendServer+"/api/getJobSeekerById/" +receiverId);               
                setJobSeeker(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        const getEmployer = async () => {
            try {
                axios.defaults.headers.common['authorization'] = token;
                const response = await axios.get(backendServer+"/api/getEmployerById/" +receiverId);               
                setJobSeeker(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        if("Employer" === role) {
            getJobSeeker();
        } else {
            getEmployer();
        }      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, conversation]);

    return(        
        <>{jobSeeker?.name && <div className="conversation a ">
            <span className="conversationName">{jobSeeker?.name}</span>
        </div>}</>
    );
}
export default withRouter(Conversation);
