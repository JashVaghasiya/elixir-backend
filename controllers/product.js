import mongoose from 'mongoose'
import Product from '../models/product.js'
import Review from '../models/review.js'
import User from '../models/user.js'

export const createProduct = async (req, res) => {

    const { product } = req.body
    try {
        await new Product(product).save()
        const user = await User.findOne({ _id: product.seller })
        await User.findOneAndUpdate({ _id: product.seller }, { remainingProducts: user.remainingProducts - 1, totalProducts: user.totalProducts + 1 })
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
        Product.findOneAndDelete({ _id: req.params.id }).exec(async (err, result) => {
            res.json(true)
            const user = await User.findOne({ _id: result.seller })
            await User.findOneAndUpdate({ _id: user._id }, { remainingProducts: user.remainingProducts + 1, totalProducts: user.totalProducts - 1 })
        })
    } catch (error) {
        console.log('Error in Deleting product at Controller', error);
    }
}

export const getProduct = async (req, res) => {
    const id = req.params.id
    try {
        await Product.findById({ _id: id }).populate("seller subs category").exec((err, result) => {
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

export const getReview = async (req, res) => {
    const id = req.params.id
    try {
        await Review.find({ productId: id }).populate("user").exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result)
            }
        })
    } catch (error) {
        console.log('Error in Fetching Review at Controller', error);
    }
}

export const getProducts = async (req, res) => {

    try {
        await Product.find({}).populate("user subs category").exec((err, result) => {
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

//unapproved products
export const getUnapprovedProduct = async (req, res) => {
    try {
        await Product.find({ approved: false, rejected: false }).populate("seller").then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
        })
    } catch (error) {
        console.log('Error in Approve product at Controller', error);
    }
}

//get rejected products
export const getRejectedProducts = async (req, res) => {
    const id = req.params.id
    try {
        await Product.find({ seller: id, rejected: true }).then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
        })
        res.json(product)
    } catch (error) {
        console.log('Error in Approve product at Controller');
    }
}

//for seller
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

// for seller
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


//homepage controllers

export const getHomeProducts = async (req, res) => {
    const limit = 10
    const pageNumber = Number(req.query.pageNumber)
    const count = await Product.find({ approved: true, activated: true }).count()
    Product.find({ approved: true, activated: true }).limit(limit).skip(limit * (pageNumber - 1)).populate("user subs category").exec((err, result) => {
        if (err) return console.log(err);
        res.json({ result: result, pages: Math.ceil(count / limit), pageNumber })
    })
}

export const getSearchedProducts = async (req, res) => {
    const keyword = new RegExp(req.body.text, 'ig')
    try {
        Product.find({ name: keyword, approved: true, activated: true }).populate("user subs category").exec((err, result) => {
            if (err) return console.log(err);
            res.json(result)
        })
    } catch (error) {
        console.log('Error in Fetching Review at Controller', error);
    }
}

export const getFilteredProducts = async (req, res) => {

    const { priceRange, selectedCat, rating, form, type } = req.body.filters;
    console.log(priceRange[0], priceRange[1], selectedCat, rating, form, type);
    try {
        if (selectedCat.length > 0) {
            Product.find({ approved: true, activated: true, type: type, price: { $gte: priceRange[0], $lt: priceRange[1] }, form: form, rating: { $gte: rating }, category: { $in: selectedCat } }).populate("user subs category").exec((err, result) => {
                if (err) return console.log(err);
                res.json(result)
            })
        } else {
            Product.find({ approved: true, activated: true, type: type, price: { $gte: priceRange[0], $lt: priceRange[1] }, form: form, rating: { $gte: rating } }).populate("user subs category").exec((err, result) => {
                if (err) return console.log(err);
                console.log(result);
                res.json(result)
            })
        }
    } catch (error) {
        console.log('Error in Fetching Review at Controller', error);
    }

}


export const getTopRated = async (req, res) => {
    try {
        Product.find({ approved: true, activated: true }).sort({ rating: -1 }).limit(10).exec((err, result) => {
            if (err) return console.log(err)
            res.json(result)
        })
    } catch (err) {
        console.log(err)
    }
}

export const getTopGrossing = async (req, res) => {
    try {
        Product.find({ approved: true, activated: true }).sort({ sold: -1 }).limit(10).exec((err, result) => {
            if (err) return console.log(err)
            res.json(result)
        })
    } catch (err) {
        console.log(err);
    }
}

export const getCategoryViseProduct = async (req, res) => {
    try {
        Product.find({ category: req.params.category }).sort({ sold: -1 }).exec((err, result) => {
            if (err) return console.log(err)
            res.json(result)
        })
    } catch (err) {
        console.log(err);
    }
}

export const getSubCategoryViseProduct = async (req, res) => {
    try {
        Product.find({ subs: { $in: [req.params.subcategory] } }).sort({ sold: -1 }).exec((err, result) => {
            if (err) return console.log(err)
            res.json(result)
        })
    } catch (err) {
        console.log(err);
    }
}

