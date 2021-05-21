import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import categoriesRoutes from './routes/categoryRoutes.js'
import subRoutes from './routes/subCategoryRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import productRoutes from './routes/productRoutes.js'
import sellerRoutes from './routes/sellerRoutes.js'
import stateRoutes from './routes/stateRoutes.js'
import cityRoutes from './routes/cityRoutes.js'
import couponRoutes from './routes/couponRoutes.js'
import packageRoutes from './routes/packageRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import adsRoutes from './routes/adsRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import cron from 'node-cron'
import { decrementAds } from './controllers/ads.js'
import { decrementSellerPackage } from './controllers/seller.js'

dotenv.config()
connectDB()
const app = express()

//middleware
app.use(cors())
app.use(bodyParser.json({ limit: '2mb' }))
app.use(morgan('dev'))


app.use('/api', userRoutes,
    doctorRoutes,
    productRoutes,
    adminRoutes,
    categoriesRoutes,
    subRoutes,
    sellerRoutes,
    stateRoutes,
    cityRoutes,
    couponRoutes,
    packageRoutes,
    orderRoutes,
    reviewRoutes,
    adsRoutes,
    paymentRoutes
)

const task = cron.schedule('00 00 * * * * ', async () => {
    await decrementAds()
    await decrementSellerPackage()
});

const PORT = process.env.PORT || 5000

app.listen(PORT, (req, res) => {
    task.start()
    console.log(`Server is running on PORT: ${PORT}`)
})
