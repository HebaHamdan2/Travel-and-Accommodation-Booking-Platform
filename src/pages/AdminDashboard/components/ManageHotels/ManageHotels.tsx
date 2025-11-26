import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { useGetHotelsQuery } from "../../../../services/admin/hotels";
import { useGetHotelDetailsQuery } from "../../../../services/user/hotels";
import { useGetCitiesQuery } from "../../../../services/admin/cities";
import { AdminHotel } from "../../../../types";
import AddHotelDialog from "./components/AddHotelDialog";
import UpdateHotelDialog from "./components/UpdateHotelDialog";
import DeleteHotelDialog from "./components/DeleteHotelDialog/DeleteHotelDialog";
import { useAddHotel } from "./hooks/useAddHotel";
import { useDeleteHotel } from "./hooks/useDeleteHotel";
import { useUpdateHotel } from "./hooks/useUpdateHotel";
import { mockHotelsData } from "@/mock/adminHotels.mock";
import { useAdminTable } from "../../hooks/useAdminTable";
import AdminManageTable from "../AdminManageTable";

const ManageHotels: React.FC = () => {
  const table = useAdminTable<AdminHotel>();
  const { handleAddHotel } = useAddHotel();
  const { handleUpdateHotel } = useUpdateHotel();
  const { handleDeleteHotel } = useDeleteHotel();

  const { data: hotelsData, isLoading: hotelsLoading, isError } =
    useGetHotelsQuery({
      searchQuery: "",
      pageSize: 100,
      pageNumber: 1,
    });

  const safeHotels = isError ? mockHotelsData : hotelsData ?? [];

  const { data: citiesData = [] } = useGetCitiesQuery({
    searchQuery: "",
    pageSize: 100,
    pageNumber: 1,
  });

  const { data: hotelDetails } = useGetHotelDetailsQuery(
    table.selectedItem?.id ?? 0,
    { skip: !table.selectedItem }
  );

  const filteredHotels = useMemo(() => {
    if (!table.debouncedSearch) return safeHotels;
    const q = table.debouncedSearch.toLowerCase();
    return safeHotels.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.description?.toLowerCase().includes(q)
    );
  }, [safeHotels, table.debouncedSearch]);

  const paginatedHotels = useMemo(() => {
    const start = (table.pageNumber - 1) * table.pageSize;
    return filteredHotels.slice(start, start + table.pageSize);
  }, [filteredHotels, table.pageNumber, table.pageSize]);

  const handleAddHotelSubmit = async (
    hotel: Omit<AdminHotel, "id">,
    cityId: number | ""
  ) => {
    const success = (await handleAddHotel(cityId, hotel)) ?? false;
    if (success) table.setOpenAdd(false);
    return success;
  };

  const handleUpdateHotelSubmit = async (hotelId: number, hotel: Omit<AdminHotel, "id">) => {
    const success = await handleUpdateHotel(hotelId, hotel);
    if (success) table.setOpenUpdate(false);
    return success;
  };

  const handleDeleteHotelSubmit = async () => {
    if (!table.selectedItem || !hotelDetails) return;
    const success = await handleDeleteHotel(hotelDetails.cityId, table.selectedItem.id);
    if (success) table.setOpenDelete(false);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: "80rem", mx: "auto" }}>
      <AdminManageTable
        title="Hotel"
        variant="hotel"
        data={paginatedHotels}
        loading={hotelsLoading}
        tableHook={table}
        onAddClick={() => table.setOpenAdd(true)}
      />

      <AddHotelDialog
        open={table.openAdd}
        onClose={() => table.setOpenAdd(false)}
        cities={citiesData}
        onSubmit={handleAddHotelSubmit}
      />

      <UpdateHotelDialog
        open={!!table.selectedItem && table.openUpdate}
        onClose={() => table.setOpenUpdate(false)}
        hotel={table.selectedItem}
        onSubmit={handleUpdateHotelSubmit}
      />

      {table.selectedItem && hotelDetails && (
        <DeleteHotelDialog
          open={table.openDelete}
          onClose={() => table.setOpenDelete(false)}
          hotelId={table.selectedItem.id}
          cityId={hotelDetails.cityId}
          onConfirm={handleDeleteHotelSubmit}
        />
      )}
    </Box>
  );
};

export default ManageHotels;
