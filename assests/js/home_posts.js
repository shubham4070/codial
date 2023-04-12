{
  // method to  submit the form using the ajax
  console.log('ajax calls');
  let createPost = function(){
    let newPostForm = $('#new-post-form');
    newPostForm.submit(function(event){
        event.preventDefault();//prvent the default action of post button
        //manually handling the post operation
      $.ajax({
         type: 'post',
         url : '/post/create',
         data : newPostForm.serialize(), // convert it into the json
         success: function(data){
           console.log(data);
         },error: function(err){
           console.log(err.responseText);
         }
      })

    })
    console.log(newPostForm.submit);
  }
  createPost();
// method to 




}
