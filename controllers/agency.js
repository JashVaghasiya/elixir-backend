import User from '../models/user.js'

export const getAgencies = async (req, res) => {

    try {
        User.find({ role: "agency" }).exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.json({ agency: result })
            }
        })
    } catch (err) {
        console.log(err)
    }
}
