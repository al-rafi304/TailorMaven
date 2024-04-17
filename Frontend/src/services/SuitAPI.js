const user_id = localStorage.getItem('user_id')
const token = localStorage.getItem('token')

async function createSuit( fabric, type, length, waist, chest, arm_length){
    const suit = {
        type: type,
        fabric: fabric._id,
        length: length,
        waist: waist,
        chest: chest,
        arm_length: arm_length,
    }
    const res = await fetch(
        '/api/v1/suit',
        {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`, "Content-Type" : "application/json"},
            body: JSON.stringify(suit)
        }
    )
    
    if(!res.ok) return console.error("Error creating suit")

    console.log('Created Suit!')
    return res.json()

}

export default {
    createSuit
}