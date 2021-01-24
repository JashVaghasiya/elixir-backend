import mongoose from 'mongoose'

const db = async () => await mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(console.log("DB is connected"))
    .catch(err => console.log("DB connection error!", err))

export default db