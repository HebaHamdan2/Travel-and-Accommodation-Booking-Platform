import { useDebounce } from "@/hooks/useDebouns";
import { useState } from "react";

export function useAdminTable<T>(pageSizeDefault = 5) {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(pageSizeDefault);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const debouncedSearch = useDebounce(search);

  const handleRowClick = (item: T) => {
    setSelectedItem(item);
    setOpenUpdate(true);
  };

  const handleDeleteClick = (item: T) => {
    setSelectedItem(item);
    setOpenDelete(true);
  };

  const resetSelection = () => setSelectedItem(null);

  const handlePrev = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const handleNext = () => setPageNumber(prev => prev + 1);

  return {
    search,
    setSearch,
    pageSize,
    setPageSize,
    pageNumber,
    setPageNumber,
    debouncedSearch,
    selectedItem,
    setSelectedItem,
    openAdd,
    setOpenAdd,
    openUpdate,
    setOpenUpdate,
    openDelete,
    setOpenDelete,
    handleRowClick,
    handleDeleteClick,
    resetSelection,
    handlePrev,
    handleNext,
  };
}
