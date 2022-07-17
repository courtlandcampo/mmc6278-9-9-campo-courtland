const form = document.querySelector('form')
const input = document.querySelector('input')
const weather = document.querySelector('#weather')
//weather error message
const notFound = document.createElement("h2")
notFound.textContent = "Location not found"

form.onsubmit = async (e) => {
    e.preventDefault()
    const userInput = input.value
    
    await fetch(`https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=5e8fb7436a0e6f1c8b62aad1d8797764&q='${userInput}`)
    
    .then(function(j) {
        return j.json()
    })

    .then(function(r){
        weatherResult(r)
    })

    .catch(function(err){
        weather.appendChild(notFound)
    })

    input.value = ""
}

const weatherResult = (weatherObject) => {
    weather.innerHTML = ""

    const br = document.createElement('br')

    // CITY NAME
    const cityName = document.createElement('h2')
    cityName.textContent = `${weatherObject.name},${weatherObject.sys.country}`
    weather.appendChild(cityName)

    // MAP LINK
    const mapLink = document.createElement('a')
    const lat = weatherObject.coord.lat
    const long = weatherObject.coord.lon
    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`
    mapLink.target = "_blank"
    mapLink.textContent = "Click to View Map"
    weather.appendChild(mapLink)

    //IMAGE ICON 
    const img = document.createElement('img')
    img.src = `https://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`
    weather.appendChild(img)
    weather.appendChild(br)

    // DESCRIPTION 
    const description = document.createElement('p')
    description.textContent =  weatherObject.weather[0].description
    img.alt = description.textContent
    
    weather.appendChild(description)
    weather.appendChild(br)

    // CURRENT TEMP 
    const temperature = document.createElement('p')
    temperature.textContent = `Current: ${weatherObject.main.temp}\u00B0 F`
    weather.appendChild(temperature)

    // FEELS LIKE TEMP
    const feelsLike = document.createElement('p')
    feelsLike.textContent = `Feels Like: ${weatherObject.main.feels_like}\u00B0 F`
    weather.appendChild(feelsLike)
    weather.appendChild(br)

    // LAST UPDATED TIME
    const lastUpdated = document.createElement('p')
    const date = new Date(weatherObject.dt * 1000)
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })
    lastUpdated.textContent = `Last Updated: ${timeString}`
    weather.append(lastUpdated)
}