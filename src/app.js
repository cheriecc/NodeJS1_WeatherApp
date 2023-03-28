const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Cherie'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You need to provide a location'
        })
    }

    forecast.forecast(req.query.location, (error, {tem, hum} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        res.send({
            tem: tem,
            hum: hum,
            location: req.query.location
        })
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: req.query.location,
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide some search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Cherie'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'FAQ',
        helpText: 'There are some useful information'
    })
})

// app.get('/json', (req, res) => {
//     res.send([{
//         name: 'Cherie',
//         email: 'chane.c.sun@gmail.com'
//     },{
//         name: 'James',
//         email: 'xxx@gmail.com'
//     }])
// })

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Oops something went wrong',
        name: 'Cherie',
        errorMsg: 'Help artical not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Oops something went wrong',
        name: 'Cherie',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})