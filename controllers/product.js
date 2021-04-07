import mongoose from 'mongoose'
import Product from '../models/product.js'

export const createProduct = async (req, res) => {

    const { product } = req.body
    console.log(product)
    try {
        await new Product(product).save()
        res.json("Product Added!")
    } catch (error) {
        console.log('error in Creating product at controller', error);
    }
}

export const updateProduct = async (req, res) => {

    const { product } = req.body
    const { seller, name, form, qty, description, type, images, brand, category, subs, price, stock } = product

    try {
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, {
            seller: seller,
            name: name,
            description: description,
            type: type,
            images: images,
            brand: brand,
            category: category,
            subs: subs,
            price: price,
            stock: stock,
            qty: qty,
            form: form,
            rejected: false
        }).exec()
        res.json(product)
    } catch (error) {
        console.log('Error in Updating product at Controller', error);
    }
}

export const deleteProduct = async (req, res) => {

    try {
        Product.findOneAndDelete({ _id: req.params.id }).exec((err, result) => {
            res.json(true)
        })
    } catch (error) {
        console.log('Error in Deleting product at Controller', error);
    }
}
export const getProduct = async (req, res) => {
    const id = req.params.id
    try {
        await Product.findById({ _id: id }).populate("user subs category").exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result)
            }
        })
    } catch (error) {
        console.log('Error in Fetching One product at Controller', error);
    }
}

export const getProducts = async (req, res) => {
    try {
        await Product.find().populate("user subs category").exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.json(result)
            }
        })

    } catch (error) {
        console.log('Error in Fetching products at Controller', error);
    }
}

export const getSellerProduct = async (req, res) => {

    const id = req.params.id

    try {
        await Product.find({ seller: id }).then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
        })
    } catch (error) {
        console.log('Error in Fetching Seller product at Controller', error);
    }
}

export const activateProduct = async (req, res) => {
    const id = req.params.id
    console.log("Activate Product", id)
    try {
        await Product.findOneAndUpdate({ _id: id }, { activated: true }).then(result => {
            res.json(result)
            console.log("Activation", result);
        }).catch(err => {
            console.log(err)
        })

    } catch (error) {
        console.log('Error in Active product at Controller', error);
    }
}

export const deactivateProduct = async (req, res) => {
    const id = req.params.id
    console.log("Deactivate Product", id)
    try {
        await Product.findOneAndUpdate({ _id: id }, { activated: false }).then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
        })
    } catch (error) {
        console.log('Error in deactivate product at Controller', error);
    }
}

export const approveProduct = async (req, res) => {

    const id = req.params.id

    try {

        Product.findOneAndUpdate({ _id: id }, { approved: true }).exec((err, result) => {

            if (err) {
                console.log(err)
            } else {
                res.json(result)
            }

        })

    } catch (error) {
        console.log('Error in Approve product at Controller');
    }
}

export const rejectProduct = async (req, res) => {
    const id = req.params.id

    try {
        Product.findOneAndUpdate({ _id: id }, { rejected: true }).exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.json(result)
            }
        })

    } catch (error) {
        console.log('Error in Reject product at Controller');
    }
}

export const getUnapprovedProduct = async (req, res) => {
    try {
        await Product.find({ approved: false }).then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
        })
        res.json(product)
    } catch (error) {
        console.log('Error in Approve product at Controller');
    }
}

export const getRejectedProducts = async (req, res) => {
    const id = req.params.id
    try {
        await Product.find({ _id: id, rejected: true }).then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
        })
        res.json(product)
    } catch (error) {
        console.log('Error in Approve product at Controller');
    }
}

export const getActiveProducts = async (req, res) => {
    const id = req.params.id
    try {
        await Product.find({ seller: id, activated: true }).then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
        })

    } catch (error) {
        console.log('Error in Getting Active product at Controller', error);
    }
}

export const getDeactivatedProducts = async (req, res) => {
    const id = req.params.id
    try {
        await Product.find({ seller: id, activated: false }).then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
        })
    } catch (error) {
        console.log('Error in Getting Deactivated product at Controller', error);
    }
}
