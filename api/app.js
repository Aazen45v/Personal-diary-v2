const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

const homeStartingContent = "Welcome to Your Daily Journal...";
const aboutStartingContent = "DAILY JOURNAL, your personal space...";
const contactStartingContent = "We’d love to hear from you...";

app.get("/", function (req, res) {
  res.render("home", {
    StartingContent: homeStartingContent,
    newPosts: posts,
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutStartingContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactStartingContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});

module.exports = app; // Export the app for deployment
