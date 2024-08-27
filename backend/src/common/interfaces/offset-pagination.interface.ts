export interface OffsetPaginatedEntity<T> {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    data: T[];
}
