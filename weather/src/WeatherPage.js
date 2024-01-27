import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { city } = useParams()

    // Хук, для выполнениязапроса погоды
    useEffect(() => {
        setLoading(true)
        setError(null)

        // ассинхронная функция для получения данных о погоде
        const fetchWeather = async () => {
            const apiKey = '799f845d2e3a43ed40eadc093c222607'
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`

            try {
                // Отправка запроса к API
                const response = await fetch(url)
                const data = await response.json()
                if (response.ok) {
                    setWeatherData(data)
                } else {
                    throw new Error(
                        data.message || 'Ошибка при получении погоды.'
                    )
                }
            } catch (error) {
                // Установка ошибки в случае исключения
                setError(error.message)
                setWeatherData(null)
            } finally {
                // Скрытие индикатора загрузки после обработки запроса
                setLoading(false)
            }
        }

        fetchWeather()
    }, [city])

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка: {error}</div>
    if (!weatherData || !weatherData.list) return <div>Нет данных.</div>

    // Рендеринг данных погоды от API
    return (
        <div>
            <h2>Погода в городе {city}</h2>
            {weatherData.list && (
                <ul>
                    {weatherData.list.map((item, index) => (
                        <li key={index}>
                            {new Date(item.dt * 1000).toLocaleString()}:{' '}
                            {/* преобразую дату в читаемую */}
                            {item.main.temp}°C
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default WeatherPage
