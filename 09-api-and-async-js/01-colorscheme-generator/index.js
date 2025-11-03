const getColorschemeBtn = document.getElementById("get-colorscheme")

async function getColors(searchParams) {
    try {
        const url = "https://www.thecolorapi.com/scheme"
        const response = await fetch(`${url}/?${searchParams}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        return data.colors
    } catch (error) {
        console.error(error.message);
    }
}

let lastHexReq
let lastModeReq
getColorschemeBtn.addEventListener("click", () => {
    const colorStrips = document.querySelector(".color-strip")
    const colorHex = document.querySelector(".color-hexcode")
    const hexColor = document.getElementById("color-input").value.replace("#", "")
    const modeInput = document.getElementById("mode-input").value

    const urlSearchParams = new URLSearchParams({
        hex: hexColor,
        mode: modeInput,
        count: 5,
    })

    if (lastHexReq === hexColor && lastModeReq === modeInput) return

    getColors(urlSearchParams.toString()).then(colors => {
        for (let i = 0; i < colorStrips.children.length; i++) {
            const color = colors[i].hex.value
            colorStrips.children[i].className = color
            colorStrips.children[i].style.backgroundColor = color

            colorHex.children[i].textContent = color
        }
    })
    lastHexReq = hexColor
    lastModeReq = modeInput
})

const hexText = document.querySelectorAll(".color-hexcode > div")
for (const hex of hexText) {
    hex.addEventListener("click", (e) => {
        const selection = window.getSelection();
        selection.removeAllRanges();

        const range = document.createRange();
        range.selectNodeContents(e.target);
        selection.addRange(range);

        navigator.clipboard.writeText(e.target.textContent)
    })
}
