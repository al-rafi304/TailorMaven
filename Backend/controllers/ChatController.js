const Conversation = require("../models/Conversation")
const Message = require("../models/Message")
const User = require("../models/User")

var current_room = null

const eventHandler = (io, socket) => {

    const sendMessage = (data) => {
        console.log(data)
        newData = {
            sent: false,
            message: data.message
        }
        socket.to(data.user_id).emit("receive-msg", newData)
    }

    const joinRoom = (data) => {
        console.log(`Joining Room: ${data.user_id}`)
        
        socket.join(data.user_id)
        current_room = data.user_id
    }

    const joinAndExitRoom = (data) => {
        console.log(`leaving ${current_room} & joining ${data.user_id}`)

        socket.leave(current_room)
        socket.join(data.user_id)
        current_room = data.user_id
    }
  
    socket.on("send-msg", sendMessage);
    socket.on("join-room", joinRoom)
    socket.on('join-and-exit-room', joinAndExitRoom)
}

const getAllConversations = async (req, res) => {
    
    const convos = await Conversation.find({})

    res.status(200).json({ convos })
}

const getConversationByUser = async (req, res) => {
    const user = await User.findOne({_id: req.params.user_id})

    if(!user) return res.status(404).json({ msg: 'No user found!' })

    const convo = await Conversation.findOne({user: user})
    
    if(!convo) return res.status(404).json({ msg: `No conversation found for this user: ${user._id}` })

    res.status(200).json({ convo })
}

const createConversation = async (req, res) => {
    const user = await User.findOne({_id: req.userID})

    var convo = await Conversation.findOne({user: user})
    if(!convo){
        convo = await Conversation.create({user: user})
    } else {
        return res.json({ msg: "Conversation already created!", convo_id: convo._id})
    }


    res.status(201).json({ convo })
}

const getMessages = async (req, res) => {
    const convo = await Conversation.findOne({_id: req.params.convo_id})
    if(!convo){
        return res.status(404).json({ msg: "No conversation found! "})
    }

    const messages = await Message.find({conversation: convo})

    res.status(201).json({ messages })
}

const createMessage = async (req, res) => {
    const convo = await Conversation.findOne({_id: req.params.convo_id})

    if(!convo){
        return res.status(404).json({msg: 'No convo found to create msg!'})
    }

    const message = await Message.create({
        conversation: convo,
        fromUser: req.body.fromUser,
        message: req.body.message,
    })

    res.status(201).json({ message })
}

module.exports = {
    eventHandler,
    createConversation,
    getAllConversations,
    getMessages,
    getConversationByUser,
    createMessage,
}