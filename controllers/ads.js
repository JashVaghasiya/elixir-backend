import Ads from '../models/advertisement.js'

export const getAds = async (req, res) => {
    const limit = Number(req.query.pageSize)
    const sortName = req.query.sortName
    const type = Number(req.query.manner)
    const pageNumber = Number(req.query.pageNumber)

    try {


        if (limit !== null && pageNumber !== 0 && sortName !== null && type !== null) {

            const count = await Ads.find({}).countDocuments()
            Ads.find().limit(limit).skip(limit * (pageNumber - 1)).sort({ [sortName]: type }).exec((err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json({ ads: result, pageNumber, pages: Math.ceil(count / limit) })
                }
            })
        }
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid User'
        })
    }
}