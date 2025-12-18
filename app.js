// app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Pet from "./models/Pet.js";
import session from "express-session";
import bcrypt from "bcrypt";
import User from "./models/User.js";

dotenv.config();


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const app = express();
const PORT = 3000;

// 处理 __dirname（ESM 写法）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 设置模板引擎 EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 静态资源
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// 路由
app.get("/", (req, res) => {
  res.render("index");     // 对应 views/index.ejs
});

/* app.get("/pets", (req, res) => {
  res.render("pets");
}); */

app.get("/gallery", (req, res) => {
  res.render("gallery");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", async (req, res) => {
  // 简单处理用户留言，可以先 console.log
  console.log(req.body);
  // 以后可以建一个 Message model 存进 MongoDB
  res.send("Thank you for contacting us!");
});

app.get("/pets", async (req, res) => {
  const pets = await Pet.find();
  console.log("PETS FROM DB:", pets);
  res.render("pets", { pets });
});

app.use(
  session({
    secret: "some-secret-key",
    resave: false,
    saveUninitialized: false
  })
);

// dashboard
const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
};

// signup routes
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ email, passwordHash });
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.redirect("/login");

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.redirect("/login");

  req.session.userId = user._id;
  res.redirect("/dashboard");
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// dashboard route
app.get("/dashboard", requireLogin, async (req, res) => {
  const pets = await Pet.find();
  res.render("dashboard", { pets });
});

// 显示 Add New Pet 表单（受保护）
app.get("/pets/new", requireLogin, (req, res) => {
  res.render("pet-form");
});

app.post("/pets", requireLogin, async (req, res) => {
  const { name, age, breed, description, imageUrl } = req.body;

  if (!name || !imageUrl) {
    return res.send("Name and image are required");
  }

  await Pet.create({
    name,
    age,
    breed,
    description,
    imageUrl
  });

  res.redirect("/dashboard");
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
