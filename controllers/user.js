import User from '../models/user.js'
import Cart from '../models/cart.js'

export const createUser = async (req, res) => {
    const { email } = req.user
    if (req.packageData) {
        const { packageData } = req.body
        const newUser = await new User({
            email: email,
            name: email.split('@')[0],
            role: packageData.role,
            remainingDays: packageData.remainingDays,
            remainingProducts: packageData.remainingProducts,
            package: packageData.package
        }).save()
        res.json(newUser)
    } else {
        const newUser = await new User({
            email: email,
            name: email.split('@')[0],
        }).save()
        res.json(newUser)
    }
}


export const findUser = async (req, res) => {
    const { email } = req.user
    User.find({ email: email }).exec((err, result) => {
        if (err) {
            res.json({ loginError: err })
        } else {
            res.json({ user: result })
        }
    })
    // if (user) {
    //     res.json(user)
    // }
}

export const getCurrentUser = async (req, res) => {
    await User.findOne({ email: req.user.email }).exec((err, user) => {
        res.json(user)
        if (err) {
            console.log("Get User:", err);
        }
    })
}

export const addToCart = async (req, res) => {
    const { productId, qty, userId } = req.body

    try {
        await new Cart({ productId, qty, userId }).save()
        res.json('product added to cart')
        console.log("Product Added To User Cart!");
    } catch (error) {
        console.log('Error in adding product in cart at Controller', error);
    }

}

export const addToWishlist = async (req, res) => {

    const { id, productId } = req.body

    try {
        User.findOneAndUpdate({ _id: id }, {
            $addToSet: { wishlist: productId }
        }).exec()
    } catch (error) {
        console.log('Error in adding product in wishlist at Controller', error);
    }
}

export const getWishlist = async (req, res) => {
    const list = await User.findOne({ email: req.user.email })
        .populate("wishlist")
        .exec();
    res.json(list);
}

export const getCart = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.id })
        .populate("productId")
        .exec();

    res.json(cart);
}
