import { app } from "./app";
import { env } from "../env";
import { dataSource } from "../typeorm";

const bootstrap = async (): Promise<void> => {
    try {
        // DEPOIS IMPLEMENTAR UM DATABASE CONNECTION COMO INJEÇÃO DE DEPENDENCIA PARA ISOLAR
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
            console.log("🟢 Conexão com o banco inicializada com sucesso");
        }

        app.listen(env.PORT, () => {
            console.log("Servidor rodando na porta", env.PORT);
        });
    } catch (error: unknown) {
        console.log("🛑 Erro ao iniciar o servidor", error);
        process.exit(1);
    }
};

export { bootstrap };
