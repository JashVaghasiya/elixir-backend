import User from '../models/user.js'
import Product from '../models/product.js'
import Order from '../models/order.js'
import State from '../models/state.js'
import City from '../models/city.js'
import Category from '../models/category.js'
import Sub from '../models/sub.js'
import Agency from '../models/agency.js'
import Ads from '../models/advertisement.js'

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
    await Order.find({ status: "delivered" }).count().then(res => {
        data.push({
            name: "Delivered Orders",
            count: res
        })
    })
    await Order.find({ status: "pending" }).count().then(res => {
        data.push({
            name: "Pending Orders",
            count: res
        })
    })
    res.json(data)
    console.log(data)
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
        const user = await User.findOneAndUpdate({ _id: id }, { activated: false })
        res.json(user)
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid User'
        })
    }
}

export const activateUser = async (req, res) => {

    const id = req.params.id
    console.log('id at controller-->', id)

    try {
        const user = await User.findOneAndUpdate({ _id: id }, { activated: true })
        res.json(user)
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid User'
        })
    }
}









