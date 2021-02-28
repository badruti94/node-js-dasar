const http = require('http')
const fs = require('fs')
const url = require('url')
const qString = require('querystring')

http.createServer((req, res) => {
    const access = url.parse(req.url)
    if (access.pathname == "/") {
        const data = qString.parse(access.query)
        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        res.end(JSON.stringify(data));
    } else if (access.pathname == "/form") {
        if (req.method.toUpperCase() == "POST") {
            let post_data = ''

            req.on('data', chunck => {
                console.log(1);
                const chunck_string = chunck.toString()
                console.log(chunck_string);
                post_data += chunck_string
                console.log(2);
                res.writeHead(200, {
                    "Content-Type": "text/html"
                })
                res.end(JSON.stringify(qString.parse(post_data)))
            })

        }

        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        fs.createReadStream(`./template/form.html`).pipe(res);
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html"
        })
        fs.createReadStream(`./template/404.html`).pipe(res);
    }



}).listen(3001)

console.log('server is running');