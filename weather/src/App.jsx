import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CitiesFilter from './CitiesFilter'
import WeatherPage from './WeatherPage'
import LinearGradient from 'react-native-web-linear-gradient'
import React, { Component } from 'react'

function App() {
    return (
        // линейный градиент для фона
        <LinearGradient
            colors={['#fdffcf', '#ffadad', '#2251b4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <div className="centered-container">
                <Router>
                    <Routes>
                        {/* роутинг для корневого пути, отображает компонент для фильтрации городов */}
                        <Route path="/" element={<CitiesFilter />} />
                        {/*Роут для страницы погоды, которая показывает погоду для выбранного города*/}
                        <Route
                            path="/weather/:city"
                            element={<WeatherPage />}
                        />
                    </Routes>
                </Router>
            </div>
        </LinearGradient>
    )
}

// Экспорт главного компонента для использования в других частях приложения
export default App
