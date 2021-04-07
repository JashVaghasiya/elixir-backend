import User from '../models/user.js'

export const createUser = async (req, res) => {
    const { email } = req.user
    const newUser = await new User({
        email: email,
        name: email.split('@')[0],
    }).save()
    res.json(newUser)
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

