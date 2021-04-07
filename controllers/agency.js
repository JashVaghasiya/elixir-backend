import Agency from '../models/agency.js'

export const getAgencies = async (req, res) => {

    const sortName = req.query.sortName
    const type = Number(req.query.manner)

    try {
        if (sortName !== null && type !== null) {


            Agency.find().sort({ [sortName]: type }).exec((err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json({ agency: result })
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export const createAgency = async (req, res) => {

    const agency = req.body.agency

    try {
        await new Agency({ role: "agency", ...agency }).save()
    } catch (err) {
        console.log(err)
    }
}

export const deleteAgency = async (req, res) => {

    const id = req.params.id

    try {
        Agency.findOneAndDelete({ _id: id }).exec((err, result) => {
            if (result) {
                console.log(result)
            } else {
                console.log(err)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

export const updateAgency = async (req, res) => {

    const id = req.params.id
    const agency = req.body.agency

    try {
        Agency.findOneAndUpdate({ _id: id }, { agency }).exec((err, result) => {
            if (result) {
                console.log(result)
            } else {
                console.log(err)
            }
        })
    } catch (err) {
        console.log(err)
    }
}
export const manageAgency = async (req, res) => {

    const id = req.params.id

    Agency.find({ _id: id }).exec((err, result) => {
        if (result) {
            if (result.active === true) {
                Agency.findOneAndUpdate({ active: false }).exec((err, result) => {
                    if (result) {
                        console.log(result)
                    } else {
                        console.log(err)
                    }
                })
            } else {
                Agency.findOneAndUpdate({ active: true }).exec((err, result) => {
                    if (result) {
                        console.log(result)
                    } else {
                        console.log(err)
                    }
                })
            }
        } else {
            console.log(err)
        }
    })
}

export const getAgency = async (req, res) => {

    const id = req.params.id

    try {
        await new Agency.find({ _id: id }).exec((err, result) => {
            if (result) {
                res.json(result)
            } else {
                console.log(err)
            }
        })
    } catch (err) {
        console.log(err)
    }
}
