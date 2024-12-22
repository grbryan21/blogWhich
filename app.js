import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware
app.use(express.static("public")); // Serves static files (like CSS)
app.use(bodyParser.urlencoded({ extended: true })); // Parses form data

// Set EJS as the view engine
app.set("view engine", "ejs");

// Dummy data for blog posts
let posts = [];

// ===========================
// ROUTES
// ===========================

// Home page - Displays all blog posts
app.get("/", (req, res) => {
  res.render("home", { posts });
});

// Route to display "Create New Post" form
app.get("/posts/new", (req, res) => {
  res.render("new");
});

// Route to handle the creation of a new post
app.post("/posts", (req, res) => {
  const id = posts.length + 1;
  const { title, content } = req.body;
  posts.push({ id, title, content });
  res.redirect("/");
});

// Route to view a single blog post
app.get("/posts/:id", (req, res) => {
  const post = posts.find(post => post.id === parseInt(req.params.id));
  if (post) {
    res.render("post", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

// Route to edit a specific post
app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find(post => post.id === parseInt(req.params.id));
  res.render("edit", { post });
});

// Route to update a specific post
app.post("/posts/:id/update", (req, res) => {
  const post = posts.find(post => post.id === parseInt(req.params.id));
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect(`/posts/${post.id}`);
  } else {
    res.status(404).send("Post not found");
  }
});

// Route to delete a specific post
app.post("/posts/:id/delete", (req, res) => {
  posts = posts.filter(post => post.id !== parseInt(req.params.id));
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
