import Sub from '../models/sub.js'

export const getSubs = async (req, res) => {
    try {
        const sub = await Sub.find({}).exec()
        res.json(sub)
    } catch (error) {
        console.log('error while getting Sub', error);
    }
}

export const createSub = async (req, res) => {
    const { name, category } = req.body

    console.log(name, category)

    try {

        Sub.find({ slug: name.toLowerCase(), category: category }).exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result.length === 0) {
                    const sub = new Sub({
                        category: category,
                        name: name,
                        slug: name.toLowerCase()
                    }).save()
                    res.json(sub)
                } else {
                    res.json({
                        subError: "Sub-Category was already created!"
                    })
                }
            }
        })
    } catch (error) {
        console.log('error while creating Sub', error);
    }
}

export const deleteSub = async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        const sub = await Sub.findOneAndDelete({ _id: id })
        res.json(sub)
    }
    catch (error) {
        console.log('error while delete Sub', error);
    }
}

export const updateSub = async (req, res) => {
    const { name, category } = req.body

    try {
        Sub.find({ slug: name.toLowerCase() }).exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result.length === 0) {
                    Sub.findOneAndUpdate({ _id: req.params.id }, { category: category, name: name, slug: name.toLowerCase() }).exec((err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.json({ sub: result })
                        }
                    })

                } else {
                    res.json({
                        subError: "Sub-Category was already created!"
                    })
                }
            }
        })
    }
    catch (error) {
        console.log('error while update Sub', error);
    }
}

export const getSub = async (req, res) => {

    try {
        const sub = await Sub.findById({ _id: req.params.id })
        res.json(sub)
    }
    catch (error) {
        console.log('error while find sub', error);
    }
}

export const getSubsOfCategory = async (req, res) => {

    try {
        const subs = await Sub.find({ category: req.params.id })
        res.json(subs)
    }
    catch (error) {
        console.log('error while find subs of Category', error);
    }
}