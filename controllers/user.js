import User from '../models/user.js'
import Doctor from '../models/doctor.js'
import Order from '../models/order.js'
import Complain from '../models/complain.js'


export const createUser = async (req, res) => {
    const { email } = req.user
    await User.findOne({ email: email }).exec((err, result) => {
        if (err) return console.log(err)
        if (result !== null) {
            new User({
                name: email.split("@")[0],
                email: email
            }).save()
        } else {
            res.json({ alreadyUser: "Email is already registered!" })
        }
    })
}

export const updateUser = async (req, res) => {
    const { userName, userMobile, userId } = req.body
    User.findOneAndUpdate({
        _id: userId
    }, { name: userName, mobile: userMobile }).exec((error, result) => {
        if (result) res.json(result)
        if (error) console.log(error)
    })
}

export const getUserProfile = async (req, res) => {
    User.findOne({ _id: req.params.id }).exec((user, error) => {
        if (user) {
            res.json(user)
        } else {
            res.json(error)
        }
    })
}

export const findUser = async (req, res) => {
    const { email } = req.user
    User.findOne({ email: email }).exec((err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (user == null) {
                Doctor.findOne({ email: email }).exec((err, doctor) => {
                    if (err) return console.log(err);
                    res.json(doctor)
                })
            } else {
                res.json(user)
            }
        }
    })
}

export const getCurrentUser = async (req, res) => {

    User.findOne({ email: req.user.email }).exec((err, user) => {
        if (!user) {
            Doctor.findOne({ email: req.user.email }).exec((err, doctor) => {
                res.json(doctor)
            })
        } else {
            res.json(user)
        }
        if (err) {
            console.log("Get User:", err);
        }
    })
}

export const makeComplain = async (req, res) => {
    const { orderId, userId, productName, complain } = req.body
    try {
        const order = await Order.findById({ _id: orderId })
        console.log(order);
        if (order.length === 0) {
            res.json({ notFound: "OrderId doesn't exist!" })
        } else {
            new Complain({
                orderId: orderId,
                userId: userId,
                productName: productName,
                complain: complain
            }).save((err, complain) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(complain)
                }
            })
        }
    } catch (err) {
        console.log(err);
    }

}

export const listComplain = async (req, res) => {
    Complain.find({ userId: req.params.id }).exec((error, complain) => {
        if (complain) {
            res.json(complain)
        } else {
            console.log(error)
        }
    })
}

export const listOrder = async (req, res) => {
    await Order.find({ userId: req.params.id }).exec((error, order) => {
        if (order) {
            res.json(order)
        } else {
            console.log(error)
        }
    })
}