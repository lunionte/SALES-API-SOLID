import { randomUUID } from "crypto";
import { InMemoryRepository } from "./In-memory.repository";

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

    beforeEach(() => {
        sut = new StubInMemoryRepository();
        props = {
            name: "test",
            price: 10,
        };
        model = {
            id: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...props,
        };
    });

    it("should create a new model", () => {
        const result = sut.create(props);
        expect(result.name).toStrictEqual(model.name);
    });
});
