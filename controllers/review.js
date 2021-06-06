import Review from '../models/review.js'
import OrderDetails from '../models/orderDetail.js'
import Product from '../models/product.js'

export const createReview = async (req, res) => {
    const { user, rating, productId, comment } = req.body

    await OrderDetails.findOne({ userId: user, productId: productId }).exec((err, order) => {
        if (order === null) {
            res.json({ notPurchased: "You have to first purchase it for writing review!" })
        } else {
            Review.findOne({ user, productId }).exec((err, review) => {
                if (review === null) {
                    const review = new Review({ user, rating, productId, comment })
                    review.save((err, review) => {
                        if (err) return console.log(err)
                        Review.find({ productId: productId }).exec((err, result) => {

                            if (err) return console.log(err)
                            const totalReviews = result.length
                            const avgRating = result.reduce((acc, item) => item.rating + acc, 0) / totalReviews
                            Product.findByIdAndUpdate({ _id: productId }, { rating: avgRating, numReviews: totalReviews }).exec((err, result) => {
                                if (err) return console.log("Error in Product Update", err);
                            })
                        })
                    })
                    res.json({ success: "Added Review!" })
                } else {
                    res.json({ alreadyReviewed: "You have Already Reviewed!" })
                }
            })
        }
    })
}