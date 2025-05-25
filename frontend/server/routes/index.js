import { Router } from "express";
import paymentRouter from "./paymentRouter";
import paymentZaloRouter from "./paymentZaloRouter";

const router = Router();

router.use("/", paymentRouter);
router.use("/zalo", paymentZaloRouter);

export default router;
