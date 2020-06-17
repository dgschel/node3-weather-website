const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGdzY2hlbCIsImEiOiJja2JoazFsejEwNjcxMnlvNTR5bG12MTZzIn0.1tusZ0B56_xRJoqtX_8GQw&limit=1&language=de';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Kann sich nicht mit Mapbox Service verbinden', undefined)
        } else if (body.features.length === 0) {
            callback('Position wurde nicht gefunden. Versuch es noch einmal', undefined)
        } else {
            const [long, lat] = body.features[0].center;
            const { place_name: location } = body.features[0];
            callback(undefined, {
                lat,
                long,
                location
            })
        }
    })
}

module.exports = geocode;