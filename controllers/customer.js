import Product from '../models/product.js'


export const getProducts = async (req, res) => {
    console.log('calling controller');
    try {
        const product = await Product.find({}).exec()
        res.json(product)
        console.log(product);
    } catch (error) {
        console.log('Error in Fetching product at Controller');
    }
}
