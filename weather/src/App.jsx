import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import CitiesFilter from './CitiesFilter'
import WeatherPage from './WeatherPage'
import LinearGradient from 'react-native-web-linear-gradient'
import React from 'react'
import Navigation from './Navigation'
import About from './About'

function App() {
    return (
        // линейный градиент для фона
        <LinearGradient
            colors={['#fdffcf', '#ffadad', '#2251b4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <Navigation />

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
                        {/*Так же добавил роут для странички "О нас"*/}
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Router>
            </div>
        </LinearGradient>
    )
}

// Экспорт главного компонента для использования в других частях приложения
export default App
