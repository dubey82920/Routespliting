import express from "express";
const router=express.Router()
import { alluser, getOneUser, saveuser } from "../controlers/user.js";

router.get("/users/all",alluser);

router.post("/user/new",saveuser)

router.get("/userid/:id",getOneUser)

export default router;
