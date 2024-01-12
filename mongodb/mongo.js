import mongoose from "mongoose"
export const mongosh = () => {
    mongoose.connect(process.env.MONGODB, { dbName: "mytodolists" }).then((c) => {
        console.log(`database connected with ${c.connection.host}`)
    }).catch((e) => {
        console.log("didn't connected")
    })
}