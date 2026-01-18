import React from 'react';
import ReactDOM from 'react-dom/client';
import BadgeSquare from "./components/Badges/BadgeSquare"
import BadgePill from "./components/Badges/BadgePill"

function App() {
  return (
      <>
          <h1>Your components go here</h1>
          <div className="squares-badges">
                <BadgeSquare color="white">Badge</BadgeSquare>
                <BadgeSquare color="red">Badge</BadgeSquare>
                <BadgeSquare color="yellow">Badge</BadgeSquare>
                <BadgeSquare color="green">Badge</BadgeSquare>
                <BadgeSquare color="blue">Badge</BadgeSquare>
                <BadgeSquare color="indigo">Badge</BadgeSquare>
                <BadgeSquare color="purple">Badge</BadgeSquare>
                <BadgeSquare color="pink">Badge</BadgeSquare>
          </div>
          <br/>
          <div className="pill-badges">
                <BadgePill color="white">Badge</BadgePill>
                <BadgePill color="red">Badge</BadgePill>
                <BadgePill color="yellow">Badge</BadgePill>
                <BadgePill color="green">Badge</BadgePill>
                <BadgePill color="blue">Badge</BadgePill>
                <BadgePill color="indigo">Badge</BadgePill>
                <BadgePill color="purple">Badge</BadgePill>
                <BadgePill color="pink">Badge</BadgePill>
          </div>
      </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
