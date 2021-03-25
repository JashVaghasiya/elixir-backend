import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRoutes.js'
import categoriesRoutes from './routes/categoryRoutes.js'
import subRoutes from './routes/subCategoryRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import productRoutes from './routes/productRoutes.js'
import sellerRoutes from './routes/sellerRoutes.js'
import stateRoutes from './routes/stateRoutes.js'
import cityRoutes from './routes/cityRoutes.js'
import couponRoutes from './routes/couponRoutes.js'
import packageRoutes from './routes/packageRoutes.js'

dotenv.config()
connectDB()

const app = express()

//middleware
app.use(cors())
app.use(bodyParser.json({ limit: '2mb' }))
app.use(morgan('dev'))

app.use('/api', userRoutes,
    productRoutes,
    adminRoutes,
    categoriesRoutes,
    subRoutes,
    sellerRoutes,
    stateRoutes,
    cityRoutes,
    couponRoutes,
    packageRoutes
)


const PORT = process.env.PORT || 8000

app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT: ${PORT}`)
})
