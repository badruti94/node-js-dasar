var http = require('http')
var url = require('url')
var routes = require('routes')()

routes.addRoute('/', function(req,res){
    res.writeHead(200,{'Content-Type' : 'text/html'});
    res.end('Index Page')
});

routes.addRoute('/profile/:nama/:kota', function(req,res){
    res.writeHead(200,{'Content-Type' : 'text/html'});
    res.end(`Profile Page => ${this.params.nama} dari ${this.params.kota}`)
})

routes.addRoute('/contact', function(req,res){
    res.writeHead(200,{'Content-Type' : 'text/html'});
    res.end('Contact Page')
})

http.createServer(function(req,res){
    var path = url.parse(req.url).pathname;
    var match = routes.match(path)
    if(match){
        match.fn(req,res)
    }else{
        res.writeHead(404,{'Content-Type' : 'text/html'});
        res.end('Page not Found')
    }
}).listen(8000);