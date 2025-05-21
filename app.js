const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get("/", (req, res) => {
  res.render("home", { posts });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content
  };
  posts.unshift(post);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) res.render("edit", { post });
  else res.redirect("/");
});

app.post("/edit/:id", (req, res) => {
  const postIndex = posts.findIndex(p => p.id == req.params.id);
  if (postIndex !== -1) {
    posts[postIndex].title = req.body.title;
    posts[postIndex].content = req.body.content;
  }
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect("/");
});

// Fix: Remove duplicate listen calls
const PORT = process.env.PORT || 8080; 
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

