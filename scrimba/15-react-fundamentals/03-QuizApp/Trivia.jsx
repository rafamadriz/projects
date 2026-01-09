import { use, useEffect, useState } from "react"
import { decode } from "html-entities"

const getTrivia = async () => {
    const api = "https://opentdb.com/api.php?amount=5&category=21"
    try {
        const response = await fetch(api)
        if (!response.ok) {
            throw new Error (`Response status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

const Options = (incorrect_answers, correct_answer, id) => {
    const randomIndex = Math.floor(Math.random() * (incorrect_answers.length + 1))
    const options = [
        ...incorrect_answers.slice(0, randomIndex),
        correct_answer,
        ...incorrect_answers.slice(randomIndex)
    ]
    const optionsEls = options.map(option => {
        option = decode(option)
        return (
                <label className={`option`}><input type="radio" name={id} value={option} required /><span>{option}</span></label>
        )
    })
    return (
        <>
            {optionsEls}
        </>
    )
}

const Question = (question, incorrect_answers, correct_answer, id) => {
    return (
        <>
            <fieldset className="question">
                <legend>{decode(question)}</legend>
                {Options(incorrect_answers, correct_answer, id)}
            </fieldset>
            <hr />
        </>
    )
}

const checkAnswers = (event, trivia, setCorrectCount, setGameOver) => {
    event.preventDefault()
    setGameOver(true)

    const data = new FormData(event.target)
    const entries = Object.fromEntries(data)

    for (const [i, answer] of Object.entries(entries)) {
        const correct_answer = trivia.results[i].correct_answer
        const input = document.querySelector(`input[name="${i}"]:checked`)

        const allInputs = document.querySelectorAll(`input[name="${i}"]`)
        for (const input of allInputs) {
            input.parentElement.classList.add("answered")
            input.disabled = true
        }

        if (correct_answer === answer) {
            setCorrectCount(count => count + 1)
            input.parentElement.classList.add("correct")
        } else {
            input.parentElement.classList.add("incorrect")
        }
    }
}

const finalMessage = (count, setTrivia) => {
    return (
        <>
            <p className="score">You scored {count}/5</p> 
            <button onClick={() => getTrivia().then(data => setTrivia(data))}>Play Again</button>
        </>
    )
}

export default function Trivia() {
    const [trivia, setTrivia] = useState(null)
    const [correctCount, setCorrectCount] = useState(0)
    const [gameOver, setGameOver] = useState(null)

    useEffect(() => {
        getTrivia().then(data => setTrivia(data))
    }, [])

    if (!trivia) return

    const questions = []
    trivia.results.forEach((question, i) => {
        questions.push(Question(question.question, question.incorrect_answers, question.correct_answer, i))
    })

    return (
        <>
            <form onSubmit={() => checkAnswers(event, trivia, setCorrectCount, setGameOver)}>
                {questions}
                {gameOver ? finalMessage(correctCount, setTrivia) : <button>Check answers</button>}
            </form>
        </>
    )
}
