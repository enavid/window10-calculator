const http = require('http');
const fs   = require('fs');
const path = require('path');

const server = http.createServer((request, response) =>{
    let routes = {
        'GET': {
            '/': indexHtml,
        }
    }

    let handler = routes[request.method][request.url];

    handler = handler || readFile;
    handler(request, response);

});

server.listen(3000);

function indexHtml(request, response) {
    readFile({url: 'view/index.html'}, response);
}

function readFile(request, response){
    console.log(request.url)
    var filePath = path.join(__dirname, '../client/', request.url);
    console.log(filePath)
    fs.readFile(filePath, (error, data) => {
        if (error) {
            response.writeHead(404);
            response.write('Not found error 404');
            response.end()
        } else{
            response.writeHead(200);
            response.write(data);
            response.end();
        }   
    })
}