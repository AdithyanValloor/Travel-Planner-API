const express = require('express')
const mongoose = require('mongoose')
const planRoute = require('./Routes/planRoute')
const path = require('path')
const PORT = 8000

const app = express()
app.use(express.json())

async function main() {
    try {
        await mongoose.connect('mongodb+srv://vallooradithyan:Cd5cy7I3TiTMsvES@cluster0.4ymmj.mongodb.net/TravelPlanner')
        console.log('Database Connected')
    } catch (error) {
        console.log(error)
    }
}
main()

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname + '/index.html'))
})

app.use('/plan', planRoute)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
