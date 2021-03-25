import mongoose from 'mongoose'
import Package from '../models/package.js'

export const createPack = async (req, res) => {

    const { pack } = req.body
    try {
        await new Package(pack).save()
        res.json("Package Created!")
    } catch (error) {
        console.log('error in Creating Package at controller', error);
    }
}

export const updatePack = async (req, res) => {
    const { pack } = req.body

    try {
        const updatePack = await Package.findOneAndUpdate({ _id: req.params.id }, {
            previousPrice: pack.previousPrice,
            duration: pack.duration,
            price: pack.price,
            products: pack.products,
            ads: pack.ads,
            name: pack.name
        }).exec()
        res.json(updatePack)
    } catch (error) {
        console.log('Error in Updating Package at Controller', error);
    }
}

export const deletePack = async (req, res) => {

    try {
        await Package.findOneAndDelete({ _id: req.params.id }).exec((err, result) => {
            res.json({ success: true })
        })
    } catch (error) {
        console.log('Error in Deleting Package at Controller', error);
    }
}

export const getPack = async (req, res) => {
    const id = req.params.id
    try {
        await Package.findById({ _id: id }).exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result)
                console.log(result)
            }
        })
    } catch (error) {
        console.log('Error in Fetching One Package at Controller', error);
    }
}

export const getPacks = async (req, res) => {

    try {
        await Package.find({}).exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result)
                console.log(result)
            }
        })
    } catch (error) {
        console.log('Error in Fetching One Package at Controller', error);
    }
}