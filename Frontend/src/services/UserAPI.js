async function getUser(user_id, token) {

    if(!user_id || !token) return false

    let userRes = await fetch(
        `/api/v1/user/${user_id}`,
        {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
        }
    )

    if(!userRes.ok){
        return console.error(await userRes.json())
    }

    let userData = await userRes.json()
    return userData.user
}

async function isAdmin(user_id, token){
    if(!user_id || !token) return false
    
    let user = await getUser(user_id, token)
    console.log(`Admin: ${user.isAdmin}`)
    return user.isAdmin
}

export default{
    getUser,
    isAdmin,
}