export type SearchInput = {
    // qual pagina quer começar a ver
    page?: number;
    // quantos itens aparecem por página
    perPage?: number;
    // por ex: ?sort=name ou ?sort=createdAt
    sort?: string;
    // direção da ordenação, por ex asc e desc
    sortDir?: string;
    // texto live pra buscar em vários campos
    filter?: string;
};

export type SearchOutput<Model> = {
    items: Model[];
    perPage: number;
    total: number;
    currentPage: number;
    sort: string | null;
    sortDir: string | null;
    filter: string | null;
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
