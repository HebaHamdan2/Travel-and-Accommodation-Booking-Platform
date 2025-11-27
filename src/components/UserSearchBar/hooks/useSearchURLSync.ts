import { useNavigate, useLocation } from "react-router-dom";
import { SearchParams } from "../../../types";

export const useSearchURLSync = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const updateURL = (newParams: Partial<SearchParams>) => {
    const params = new URLSearchParams(location.search);

    Object.entries(newParams).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        params.set(k, String(v));
      }
    });

    navigate(
      { pathname: location.pathname, search: `?${params}` },
      { replace: true }
    );
  };

  return { updateURL };
};
