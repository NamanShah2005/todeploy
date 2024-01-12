import express from "express"
import { isAuthen } from "../middlewares/isAuthen.js"
import { front, login, logout, register } from "../controller/user.js"
const router = express.Router()
router.get("/" ,isAuthen, front)
router.post("/register", register)
router.post("/login",login)
router.post("/logout", logout)
export default router