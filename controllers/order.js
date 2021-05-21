import Order from '../models/order.js'
import OrderDetail from '../models/orderDetail.js'
import Cart from '../models/cart.js'
import Product from '../models/product.js'

export const getOrders = async (req, res) => {
    const limit = Number(req.query.pageSize)
    const sortName = req.query.sortName
    const type = Number(req.query.manner)
    const pageNumber = Number(req.query.pageNumber) || 0
    const status = req.query.status || "all"
    const count = await Order.find({}).countDocuments()
    try {
        if (status !== "all") {
            Order.find({ status: status }).limit(limit).skip(limit * (pageNumber - 1)).sort({ [sortName]: type }).populate('userId').exec((err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json({ orders: result, pageNumber, pages: Math.ceil(count / limit) })
                }
            })
        } else {
            Order.find({}).limit(limit).skip(limit * (pageNumber - 1)).sort({ [sortName]: type }).populate('userId').exec((err, result) => {
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
    const { userId,
        cart,
        qty,
        discountedAmount,
        taxAmount,
        shippingCharges,
        payableAmount,
        couponId,
        address,
        transactionId,
        downloadURL } = req.body
    try {
        const order = new Order({
            userId: userId,
            totalQty: qty,
            discountedAmount: discountedAmount,
            coupon: couponId,
            address: address,
            taxAmount: taxAmount,
            shippingCharges: shippingCharges,
            grandTotal: payableAmount,
            transactionId: transactionId,
            invoiceURL: downloadURL
        })
        order.save((err, order) => {
            if (err) return console.error(err);
            cart.forEach(c => {
                Product.findOne({ _id: c.productId._id }).exec((err, result) => {
                    if (err) return console.error(err);

                    new OrderDetail({
                        orderId: order._id,
                        sellerId: result.seller,
                        userId,
                        totalQty: c.qty,
                        totalAmount: (c.qty * c.productId.price).toFixed(2),
                        productId: c.productId._id
                    }).save((err, order) => {
                        if (err) return console.error(err);
                        const remainingStock = Number(result.stock - c.qty);
                        const soldProducts = Number(result.stock + c.qty)

                        Product.findOneAndUpdate({ _id: c.productId._id }, { sold: soldProducts, stock: remainingStock }).exec((err, result) => {
                            if (err) return console.log(err)
                            Cart.findByIdAndDelete({ _id: c._id }).exec((err, result) => {
                                if (err) return console.log(err);
                            })
                        })
                    })
                })
            })
            if (order) return res.json(order)
        })
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid Order Id'
        })
    }
}



export const getSellerOrders = async (req, res) => {
    const limit = Number(req.query.pageSize)
    const sortName = req.query.sortName
    const type = Number(req.query.manner)
    const pageNumber = Number(req.query.pageNumber) || 0
    const id = req.params.id
    try {

        if (limit !== null && pageNumber !== 0 && sortName !== null && type !== null) {

            const count = await OrderDetail.find({ sellerId: id }).countDocuments()
            OrderDetail.find({ sellerId: id }).limit(limit).skip(limit * (pageNumber - 1)).sort({ [sortName]: type }).populate('userId productId').exec((err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json({ orders: result, pageNumber, pages: Math.ceil(count / limit) })
                }
            })
        } else {
            OrderDetail.find({ sellerId: id }).exec((err, result) => {
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
            err: 'Invalid Seller Id'
        })
    }
}

export const setPickUp = async (req, res) => {
    const { id } = req.params
    const { date } = req.body
    try {
        OrderDetail.findOneAndUpdate({ _id: id }, { pickUpDate: date }).exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.json(result)
                console.log(result);
            }
        })
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid Seller Id'
        })
    }
}

export const getDetailOrder = async (req, res) => {
    const { id } = req.params

    try {
        OrderDetail.find({ orderId: id }).populate("productId sellerId userId orderId").exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.json(result)
            }
        })
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid Seller Id'
        })
    }
}

export const getUnScheduledOrders = async (req, res) => {
    const id = req.params.id
    const limit = Number(req.query.pageSize)
    const sortName = req.query.sortName
    const type = Number(req.query.manner)
    const pageNumber = Number(req.query.pageNumber) || 0

    try {
        if (limit !== null && pageNumber !== 0 && sortName !== null && type !== null) {

            const count = await OrderDetail.find({ sellerId: id, pickUpDate: null }).countDocuments()
            OrderDetail.find({ sellerId: id, pickUpDate: null }).limit(limit).skip(limit * (pageNumber - 1)).sort({ [sortName]: type }).populate('userId productId').exec((err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json({ orders: result, pageNumber, pages: Math.ceil(count / limit) })
                }
            })
        } else {
            OrderDetail.find({ sellerId: id, pickUpDate: null }).exec((err, result) => {
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
            err: 'Invalid Seller Id'
        })
    }
}


export const getDetailedOrder = async (req, res) => {
    const id = req.params.id
    const limit = Number(req.query.pageSize)
    const sortName = req.query.sortName
    const type = Number(req.query.manner)
    const pageNumber = Number(req.query.pageNumber) || 0

    try {
        if (limit !== null && pageNumber !== 0 && sortName !== null && type !== null) {

            const count = await OrderDetail.find({ picked: false, pickUpDate: { $ne: null } }).countDocuments()
            OrderDetail.find({ picked: false, pickUpDate: { $ne: null } }).limit(limit).skip(limit * (pageNumber - 1)).sort({ [sortName]: type }).populate('userId productId').exec((err, result) => {
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
            err: 'Invalid Seller Id'
        })
    }
}

export const changeStatus = async (req, res) => {

    const id = req.params.id
    const status = req.body.status

    try {
        Order.findOneAndUpdate({ _id: id }, { status: status }).exec((err, result) => {
            if (result) {
                res.json(result)
            } else {
                console.log(err)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

export const setPicked = async (req, res) => {

    const id = req.params.id


    try {
        OrderDetail.findOneAndUpdate({ _id: id }, { picked: true }).exec((err, result) => {
            if (result) {
                res.json(result)
            } else {
                console.log(err)
            }
        })
    } catch (err) {
        console.log(err)
    }
}



export const getDetailOfOrder = async (req, res) => {
    const id = req.params.id


    try {
        OrderDetail.find({ orderId: id }).populate('userId productId').exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.json({ orders: result })
            }
        })
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid Seller Id'
        })
    }
}

export const getInvoiceOrder = (req, res) => {
    const id = req.params.id
    try {
        Order.findById({ _id: id }).exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.json({ order: result })
            }
        })
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid Order Id'
        })
    }
}