import Trivia from "./Trivia"

let gameOver = false

export default function App() {
    return (
        <main>
            { gameOver ?
                <div>
                    <h1>Quizzical</h1>
                    <p>Test your knowladge</p>
                    <button>Start Quiz</button>
                </div>
            : <Trivia />}
        </main>
    )
}
