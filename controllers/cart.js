import Cart from '../models/cart.js'

export const addToCart = async (req, res) => {
    const { productId, qty, userId } = req.body

    try {

        Cart.find({ productId, userId }).exec((err, result) => {
            if (result.length > 0) {
                res.json({ alreadyAdded: "Product was Already Added!" })
            } else {
                const cart = new Cart({ productId, qty, userId }).save()
                res.json(cart)
            }
        })
    } catch (error) {
        console.log('Error in adding product in cart at Controller', error);
    }

}

export const updateCart = async (req, res) => {
    const { cartId, qty } = req.body
    console.log(cartId)
    try {
        Cart.findOneAndUpdate({ _id: cartId }, { qty: qty }).exec((err, result) => {
            if (!err) {
                res.json(result)
            } else {
                console.log(err)
            }
        })
    } catch (error) {
        console.log('Error in updating product in cart at Controller', error);
    }

}

export const getCart = async (req, res) => {
    console.log(req.params.id)
    Cart.find({ userId: req.params.id })
        .populate("productId")
        .exec((err, result) => {
            if (!err) {
                res.json(result)
            } else {
                console.log(err)
            }
        });
}

export const removeFromCart = async (req, res) => {
    const productId = req.params.id
    console.log(req.params);
    try {
        const cart = await Cart.findOneAndDelete({ _id: productId })
        res.json(cart)
    }
    catch (error) {
        console.log('error while delete cart', error);
    }
}