import { Box } from "@mui/material";
import { useGetCitiesQuery } from "../../../../services/admin/cities";
import { useDeleteCity } from "./hooks/useDeleteCity";
import { useAddCity } from "./hooks/useAddCity";
import { useUpdateCity } from "./hooks/useUpdateCity";
import { City } from "@/types";
import AddCityDialog from "./components/AddCityDialog";
import DeleteCityDialog from "./components/DeleteCityDialog";
import UpdateCityDialog from "./components/UpdateCityDialog";
import { useAdminTable } from "../../hooks/useAdminTable";
import AdminManageTable from "../AdminManageTable";

export default function ManageCities() {
  const table = useAdminTable<City>();
  const { handleAddCity } = useAddCity();
  const { handleUpdate } = useUpdateCity();
  const { handleConfirmDelete } = useDeleteCity();

  const { data, isLoading } = useGetCitiesQuery({
    searchQuery: table.debouncedSearch,
    pageSize: table.pageSize,
    pageNumber: table.pageNumber,
  });

  const cities = data ?? [];

  // Add city
  const handleAddCitySubmit = async (
    name: string,
    description: string,
    resetForm?: () => void
  ): Promise<boolean> => {
    const success = await handleAddCity(name, description, resetForm, () =>
      table.setPageNumber(1)
    );
    if (success) table.setOpenAdd(false);
    return success ?? false;
  };

  // Update city
  const handleUpdateCitySubmit = async (city: Omit<City, "id">) => {
    if (!table.selectedItem) return false;
    const success = await handleUpdate(
      table.selectedItem.id,
      city.name,
      city.description
    );
    if (success) table.setOpenUpdate(false);
    return success;
  };

  // Delete city
  const handleDeleteConfirm = async () => {
    if (!table.selectedItem) return;
    const success = await handleConfirmDelete(
      table.selectedItem.id,
      table.selectedItem.name
    );
    if (success) table.setOpenDelete(false);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: "80rem", mx: "auto" }}>
      <AdminManageTable
        title="City"
        variant="city"
        data={cities}
        loading={isLoading}
        tableHook={table}
        onAddClick={() => table.setOpenAdd(true)}
      />
      <AddCityDialog
        open={table.openAdd}
        onClose={() => table.setOpenAdd(false)}
        onSubmit={handleAddCitySubmit}
      />
      <UpdateCityDialog
        open={table.openUpdate}
        onClose={() => table.setOpenUpdate(false)}
        selectedCity={
          table.selectedItem ?? { id: 0, name: "", description: "" }
        }
        onSubmit={handleUpdateCitySubmit}
      />
      {table.selectedItem && (
        <DeleteCityDialog
          open={table.openDelete}
          onClose={() => table.setOpenDelete(false)}
          cityId={table.selectedItem?.id}
          cityName={table.selectedItem?.name}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </Box>
  );
}
