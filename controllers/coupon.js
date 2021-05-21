import Coupon from '../models/coupon.js'
import UsedCoupon from '../models/usedcoupon.js'

export const getCoupons = async (req, res) => {
    try {
        const coupon = await Coupon.find({}).exec()
        res.json(coupon)
    } catch (error) {
        console.log('error while getting coupon', error);
    }
}

export const getCoupon = async (req, res) => {
    const { name } = req.params
    try {
        Coupon.findOne({ name: name.toUpperCase() }).exec((err, result) => {
            if (err) return console.log(err)
            if (result !== null) {
                res.json(result)
            } else {
                res.json({ notFound: "Coupon code not found!" })
            }
        })
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


export const applyCoupon = async (req, res) => {

    const { couponId, userId } = req.body
    try {
        UsedCoupon.findOne({ couponId: couponId, userId: userId }).exec((err, result) => {
            if (err) return console.log(err)
            if (result == null) {
                const newUsedCoupon = new UsedCoupon({ couponId: couponId, userId: userId })
                newUsedCoupon.save()
            } else {
                res.json({ used: "Already used this coupon code!" })
            }
        })

    }
    catch (error) {
        console.log('error while creating coupon', error);
    }
}

