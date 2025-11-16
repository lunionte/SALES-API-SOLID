import dotenv from "dotenv";
import z from "zod";

dotenv.config();
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)),
    DB_TYPE: z.enum(["postgres", "mongodb"]),
    DB_USER: z.string().trim(),
    DB_PASS: z.string().trim(),
    DB_NAME: z.string().trim(),
    DB_PORT: z.coerce.number().default(5432),
    DB_SCHEMA: z.literal("public"),
    DB_HOST: z.string().trim(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error("Erro na validação das váriaveis de ambiente", _env.error);
    process.exit(1);
}

const env = _env.data;

export { env };
