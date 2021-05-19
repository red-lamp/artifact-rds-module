export interface ISearchService<T> {
  search(query: string): Promise<T[]>;
}
