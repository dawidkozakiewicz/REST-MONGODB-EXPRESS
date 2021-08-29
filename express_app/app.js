const express = require('express')

//express app
const app = express();

// register view engine
app.set('view engine', 'ejs')
// app.set('views', 'myViews')  - kiedy chcemy ustawić inny domyślny folder dla widoków nić

//listen for requests
app.listen(3000);
app.get('/', (req, res) => {

    // res.send("<p>home page</p>")
    // res.sendFile('./views/index.html', { root: __dirname }) - tak było bez ejs'a
    res.render('index', { title: "Home" });

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
