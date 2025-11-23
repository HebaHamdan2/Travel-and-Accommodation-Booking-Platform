import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import { useDebounce } from "../../../../hooks/useDebouns";
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
import AdminTablePagination from "../AdminTable/AdminTablePagination";
import { AdminTableHeader } from "../AdminTable/AdminTableHeader";
import AdminTableBody from "../AdminTable/AdminTableBody";
const ManageHotels: React.FC = () => {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [updateHotel, setUpdateHotel] = useState<AdminHotel | null>(null);
  const [deleteHotelId, setDeleteHotelId] = useState<number | null>(null);
  const { handleAddHotel } = useAddHotel();
  const debouncedSearch = useDebounce(search, 400);
  const { handleDeleteHotel } = useDeleteHotel();
  const { handleUpdateHotel } = useUpdateHotel();
  const {
    data: hotelsData,
    isLoading: hotelsLoading,
    isError: errorHotels,
  } = useGetHotelsQuery({
    searchQuery: "",
    pageSize: 100,
    pageNumber: 1,
  });
  const safeHotels = errorHotels ? mockHotelsData : hotelsData ?? [];
  const { data: citiesData = [] } = useGetCitiesQuery({
    searchQuery: "",
    pageSize: 100,
    pageNumber: 1,
  });

  const { data: hotelDetails } = useGetHotelDetailsQuery(deleteHotelId ?? 0, {
    skip: !deleteHotelId,
  });

  const filteredHotels = useMemo(() => {
    if (!debouncedSearch) return safeHotels;
    const q = debouncedSearch.toLowerCase();
    return safeHotels.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.description?.toLowerCase().includes(q)
    );
  }, [safeHotels, debouncedSearch]);

  const paginatedHotels = useMemo(() => {
    const start = (pageNumber - 1) * pageSize;
    return filteredHotels.slice(start, start + pageSize);
  }, [filteredHotels, pageNumber, pageSize]);

  const hasPrev = pageNumber > 1;
  const hasNext = filteredHotels.length > pageNumber * pageSize;
  const handelAddHotelSubmit = async (
    hotel: Omit<AdminHotel, "id">,
    cityId: number | "",
    resetForm?: () => void
  ): Promise<boolean> => {
    const result = await handleAddHotel(cityId, hotel, resetForm);
    const success = result ?? false;
    return success;
  };
  const handelUpdateHotelSubmit = async (
    hotelId: number,
    hotels: Omit<AdminHotel, "id">
  ) => {
    const success = await handleUpdateHotel(hotelId, hotels);
    return success;
  };
  const handelDeleteSubmit = async () => {
    if (deleteHotelId !== null && hotelDetails) {
      const success = await handleDeleteHotel(
        hotelDetails?.cityId,
        deleteHotelId
      );
      if (success) {
        setDeleteHotelId(null);
      }
    }
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
        title="Hotel"
        onAddClick={() => setAddOpen(true)}
      />
      <Box sx={{ overflowX: "auto" }}>
          <AdminTableBody
            variant="hotel"
            data={paginatedHotels}
            loading={hotelsLoading}
            onRowClick={(hotel) => setUpdateHotel(hotel)}
            onDelete={(hotel) => setDeleteHotelId(hotel.id)}
          />
      </Box>
      <AdminTablePagination
        page={pageNumber}
        hasNext={hasNext}
        hasPrev={hasPrev}
        onNext={() => setPageNumber(pageNumber + 1)}
        onPrev={() => setPageNumber(pageNumber - 1)}
      />
      {/* Add / Update / Delete Dialogs */}
      <AddHotelDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        cities={citiesData}
        onSubmit={handelAddHotelSubmit}
      />
      <UpdateHotelDialog
        open={!!updateHotel}
        onClose={() => setUpdateHotel(null)}
        hotel={updateHotel}
        onSubmit={handelUpdateHotelSubmit}
      />
      {deleteHotelId !== null && hotelDetails && (
        <DeleteHotelDialog
          open={true}
          onClose={() => setDeleteHotelId(null)}
          hotelId={deleteHotelId}
          cityId={hotelDetails.cityId}
          onConfirm={handelDeleteSubmit}
        />
      )}
    </Box>
  );
};
export default ManageHotels;
