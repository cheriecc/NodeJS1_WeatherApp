const request = require('request')

const weatherApi = process.env.weatherApi

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + weatherApi + '&query=' + address

    request({url: url, json: true}, (error, request) => {
        if (error) {
            callback('Unable to generate data, please check again', undefined)
        } else if (request.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                tem: request.body.current.temperature,
                hum: request.body.current.humidity
            })
        }
    })

}

module.exports = {
    forecast: forecast
}