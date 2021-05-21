import Doctor from '../models/doctor.js'

export const createDoctor = async (req, res) => {
    const { email } = req.user
    const { name, degree, experience, specialization, mobileNo } = req.body
    console.log(req.body)
    console.log()
    const newUser = await new Doctor({
        email: email,
        name: name,
        degree: degree,
        experience: experience,
        specialization: specialization,
        mobile: mobileNo,
        role: 'doctor'
    }).save()
    res.json(newUser)
}

export const manageDoctors = async (req, res) => {
    const id = req.body.id
    const active = req.body.active
    try {
        if (active === true) {
            await Doctor.findOneAndUpdate({ _id: id }, { isActive: false }).then(result => {
                res.json(result)
            }).catch(err => {
                console.log(err);
            })
        } else {
            await Doctor.findOneAndUpdate({ _id: id }, { isActive: true }).then(result => {
                res.json(result)
            }).catch(err => {
                console.log(err);
            })
        }
    } catch (err) {
        console.log(err);
    }


}

export const getAdminDoctors = async (req, res) => {
    const sortName = req.query.sortName
    const type = Number(req.query.manner)
    await Doctor.find({}).sort({ [sortName]: type }).exec((err, result) => {
        if (err) return console.log(err)
        res.json(result)
    })
}

export const getDoctorProfile = async (req, res) => {
    const doctorId = req.params.id

    await Doctor.findOne({ _id: doctorId }).exec((err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })

}

export const updateDoctorProfile = async (req, res) => {
    const doctorId = req.params.id
    const { data } = await req.body
    Doctor.findOneAndUpdate({ _id: doctorId }, { name: data.doctorName, mobile: data.doctorMobile, degree: data.doctorDegree, specialization: data.doctorSpecialization, experience: data.doctorExperience }).exec((err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })

}

export const updateProfilePicture = async (req, res) => {
    const { url, id } = req.body
    console.log(url, id);
    Doctor.findOneAndUpdate({ _id: id }, { profileUrl: url }).exec((err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
}