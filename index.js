const express = require('express')

require('dotenv').config()
const path = require('./src/routes/route')

const exp = express()
const cors = require('cors')
const bodyParser = require('body-parser');

// exp.use(bodyParser.json({ type: '*' }))
exp.use(bodyParser.urlencoded({ extended: true }));

const port = 4000

exp.use(express.json())
exp.use(cors())

// Add endpoint grouping and routing
exp.use('/way-link', path)
exp.use('/uplouds', express.static('uplouds'))

exp.listen(port , () => console.log(`Server Running on port ${port}`))