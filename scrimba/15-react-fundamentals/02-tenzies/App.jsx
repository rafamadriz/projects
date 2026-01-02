import { useState, useRef, useEffect } from "react"
import Die from "./Die.jsx"
import { nanoid } from "nanoid"
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

function rollDice() {
    let randomNum = []
    for (let i = 0; i < 10; i++) {
        randomNum.push({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        })
    }
    return randomNum
}

export default function App() {
    const [dice, setDice] = useState(() => rollDice())
    const newGameButton = useRef(null)

    let gameWon = false
    const allHeld = dice.every(die => die.isHeld && die.isHeld === dice[0].isHeld)
    const sameValue = dice.every(die => die.value === dice[0].value)
    if (allHeld && sameValue) {
        gameWon = true
    }

    useEffect(() => {
        if (gameWon) {
            newGameButton.current.focus()
        }
    }, [gameWon])

    function newRandomNumbers() {
        if (gameWon) {
            setDice(rollDice())
            return
        }
        setDice(oldDice => {
            const newDice = rollDice()

            return oldDice.map((dice, index) => {
                if (!dice.isHeld) {
                    dice.value = newDice[index].value
                }
                return dice
            })
        })
    }

    function toggleIsHeld(id) {
        setDice(oldDice => {
            return oldDice.map(dice => {
                if (dice.id === id) {
                    dice.isHeld = !dice.isHeld
                }
                return dice
            })
        })
    }

    const diceComponents = dice.map(dice => {
        return <Die
                    toggleIsHeld={() => {toggleIsHeld(dice.id)}}
                    value={dice.value}
                    isHeld={dice.isHeld}
                    key={dice.id}
                />
    })

    const { width, height } = useWindowSize()
    return (
        <main>
            <h1 className="game">Tenzies</h1>
            <p className="subheading">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

            {gameWon && <Confetti width={width} height={height} />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <div className="dies">
                {diceComponents}
            </div>

            <button ref={newGameButton} className="new-dies" onClick={newRandomNumbers}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}
