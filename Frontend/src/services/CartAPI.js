import {SUIT, FABRIC} from '../constants/ProductTypes'

const user_id = localStorage.getItem('user_id')
const token = localStorage.getItem('token')

async function addToCart(productType, product, fabricLength = null){
    console.log("Trying to add to cart", productType, product, fabricLength)
    const cart = {
        product_type: productType,
        product_id: product,
        fabric_length: fabricLength
    }

    const res = await fetch(
        '/api/v1/cart',
        {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`, "Content-Type" : "application/json"},
            body: JSON.stringify(cart)
        }
    )

    if(!res.ok) return console.error("Error Adding to cart", await res.json())

    console.log('Added to Cart')
    return res.json()
}

export default {
    addToCart
}