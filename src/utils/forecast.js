const request = require('request')

const forecast = (longitude, latitude,  callback) => {
    const url ='http://api.weatherstack.com/current?access_key=72f4fde344d4535a582c70569858b7f9&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'
    
    request( {url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weaether services.', undefined)
        } else if (body.error) {
            callback('Invalid Coordinator!', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degree out.  It feels like ' + body.current.feelslike + ' degree. The humidity is ' + body.current.humidity)
        }

    })

}

module.exports = forecast