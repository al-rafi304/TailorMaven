async function hasConversation(user_id, token){
    var response = await fetch(
        `/api/v1/conversation/user/${user_id}`,
        {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
        }
    )
    console.log(await response.json())
    
    return response.ok
}

async function createConversation(token){
    var response = await fetch(
        `/api/v1/conversation`,
        {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`}
        }
    )

    if(response.ok){
        console.log("Created Conversation!")
    } else {
        return console.error("Error creating conversation")
    }
}

async function createMessage(convo_id, token, messageData){
    var response = await fetch(
        `/api/v1/conversation/${convo_id}/chat`,
        {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`, "Content-Type" : "application/json"},
            body: JSON.stringify(messageData)
        }
    )

    if(response.ok){
        console.log('Created Message!')
    } else {
        return console.error("Couldn't save message to database!")
    }
}

async function getAllConversations(user_id, token){
    let res = await fetch(
        '/api/v1/conversation',
        {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
        }
    )

    if(!res.ok){
        return res
    }

    let convoData = await res.json()
    console.log(convoData.convos)
    return convoData.convos
}

async function getConversation(user_id, token){
    var getConvoRes = await fetch(
        `/api/v1/conversation/user/${user_id}`,
        {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
        }
    )

    if(!getConvoRes.ok){
        return console.error(getConvoRes)
    }

    var convoData = await getConvoRes.json()

    return convoData.convo
}

async function getMessages(user_id, token){
    var convo = await getConversation(user_id, token)
    var convo_id = convo._id
    console.log(`Convo ID: ${convo_id}`)

    var getMessageRes = await fetch(
        `/api/v1/conversation/${convo_id}/chat`,
        {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
        }
    )
    var msgData = await getMessageRes.json()
    var messages = msgData.messages
    
    return messages
}

export default {
    createConversation,
    getMessages,
    hasConversation,
    getConversation,
    createMessage,
    getAllConversations,
}