const path = require('path') 
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(path.join(__dirname, '../public/About.html'))

const app = express()
const port = process.env.PORT || 3000   //For Heroku, 3000 is for local computer


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


// Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andy Li'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andy Li' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a long message for the help page.',
        title: 'Help', 
        name: 'Andy Li'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        errorMessage: 'Help article not found.',
        title: 404,
        name: 'Andy Li'
    })
    
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send( {
            error: 'address must be provided'
        })
    }

    // res.send({
    //     forcast: 'It is sunny and calm',
    //     location: req.query.address
    // })



    geocode(req.query.address, (error, {longitude, latitude, location} ={})=> {
        if (error) {
            return res.send({error})
        }

    forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
            return res.send({error})
        }

        res.send({
            longitude,
            latitude,
            location,
            forecastData
        })
            // console.log(location)
            // console.log(forceastData)
        })
    })

})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    // console.log(req.query)
    res.send(req.query)
    // res.send({
    //     product: []
    // })
})

app.get('*', (req, res) => {
    res.render('error404', {
        errorMessage: 'Page not found.',
        title: 404,
        name: 'Andy Li'    
    })

})

// app.get('/help', (req, res) => {
//     const publicDirectoryPath = path.join(__dirname, '../public')

//     app.use(express.static(publicDirectoryPath))
// })



// app.get('/about', (req, res) => {
//     res.send([ {
//         name: 'Andy'
//     }, {

//         name: 'Zheng'
//     }

//     ])
// })



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})  //Port
