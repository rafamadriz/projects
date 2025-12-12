import http from "node:http"
import fs from "node:fs/promises"
import path from "node:path"

const publicDir = path.join(import.meta.dirname, "public")
const rootDir = path.join(import.meta.dirname)

const server = http.createServer(async (req, res) => {
    if (req.method === "GET") {
        await sendResponse(req, res, publicDir)
    }
    else if (req.method === "POST") {
        let body = ""

        for await (const chunk of req) {
            body += chunk
        }
        const logFile = path.join(rootDir, "log.txt")
        console.log(body)
        await fs.appendFile(logFile, `${body}\n`)
    }
})

async function sendResponse(req, res, baseDir) {
    const fileExtension = path.extname(req.url)
    const contentType = getContentType(fileExtension)
    res.setHeader("Content-Type", contentType)
    res.statusCode = 200

    if (req.url === "/") {
        const index = path.join(baseDir, "index.html")
        const content = await fs.readFile(index)
        res.end(content)
        return
    }

    const requestedFile = req.url.split("/")[1]
    const filePath = path.join(baseDir, requestedFile)
    try {
        const content = await fs.readFile(filePath)
        res.end(content)
    } catch (err) {
        const html404 = path.join(baseDir, "404.html")
        const content = await fs.readFile(html404)
        res.end(content)
        console.error(err)
    }
}

function getContentType(fileExtension) {
    const types = {
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml"
    }

    return types[fileExtension.toLowerCase()] || "text/html"
}

const PORT = 8000
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
