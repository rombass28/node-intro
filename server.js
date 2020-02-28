const http = require('http');
const fs = require('fs');
const url = require('url');
const rollDice = require('./roll-dice');

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    if (request.url.includes('/write')) {
        const username = url.parse(request.url, true).query.username;
        fs.writeFile('./users.txt', username, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            response.end();
        });
    }

    if (request.url === '/read') {
        fs.readFile('./users.txt', 'utf-8', (err, content) => {
            response.write(content);
            response.end();
        });
    }

   
    if (request.url.includes('/delete')) {
        fs.writeFile('./users.txt', '', (err) => {
            if (err) {
                console.log(err);
                return;
            }
            response.end();
        });
    }

    if (request.url.includes('/roll')) {
        rollDice()
        .then((result) => {
            if(result === 4){
                console.log('The number is ' + result + ' - you won!');
                response.end(result + ' you won!');
            } else {
                console.log('The number is ' + result + ' - you lose');
                response.end(result + ' you lose');
            }
        })
    }
}).listen(4000);

console.log('Listening on: http://localhost:4000');