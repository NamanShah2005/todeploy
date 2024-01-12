import app from "./index.js"
// const app = express()
app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`The server is working on the port http://${process.env.HOSTNAME}:${process.env.PORT}/ in ${process.env.NODE_ENV} mode`)
})