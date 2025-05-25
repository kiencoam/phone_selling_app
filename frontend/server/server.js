import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

if (import.meta.env.PROD) app.listen(4000);

export const viteNodeApp = app;
