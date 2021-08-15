const http = require('http')

const server = http.createServer((req, res) => {
    console.log('request made') // to ma się wykonać, kiedy ktoś zrobi requesta na serwerze
    console.log(req.url, req.method)

    // set header content type
    // res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Content-Type', 'text/html')

    // res.write('hello')
    res.write('<h1>Hello</h1>')
    res.write('<h2>My friend</h2>')

    res.end()
})

server.listen(3000, 'localhost', () => { // tu jest ustalony adres pod którym serwer będzie nasłuchiwał requestów
    console.log('listening for requests on port 3000') // to się wykona od razu po włączeniu nasłuchu
})