import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Category name is required",
        trim: true,
        minlength: [3, "Too short"],
        maxlength: [25, "Too long"]
    },
    slug: {
        type: String,
        unique: true
    }
}, { timestamps: true })

const Category = mongoose.model('category', categorySchema)

export default Category