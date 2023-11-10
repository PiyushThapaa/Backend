import express from "express";
import {getAllUsers, getMyProfile, login, register} from "../controllers/user.js";

const router = express.Router();

router.get('/all',getAllUsers)

router.post('/new',register)
router.post('/login',login)

// router.get("/special",special)

// router.get("/userid/:id", getUserId)
router.get("/me",getMyProfile)
// .post(postUserId).put(putUserId).delete(deleteUserId)

export default router;