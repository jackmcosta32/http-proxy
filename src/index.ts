import express, { Router, Request, Response } from "express";

const app = express();
const router = Router();

app.use(express.json());

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello from the proxy server!" });
});

app.use(router);

const port = process.env.SERVER_PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});