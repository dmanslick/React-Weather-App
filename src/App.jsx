import { useState } from 'react'
import HourlyWeather from './components/HourlyWeather'

function App() {
    const apiKey = import.meta.env.VITE_API_KEY // You will need to get your own API key from OpenWeather, but it is the free tier so there shouldn't any problems using your own key with this project.
    const [currentData, setCurrentData] = useState()
    const [futureData, setFutureData] = useState()

    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude
        let long = position.coords.longitude
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`)
            .then(res => {
                return res.json()
            }).then(data =>
                setCurrentData(data)
            )
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`)
            .then(res => {
                return res.json()
            }).then(data =>
                setFutureData(data.list.slice(0, 9))
            )
    })

    if (currentData && futureData) {
        return (
            <div className='py-10'>
                <div className='flex flex-col justify-center items-center bg-white shadow-md w-fit p-10 mx-auto'>
                    <p>The current temperature is: {currentData.main.temp.toFixed(1)}&deg;F</p>
                    <p className='my-3'>It feels like: {currentData.main.feels_like.toFixed(1)}&deg;F</p>
                    <p>The current weather is: <span className='capitalize'>{currentData.weather[0].description}</span></p>
                    <img src={`weather_icons/${currentData.weather[0].icon}.png`} alt="Weather icon" height={150} width={150}/>
                </div>
                <div className='flex flex-row gap-8 justify-center flex-wrap xl:flex-nowrap container mx-auto mt-10'>
                    {futureData.map(data => {
                            const key = data.dt
                            let time = new Date(data.dt*1000).toLocaleTimeString()
                            time = time.slice(0,time.length-6)+time.slice(time.length-3)
                            const weather = data.weather[0].description
                            const icon = data.weather[0].icon
                            const temp = data.main.temp.toFixed(1)
                            const feelsLike = data.main.feels_like.toFixed(1)
                            return <HourlyWeather time={time} weather={weather} icon={icon} temp={temp} feelsLike={feelsLike} key={key}></HourlyWeather>
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='animate-bounce text-center'>
                <p className='text-3xl'>Loading...</p>
                <p className='text-lg'>You must allow location access</p>
            </div>
        </div>
    )
}

export default App