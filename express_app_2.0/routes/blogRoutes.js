const express = require('express')
const Blog = require('../models/blog');
const blogController = require('../controllers/blogController')
const router = express.Router()


router.get('/', blogController.blog_index)

router.post('/', (req, res) => {
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

router.get('/create', (req, res) => { // ten route powinien być ponad routami z id, ale nie wiem czemu

    res.render('create', { title: "Create a new blog" });
})


router.get('/:id', blogController.blog_details)

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' }) // musimy tak robić, ponieważ "DELETE" poszło jako AJAX z rzeglądarki a nie serwera
        })
        .catch((err) => {
            console.log(err)
        })

})

module.exports = router