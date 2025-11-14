import { useGetAdminNavigationQuery } from "../../../services/admin/adminNavigation";

export interface AdminLink {
  title: string;
  path: string;
}

const staticLinks: AdminLink[] = [
  { title: "Manage Cities", path: "manage-cities" },
  { title: "Manage Hotels", path: "manage-hotels" },
  { title: "Manage Rooms", path: "manage-rooms" },
];

export const useAdminNavigation = (): AdminLink[] => {
  const { data, isError } = useGetAdminNavigationQuery();

  if (isError || !data?.length) {
    return staticLinks;
  }
  return data.map((item: string) => ({
    title: item,
    path: item.toLowerCase().replace(/\s+/g, "-"),
  }));
};
