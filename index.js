const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    let kode;
    let file = ''

    switch (req.url) {
        case '/':
            kode = 200
            file = 'index.html'
            break
        case '/contact':
            kode = 200
            file = 'contact.html'
            break
        default:
            kode = 404
            file = '404.html'
            break
    }


    res.writeHead(kode, {
        "Content-Type": "text/html"
    })

    fs.createReadStream(`./template/${file}`).pipe(res);

}).listen(3000)

console.log('server is running');