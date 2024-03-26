import React, { useEffect, useState } from "react";
import ChatAPIs from "../services/ChatAPIs";
import AuthAPI from "../services/AuthAPI";
import io from 'socket.io-client';
import UserAPI from "../services/UserAPI";

const socket = io.connect("http://localhost:5000");

const user_id = localStorage.getItem('user_id')
const token = localStorage.getItem('token')


function AdminChat() {
    const [msg, setMsg] = useState("")
    const [allMsg, setAllMsg] = useState([])
    const [hasConv, setHasConv] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [convoUserId, setConvoUserId] = useState(user_id)

    const scrollDown = () => {
        var box = document.getElementById("chatBox");
        if (!box){
            return
        }
        requestAnimationFrame(() => {
            box.scrollTop = box.scrollHeight;
        });
    }

    // Message Send button
    const sendButton = async() => {
        socket.emit("send-msg", {message: msg, user_id: convoUserId})

        var convo = await ChatAPIs.getConversation(convoUserId, token)
        var convo_id = convo._id
        
        var messageData = {
            message: msg,
            fromUser: false
        }
        ChatAPIs.createMessage(convo_id, token, messageData)

        //Display currently sent message
        setAllMsg(prevAllMsg => [...prevAllMsg, {message: msg, fromUser: false}])
        scrollDown()

    }

    // Join chat room of the specific user
    useEffect(() => {
        socket.emit('join-and-exit-room', {user_id: convoUserId})
        console.log("Joining room", convoUserId)
    }, [convoUserId])

    // Receive Message Event
    useEffect(() => {
        socket.on("receive-msg", (data) => {
            console.log(allMsg)
            setAllMsg(prevAllMsg => [...prevAllMsg, {message: data.message, fromUser: !data.fromUser}])

            scrollDown()
        })
    }, [socket]);

    // Check login
    useEffect(() => {
        async function checkLogin(){
            let result = await AuthAPI.isLoggedIn();
            setLoggedIn(result);
        };

        checkLogin();
    }, []);

    // Check Conversation existence
    useEffect(() => {
        async function checkConversation(){
            const result = await ChatAPIs.hasConversation(user_id, token);
            console.log(result)
            setHasConv(result);
        };
        if(loggedIn) checkConversation();
    }, [loggedIn]);

    // Get all messages
    useEffect(() => {
        async function get(){
            const data = await ChatAPIs.getMessages(convoUserId, token);
            console.log('Getting messages')
            setAllMsg(data);
        };

        if(loggedIn && hasConv) get();
    }, [loggedIn, hasConv, convoUserId]);

    return (
        <div className="container row justify-content-between m-4">
            <div className="col-lg-6">
                {Conversations(convoUserId, setConvoUserId)}
            </div>
            {loggedIn ?
                (hasConv ?
                    ChatContainer(allMsg, setMsg, sendButton)
                    :
                    <div className="container col-4 align-self-center">
                        <button className="btn btn-primary" onClick={() => {
                            ChatAPIs.createConversation(token)
                            window.location.reload()
                        }}>Start Chatting</button>
                    </div>
                )
                :
                <div className="container col-4 align-self-center">
                    <h5 className="text-end">Log in to chat</h5>
                </div>
            }
        </div>
    );
}

function ChatContainer(allMsg, setMsg, sendButton){
    return(
        <>
            <div className="col-4 " style={{width: 400}}>
                <h1 className="text-center">Chat</h1>

                <div id="chatBox" className="container col border rounded overflow-y-auto" style={{height: 500}}>
                    {allMsg.map(msg => (
                        !msg.fromUser ?
                        // Self message
                        <div className="container border rounded-4 text-break text-bg-primary my-3 w-75 me-1 p-1 px-3">
                            <p className=" m-0 text-end">{msg.message}</p>
                        </div>
                        :
                        // Incoming message
                        <div className="container row border rounded-4 text-break text-bg-light my-3 ms-0 p-1 w-50">
                            <p className="text-start m-0">{msg.message}</p>  
                        </div>
                    ))}

                </div>

                <div className="input-group mb-3 mt-3">
                    <input type="text" className="form-control" placeholder="Enter message"onChange={(e) => {
                        setMsg(e.target.value)
                    }}/>
                    <button className="btn btn-success" onClick={sendButton}>Send</button>
                </div>
            </div>
        </>
    )
}


function Conversations(convoUserId, setConvoUserId) {
    const [convos, setConvos] = useState([])

    useEffect(() => {
        async function callAPI(){
            let allConvos = await ChatAPIs.getAllConversations(user_id, token)
            allConvos.forEach(async convo => {
                let user = await UserAPI.getUser(convo.user, token)
                convo['username'] = user.username
            });
            console.log(allConvos)
            setConvos(allConvos)
        }
        callAPI()
    }, [])

    function convoButton(user_id){
        setConvoUserId(user_id)
    }

    return(
        <>
            <h1 className="text-center">All Conversations</h1>
            <div className="list-group">
                {convos.map(convo => (
                    <button onClick={() => convoButton(convo.user)} className={`list-group-item list-group-item-action ${convoUserId === convo.user ? 'active' : ''}`}>
                        <div className="d-flex w-100 justify-content-between">
                            {convo.username
                                ?
                                // Show Username
                                <h5 className="mb-1">{convo.username}</h5>
                                :
                                // Loading
                                <div className="spinner-border spinner-border-sm" role="status"/>
                            }

                            <small>3 days ago</small>
                        </div>
                        <p className="mb-1">You: Last message sent or received</p>
                    </button>
                ))}
            </div>
        </>
    )
}

export default AdminChat;