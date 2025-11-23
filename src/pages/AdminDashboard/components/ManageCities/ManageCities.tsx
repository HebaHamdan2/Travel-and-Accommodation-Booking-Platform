import { useState } from "react";
import { Box } from "@mui/material";
import { useDebounce } from "../../../../hooks/useDebouns";
import { useGetCitiesQuery } from "../../../../services/admin/cities";
import { useDeleteCity } from "./hooks/useDeleteCity";
import { useAddCity } from "./hooks/useAddCity";
import { useUpdateCity } from "./hooks/useUpdateCity";
import AddCityDialog from "./components/AddCityDialog";
import DeleteCityDialog from "./components/DeleteCityDialog";
import { City } from "@/types";
import UpdateCityDialog from "./components/UpdateCityDialog";
import { AdminTableHeader } from "../AdminTable/AdminTableHeader";
import AdminTablePagination from "../AdminTable/AdminTablePagination";
import AdminTableBody from "../AdminTable/AdminTableBody";
export default function ManageCities() {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City>({
    id: 0,
    name: "",
    description: "",
  });
  const debouncedSearch = useDebounce(search, 400);
  const { handleUpdate } = useUpdateCity();
  const { handleAddCity } = useAddCity();
  const { handleConfirmDelete } = useDeleteCity();
  const handleDeleteClick = (city: {
    id: number;
    name: string;
    description: string;
  }) => {
    setSelectedCity(city);
    setOpenDelete(true);
  };
  const confirmDelete = async () => {
    if (!selectedCity) return;
    const success = await handleConfirmDelete(
      selectedCity.id,
      selectedCity.name
    );
    if (success) {
      setOpenDelete(false);
    }
  };
  const handleRowClick = (city: City) => {
    setSelectedCity(city);
    setOpenUpdate(true);
  };

  const { data, isLoading } = useGetCitiesQuery({
    searchQuery: debouncedSearch,
    pageSize,
    pageNumber,
  });
  const cities = data ?? [];
  const hasPrev = pageNumber > 1;
  const hasNext = cities.length === pageSize;

  const handlePrev = () => hasPrev && setPageNumber(pageNumber - 1);
  const handleNext = () => hasNext && setPageNumber(pageNumber + 1);
  const handleAddCitySubmit = async (
    name: string,
    description: string,
    resetForm?: () => void | undefined
  ): Promise<boolean> => {
    const success = await handleAddCity(name, description, resetForm, () =>
      setPageNumber(1)
    );
    return success ?? false;
  };
  const handleUpdateCitySubmit = async (
    city: Omit<City, "id">
  ): Promise<boolean> => {
    const success = await handleUpdate(
      selectedCity.id,
      city.name,
      city.description
    );
    return success;
  };
  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: "80rem", mx: "auto" }}>
      <AdminTableHeader
        search={search}
        onSearch={(value) => {
          setSearch(value);
          setPageNumber(1);
        }}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPageNumber(1);
        }}
        title="City"
        onAddClick={() => setOpenAdd(true)}
      />
      <Box sx={{ overflowX: "auto" }}>
        <AdminTableBody
          variant="city"
          data={cities}
          loading={isLoading}
          onRowClick={handleRowClick}
          onDelete={handleDeleteClick}
        />
      </Box>
      {/* Pagination */}
      <AdminTablePagination
        page={pageNumber}
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* CRUD City Dialogs -Read  */}
      <AddCityDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSubmit={handleAddCitySubmit}
      />
      <DeleteCityDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        cityId={selectedCity?.id}
        cityName={selectedCity?.name}
        onConfirm={confirmDelete}
      />
      <UpdateCityDialog
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        selectedCity={{
          id: selectedCity.id,
          name: selectedCity.name,
          description: selectedCity.description,
        }}
        onSubmit={handleUpdateCitySubmit}
      />
    </Box>
  );
}
