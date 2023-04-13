import express from "express";
const router=express.Router()
import { alluser,  getOneUser, register ,login, logout} from "../controlers/user.js";
import {isAuthenticated} from "../middleware/isAuthenticated.js"
router.get("/all",alluser);

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/profile",isAuthenticated, getOneUser)


// .put(updateUser)
// .delete(deleteUser)
// router.get("/userid/:id",getOneUser)
// router.put("/userid/:id",updateUser)
// router.delete("/userid/:id",deleteUsewr)
export default router;
