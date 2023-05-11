const router = require("express").Router();
const Post = require("../models/Post");


// router.get("/", (req, res) => {
//     console.log("post page")
//     res.send("post page")
// })

//create a post
router.post("/" ,async (req,res) => {
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(e){
        res.status(500).json(e);
    }
})
//update a post
router.put("/:id" , async(req, res) => {
    const post = await Post.findById(req.params.id);
    try{
        console.log("user id is",post.userId);

        if(post.userId === req.body.userId){
            console.log("user id is",post.userId);
            const updatedPost = await post.updateOne({$set: req.body});
            res.status(200).json(updatedPost);
        }else{
            res.status(403).json("You can not update this post");
        }
    }catch(e){
        res.status(500).json(e);
    }
})
//delete a post
router.delete("/:id" , async(req, res) => {
    const post = await Post.findById(req.params.id);
    try{

        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("post has been deleted");
        }else{
            res.status(403).json("You can not delete this post");
        }
    }catch(e){
        res.status(500).json(e);
    }
})
//like a post
//get a post
//get user post

module.exports = router;