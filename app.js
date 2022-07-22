//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home",{TITLE:"HOME"});
})

app.post("/blogs",function(req,res){
  var Blog_Title = req.body.blog_title;
  var Blog_Post = req.body.post_blog;
  posts.push([Blog_Title,Blog_Post])
  res.redirect('/blogs');
})

app.get("/blogs",function(req,res){
  res.render("blogs",{TITLE:"BLOGS",POSTS:posts});
})

app.get("/contact",function(req,res){
  res.render("contact",{TITLE:"CONTACT"});
})

app.get("/compose",function(req,res){
  res.render("compose",{TITLE:"COMPOSE"});
})



app.get("/post/:blog_id",function(req,res){
  for(var i=0;i<posts.length;i++){  
    if(posts[i][0].toLowerCase().trim() == req.params.blog_id.toLowerCase().trim()){
      res.render("seperate_blog",{TITLE:posts[i][0],CONTENT:posts[i][1]});
}
}
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
