import { app } from "./app";
import { env } from "../env";

function startServer(): void {
    const PORT = env.PORT;
    app.listen(PORT, () => {
        console.log("Servidor rodando na porta", PORT);
    });
}

export { startServer };
