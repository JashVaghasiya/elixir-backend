import User from '../models/user.js'
import Product from '../models/product.js'
import AdsIncome from '../models/adsIncome.js'
import PackageIncome from '../models/packageIncome.js'
import Order from '../models/order.js'
import State from '../models/state.js'
import City from '../models/city.js'
import Category from '../models/category.js'
import Sub from '../models/sub.js'
import Ads from '../models/advertisement.js'
import Complain from '../models/complain.js'
import Doctor from '../models/doctor.js'

export const getUserCount = async (req, res) => {
    let data = []
    await User.find({ role: "seller" }).count().then(res => {
        data.push({
            name: "Sellers",
            count: res
        })
    })
    await User.find({ role: "user" }).count().then(res => {
        data.push({
            name: "Users",
            count: res
        })
    })
    await User.find({ role: "doctors" }).count().then(res => {
        data.push({
            name: "Doctors",
            count: res
        })

    })
    res.json(data)
}

export const getOtherCount = async (req, res) => {

    let data = []

    await Sub.find({}).count().then(res => {
        data.push({
            name: "Sub Categories",
            count: res
        })
    })
    await Category.find({}).count().then(res => {
        data.push({
            name: "Categories",
            count: res
        })
    })
    await Agency.find({}).count().then(res => {
        data.push({
            name: "Agencies",
            count: res
        })

    })
    res.json(data)
}


export const getLocationCount = async (req, res) => {
    let data = []
    await State.find({}).count().then(res => {
        data.push({
            name: "States",
            count: res
        })
    })
    await City.find({}).count().then(res => {
        data.push({
            name: "Cities",
            count: res
        })
    })
    res.json(data)
}

export const getProductCount = async (req, res) => {
    let data = []
    await Product.find({}).count().then(res => {
        data.push({
            name: "Products",
            count: res
        })
    })
    await Product.find({ activated: true }).count().then(res => {
        data.push({
            name: "Active Products",
            count: res
        })
    })
    await Product.find({ activated: false }).count().then(res => {
        data.push({
            name: "Deactivate Products",
            count: res
        })
    })
    res.json(data)
}

export const getOrderCount = async (req, res) => {
    let data = []
    await Order.find({}).count().then(res => {
        data.push({
            name: "Orders",
            count: res
        })
    })
    await Order.find({ status: "Delivered" }).count().then(res => {
        data.push({
            name: "Delivered Orders",
            count: res
        })
    })
    await Order.find({ status: "Pending" }).count().then(res => {
        data.push({
            name: "Pending Orders",
            count: res
        })
    })
    res.json(data)
}

export const getUsers = async (req, res) => {
    const limit = Number(req.query.pageSize)
    const pageNumber = Number(req.query.pageNumber) || 0
    const sortName = req.query.sortName
    const type = Number(req.query.manner)
    try {


        if (limit !== null && pageNumber !== 0) {

            const count = await User.find({ role: 'user' }).countDocuments()
            User.find({ role: 'user' }).limit(limit).skip(limit * (pageNumber - 1)).sort({ [sortName]: type }).exec((err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json({ users: result, pageNumber, pages: Math.ceil(count / limit) })
                }
            })
        } else {
            User.find({ role: 'user' }).exec((err, result) => {
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
            err: 'Invalid User'
        })
    }
}

export const deactivateUser = async (req, res) => {

    const { id } = req.params

    try {
        User.findOneAndUpdate({ _id: id }, { activated: false }).exec((err, result) => {
            if (err) return console.log(err)
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid User'
        })
    }
}

export const activateUser = async (req, res) => {

    const { id } = req.params
    try {
        User.findOneAndUpdate({ _id: id }, { activated: true }).exec((err, result) => {
            if (err) return console.log(err)
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid User'
        })
    }
}


export const getComplains = async (req, res) => {
    try {
        await Complain.find({ solved: false }).populate('userId').exec((err, result) => {
            if (err) return console.log(err);
            res.json(result)
        })
    } catch (err) {
        console.log(err)
    }
}

export const solveComplain = async (req, res) => {
    try {
        await Complain.findOneAndUpdate({ _id: req.body.id }, { solved: true }).exec((err, result) => {
            if (err) return console.log(err);
            res.json(result)
        })
    } catch (err) {
        console.log(err)
    }
}

export const getCardCount = async (req, res) => {
    var data = []
    try {
        await Order.aggregate([
            {
            $group: {
                _id: 0,
                total: {
                    $sum: "$grandTotal"
                }
            }
        }]).exec((err, result) => {
            if (err) return console.log(err);
            data.push({orderIncome :result[0].total})
            AdsIncome.aggregate([
            {
            $group: {
                _id: 0,
                total: {
                    $sum: "$amountPaid"
                }
            }
            }]).exec((err, result) => {
                if (err) return console.log(err);
                data.push({adsIncome:result[0].total})
                PackageIncome.aggregate([
                    {
                    $group: {
                        _id: 0,
                        total: {
                            $sum: "$amountPaid"
                        }
                    }
                }]).exec((err, result) => {
                    if (err) return console.log(err);
                    data.push({packageIncome:result[0].total})
                    User.find({}).count().exec((err,result)=>{
                        data.push({totalUser: result})
                        Doctor.find({}).count().exec((err,result)=>{
                            data.push({totalDoctor: result})
                            res.json(data)    
                        })
                    })
                })
            })
        })
    } catch (err) {
        console.log(err)
    }
}


