import React from 'react'
import '../../CSS/Messenger.css'
import { format } from "timeago.js";
import { withRouter } from 'react-router-dom';

function Message({ message, own }) {

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <p className="messageText">                   
                    {message.messageText}
                </p>
            </div>
            <div className="messageBottom">
            {format(message.createdAt)}
            </div>
        </div>
    );
}
export default withRouter(Message);