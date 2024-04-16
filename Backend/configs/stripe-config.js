const Stripe = require('stripe')

export const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));