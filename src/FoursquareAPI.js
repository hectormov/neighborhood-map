const cId = '51GEJ0D5D0U0KYS2VUMLCEPUWNMWMJRJTK0YJR3QMJ3Z5FHM';
const cSecret = 'DHUZ1BYUQIDI2IVRT42VAFME43X0IHDAX5BAGWLLO0D3CD2Z';
const v = '20180407'

export const getVenueDetails = (venue) => 
    fetch(`https://api.foursquare.com/v2/venues/${venue}?client_id=${cId}&client_secret=${cSecret}&v=${v}`, {
        headers: {}
    })
    .then(response => response.json())
    .then(r => r)
   

export const getVenueLists = (venue) =>
    fetch(`https://api.foursquare.com/v2/venues/${venue}/listed?client_id=${cId}&client_secret=${cSecret}&v=${v}`, {
        headers: {}
    })
    .then(response => response.json())
    .then(r => r)

    