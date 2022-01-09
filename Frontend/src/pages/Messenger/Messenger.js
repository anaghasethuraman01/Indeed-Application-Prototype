import React, { useEffect, useState, useRef } from "react";
import "../../CSS/Messenger.css";
import Conversation from "./Conversation";
import NewConversation from "./NewConversation";
import Message from "./Message";
import axios from "axios";
import Select from "react-select";
import { useSelector } from "react-redux";
import JobSeekerLoggedInNavbar from '../JobSeeker/JobSeekerLoggedInNavbar'
import EmployerNavbar from '../Employer/EmployerNavbar'
import { withRouter } from 'react-router-dom';
import backendServer from "../../webConfig";

const Messenger = (props) => {
  const [currentChat, setCurrentChat] = useState();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const id = useSelector((state) => state.userInfo.id);
  const accountType = useSelector((state) => state.userInfo.accountType);
  const [userId, setUserId] = useState(id); // add id from store
  const [newMessage, setNewMessage] = useState("");
  const [flag, setFlag] = useState("");
  const [jobSeekers, setJobSeekers] = useState([]);
  const [newConversation, setNewConversation] = useState();
  const [role, setRole] = useState(accountType); // add role from store
  const [isEmployer, setIsEmployer] = useState("Employer" === role ? true : false); // add boolean flag
  const scrollRef = useRef();
  const token = useSelector((state) => state.userInfo.token);

  //past conv
  useEffect(() => {
    const getConversations = async () => {
      try {
        axios.defaults.headers.common['authorization'] = token;
        const res = await axios.get(backendServer+"/api/getAllJobSeekers");
        const convResponse = await axios.get(
          backendServer+"/api/getConversationById/" + userId
        );
        let removeArr = [];      
        // eslint-disable-next-line array-callback-return
        convResponse.data.map((item) => {
          removeArr.push(item.members[1]);
        });

        const myArray = res.data.filter((el) => !removeArr.includes(el.value));
        console.log(convResponse.data)
        setConversations(convResponse.data);
        setJobSeekers(myArray);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);

  //get all messages of selected chat
  useEffect(() => {
    const getMessages = async () => {
      try {
        axios.defaults.headers.common['authorization'] = token;
        const res = await axios.get(backendServer+"/api/getMessages/" + currentChat._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if(currentChat) 
      getMessages();
  }, [currentChat]);

  //handle send for existing and new conversations
  const handleSend = async (e) => {
    e.preventDefault();
    if (messages.length > 0) {
      try {
        const message = {
          conversationId: currentChat._id,
          sender: userId,
          messageText: newMessage,
        };
        axios.defaults.headers.common['authorization'] = token;
        const res = await axios.post(backendServer+"/api/addNewMessage", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const conversation = {
          senderId: userId,
          receiverId: newConversation.value,
        };
        axios.defaults.headers.common['authorization'] = token;
        const res = await axios.post(backendServer+"/api/saveConversation", conversation);
        const message = {
          conversationId: res.data._id,
          sender: userId,
          messageText: newMessage,
        };
        axios.defaults.headers.common['authorization'] = token;
        const response = await axios.post(backendServer+"/api/addNewMessage", message);
        setMessages([...messages, response.data]);
        setNewMessage("");
        setNewConversation("")
        setFlag("a")
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {("JobSeeker" === role) ? (
        <JobSeekerLoggedInNavbar />
      ) : (
        <EmployerNavbar />
      )}

      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {isEmployer && (
              <Select
                options={jobSeekers}
                isSearchable={true}
                isClearable={true}
                placeholder="Search for jobseekers"
                onChange={setNewConversation}
                value=""
              />
            )}
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation
                  conversation={c}
                  currentUser={userId}
                  role={role}
                />
              </div>
            ))}
            <div onClick={() => setCurrentChat(1)}>
              <NewConversation conversation={newConversation} />
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <div>
                <div className="chatBoxTop">
                  {messages.map((msg) => (
                    <div ref={scrollRef}>
                      <Message
                        message={msg}
                        own={Number(msg.sender) === userId}
                      />
                     </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSend}>
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <span className="noConversationMsg">No conversations yet</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Messenger);
