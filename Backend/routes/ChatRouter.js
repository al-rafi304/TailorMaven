const express = require('express');
const router = express.Router();

const chatController = require("../controllers/ChatController")
const authMid = require("../milddleware/authMiddleware")

router.route('/')
    .get([authMid.isAuthenticated, authMid.adminOnlyAccess], chatController.getAllConversations)
    .post([authMid.isAuthenticated], chatController.createConversation)

router.route('/:convo_id/chat')
    .get([authMid.isAuthenticated], chatController.getMessages)
    .post(authMid.isAuthenticated, chatController.createMessage)

router.route('/user/:user_id')
    .get([authMid.isAuthenticated], chatController.getConversationByUser)

module.exports = router