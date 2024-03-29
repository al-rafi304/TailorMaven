import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import ChatAPIs from "../services/ChatAPIs";
import AuthAPI from "../services/AuthAPI";
import io from 'socket.io-client';
import UserAPI from "../services/UserAPI";

const socket = io.connect("http://localhost:5000");

const user_id = localStorage.getItem('user_id')
const token = localStorage.getItem('token')


const scrollDown = () => {
    var box = document.getElementById("chatBox");
    if (!box){
        return
    }
    requestAnimationFrame(() => {
        box.scrollTop = box.scrollHeight;
    });
}

function AdminChat() {
    const [msg, setMsg] = useState("")
    const [allMsg, setAllMsg] = useState([])
    const [hasConv, setHasConv] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [convoUserId, setConvoUserId] = useState(user_id)

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
            setAllMsg(data);
            scrollDown()
        };

        if(loggedIn && hasConv) get();
    }, [loggedIn, hasConv, convoUserId]);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <AdminSidebar />
                </aside>
                <div className="col-md-3">
                    {Conversations(convoUserId, setConvoUserId)}
                </div>
                <div className="col-md-3"  style={{width: 400}}>
                    {ChatContainer(allMsg, setMsg, sendButton)}
                </div>
            </div>
        </div>
    );
}

function ChatContainer(allMsg, setMsg, sendButton){
    return(
        <>
            <h2 className="text-center">Chat</h2>

            <div id="chatBox" className="container border rounded overflow-y-auto" style={{height: 500}}>
                {allMsg.map(msg => (
                    !msg.fromUser ?
                    // Self message
                    <div>
                        <div className="container border rounded-4 text-break text-bg-primary my-3 me-1 p-1 px-3 w-50">
                            {msg.message}
                        </div>
                    </div>
                    :
                    // Incoming message
                    <div className="container border rounded-4 text-break text-bg-light my-3 ms-0 p-1 px-3 w-50">
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
            setConvos(allConvos)
        }
        callAPI()
    }, [])

    function convoButton(user_id){
        setConvoUserId(user_id)
    }

    return(
        <>
            <h2 className="text-center">Conversations</h2>
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