import axios from 'axios'
import React, { useState } from 'react'

export default function WeatherApp() {

    const [cityName, setCityName] = useState('')
    let [result, setResult] = useState([])

    let [showError, setShowError] = useState('')

    let getUserCityName = (event) => {
        // event.preventDefault();
        let getCity = event.target.value

        setCityName(getCity)

    }

    let submitForm = (event) => {
        event.preventDefault()

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`)
            .then((response) => {
                // console.log(response.data)
                setResult([...result, response.data])


                setCityName('')


            })
            // .catch((error) => {

            //     // console.log(error.message)
            //     setTimeout(() => {
            //         setShowError(error.message)

            //     }, 2000);

            // })

            .catch((error) => {
                setShowError(error.message);
                setTimeout(() => {
                    setShowError(''); // Clear error message after 2 seconds
                    setCityName('')


                }, 2000);
            });


    }



    return (


        <>
            <div className=' w-[1320px] mx-auto'>
                <div className='my-10 text-blue-600 text-[45px] font-bold text-center'>Weather App</div>

                <form onSubmit={submitForm}>
                    <input type="text" className='border-2 border-blue-800 h-[40px] me-3 ' placeholder='Enter City Name' value={cityName} onChange={getUserCityName} />
                    <input type="submit" value="Submit" className='bg-blue-400 px-5 py-2' />
                </form>

                {
                    showError !== '' ?

                        <div className='text-red-500 py-5 '>
                            {showError}
                        </div>
                        :
                        ''


                }


                {
                    result.length >= 1 ?

                        result.map((weather, index) => {
                            return (
                                <>

                                    <div className='grid grid-cols-4 '>
                                        <div className=' border border-black-500 border-3 h-[250px] bg-white my-10 p-3 flex-initial w-64 shadow-2xl'>
                                            <div className='grid grid-cols-2 gap-3 bg-white'>
                                                <div className='text-[30px] font-bold bg-white'>
                                                    {weather.name}
                                                </div>
                                                <div className='text-[30px] font-bold bg-white'>
                                                    <mark className='bg-yellow-500'>{weather.sys.country}</mark>
                                                </div>
                                            </div>
                                            <div className='py-4 font-semibold text-[25px] bg-white'>
                                                {weather.main.temp_max}
                                            </div>
                                            <div className=' font-semibold text-[25px] bg-white'>
                                                {/* {weather.weather[0].description} */}
                                                <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} className='bg-white' alt="" />
                                            </div>
                                            <div className=' font-semibold text-[25px] bg-white'>
                                                {weather.weather[0].description}
                                            </div>


                                        </div>
                                    </div>

                                </>


                            )
                        })



                        :

                        ''
                    // <div className='text-red-500 py-5 '>
                    //     Data Not Found
                    // </div>

                }



            </div>

        </>
    )
}
