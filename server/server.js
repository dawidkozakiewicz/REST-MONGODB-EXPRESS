const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log('request made') // to i wszystko w nawiasie klamrowym ma się wykonać, kiedy ktoś zrobi requesta na serwerze
    console.log(req.url, req.method)

    // set header content type
    // res.setHeader('Content-Type', 'text/plain')

    res.setHeader('Content-Type', 'text/html')

    // res.write('hello')
    // res.write('<h1>Hello</h1>')
    // res.write('<h2>My friend</h2>')
    // res.end()

    // send an html file

    let path = '../views/'

    switch (req.url) {
        case '/':
            path += 'index.html';
            console.log(path);
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            console.log(path);
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            console.log(path);
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end()
        } else {
            // res.write(data)
            res.end(data) //zrobi to samo co na górze
        }
    })


})

server.listen(3000, 'localhost', () => { // tu jest ustalony adres pod którym serwer będzie nasłuchiwał requestów localhost:3000
    console.log('listening for requests on port 3000') // to się wykona od razu po włączeniu nasłuchu (nawet jak nie wbijemy jeszzce w przeglądarkę localhost:3000)
})