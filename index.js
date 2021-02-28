var http = require('http')
var url = require('url')
var router = require('routes')()
var view = require('swig')

router.addRoute('/', function(req,res){
    var html = view.compileFile('./template/index.html')({
        title : 'Index Page from Rizal Afani'
    })

    res.writeHead(200, {'Content-Type' : 'text/html'})
    res.end(html)
});

router.addRoute('/contact', function(req, res){
    var html = view.compileFile('./template/contact.html')()
    res.writeHead(200, {'Content-Type' : 'text/html'})
    res.end(html)
})

http.createServer(function(req, res){
    var path = url.parse(req.url).pathname;
    var match = router.match(path)
    if(match){
        match.fn(req, res)
    }else{
        res.writeHead(404, {'Content-Type' : 'text/html'})
        res.end('Page not found')
    }
}).listen(8000)

console.log('Server is running....');