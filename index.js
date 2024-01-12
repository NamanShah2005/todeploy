import express from "express"
import cookieParser from "cookie-parser"
import path from "path"
import cors from "cors"
import router from "./routes/user.js"
import { config } from "dotenv"
import { mongosh } from "./mongodb/mongo.js"
import { errs } from "./middlewares/error.js"
config({
    path : "./Data/config.env"
})
mongosh()
export const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["get", "post","put", "delete"],
    credentials : true
}))
app.use(express.static(path.join(path.resolve(), "public")))
app.use(cookieParser())
app.use(router)
app.use(errs)