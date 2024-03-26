async function isLoggedIn(){
    var token = localStorage.getItem("token")
    if(!token){
        console.log('No token provided to check isLoggedIn()')
        return false
    }
    
    const res = await fetch(
        `/auth/checkLogin/${token}`,
        {
            method: 'GET',
            headers: {"Content-Type" : "application/json"}
        }
    )

    if(res.ok){
        return true
    }
    let data = await res.json()
    console.error(data)
    return false
}

export default {
    isLoggedIn,
}