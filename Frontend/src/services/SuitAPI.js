const token = localStorage.getItem('token')

async function createSuit( fabric, type, length, waist, chest, arm_length, suit_screenshot){
    console.log(suit_screenshot)
    let formData = new FormData()
    formData.append('type', type)
    formData.append('fabric', fabric._id)
    formData.append('length', length)
    formData.append('waist', waist)
    formData.append('chest', chest)
    formData.append('arm_length', arm_length)
    formData.append('image', suit_screenshot)
    
    const res = await fetch(
        '/api/v1/suit',
        {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`},
            body: formData
        }
    )
    
    if(!res.ok) return console.error("Error creating suit")

    console.log('Created Suit!')
    return res.json()

}

async function getAllSuit(){
    const res = await fetch(
        '/api/v1/suit',
        {method: "GET"}
    )
    let data = await res.json()
    return data
}

export default {
    createSuit,
    getAllSuit
}