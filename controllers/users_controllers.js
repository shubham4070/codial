module.exports.profile= function(req,res){
    res.render('user_profile',{
        title: "profile"
    })
}

module.exports.post= function(req,res){
    res.send("<h1>Your post successfully updated</h1>")
}

module.exports.sign_in = function(req,res){
    res.render('sign-in');
}

module.exports.sign_up = function(req,res){
    res.render('sign-up');
}