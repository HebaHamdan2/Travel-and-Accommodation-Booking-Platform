import { Box } from "@mui/material";
import { AdminManageTableProps } from "./types";
import { AdminTableHeader } from "./components/AdminTableHeader";
import AdminTableBody from "./components/AdminTableBody";
import AdminTablePagination from "./components/AdminTablePagination";

export default function AdminManageTable<T>({
  title,
  data,
  loading,
  variant,
  tableHook,
  onAddClick,
}: AdminManageTableProps<T>) {
  const hasPrev = tableHook.pageNumber > 1;
  const hasNext = data.length === tableHook.pageSize;

  return (
    <Box>
      {variant !== "room" && (
        <AdminTableHeader
          search={tableHook.search}
          onSearch={(value) => {
            tableHook.setSearch(value);
            tableHook.setPageNumber(1);
          }}
          pageSize={tableHook.pageSize}
          onPageSizeChange={(size) => {
            tableHook.setPageSize(size);
            tableHook.setPageNumber(1);
          }}
          title={title}
          onAddClick={onAddClick}
        />
      )}
      <Box sx={{ overflowX: "auto" }}>
        <AdminTableBody
          variant={variant}
          data={data}
          loading={loading}
          onRowClick={tableHook.handleRowClick}
          onDelete={tableHook.handleDeleteClick}
        />
      </Box>
      {variant !== "room" && (
        <AdminTablePagination
          page={tableHook.pageNumber}
          hasPrev={hasPrev}
          hasNext={hasNext}
          onPrev={tableHook.handlePrev}
          onNext={tableHook.handleNext}
        />
      )}
    </Box>
  );
}
