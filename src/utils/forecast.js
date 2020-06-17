const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cb1327b14e9ff3f202e87db2172c0908&query=' + lat + ',' + long

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Kann sich nicht mit den Wetter Service verbinden', undefined)
        } else if (body.error) {
            callback('Position konnte nicht gefunden werden', undefined)
        }
        else {
            const { temperature, feelslike } = body.current;
            callback(undefined, 'Es ist ' + temperature + ' grad. Es fühlt sich an wie ' + feelslike + ' grad.')
        }
    })
}

module.exports = forecast;