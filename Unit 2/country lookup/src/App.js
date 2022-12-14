import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
console.log("Api_key is now: ", api_key)

const LanguagesEnumerated = ( { languages } ) => {
  let keys = Object.keys(languages)
  console.log("Languages is:", {languages})
  let showLanguages = keys.map((itr, index) => {
    console.log("key is: ", keys[index]) 
    let thisKey = keys[index]
    return (<li key={thisKey}> {languages[thisKey]} </li>)})
  return(
    <div>
  <p>
    <b> languages </b>
  </p>
  <ul>
    {showLanguages}
  </ul>
  </div>
  )
}

const WeatherDisplay = ( { city, setWeatherInfo, weatherInfo } ) => {
  console.log("weather info is: ", weatherInfo)
  useEffect( () => {
    let geoDataURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`
    axios.get(geoDataURL)      
      .then(response => {
        console.log("geoData request returned : ", response)
        return response.data[0]
      }).then(response => {
        console.log("Response was : ", response)
        let latitude = response.lat
        let longitude = response.lon
        let weatherDataURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`
        axios.get(weatherDataURL)      
          .then(response => {
            let weatherData = response.data
            console.log("Weather data is: ", weatherData)
            let temperature = Number(weatherData.main.temp - 273.15).toFixed(2)
            let wind = weatherData.wind.speed
            let imageURL = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
            let newWeatherInfo = [{
              temperature: temperature,
              wind: wind,
              imageURL: imageURL
            }
            ]
            console.log("Weather info set to: ", newWeatherInfo)
            setWeatherInfo(newWeatherInfo)
          })
        })
    }, [])
  return (
    <div>
      <h2> Weather in {city} </h2>
      <p>
        temperature {weatherInfo[0].temperature} degrees Celsius <br></br>
        <img src={weatherInfo[0].imageURL} ></img> <br></br>
        wind {weatherInfo[0].wind}
      </p>
    </div>
  )
}

const CountryDisplay = ( { country, setWeatherInfo, weatherInfo } ) => {
  return (
    <div> 
    <h2> {country.name.common} </h2>
    <p> 
      capital {country.capital} <br></br>
      area {country.area} 
    </p>
    <img src={country.flags.png} alt="Flag"></img>
      <div>
        <LanguagesEnumerated languages={country.languages} />
        <WeatherDisplay city={country.capital} weatherInfo={weatherInfo} setWeatherInfo={setWeatherInfo} />
      </div>
    </div>
  )
}

const Listings = ( { countries, handleClick, setWeatherInfo, weatherInfo } ) => {
  let countriesResponse
  if (countries.length > 9) {
    console.log('too many')
    countriesResponse = <div> Too many matches, filter further </div>
  }
  else if (countries.length > 1) {
    countriesResponse = countries.map(country => {
      return(
      <div key={country.name.common}> {country.name.common} 
      <button onClick={() => handleClick(country)}> show </button> 
      </div>
      )
    }
    )
  }
  else if (countries.length === 1) {
    console.log(countries[0])
    countriesResponse = <CountryDisplay country={countries[0]} weatherInfo={weatherInfo} setWeatherInfo={setWeatherInfo} />
  }
  else {
    countriesResponse = <div> No countries to show. </div>
  }
  return (
    <div>
      {countriesResponse}
    </div>
  )
  
}

const Search = (props) => {
  return (
  <div>
    find countries <input value={props.value} onChange={props.onChange}/>
  </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newSearch, setNewSearch] = useState('')
  const [weatherInfo, setWeatherInfo] = useState([ {
    temperature: 200,
    imageURL: "",
    wind: 200
  }]) 

  const handleSearchChange = (event) => setNewSearch(event.target.value) 

  const handleWeatherCall = ( weatherInfo ) => {
    console.log("Setting weatherInfo to: ", weatherInfo)
    setWeatherInfo(weatherInfo) 
    
  }

  const handleClick = ( country ) => {
    console.log("Got country! It's: ", country)
    //setCountries([country])
    setNewSearch(`${country.name.common}`)
  }


  const countriesToShow = () => {
    if (newSearch === '') {
      return countries
    }
    else {
      let returnArray = []
      countries.forEach((country) => {
        if (country.name.common.toLowerCase().includes(newSearch.toLowerCase())) {
          console.log("Adding country to search array: ", country.name.common)
          return(returnArray.push(country))
        }
      }
      )
      console.log("Return array is:", returnArray)
      return returnArray
    }
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        console.log('what countries is ', response.data)
      })
  }, [])

  return (
    <div>
      <Search value={newSearch} onChange={handleSearchChange} />
      <Listings countries={countriesToShow()} handleClick={handleClick} weatherInfo={weatherInfo} setWeatherInfo={handleWeatherCall} />
    </div>
  )
}

export default App

