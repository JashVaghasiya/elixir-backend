import User from '../models/user.js'

export const getUsers = async (req, res, next) => {
    try {
        const user = await User.find({ role: 'user' })
        res.json(user)
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid User'
        })
    }
}

export const deactivateUser = async (req, res) => {

    const { id } = req.params

    try {
        const user = await User.findOneAndUpdate({ _id: id }, { activated: false })
        res.json(user)
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid User'
        })
    }
}

export const activateUser = async (req, res) => {

    const id = req.params.id
    console.log('id at controller-->', id)

    try {
        const user = await User.findOneAndUpdate({ _id: id }, { activated: true })
        res.json(user)
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid User'
        })
    }
}



export const getSellers = async (req, res) => {
    try {
        const seller = await User.find({ role: 'seller' })
        res.json(seller)
    }
    catch (error) {
        console.log(error)
        res.json(error)
    }
}

export const getOrders = async (req, res, next) => {

}

