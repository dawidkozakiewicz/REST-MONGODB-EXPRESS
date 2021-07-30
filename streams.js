const fs = require('fs')

const readStream = fs.createReadStream('./docs/hugefile.txt', { encoding: 'utf8' })
const writeStream = fs.createWriteStream('./docs/hugeblog')

readStream.on('data', (chunk) => {
    console.log('------------- NEW CHUNK------------')
    console.log(chunk)
    writeStream.write('\nNEW CHUNK\n')
    writeStream.write(chunk)
})

// PIPING

// readStream.pipe(writeStream) - tu zrobi to samo co powyżej, ale prościej