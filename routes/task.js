import express from "express"
import { deleteTask, getMyTask, newtask, updateTask } from "../controlers/task.js";
import {isAuthenticated} from "../middleware/isAuthenticated.js"
const router=express.Router();

router.post("/new",isAuthenticated,newtask)
router.get("/mytask",isAuthenticated,getMyTask)
router.route("/:id")
.put( isAuthenticated,updateTask)
.delete(isAuthenticated ,deleteTask)
export default router;



