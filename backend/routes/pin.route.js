import express from "express";
import {getPin, getPins, createPin, interactionCheck } from "../controllers/pin.controller.js";
import {verifyToken} from "../middlewares/verifyToken.js";
const router = express.Router();

router.get("/",getPins);
// NOTE: specific routes must come before param routes. Place interaction-check
// before ":id" so it doesn't get captured by the generic get by id route.
router.get("/interaction-check/:id", interactionCheck);
router.get("/:id", getPin);
router.post("/", verifyToken, createPin);

export default router;