import { createContext, useContext, useEffect, useState } from 'react'
import { getCountries } from '../services/countriesnowServices'

const GameContext = createContext()

export const GameProvider = ({ children }) => {
    const [countries, setCountries] = useState([])
    const [currentCountry, setCurrentCountry] = useState(null)
    const [score, setScore] = useState(0)

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const data = await getCountries()

                setCountries(data)

                const randomCountry =
                    data[Math.floor(Math.random() * data.length)]

                setCurrentCountry(randomCountry)
            } catch (error) {
                console.error('Error al cargar los países:', error)
            }
        }

        loadCountries()
    }, [])

    const nextCountry = () => {
        const randomCountry =
            countries[Math.floor(Math.random() * countries.length)]

        setCurrentCountry(randomCountry)
    }

    const guess = (answer) => {
        if (!currentCountry) return

        if (answer.toLowerCase() === currentCountry.name.toLowerCase()) {
            setScore(prevScore => prevScore + 10)
            nextCountry()
        } else {
            setScore(prevScore => prevScore - 1)
        }
    }

    const resetScore = () => {
        setScore(0)
    }

    return (
        <GameContext.Provider
            value={{
                countries,
                currentCountry,
                score,
                guess,
                nextCountry,
                resetScore
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext = () => {
    return useContext(GameContext)
}