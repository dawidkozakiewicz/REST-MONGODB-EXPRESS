
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog');
const { render } = require('ejs');



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
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

//poodstawowe operacje na bazie danych

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: "Adam",
//         snippet: "Adam to niezły przechuj",
//         body: "Ciało Adama jest boskie"
//     })

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('6135e48c61c6d34f53e4c22d')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

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
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {

    // res.send("<p>about page</p>")
    // res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: "About" });
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post('/blogs', (req, res) => {
    console.log(req.body)
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/create', (req, res) => { // ten route powinien być ponad routami z id, ale nie wiem czemu

    // res.send("<p>about page</p>")
    // res.sendFile('./views/about.html', { root: __dirname })
    res.render('create', { title: "Create a new blog" });
})


app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' }) // musimy tak robić, ponieważ "DELETE" poszło jako AJAX z rzeglądarki a nie serwera
        })
        .catch((err) => {
            console.log(err)
        })

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