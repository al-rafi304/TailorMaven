const Stripe = require('stripe')

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

module.exports = stripe