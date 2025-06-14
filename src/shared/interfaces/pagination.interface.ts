export type SortOrder = "ASC" | "DESC";

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  showDeleted?: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  recordsPerPage: number;
}
