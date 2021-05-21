import Category from '../models/category.js'
import Product from '../models/product.js'

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).exec()
        res.json(categories)
    } catch (error) {
        console.log('error while getting categories', error);
    }
}

export const createCategory = async (req, res) => {
    const { name } = req.body

    try {
        Category.find({ slug: name.toLowerCase() }).exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result.length === 0) {
                    const category = new Category({
                        name: name,
                        slug: name.toLowerCase()
                    }).save()
                    res.json(category)
                } else {
                    res.json({
                        categoryError: "Category was already created!"
                    })
                }
            }
        })
    }
    catch (error) {
        console.log('error while creating category', error);
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params
    try {
        const category = await Category.findOneAndDelete({ _id: id })
        res.json(category)

        Product.find({ category: id }).exec((err, product) => {
            if (product)
                product && product.length > 0 && product.map(p => {
                    Product.findOneAndUpdate({ category: id }, { category: '6098c98eb1b0e85fcc4c7287', subs: '6098cc714795494a88ee79f1' }).exec((error, result) => {
                        console.log(result)
                    })
                })
        })

    }
    catch (error) {
        console.log('error while delete category', error);
    }
}

export const updateCategory = async (req, res) => {
    const { name } = req.body

    try {
        Category.find({ slug: name.toLowerCase() }).exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result.length === 0) {
                    const category = Category.findOneAndUpdate({ _id: req.params.id }, {
                        name: name,
                        slug: name.toLowerCase()
                    }).exec((err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json(category)
                        }
                    })

                } else {
                    res.json({
                        categoryError: "Category was already created!"
                    })
                }
            }
        })
    }
    catch (error) {
        console.log('error while update category', error);
    }
}

export const getCategory = async (req, res) => {

    try {
        const category = await Category.findById({ _id: req.params.id })
        res.json(category)
    }
    catch (error) {
        console.log('error while find category', error);
    }
}
