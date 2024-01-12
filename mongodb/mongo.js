import mongoose from "mongoose"
export const mongosh = () => {
    mongoose.connect(process.env.MONGODB, { dbName: "mytodolists" }).then(() => {
        console.log("database connected")
    }).catch((e) => {
        console.log("didn't connected")
    })
}