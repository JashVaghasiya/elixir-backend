import Order from '../models/order.js'
import OrderDetail from '../models/orderDetail.js'

export const getOrders = async (req, res) => {
    const limit = Number(req.query.pageSize)
    const sortName = req.query.sortName
    const type = Number(req.query.manner)
    const pageNumber = Number(req.query.pageNumber) || 0

    try {


        if (limit !== null && pageNumber !== 0 && sortName !== null && type !== null) {

            const count = await Order.find({}).countDocuments()
            Order.find().limit(limit).skip(limit * (pageNumber - 1)).sort({ [sortName]: type }).exec((err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json({ orders: result, pageNumber, pages: Math.ceil(count / limit) })
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


export const getOrder = async (req, res) => {
    const id = req.params.id
    try {
        Order.find({ userId: id }).exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.json({ order: result })
            }
        })
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid User Id'
        })
    }
}


export const createOrder = async (req, res) => {
    const { userId, cart, qty, amount } = req.body
    let orderId = null
    try {
        const order = await new Order({ userId: userId, qty: qty, grandTotal: amount })

        order.save((err, order) => {
            if (err) return console.error(err);
            cart.forEach(c => {
                new OrderDetail({ orderId: order._id, userId, qty: c.qty, totalAmount: (c.qty * c.productId.price).toFixed(2), productId: c.productId._id }).save((err, order) => {
                    if (err) return console.error(err);
                    console.log(order)
                })
            })
        })


    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid Order Id'
        })
    }
}