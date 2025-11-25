import { randomUUID } from "node:crypto";
import { NotFoundError } from "../errors/not-found.error";
import { IRepository, SearchInput, SearchOutput } from "./IRepository";

export type Model = {
    id: string;
    [key: string]: any;
};

export type ModelInput = Omit<Model, "id">;

export type CreateProps = {
    [key: string]: any;
};

export abstract class InMemoryRepository implements IRepository<Model, CreateProps> {
    items: Model[] = [];

    sortableFields: string[] = [];

    // POR SER REPO EM MEMÓRIA, SEMPRE LANÇAR ERRORS (NORMALMENTE USADO EM TESTS)
    // NUNCA LANÇAR EXCESSÕES EM REPOS DE PRODUÇÃO (REPO PRISMA, TYPEORM ETC)
    protected async _get(id: string): Promise<Model> {
        const model = this.items.find((i) => i.id === id);
        if (!model) {
            throw new NotFoundError(`Modelo não encontrado procurando pelo ID ${id}`);
        }
        return model;
    }

    // só cria o objeto em memória | só cria entidade nova (sem ID)
    // vai ser usado no useCase, n aqui
    create(props: CreateProps): Model {
        const model = {
            id: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...props,
        };
        return model as Model;
    }

    // persiste em memória | JÁ RECEBE COM ID, CREATEDAT ETC...
    async insert(model: Model): Promise<Model> {
        this.items.push(model);
        return model as Model;
    }
    async findById(id: string): Promise<Model> {
        return await this._get(id);
    }
    async update(model: Model): Promise<Model> {
        const { id } = model;
        // se n tiver vai lançar a excessão
        await this._get(id);
        const index = this.items.findIndex((i) => i.id === id);
        if (index === -1) throw new NotFoundError(`Entidade com ID ${id} não encontrado`);
        this.items[index] = model;
        return model;
    }
    async delete(id: string): Promise<void> {
        await this._get(id);
        const index = this.items.findIndex((i) => i.id === id);
        this.items.splice(index, 1);
    }
    search(props: SearchInput): Promise<SearchOutput<Model>> {
        throw new Error("Method not implemented.");
    }
}
