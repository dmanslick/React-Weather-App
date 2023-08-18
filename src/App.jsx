import { useEffect, useState } from 'react'
import HourlyWeather from './components/HourlyWeather'

function App() {
    const apiKey = import.meta.env.VITE_API_KEY // You will need to get your own API key from OpenWeather, but it is the free tier so there shouldn't any problems using your own key with this project.
    const [currentData, setCurrentData] = useState()
    const [futureData, setFutureData] = useState()

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude
            const long = position.coords.longitude
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`)
                .then(res => {
                    return res.json()
                }).then(data =>
                    setCurrentData(data)
                )
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`)
                .then(res => {
                    return res.json()
                }).then(data =>
                    setFutureData(data.list.slice(0, 9))
                )
        })
    }, [])

    if (currentData && futureData) {
        return (
            <>
                <div className='py-10'>
                    <div className='flex flex-col justify-center items-center bg-white shadow-md w-fit p-10 mx-auto dark:text-white dark:bg-neutral-900 rounded-md'>
                        <p>The current temperature is: {currentData.main.temp.toFixed(1)}&deg;F</p>
                        <p className='my-3'>It feels like: {currentData.main.feels_like.toFixed(1)}&deg;F</p>
                        <p>The current weather is: <span className='capitalize'>{currentData.weather[0].description}</span></p>
                        <img src={`weather_icons/${currentData.weather[0].icon}.png`} alt="Weather icon" height={150} width={150} className='dark:invert' />
                    </div>
                    <div className='flex flex-row gap-8 justify-center flex-wrap xl:flex-nowrap container mx-auto mt-10'>
                        {futureData.map(data => {
                            const key = data.dt
                            let time = new Date(data.dt * 1000).toLocaleTimeString()
                            time = time.slice(0, time.length - 6) + time.slice(time.length - 3)
                            const weather = data.weather[0].description
                            const icon = data.weather[0].icon
                            const temp = data.main.temp.toFixed(1)
                            const feelsLike = data.main.feels_like.toFixed(1)
                            return <HourlyWeather time={time} weather={weather} icon={icon} temp={temp} feelsLike={feelsLike} key={key}></HourlyWeather>
                        })}
                    </div>
                </div>
                <footer className="pb-6 text-center dark:text-white">React Weather App by: <a href="https://github.com/dmanslick" target="_blank" className="hover:text-blue-600">dmanslick</a></footer>
            </>
        )
    }

    return (
        <>
            <div className='flex justify-center items-center dark:text-white'>
                <div className='animate-bounce text-center'>
                    <p className='text-3xl'>Loading<span className='animate-bounce'>...</span></p>
                    <p className='text-lg'>You must allow location access</p>
                    <small className="pb-6 text-center dark:text-white">React Weather App by: <a href="https://github.com/dmanslick" target="_blank" className="hover:text-blue-600">dmanslick</a></small>
                </div>
            </div>
        </>
    )
}

export default App