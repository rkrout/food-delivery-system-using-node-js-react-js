
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import adminCategories from "./adminRoutes/categories.js"
import adminCustomers from "./adminRoutes/customers.js"
import adminDeliveryAgents from "./adminRoutes/deliveryAgents.js"
import adminFoods from "./adminRoutes/foods.js"
import adminindex from "./adminRoutes/index.js"
import adminOrders from "./adminRoutes/orders.js"
import adminSettings from "./adminRoutes/settings.js"
import adminSliders from "./adminRoutes/sliders.js"
import { authenticate, isAdmin, isAuthenticated } from "./middlewares/authentication.js"
import userAuth from "./userRoutes/auth.js"
import userCart from "./userRoutes/cart.js"
import userCategories from "./userRoutes/categories.js"
import userFoods from "./userRoutes/foods.js"
import userOrders from "./userRoutes/orders.js"
import userSliders from "./userRoutes/sliders.js"
import path from "path"

dotenv.config()

const app = express()

app.use(express.static("public"))
app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ limit: "1mb", extended: true }))
app.use(cors())
app.use(authenticate)

app.use("/api/admin/categories", adminCategories)
app.use("/api/admin/delivery-agents", adminDeliveryAgents)
app.use("/api/admin/sliders", adminSliders)
app.use("/api/admin/settings", adminSettings)
app.use("/api/admin/foods", adminFoods)
app.use("/api/admin/orders", adminOrders)
app.use("/api/admin/customers", adminCustomers)
app.use("/api/admin", adminindex)

app.use("/api/categories", userCategories)
app.use("/api/foods", userFoods)
app.use("/api/sliders", userSliders)
app.use("/api/orders", isAuthenticated, userOrders)
app.use("/api/cart", isAuthenticated, userCart)
app.use("/api/auth", userAuth)

app.get("/admin/*", (req, res) => {
    res.sendFile(path.resolve("public/admin/index.html"))
})

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("public/user/index.html"))
})

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
})