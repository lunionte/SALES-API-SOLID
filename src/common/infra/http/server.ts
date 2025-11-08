import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import { env } from "../env";

const PORT = env.PORT;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
});
