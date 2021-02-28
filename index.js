var http = require('http')
var url = require('url')
var router = require('routes')()
var view = require('swig')
var mysql = require('mysql')
const {
    RSA_NO_PADDING
} = require('constants')

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'sia',
    user: 'root',
    password: ''
})

router.addRoute('/', function (req, res) {
    connection.query("select * from mahasiswa", function (err, rows, field) {
        if (err) throw err;
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(JSON.stringify(rows))
    })
})

router.addRoute('/insert', function (req, res) {
    connection.query("insert into mahasiswa set ?", {
        no_induk: '1110100604',
        nama: 'Mahrusssah',
        alamat: 'Genteng'
    }, function (err, field) {
        if (err) throw err;

        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(field.affectedRows + " Affected Rows")
    })
})



router.addRoute('/update', function (req, res) {
    connection.query("update mahasiswa set ? where ?", [{
            nama: 'Mahrusssahroni'
        },
        {
            no_induk: '1110100604'
        }
    ], function (err, fields) {
        if (err) throw err

        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(fields.changeRows + " Rows Updated");
    })
})

router.addRoute('/delete', function (req, res) {
    connection.query("delete from mahasiswa where ?", {
        no_induk: "1110100604"
    }, function (err, fields) {
        if (err) throw err;

        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(fields.affectedRows + " Rows Deleted")
    })
})

http.createServer(function (req, res) {
    var path = url.parse(req.url).pathname;
    var match = router.match(path)
    if (match) {
        match.fn(req, res)
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        })
        res.end('Page not found')
    }
}).listen(8000)

console.log('Server is running....');