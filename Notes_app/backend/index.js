const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const noteRoutes = require('./routes/noteRoutes')


const app = express()
const port = 5000
const dbURL = 'mongodb://127.0.0.1:27017/noteApp'
const cors = require('cors');

app.use(cors())
// Connect to MongoDB 
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err)
    })

// Middleware
app.use(bodyParser.json())

// Routes
app.use('/', noteRoutes)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})