import { Request, Response, Router } from "express";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
    return res.json({ message: "Servidor rodando na porta 3000" });
});

export { routes };
