import dotenv from "dotenv";
import z from "zod";

dotenv.config();
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error("Erro na validação das váriaveis de ambiente", _env.error);
    process.exit(1);
}

export const env = _env.data;
