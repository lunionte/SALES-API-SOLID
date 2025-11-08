export class AppError extends Error {
    public readonly statusCode: number;

    constructor(statusCode: number = 400, message: string) {
        super(message);
        this.statusCode = statusCode;

        // foi pedido para colocar isso para melhorar o log do erro
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            status: "error",
            message: this.message,
        };
    }
}
