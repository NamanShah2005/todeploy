import jwt from "jsonwebtoken"
import { data } from "../mongodb/mongoschema.js"
export const isAuthen = async(req,res,next) => {
    let token1 = req.cookies.token
    if(token1){
       let decoded = jwt.verify(token1, "private")
       req.user = await data.findById(decoded)
       next()
    }
    else{
        res.redirect("/login")
    }
}