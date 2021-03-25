import State from '../models/state.js'

export const getStates = async (req, res) => {
    try {
        const states = await State.find({}).exec()
        res.json(states)
    } catch (error) {
        console.log('error while getting States', error);
    }
}

export const createState = async (req, res) => {
    const { name } = req.body


    try {
        State.find({ slug: name.toLowerCase() }).exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result.length === 0) {
                    const state = new State({
                        name: name,
                        slug: name.toLowerCase()
                    }).save()
                    res.json(state)
                } else {
                    res.json({
                        stateError: "State was already created!"
                    })
                }
            }
        })
    }
    catch (error) {
        console.log('Error while Creating State!', error);
    }
}

export const deleteState = async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        const state = await State.findOneAndDelete({ _id: id })
        res.json(state)
    }
    catch (error) {
        console.log('Error while delete State!', error);
    }
}

export const updateState = async (req, res) => {
    const { name } = req.body
    try {
        State.find({ slug: name.toLowerCase() }).exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result.length === 0) {
                    const state = State.findOneAndUpdate({ _id: req.params.id }, { name: name, slug: name.toLowerCase() }).exec((err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json(state)
                        }
                    })

                } else {
                    res.json({
                        stateError: "State was already created!"
                    })
                }
            }
        })
    } catch (error) {
        console.log('Error while updating State!', error)
    }

}

export const getState = async (req, res) => {

    try {
        const state = await State.findById({ _id: req.params.id })
        res.json(state)
    }
    catch (error) {
        console.log('Error while find State!', error);
    }
}
