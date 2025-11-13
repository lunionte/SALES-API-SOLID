import { app } from "./app";
import { env } from "../env";

function startServer(): void {
    const PORT = env.PORT;
    app.listen(PORT, () => {
        console.log("Servidor rodando na porta", PORT);
        console.log("Api docs disponível na rota GET /documentation");
    });
}

export { startServer };
