import axios from 'axios'
import React, { useState } from 'react'

export default function WeatherApp() {
    const [cityName, setCityName] = useState('')
    const [result, setResult] = useState([])
    const [showError, setShowError] = useState('')

    const getUserCityName = (event) => {
        setCityName(event.target.value)
    }

    const submitForm = (event) => {
        event.preventDefault()
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`)
            .then((response) => {
                setResult([...result, response.data])
                setCityName('')
            })
            .catch((error) => {
                setShowError(error.message);
                setTimeout(() => {
                    setShowError('')
                    setCityName('')
                }, 2000);
            });
    }

    return (
        <>
            <div className='w-[1320px] mx-auto'>
                <div className='my-10 text-blue-600 text-[45px] font-bold text-center drop-shadow-2xl py-3' >Weather check App</div>

                <form onSubmit={submitForm}>
                    <input
                        type="text"
                        className='border-2 border-blue-800 h-[40px] me-3'
                        placeholder='Enter City Name'
                        value={cityName}
                        onChange={getUserCityName}
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className='bg-blue-400 px-5 py-2 drop-shadow-2xl'
                    />
                </form>

                {showError && (
                    <div className='text-red-500 py-5'>
                        {showError}
                    </div>
                )}

                <div className='grid grid-cols-4 gap-5 py-5'>
                    {result.length > 0 && result.map((weather, index) => (
                        <div key={index} className='border-2 border-sky-500  p-4 shadow-2xl bg-white drop-shadow-2xl'>
                            <div className='text-center bg-white'>
                                <div className='text-[30px] font-bold bg-white'>
                                    {weather.name}
                                </div>
                                <div className='text-[30px] font-bold bg-white'>
                                    <mark className='bg-yellow-500'>{weather.sys.country}</mark>
                                </div>
                                <div className='py-4 font-semibold text-[25px] bg-white'>
                                    {weather.main.temp_max}°C
                                </div>
                                <div className='font-semibold text-[25px] bg-white'>
                                    <img className='bg-white' src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="" />
                                </div>
                                <div className='font-semibold text-[25px] bg-white'>
                                    {weather.weather[0].description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
