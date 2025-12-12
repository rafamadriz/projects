import './App.css'
import Hero from "./components/Hero.jsx"
import MainContent from "./components/MainContent.jsx"
import Footer from "./components/Footer.jsx"

function App() {
  return (
    <>
        <div className="business-card">
            <Hero />
            <MainContent />
            <Footer />
        </div>
    </>
  )
}

export default App
