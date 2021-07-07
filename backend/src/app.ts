import cors from "cors";
import express, {json, Request, Response} from "express";
import router from "./routes/router";

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    preflightContinue: false
}))
app.use(json());
app.use(router);

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok"
    })
})

export default app;
