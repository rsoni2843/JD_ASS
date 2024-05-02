export interface PaginationProps {
    filter: {
        skip: number;
        take: number;
    };
    currentPage: number;
}
export interface PaginatedResult<T> {
    data: T[];
    total: number;
    current_page: number;
}
