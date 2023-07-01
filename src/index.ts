import * as http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;


const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/html; chatset=utf-8'
    })
    res.end(req.url)
})

server.listen(PORT, ()=>{
    console.log(`Server started on the port: ${PORT}`)
})