import admin from '../config/firebase.js'
import User from '../models/user.js'

export const authCheck = async (req, res, next) => {
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
        req.user = firebaseUser
        next()
    }
    catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid User'
        })
    }
}

export const adminCheck = async (req, res, next) => {
    try {
        const { email } = req.user
        const user = await User.findOne({ email: email })

        if (user.role === 'admin') {

            next()
        } else {
            res.status(403).json({
                err: 'Admin resources.  Access denied!'
            })
        }

    } catch (err) {
        console.error(err);
    }
}


export const agencyCheck = async (req, res, next) => {
    try {
        const { email } = req.user
        const user = await User.findOne({ email: email })

        if (user.role === 'agency') {
            next()
        } else {
            res.status(403).json({
                err: 'Agency resources. Access denied!'
            })
        }

    } catch (err) {
        console.error(err);
    }
}




export const sellerCheck = async (req, res, next) => {
    try {
        const { email } = req.user
        const user = await User.findOne({ email: email })

        if (user.role === 'seller') {

            next()
        } else {
            res.status(403).json({
                err: 'Seller resources.  Access denied!'
            })
        }

    } catch (err) {
        console.error(err);
    }
}