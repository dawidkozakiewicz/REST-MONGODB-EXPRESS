const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')



//express app
const app = express();

const dbURI = 'mongodb+srv://tester:ABCabc123@expressapp.opl6z.mongodb.net/ExpressApp?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => { console.log(err) })
// register view engine
app.set('view engine', 'ejs')
// app.set('views', 'myViews')  - kiedy chcemy ustawić inny domyślny folder dla widoków nić

//listen for requests
// app.listen(3000);
// middleware & static files
app.use(express.static('public'))

app.use(morgan('dev'))

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: "Adam",
        snippet: "Adam to niezły przechuj",
        body: "Ciało Adama jest boskie"
    })

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

// app.use((req, res, next) => {
//     console.log('new request made:')
//     console.log("host: ", req.hostname)
//     console.log('path: ', req.path)
//     console.log('method: ', req.method)
//     next()
// })

// app.use((req, res, next) => {
//     console.log('in the next middleware')

//     next()
// })


app.get('/', (req, res) => {
    const blogs = [
        { title: 'Aekjhnk qdh hdwkj erwerwer', snippet: "Asldflkjf fdkf j" },
        { title: 'Jkedfherujk hn q2we hjjk', snippet: "Kopwejqw djid ws" },
        { title: 'Dfritlwekfqef sjkffhdkjh h asljkdfh', snippet: "Psdfkjsdh hs kljih h" }
    ]
    // res.send("<p>home page</p>")
    // res.sendFile('./views/index.html', { root: __dirname }) - tak było bez ejs'a
    res.render('index', { title: "Home", blogs });

})

app.get('/about', (req, res) => {

    // res.send("<p>about page</p>")
    // res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: "About" });
})

app.get('/blogs/create', (req, res) => {

    // res.send("<p>about page</p>")
    // res.sendFile('./views/about.html', { root: __dirname })
    res.render('create', { title: "Create a new blog" });
})



//redirects

app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

//404
app.use((req, res) => {  //musi być na samym dole

    // res.send("<p>about page</p>")
    // res.status(404).sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404', { title: "404" });
})
