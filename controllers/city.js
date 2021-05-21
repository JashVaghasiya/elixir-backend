import City from '../models/city.js'

export const getCities = async (req, res) => {
    try {
        const cities = await City.find({}).exec()
        res.json(cities)
    } catch (error) {
        console.log('error while getting Sub', error);
    }
}

export const createCity = async (req, res) => {
    const { name, state } = req.body

    try {
        City.find({ slug: name.toLowerCase(), state }).exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result.length === 0) {
                    const city = new City({
                        state: state,
                        city: name,
                        slug: name.toLowerCase()
                    }).save()
                    res.json(city)
                } else {
                    res.json({
                        cityError: "City was already created!"
                    })
                }
            }
        })
    }
    catch (error) {
        console.log('error while creating City', error);
    }
}

export const deleteCity = async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        const city = await City.findOneAndDelete({ _id: id })
        res.json(city)
    }
    catch (error) {
        console.log('error while delete City', error);
    }
}

export const updateCity = async (req, res) => {
    const { name, state } = req.body

    try {
        City.find({ slug: name.toLowerCase() }).exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result.length === 0) {
                    City.findOneAndUpdate({ _id: req.params.id }, { state: state, city: name, slug: name.toLowerCase() }).exec((err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ city: result })
                        }
                    })
                } else {
                    res.json({
                        cityError: "City was already created!"
                    })
                }
            }
        })
    }
    catch (error) {
        console.log('error while update City', error);
    }
}

export const getCity = async (req, res) => {

    try {
        const city = await City.findById({ _id: req.params.id })
        res.json(city)
    }
    catch (error) {
        console.log('error while find City', error);
    }
}

export const getCitiesOfState = async (req, res) => {

    const name = req.params.id

    try {
        const cities = await City.find({}).populate('state')
        const city = cities.filter(c => c.state.name === name)
        res.json(city)
    }
    catch (error) {
        console.log('error while finding cities of state', error);
    }
}