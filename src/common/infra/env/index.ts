import dotenv from "dotenv";
import z from "zod";
import { AppError } from "../../domain/errors/app.error";

dotenv.config();
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.string().default("3000"),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    throw new AppError(400, "Erro de validação nas variáveis de ambiente");
}

export const env = _env.data;
