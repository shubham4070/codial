const Comment = require('../models/comments'); //schema for the comment in mongoDB
const Post = require('../models/post');
module.exports.create = function(req,res){
 //finding the post in the database 
    Post.findById(req.body.post_id)
     // if post is found
      .then(function(post){
            //creating the comment in database
             Comment.create({
               content: req.body.content,
               user : req.user._id,
               post : req.body.post_id
             })
              // if successfully comment is created in database
               .then(function(comment){
                    post.comments.push(comment._id);
                    post.save();
                    return res.redirect('/');
               })
               // if some occur while creating the comment in database
               .catch(function(err){
                  console.log("error while creating the comment",err);
                  return res.redirect("/");
               })
      })
      //if some error occur while finding the Post in the database.
       .catch(function(err){
         console.log("error while finding  the post",err);
         return res.redirect("/");
       })
  
}

// deleting the comment
module.exports.delete = function(req,res){
  Comment.findById({_id:req.params.id})
    .then(function(comment){
           if(comment.user == req.user.id){
               // delete the comment
               comment.remove();
               let postId = comment.post;
               // remove the comment reference from the array of Post
               Post.findByIdAndUpdate(postId,{$pull:{comments:comment._id}})
                .then(function(post){
                  console.log("Successfully removed the comment from the post");
                  return res.redirect('back');
                })
                .catch(function(err){
                  console.log("Error while removing the comment from the post");
                  return res.redirect('back');
                })
           }
           else{
            console.log("User is not Authorized to delete the comment");
            return res.redirect('back');
           }
    })
    .catch(function(err){
      console.log("Error in finding the comment",err);
      return res.redirect('back');
    })
}