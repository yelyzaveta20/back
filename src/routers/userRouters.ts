import { Router } from "express";
import {userController} from "../controllers/userController";



const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);

router.get("/:userId", userController.get);
router.put("/:userId", userController.put);
router.delete("/:userId", userController.delete);

export const userRouter = router;