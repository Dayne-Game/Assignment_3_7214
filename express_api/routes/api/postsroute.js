const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')

const posts = require('../../Models/Posts');

//@route    GET /api/posts
//@desc     Get all Posts from the DB
//@access   Public
router.get('/', function( req, res){  
    posts
    .find() 
    .sort({post: 1})  
    .then( function( post ){ 
        res.json( post ); 
    }) 
    .catch( function( err ){ 
        console.log( err ); 
    }) 
});

//@route    GET /api/posts/:id
//@desc     Get all Posts from the DB matching the parameter
//@access   Public
router.get('/:id', function( req, res, next){  
    posts
    .findById(req.params.id) 
    .then(postFound => {
        if(!postFound) { return res.status(404).json([{msg: "Post not Found"}]); }
        return res.status(200).json(postFound);
    }) 
    .catch(err => next(err));
});

router.get('/user/:uid', function( req, res){  
    posts
    .find({uid: req.params.uid}) 
    .sort({uid: 1})  
    .then( function( uid ){
        (uid == 0) ? res.json([{title: `Oops! You Have NO Posts! Get Creating Now!`}]) : res.json( uid );
    }) 
    .catch( function( err ){ 
        console.log( err ); 
    })
});


//@route   POST /api/posts
//@desc    Add a new Post to DB
//@access  Private
router.post('/', auth, function(req, res) {
    let newPost = new posts(req.body);
    newPost
    .save(newPost)
    .then(() => {
        res.json({
            success: 'Post Added'});
        })
    .catch(err => {
        res.status(404).json({
            error: err
        })
    })
});

//@route PUT /api/posts/:id
//@desc Update selected Post
//@access Private
router.put('/:id', auth, function(req, res) {
    posts.findByIdAndUpdate({_id: req.params.id}, req.body, { new: true, useFindAndModify: false })
    .then(() => {
        res.json({ success: 'Post Updated' })
    })
    .catch(err => {
        res.status(404).json({ error: err })
    })
})

//@route    DELETE /api/posts/:id
//@desc     Delete a name from the DB by _id key 
//@access   Private (should be secured) 
router.delete('/:id', auth, function( req, res){  
    posts
    .findByIdAndDelete(req.params.id)
    .then(post => {
        post.remove();
        res.json({
            success:'Post Deleted'}); 
        })
    .catch(err => {
        res.status(404).json({
            error: err
        })
    }) 
}); 
  
module.exports = router;