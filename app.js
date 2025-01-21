//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to Your Daily Journal!. We're thrilled to have you here! This is your space to reflect, express, and grow. Whether you're jotting down thoughts, tracking goals, or capturing memories, your journey starts here. Take a deep breath, grab a moment for yourself, and let your story unfold. Start journaling today—your future self will thank you!";
const aboutStartingContent = "DAILY JOURNAL, your personal space for self-expression and growth. Our mission is simple: to empower individuals to reflect on their journey, celebrate their wins, and learn from every step along the way.\nWe believe that journaling is more than just writing; it's a tool for mindfulness, clarity, and self-discovery. Whether you’re here to pen down daily thoughts, track your progress, or find inspiration, this platform is designed with you in mind.\n\nOur features are crafted to make your journaling experience seamless, secure, and enjoyable. From intuitive prompts to customizable templates, we’re here to help you make every entry meaningful.\n\nThis is your safe space—your digital sanctuary—where your story matters. Thank you for trusting us to be part of your journey.\nHappy journaling!";
const contactStartingContent = "We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, we're here to help.\n\nFeel free to reach out to us through any of the channels below:";


const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];




app.get("/",function(req,res){
  res.render("home",{
    StartingContent: homeStartingContent,
    newPosts: posts
  });
    // console.log(posts);
});


app.get("/about",function(req,res){
  res.render("about",{aboutContent: aboutStartingContent });
});


app.get("/contact",function(req,res){
  res.render("contact",{contactContent: contactStartingContent });
});


app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  // console.log(req.body.postTitle);
  // console.log(req.body.postBody);

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});



app.get("/posts/:postName",function(req,res){
  const requstedTitle = _.lowerCase(req.params.postName);
  
  posts.forEach(function(post){
  const storedTitle = _.lowerCase(post.title);

  if (storedTitle === requstedTitle) {
    res.render("post",{
      title: post.title,
      content: post.content
    });
  }
});

});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
