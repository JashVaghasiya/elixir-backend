import mongoose from 'mongoose'
import Product from '../models/product.js'
import Stripe from 'stripe'
import https from 'https'

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



export const createProduct = async (req, res) => {

    const { product } = req.body

    const totalProducts = seller.totalProducts + 1
    const remainingProducts = seller.remainingProducts - 1
    try {
        const newSeller = await new Product({
            product: product,
        }).save()
        res.json(newSeller)

    } catch (err) {
        console.log('error in creating product at controller', err);
    }
}

export const updateProduct = async (req, res) => {

    const { id, product } = req.body
    try {
        await Product.findOneAndUpdate({ _id: id }, {
            product: product,
        }).exec()
        res.json("Product Updated")
    } catch (error) {
        console.log('Error in Updating product at Controller', error);
    }
}

export const deleteProduct = async (req, res) => {

    const { id } = req.body

    try {
        await Product.findOneDelete({ _id: id }).exec(err, res => {

        })
        res.json("Product Removed")
    } catch (error) {
        console.log('Error in Delete Product at Controller', error);
    }
}
// export const getSellerProduct = async (req, res) => {
//     const id = req.params.id
//     try {
//         const product = await User.findById({ _id: id })
//         res.json(product)
//     } catch (error) {
//         console.log('Error in Getting product at Controller', error);
//     }
// }

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