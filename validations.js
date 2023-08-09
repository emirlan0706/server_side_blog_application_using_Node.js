import { body } from "express-validator";

export const loginValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("fullName").isLength({ min: 3 }),
  body("avatarUrl").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "vedite zagalovok  statii").isLength({ min: 3 }).isString(),
  body("text", "vedite text stati").isLength({ min: 5 }).isString(),
  body("tags", "vedite teg stati").optional().isString(),
  body("imageUrl", "nevernaya sylka na izabrojenie ").optional().isString(),
];
