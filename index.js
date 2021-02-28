var http = require('http')
var url = require('url')
var router = require('routes')()
var view = require('swig')
var mysql = require('mysql')
var qString = require('querystring')
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

        var html = view.compileFile('./template/index.html')({
            title: 'Data Mahasiswa',
            data: rows
        })

        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(html)
    })
})

router.addRoute('/insert', function (req, res) {
    /* connection.query("insert into mahasiswa set ?", {
        no_induk: '1110100604',
        nama: 'Mahrusssah',
        alamat: 'Genteng'
    }, function (err, field) {
        if (err) throw err;

        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(field.affectedRows + " Affected Rows")
    }) */

    if (req.method.toUpperCase() == "POST") {
        req.on('data', function (chuncks) {
            const data_post = qString.parse(chuncks.toString())
            console.log(data_post);

            connection.query("insert into mahasiswa set ?", data_post, function (err, field) {
                if (err) throw err;

                res.writeHead(302, {
                    'Location': '/'
                })
                res.end();
            })
        })


    } else {
        var html = view.compileFile('./template/form.html')()

        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(html)
    }


})



router.addRoute('/update/:id', function (req, res) {
    /* connection.query("update mahasiswa set ? where ?", [{
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
    }) */

    connection.query("select * from mahasiswa where ?", {
        no_induk: this.params.id
    }, function (err, rows, field) {
        if (rows.length) {
            var data = rows[0]
            if (req.method.toUpperCase() == "POST") {
                req.on('data', function (chuncks) {
                    const data_post = qString.parse(chuncks.toString())


                    /* connection.query("insert into mahasiswa set ?", data_post, function (err, field) {
                        if (err) throw err;

                        res.writeHead(302, {
                            'Location': '/'
                        })
                        res.end();
                    }) */

                    connection.query("update mahasiswa set ? where ?", [
                        data_post,
                        {
                            no_induk: data.no_induk
                        }
                    ], function (err, fields) {
                        if (err) throw err

                        res.writeHead(302, {
                            "Location": "/"
                        })
                        res.end()
                    })
                })

            } else {
                var html = view.compileFile('./template/form_update.html')({
                    data: data
                })
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                })
                res.end(html)
            }
        } else {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            })
            res.end('Page not found')
        }
    })
})

router.addRoute('/delete/:id', function (req, res) {
    connection.query("delete from mahasiswa where ?", {
        no_induk: this.params.id
    }, function (err, fields) {
        if (err) throw err;

        res.writeHead(302, {
            "Location": "/"
        })
        res.end()
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