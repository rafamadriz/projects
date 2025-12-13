function randomDelay() {
    return Math.floor(Math.random() * 2000)
}

const connectionStatus = document.getElementById("connection-status")
setTimeout(() => {
    connectionStatus.textContent = "Live Price 🟢"
    connectionStatus.dataset.islive = "true"
}, randomDelay())

function randomPrice() {
    // between 3000 and 5000
    return Math.floor(Math.random() * (5000 - 3000)) + 3000
}

const investBtn = document.getElementById("invest-btn")

let currentPrice
const priceDisplayEl = document.getElementById("price-display")
const intervalId = setInterval((priceEl) => {
    if (connectionStatus.dataset.islive === "true") {
        currentPrice = randomPrice()
        priceEl.textContent = `${currentPrice}`
        investBtn.style.cursor = "pointer"
        clearInterval(intervalId)
        // keep updating price after connection is live
        updatePrice()
    }
}, 10, priceDisplayEl)

function updatePrice() {
    setInterval(() => {
        currentPrice = randomPrice()
        priceDisplayEl.textContent = `${currentPrice}`
    }, 3000)
}

const dialog = document.querySelector("dialog.outputs")

investBtn.addEventListener("click", async (e) => {
    e.preventDefault()

    const investmentAmount = parseInt(document.getElementById("investment-amount").value)
    const ouncesBought = (investmentAmount / currentPrice).toFixed(2)

    if (connectionStatus.dataset.islive === "true" && investmentAmount && investmentAmount > 0) {
        const investmentSummary = document.getElementById("investment-summary")
        investmentSummary.innerHTML = `
You just bought ${ouncesBought} ounces (ozt) for $${currentPrice}
<br><br>
You will receive documentation shortly.
            `
        dialog.showModal()

        await fetch("http://localhost:8000", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
            },
            body: `${new Date().toISOString()}, amount paid: $${investmentAmount}, price per Oz: $${currentPrice}, gold sold: ${ouncesBought} Oz`,
        })
    }
})

document.querySelector("dialog button").addEventListener("click", (e) => {
    e.preventDefault()
    dialog.close()
})
