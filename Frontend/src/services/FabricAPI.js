async function getAllFabrics() {
    const res = await fetch('/api/v1/fabric', { method: 'GET' })

    if(!res.ok) return console.error("Error fetching all fabrics!")

    const data = await res.json()
    return data.fabrics

}

export default {
    getAllFabrics
}