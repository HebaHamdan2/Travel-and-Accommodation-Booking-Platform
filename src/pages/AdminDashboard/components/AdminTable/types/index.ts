export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}
export interface AdminTableHeaderProps {
  search: string;
  onSearch: (value: string) => void;
  pageSize: number;
  onPageSizeChange: (value: number) => void;
  title: string;
  onAddClick: () => void;
}
export interface AdminTableBodyProps {
  variant: "room" | "hotel" | "city";
  data: any[];
  loading?: boolean;
  onRowClick?: (row: any) => void;
  onDelete?: (row: any) => void;
}
export interface AdminRowTableProps {
  variant: "room" | "hotel" | "city";
  row: any;
}
export interface AdminPaginationProps {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;   
  onPrev: () => void;   
}
