import Ads from '../models/advertisement.js'
import Package from '../models/package.js'
import Product from '../models/product.js'
import AdsIncome from '../models/adsIncome.js'

export const getAds = async (req, res) => {
    const limit = Number(req.query.pageSize)
    const sortName = req.query.sortName
    const type = Number(req.query.manner)
    const pageNumber = Number(req.query.pageNumber)

    try {


        if (limit !== null && pageNumber !== 0 && sortName !== null && type !== null) {

            const count = await Ads.find({}).countDocuments()
            Ads.find({}).limit(limit).skip(limit * (pageNumber - 1)).sort({ [sortName]: type }).populate('seller productId').exec((err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json({ ads: result, pageNumber, pages: Math.ceil(count / limit) })
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


export const createAd = async (req, res) => {
    const { productId, sellerId, days, amountPaid } = req.body
    try {

        Ads.find({ productId, seller: sellerId }).exec((err, result) => {

            new Ads({
                productId: productId,
                seller: sellerId,
                paidAt: new Date(),
                expireAfter: days,
                amountPaid: amountPaid
            }).save((err, ad) => {
                if (err) return console.log(err);
                new AdsIncome({
                    productId: productId,
                    seller: sellerId,
                    paidAt: new Date(),
                    expireAfter: days,
                    amountPaid: amountPaid
                }).save()
                res.json(ad)
            })
        })

    }
    catch (error) {
        console.log('error while creating ad', error);
    }
}

export const checkForAds = async (req, res) => {
    const { productId, sellerId } = req.body
    console.log(productId, sellerId)
    try {

        Ads.find({ productId: productId, seller: sellerId }).exec((err, result) => {
            if (result.length === 0) {
                res.json({ notFound: "advertisement not found" })
            }
            if (result.length > 0) {
                res.json({ alreadyApplied: "Product is already in Queue of Ads!" })

            }
        })
    }
    catch (error) {
        console.log('error while creating ad', error);
    }
}


export const getSellerAds = async (req, res) => {
    const limit = Number(req.query.pageSize)
    const sortName = req.query.sortName
    const type = Number(req.query.manner)
    const pageNumber = Number(req.query.pageNumber)
    const id = req.params.id
    try {


        if (limit !== null && pageNumber !== 0 && sortName !== null && type !== null) {

            const count = await Ads.find({}).countDocuments()
            Ads.find({ seller: id }).limit(limit).skip(limit * (pageNumber - 1)).sort({ [sortName]: type }).populate('productId').exec((err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json({ ads: result, pageNumber, pages: Math.ceil(count / limit) })
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


export const updateAdRate = async (req, res) => {

    const { rate } = req.body

    Package.find({}).exec((err, result) => {
        if (err) return console.log(err)
        console.log("rate:", rate);
        result.forEach(p => {
            Package.findByIdAndUpdate({ _id: p._id }, { adsRate: rate }).exec((err, result) => {
                if (err) return console.log(err)
                console.log("After Change:", result)
            })
        })
    })
}

export const getSingleProduct = async (req, res) => {

    const id = req.params.id

    Product.findOne({ _id: id }).exec((err, product) => {
        if (err) return console.log(err)
        if (product) res.json(product)
    })
}


export const decrementAds = async () => {
    await Ads.find({}).exec((err, result) => {
        if (err) return console.log(err)
        if (result) {
            result.forEach(a => {

                Ads.findOneAndUpdate({ _id: a._id }, { expireAfter: a.expireAfter - 1 }).exec((err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        if (result.expireAfter === 1) {
                            Ads.findOneAndDelete({ _id: result._id }).exec((err, result) => {
                                if (err) return console.log(err)
                            })
                        }
                    }
                })
            })
        }
    })
}

export const getAdsProducts = async (req, res) => {
    try {
        Ads.find().populate('productId').exec((err, result) => {
            if (err) return console.log(err);
            res.json(result)
        })
    } catch (err) {
        console.log(err);
    }
}