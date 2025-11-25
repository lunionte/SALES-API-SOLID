export type SearchInput = {
    page?: number;
    perPage?: number;
    sort?: string;
    sortDir?: string;
    filter?: string;
};

export type SearchOutput<Model> = {
    itens: Model[];
    perPage: number;
    total: number;
    currentPage: number;
    sort: string;
    sortDir: string;
    filter: string;
};

export interface IRepository<Model, CreateProps> {
    // cria uma instância de um modelo de dados
    create(props: CreateProps): Model;
    insert(model: Model): Promise<Model>;
    findById(id: string): Promise<Model>;
    update(model: Model): Promise<Model>;
    delete(id: string): Promise<void>;
    search(props: SearchInput): Promise<SearchOutput<Model>>;
}
