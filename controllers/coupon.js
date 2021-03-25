import Coupon from '../models/coupon.js'

export const getCoupons = async (req, res) => {
    try {
        const coupon = await Coupon.find({}).exec()
        res.json(coupon)
    } catch (error) {
        console.log('error while getting coupon', error);
    }
}

export const getCoupon = async (req, res) => {
    const { id } = req.params
    try {
        const coupon = await Coupon.findOne({ _id: id }).exec()
        res.json(coupon)
    } catch (error) {
        console.log('error while getting coupon', error);
    }
}

export const createCoupon = async (req, res) => {
    const { name, discount, expiresAt } = req.body

    try {
        const coupon = await new Coupon({
            name: name.toUpperCase(),
            discount: discount,
            expiresAt: expiresAt
        }).save()
        res.json(coupon)
    }
    catch (error) {
        console.log('error while creating coupon', error);
    }
}

export const updateCoupon = async (req, res) => {
    const { name, discount, expiresAt } = req.body
    const { id } = req.params

    try {
        Coupon.findOneAndUpdate({
            _id: id
        }, { name: name.toUpperCase(), discount: discount, expiresAt: expiresAt }).exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ coupon: result })
            }
        })
    }
    catch (error) {
        console.log('error while updating coupon', error);
    }
}

export const deleteCoupon = async (req, res) => {
    const { id } = req.params
    console.log('id at controller--->', id)

    try {
        const coupon = await Coupon.findOneAndDelete({ _id: id })
        res.json(coupon)
    }
    catch (error) {
        console.log('error while creating coupon', error);
    }
}
