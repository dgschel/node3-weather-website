const path = require('path')
const express = require('express')
const hbs = require('hbs')

// custom functions 
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and Views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static dir to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'David'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'David'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Some help text how to use that page',
        name: 'David'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(lat, long, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        text: 'Help specific page could not be found',
        name: 'David'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        text: 'Page could not be found on the server',
        name: 'David'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})