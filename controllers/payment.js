import Package from '../models/package.js'
import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51IRbfUHUA6kmXMG3oK2vTQJgAiMbmqqjtpZ5p1WUL0shTZWd76LlQAaxEzQgoLM5AhQI7lVjhdJmLbTA4tw1V8En00aROjegL1')

export const packagePayment = async (req, res) => {

    const { packageAmount } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
        amount: packageAmount * 100,
        currency: "INR"
    })
    res.send({
        clientSecret: paymentIntent.client_secret
    })
}

export const orderPayment = async (req, res) => {

    const { orderAmount } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
        amount: orderAmount * 100,
        currency: "INR"
    })

    res.send({
        clientSecret: paymentIntent.client_secret
    })
}

export const adsPayment = async (req, res) => {

    const { adsAmount } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
        amount: adsAmount * 100,
        currency: "INR"
    })

    res.send({
        clientSecret: paymentIntent.client_secret
    })
}