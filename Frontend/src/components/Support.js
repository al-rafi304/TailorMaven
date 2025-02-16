import React, { useEffect, useState } from "react";
import ChatAPIs from "../services/ChatAPIs";
import AuthAPI from "../services/AuthAPI";
import io from 'socket.io-client';

// const socket = io.connect("http://localhost:3000");
const socket = io("https://tailor-maven-api.vercel.app", {
    transports: ["polling"],
    withCredentials: true
})

const user_id = localStorage.getItem('user_id')
const token = localStorage.getItem('token')

function Support() {
    const [msg, setMsg] = useState("")
    const [allMsg, setAllMsg] = useState([])
    const [hasConv, setHasConv] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)

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
        socket.emit("send-msg", {message: msg, user_id: user_id})

        var convo = await ChatAPIs.getConversation(user_id, token)
        var convo_id = convo._id
        
        var messageData = {
            message: msg,
            fromUser: true
        }
        ChatAPIs.createMessage(convo_id, token, messageData)

        //Display currently sent message
        setAllMsg(prevAllMsg => [...prevAllMsg, {message: msg, fromUser: true}])
        scrollDown()

    }

    // Join Chat Room
    socket.emit('join-room', {user_id: user_id})
    console.log("Joining room", user_id)


    // Receive Message Event
    useEffect(() => {
        socket.on("receive-msg", (data) => {
            console.log(allMsg)
            setAllMsg(prevAllMsg => [...prevAllMsg, {message: data.message, fromUser: data.fromUser}])

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
            const data = await ChatAPIs.getMessages(user_id, token);
            setAllMsg(data);
        };

        if(loggedIn && hasConv) get();
    }, [loggedIn, hasConv]);

    return (
        <div className="container row justify-content-between m-4">
            <div className="col-lg-6">
                {Faq()}
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
                        msg.fromUser ?
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

function Faq() {
    return(
        <div className="accordion" id="accordionExample">
            <h1>FAQ</h1>
        <div className="accordion-item">
            <h2 className="accordion-header">
            <button className="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                FAQ 1
            </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header">
            <button className="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                FAQ 2
            </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header">
            <button className="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                FAQ 3
            </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
            </div>
        </div>
        </div>
    )
}

export default Support;