const fs = require('fs')


// reading files
fs.readFile('./docs/blog1.txt', (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data.toString())
})

console.log('last line') // wykona się najpierw bo funkcja powyżej jest asynchronizcna

// writing files
fs.writeFile('./docs/blog2.txt', 'qwerty queen', () => { // jeśli taki plik juz istniał'to zostanie nadpisany nowym tekstem ('qwerty queen)
    console.log('file was written')
})

// directories
fs.mkdir('./assets', (err) => { // jesli taki folder już istniał to wyrzuci błąd
    if (err) {
        console.log(err)
    }
    console.log('directory created')
})

if (!fs.existsSync('./trash')) {
    fs.mkdir('./trash', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('directory created')
    })
} else {
    fs.rmdir('./trash', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('folder deleted')
    })
}


// deleting files

if (fs.existsSync('./docs/deleteme.txt')) {
    fs.unlink('./docs/deleteme.txt', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('file deleted')
    })
}