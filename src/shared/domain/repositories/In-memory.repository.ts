import { randomUUID } from "node:crypto";
import { NotFoundError } from "../errors/not-found.error";
import { IRepository, SearchInput, SearchOutput } from "./IRepository";

export type ModelProps = {
    id?: string;
    [key: string]: any;
};

export type CreateProps = {
    [key: string]: any;
};

export abstract class InMemoryRepository<Model extends ModelProps> implements IRepository<Model, CreateProps> {
    items: Model[] = [];
    sortableFields: string[] = [];

    create(props: CreateProps): Model {
        const model = {
            id: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...props,
        };
        return model as unknown as Model;
    }

    async insert(model: Model): Promise<Model> {
        this.items.push(model);
        return model;
    }

    async findById(id: string): Promise<Model> {
        return this._get(id);
    }

    async update(model: Model): Promise<Model> {
        await this._get(model.id!);
        const index = this.items.findIndex((item) => item.id === model.id);
        this.items[index] = model;
        return model;
    }

    async delete(id: string): Promise<void> {
        await this._get(id);
        const index = this.items.findIndex((item) => item.id === id);
        this.items.splice(index, 1);
    }

    async search(props: SearchInput): Promise<SearchOutput<Model>> {
        const page = props.page ?? 1;
        const perPage = props.perPage ?? 15;
        const sort = props.sort ?? null;
        const sortDir = props.sortDir ?? null;
        const filter = props.filter ?? null;

        const filteredItems = await this.applyFilter(this.items, filter);
        const orderedItems = await this.applySort(filteredItems, sort, sortDir);
        const paginatedItems = await this.applyPaginate(orderedItems, page, perPage);
        return {
            items: paginatedItems,
            total: filteredItems.length,
            currentPage: page,
            perPage,
            sort,
            sortDir,
            filter,
        };
    }

    protected abstract applyFilter(items: Model[], filter: string | null): Promise<Model[]>;

    protected async applySort(items: Model[], sort: string | null, sortDir: string | null): Promise<Model[]> {
        if (!sort || !this.sortableFields.includes(sort)) {
            return items;
        }

        // -1 : o A vem ANTES de B
        // +1 : o A vem DEPOIS de B
        return [...items].sort((a, b) => {
            // mesma coisa que por ex: a.age, b.age
            // if (sortDir === "asc") {
            //     if (a[sort] < b[sort]) return -1;

            //     // 35       // 22
            //     if (a[sort] > b[sort]) return 1;
            // }
            // if (sortDir === "desc") {
            //     if (a[sort] < b[sort]) return 1;
            //     if (a[sort] > b[sort]) return -1;
            // }

            if (a[sort] < b[sort]) return sortDir === "asc" ? -1 : 1;
            if (a[sort] > b[sort]) return sortDir === "asc" ? 1 : -1;

            return 0;
        });
    }

    protected async applyPaginate(items: Model[], page: number, perPage: number): Promise<Model[]> {
        const start = (page - 1) * perPage;
        const limit = start + perPage;
        return items.slice(start, limit);
    }

    protected async _get(id: string): Promise<Model> {
        const model = this.items.find((item) => item.id === id);
        if (!model) {
            throw new NotFoundError(`Model not found using ID ${id}`);
        }
        return model;
    }
}
