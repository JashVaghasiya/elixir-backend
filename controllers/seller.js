import mongoose from 'mongoose'
import Product from '../models/product.js'
import Stripe from 'stripe'
import https from 'https'
import User from '../models/user.js'
import OrderDetail from '../models/orderDetail.js'
import Advertisement from '../models/advertisement.js'
import PackageIncome from '../models/packageIncome.js'


const stripe = new Stripe('sk_test_51IRbfUHUA6kmXMG3oK2vTQJgAiMbmqqjtpZ5p1WUL0shTZWd76LlQAaxEzQgoLM5AhQI7lVjhdJmLbTA4tw1V8En00aROjegL1')


export const createSeller = async (request, response) => {

    const { data } = request.body
    const { pack } = request.body


    const newSeller = new User({
        email: data.email,
        role: "seller",
        name: data.name,
        address: data.address,
        bankAccNo: data.bank,
        IFSCCode: data.ifsc,
        mobile: data.mobile,
        packageId: pack._id,
        remainingDays: pack.duration,
        remainingProducts: pack.products
    }).save()
    response.json(newSeller)
    new PackageIncome({
        sellerId: newSeller._id,
        packageName: pack.name,
        duration: pack.duration,
        products: pack.products,
        amountPaid: pack.price
    }).save()
}

export const updateSellerPackage = async (req, res) => {
    const { id, pack } = req.body

    const count = await Product.find({ seller: id }).count()
    const remainingProducts = pack.products - count

    User.findOneAndUpdate({ _id: id }, {
        packageId: pack._id,
        remainingDays: pack.duration,
        remainingProducts: remainingProducts
    }).exec(async (err, result) => {
        if (err) return console.log(err)
        res.json(result)
        await new PackageIncome({
            sellerId: id,
            packageName: pack.name,
            duration: pack.duration,
            products: pack.products,
            amountPaid: pack.price
        }).save()
        await Product.updateMany({ seller: id }, { activated: true })
    })
}



export const packagePayment = async (req, res) => {
    const { packages, token } = req.body

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

export const getSingleSeller = async (req, res) => {
    console.log(req.params.id)
    const sellerId = req.params.id

    await User.find({ _id: sellerId }).exec((err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })

}

export const getSellerProfile = async (req, res) => {
    console.log(req.params.id)
    const sellerId = req.params.id

    await User.findOne({ _id: sellerId }).exec((err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })

}

export const updateSellerProfile = async (req, res) => {
    const sellerId = req.params.id
    const { data } = req.body

    await User.findOneAndUpdate({ _id: sellerId }, { name: data.name, address: data.address, mobile: data.mobile }).exec((err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })

}

export const getDashboardData = async (req, response) => {

    const sellerId = req.params.id

    let data = []

    await OrderDetail.find({ sellerId: sellerId }).countDocuments().then(res => {
        if (res) {
            data.push({
                type: "order",
                count: res
            })
        }
    })

    await OrderDetail.find({ sellerId: sellerId }).then(res => {

        const sales = Number(res && res.length > 0 && res.reduce((acc, order) => acc + order.totalAmount, 0).toFixed(2))
        let income = (Number(sales && sales) - (sales && sales * 0.18))
        let incomePercentage = (Number((income & income) / (sales && sales)) * 100).toFixed(1)
        data.push({ type: "amount", amount: { sales, income, incomePercentage } })

    }).catch(error => console.log(error))

    await Product.find({ seller: sellerId }).countDocuments().then(res => {

        data.push({
            type: "activeProducts",
            count: res
        })

    }).catch(error => console.log(error))

    await User.findOne({ _id: sellerId }).then(res => {

        data.push({
            type: "User",
            count: res
        })

    }).catch(error => console.log(error))

    await Advertisement.find({ seller: sellerId }).countDocuments().then(res => {

        data.push({
            type: "Ads",
            count: res
        })

    }).catch(error => console.log(error))

    await OrderDetail.find({ sellerId: sellerId, pickUpDate: null }).countDocuments().then(res => {

        data.push({
            type: "Unschedule Order",
            count: res
        })

    }).catch(error => console.log(error))

    response.json(data)
}



export const decrementSellerPackage = async () => {
    await User.find({ role: "seller" }).exec((err, result) => {
        if (err) return console.log(err)
        if (result) {
            result.forEach(s => {
                if (s.activated) {
                    User.findOneAndUpdate({ _id: s._id, activated: true }, { remainingDays: s.remainingDays - 1 }).exec((err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            if (result.remainingDays === 1) {
                                User.findOneAndUpdate({ _id: result._id }, { activated: false }).exec((err, result) => {
                                    if (err) return console.log(err)
                                })
                            }
                        }
                    })
                }
            })
        }
    })
}