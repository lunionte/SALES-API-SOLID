import express from "express";
import cors from "cors";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API",
            version: "1.0.0",
        },
    },
    apis: [],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();

app.use(cors());
app.use("/api/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use("/api/v1", routes);

app.use(errorHandler);

export { app };
