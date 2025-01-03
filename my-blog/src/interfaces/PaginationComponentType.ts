export interface PaginationComponentProps {
  itemCount: number;
  perPage: number;
  page: number;
  onPageChange: (pageNumber: number) => void;
}