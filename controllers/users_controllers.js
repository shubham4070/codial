module.exports.profile= function(req,res){
    res.render('user_profile',{
        title: "profile"
    })
}

module.exports.post= function(req,res){
    res.send("<h1>Your post successfully updated</h1>")
}