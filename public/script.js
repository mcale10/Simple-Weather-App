const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const lat = place.geometry.location.lat()
    const lon = place.geometry.location.lng()
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            lat: lat,
            lon: lon
        })
    }).then(res => res.json()).then(data => {

        setWeatherData(data, place.formatted_address)
    })
})

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const humidityElement = document.querySelector('[data-humidity]')
const windElement = document.querySelector('[data-wind]')

function setWeatherData(data, place) {
    locationElement.textContent = place
    statusElement.textContent = data.weather[0].description
    temperatureElement.textContent = Math.floor(data.main.temp)
    humidityElement.textContent = data.main.humidity
    windElement.textContent = data.wind.speed
    const iconcode = data.weather[0].icon
    const iconURL = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png"
    $('#wicon').attr('src', iconURL);
    document.body.style.backgroundImage = "url('https://source.unsplash.com/random/2800x1400/?" + place + "')";
}