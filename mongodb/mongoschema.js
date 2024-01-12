import mongoose from "mongoose"
const schema = mongoose.Schema({
    Name: String,
    Password: String,
    Email: String
})
export const data = mongoose.model("data" , schema)