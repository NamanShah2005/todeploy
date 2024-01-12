import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { data } from "../mongodb/mongoschema.js"
import { errorHandler } from "../middlewares/error.js"
import path from "path"
const __dirname = process.cwd();


export const front = (req, res) => {
    try {
        res.json({
            success : true,
            message : "created successfully"
        })
        // res.sendFile(path.join(__dirname, 'public', 'index.html'))
    } catch (error) {
        next(error)
    }
}
export const register = async (req, res, next) => {
    try {
        let { Name, Email, Password } = req.body
        console.log(Name)
        const check = await data.findOne({ Email })
        if (check) {
            return next(new errorHandler("User already exist", 404, false))
        }
        const hashedPassword = await bcrypt.hash(Password, 10)
        let user = await data.create({
            Name,
            Email,
            Password: hashedPassword
        })
        res.json({
            success: true,
            message: "yeh! i did it",
            user
        })
    } catch (error) {
        next(error)
    }
}
export const login = async (req, res, next) => {
    try {
        let { Name, Email, Password } = req.body
        const check1 = await data.findOne({ Name, Email })
        if (!check1) {
            return next(new errorHandler("didn't found the data", 404, false))
        }
        const check2 = await bcrypt.compare(Password, check1.Password)
        if (!check2) {
            return next(new errorHandler("Invalid Password", 500, false))
        }
        const token = jwt.sign({ _id: check1.id }, "private")
        res.status(200).cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 10 * 60 * 1000),
            sameSite: process.env.NODE_ENV==="development" ? "lax" : "none",
            secure: process.env.NODE_ENV==="development" ? false : true
        }).json({
            success: true,
            message: "logged in successfully"
        })
        // res.sendFile(path.join(__dirname, '../public', 'index.html'))
    } catch (error) {
        next(error)
    }
}
// export const login1 = (req,res) => {
    
// }
export const logout = (req, res) => {
    try {
        res.status(200).cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV==="development" ? "lax" : "none",
            secure: process.env.NODE_ENV==="development" ? false : true
        }).json({
            success: true,
            message: "logged out successfully"
        })
    } catch (error) {
        next(error)
    }
}