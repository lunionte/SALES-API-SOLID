import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../domain/errors/app.error";

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): Response => {
    console.error(err);
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(err.toJSON());
    } else if (err instanceof Error) {
        return res.status(500).json({ status: "error", message: "Erro interno do servidor" });
    } else {
        return res.status(500).json({ status: "error", message: "Erro desconhecido", err });
    }
};

export { errorHandler };
