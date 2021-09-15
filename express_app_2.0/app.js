const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
const { render } = require('ejs');



//express app
const app = express();

const dbURI = 'mongodb+srv://tester:ABCabc123@expressapp.opl6z.mongodb.net/ExpressApp?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => { console.log(err) })
// register view engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))



app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
})


//blog routes

app.use('/blogs', blogRoutes)



//redirects

app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

//404
app.use((req, res) => {  //musi być na samym dole

    res.status(404).render('404', { title: "404" });
})
