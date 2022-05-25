import express from "express";
import {
  authUser,
  registerUser,
  getUsers
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);


export default router;