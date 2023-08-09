import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserControler from "./controler/UserControler.js";
import * as PostControler from "./controler/PostControler.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";

mongoose
  .connect(
    "mongodb+srv://Emirlan:emirlan0550@cluster0.chh1hsv.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connection ok"))
  .catch((err) => console.log("DB connection error:", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login/",
  loginValidation,
  handleValidationErrors,
  UserControler.login
);

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserControler.register
);

app.get("/auth/me", checkAuth, UserControler.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostControler.getAll);

app.get("/posts/:id", PostControler.getOne);

app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostControler.create
);

app.delete("/posts/:id", checkAuth, PostControler.remove);

app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostControler.update
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server ok");
});
