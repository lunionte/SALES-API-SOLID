import { randomUUID } from "crypto";
import { InMemoryRepository } from "./in-memory.repository";
import { NotFoundError } from "../errors/not-found.error";

type StubModelProps = {
    id: string;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
};

class StubInMemoryRepository extends InMemoryRepository<StubModelProps> {
    constructor() {
        super();
        this.sortableFields = ["name"];
    }

    protected async applyFilter(items: StubModelProps[], filter: string | null): Promise<StubModelProps[]> {
        if (!filter) {
            return items;
        }
        return items.filter((item) => item.name.toLowerCase() === filter.toLowerCase());
    }
}

describe("InMemoryRepository unit tests", () => {
    // sut (System Under Test) é a instância de código que está sendo testado, basicamente a base do que vai ser testado
    // seria a mesma coisa de chamar de repository nesse caso
    let sut: StubInMemoryRepository;
    let model: StubModelProps;
    let props: any;

    // antes de cada teste...
    beforeEach(() => {
        sut = new StubInMemoryRepository();
        props = {
            name: "test nameee",
            price: 10,
        };
        model = {
            id: randomUUID(),
            ...props,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    });

    describe("create", () => {
        it("should create a new model", () => {
            const result = sut.create(props);
            expect(result.id).toBeDefined();
            expect(result.name).toEqual(model.name);
            expect(result.price).toEqual(model.price);
            expect(result.createdAt).toBeInstanceOf(Date);
            expect(result.updatedAt).toBeInstanceOf(Date);
        });
    });

    describe("insert", () => {
        it("should insert a new model", async () => {
            const result = await sut.insert(props);
            expect(result).toStrictEqual(sut.items[0]);
        });
    });

    describe("findById", () => {
        it("should throw a new error when id isn't found", async () => {
            // O teste passa pq o erro é disparado corretamente
            // caso o erro não fosse disparado, deveria falhar
            await expect(sut.findById("invalid_id")).rejects.toThrow(
                new NotFoundError("Model not found using ID invalid_id")
            );
        });

        it("should find a model by id", async () => {
            const data = await sut.insert(model);
            const result = await sut.findById(data.id);
            expect(result).toStrictEqual(data);
        });
    });

    describe("update", () => {
        it("should throw a new error when id isn't found", async () => {
            await expect(sut.update(model)).rejects.toThrow(new NotFoundError(`Model not found using ID ${model.id}`));
        });
        it("should update a model", async () => {
            const data = await sut.insert(model);
            const updatedModel = {
                id: data.id,
                name: "updated Name",
                price: 10000,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            };

            const result = await sut.update(updatedModel);

            expect(result).toStrictEqual(sut.items[0]);
        });
    });

    describe("delete", () => {
        it("should throw a new error when id isn't found", async () => {
            await expect(sut.delete("fake_id")).rejects.toThrow(new NotFoundError("Model not found using ID fake_id"));

            const id = randomUUID();
            await expect(sut.delete(id)).rejects.toThrow(new NotFoundError(`Model not found using ID ${id}`));
        });
        it("should delete a model by id", async () => {
            const data = await sut.insert(model);
            expect(data).toStrictEqual(sut.items[0]);
            await sut.delete(data.id);
            expect(sut.items[0]).toBeUndefined();
        });
    });
});
