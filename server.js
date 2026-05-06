import http from 'http'
import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const PORT = 5500

const MIME = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css',
    '.json': 'application/json',
    '.ico':  'image/x-icon',
}

const server = http.createServer((req, res) => {
    const headers = {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers)
        res.end()
        return }

    if (req.method === 'POST' && req.url === '/delete') {
        let body = ''
        req.on('data', chunk => body += chunk)
        req.on('end', () => {
            try {
                const { file } = JSON.parse(body)
                const abs = path.resolve(ROOT, file)
                if (!abs.startsWith(ROOT)) {
                    res.writeHead(403, headers)
                    res.end('Forbidden')
                    return }
                fs.unlinkSync(abs)
                res.writeHead(200, { ...headers, 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ ok: true }))
            } catch (e) {
                res.writeHead(500, headers)
                res.end(e.message) }
        })
        return }

    if (req.method === 'POST' && req.url === '/save') {
        let body = ''
        req.on('data', chunk => body += chunk)
        req.on('end', () => {
            try {
                const { file, content } = JSON.parse(body)
                const abs = path.resolve(ROOT, file)
                if (!abs.startsWith(ROOT)) {
                    res.writeHead(403, headers)
                    res.end('Forbidden')
                    return }
                fs.mkdirSync(path.dirname(abs), { recursive: true })
                fs.writeFileSync(abs, content, 'utf8')
                res.writeHead(200, { ...headers, 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ ok: true }))
            } catch (e) {
                res.writeHead(500, headers)
                res.end(e.message) }
        })
        return }

    let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url)
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, headers)
            res.end('Not found')
            return }
        const ext  = path.extname(filePath)
        const mime = MIME[ext] ?? 'application/octet-stream'
        res.writeHead(200, { ...headers, 'Content-Type': mime })
        res.end(data) })
})

server.listen(PORT, '0.0.0.0', () => {
    console.log(`http://localhost:${PORT}`) })
