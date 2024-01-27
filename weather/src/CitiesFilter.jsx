import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CitiesFilter = () => {
    // стейт текущего значени инпута
    const [city, setCity] = useState('')
    const navigate = useNavigate()

    const handleSearch = () => {
        //  реирект на страницу с погодой для выбранного города
        navigate(`/weather/${city}`)
    }

    return (
        <div>
            <h1>Погода в твоем городе</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)} // Обновляю состояние при вводе текста
                placeholder="Введите город"
            />
            <button onClick={handleSearch}>Поиск</button>
        </div>
    )
}

export default CitiesFilter
