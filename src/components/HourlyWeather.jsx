import React from 'react'

export default function HourlyWeather({ time, weather, icon, temp, feelsLike }) {
    return (
        <div className='py-10 px-5 h-96 w-36 shadow-md grid place-content-center text-center bg-white dark:bg-neutral-900 rounded-md dark:text-white '>
            <div>
                <p>{time}</p>
                <img src={`weather_icons/${icon}.png`} alt="Weather icon" height={100} width={100} className='my-5 dark:invert' />
                <p className='capitalize '>{weather}</p>
                <p className='my-5'>{temp}&deg;F</p>
                <p>Feels like: {feelsLike}&deg;F</p>
            </div>
        </div>
    )
}
