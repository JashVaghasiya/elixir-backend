import mongoose from 'mongoose'
import Product from '../models/product.js'
import Stripe from 'stripe'
import https from 'https'
import User from '../models/user.js'


const stripe = new Stripe('sk_test_51IRbfUHUA6kmXMG3oK2vTQJgAiMbmqqjtpZ5p1WUL0shTZWd76LlQAaxEzQgoLM5AhQI7lVjhdJmLbTA4tw1V8En00aROjegL1')


export const createSeller = async (request, response) => {

    const { data } = request.body
    var token

    try {
        const bankVerification = (auth) => {
            var optionsBank = {
                'method': 'GET',
                'hostname': 'api.quicko.com',
                'path': `/bank/${data.ifsc}/accounts/${data.bank}/verify?name=${encodeURI(data.fName)}&mobile=${data.mobile}`,
                'headers': {
                    'Authorization': auth,
                    'x-api-key': 'key_live_c9VqbAyNRriXzQl29smm0vHS0NlMasJ5',
                    'x-api-version': '3.3'
                },
                'maxRedirects': 20
            };

            var reqBank = https.request(optionsBank, function (resBank) {
                var chunks = [];

                resBank.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                resBank.on("end", function (chunk) {
                    var body = Buffer.concat(chunks);
                    console.log("Verified Details-->", body.toString());
                });

                resBank.on("error", function (error) {
                    console.error("Error in verification of Details-->", error);
                });
            });

            reqBank.end();
        }

        const authCreation = () => {
            var options = {
                'method': 'POST',
                'hostname': 'api.quicko.com',
                'path': '/authenticate',
                'headers': {
                    'x-api-key': 'key_live_c9VqbAyNRriXzQl29smm0vHS0NlMasJ5',
                    'x-api-secret': 'secret_live_LPyJpC0QGcoVjvdTs9YFF37qzPLztmOa',
                    'x-api-version': '3.3'
                },
                'maxRedirects': 20
            };

            var req = https.request(options, function (res) {
                var chunks = [];

                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                res.on("end", function (chunk) {
                    var body = Buffer.concat(chunks)
                    token = body.toString()
                    token = JSON.parse(token)
                    bankVerification(token.access_token)
                });

                res.on("error", function (error) {
                    console.error("Error in verification-->", error);
                });

            });

            req.end();

        }

        authCreation()
    } catch (err) {
        console.log("Seller Creation", err);
    }

}



export const packagePayment = async (req, res) => {
    const { packages, token } = req.body
    console.log("Package--->", packages, "Token--->", token);

    stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        return stripe.charges.create({
            amount: packages.price * 100,
            currency: 'INR',
            customer: customer.id,
            receipt_email: customer.email,
            description: packages.packageType
        })

    }).then(result => {
        if (result) {
            res.json(result)
        }
    }).catch(error => console.log(error))
}



export const getSellers = async (req, res) => {
    const limit = Number(req.query.pageSize)
    const sortName = req.query.sortName
    const type = Number(req.query.manner)
    const pageNumber = Number(req.query.pageNumber) || 0

    try {


        if (limit !== null && pageNumber !== 0 && sortName !== null && type !== null) {

            const count = await User.find({ role: 'seller' }).countDocuments()
            User.find({ role: 'seller' }).limit(limit).skip(limit * (pageNumber - 1)).sort({ [sortName]: type }).exec((err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json({ sellers: result, pageNumber, pages: Math.ceil(count / limit) })
                }
            })
        } else {
            await User.find({ role: 'seller' }).exec((err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json(result)
                }
            })
        }

    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid Seller'
        })
    }
}