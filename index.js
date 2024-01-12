import express from "express"
import cookieParser from "cookie-parser"
import path from "path"
import cors from "cors"
import bodyParser from "body-parser"
import router from "./routes/user.js"
import { config } from "dotenv"
import { mongosh } from "./mongodb/mongo.js"
import { errs } from "./middlewares/error.js"
config({
    path : "./Data/config.env"
})
mongosh()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(bodyParser.urlencoded({extended : false}))
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["get", "post","put", "delete"],
    credentials : true
}))

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const __dirname = process.cwd();

// Use __dirname as needed

// Use __dirname as needed


// app.use(express.static(path.join(__dirname, '../public')))
app.use(cookieParser())
app.use(router)
app.use(errs)

export default app