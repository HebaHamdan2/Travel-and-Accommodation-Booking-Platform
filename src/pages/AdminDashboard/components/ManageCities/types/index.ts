import { City } from "@/types";
interface CityDialogs {
  open: boolean;
  onClose: () => void;
}
export interface AddCityProps extends CityDialogs {
  onSubmit: (
    name: string,
    description: string,
    resetFields?: () => void
  ) => Promise<boolean>;
}
export interface UpdateCityProps extends CityDialogs {
  selectedCity: City | null;
  onSubmit: (city: Omit<City, "id">) => Promise<boolean>;
}
export interface DeleteCityProps extends CityDialogs {
  cityId: number;
  cityName: string;
  onConfirm: (cityId: number, cityName: string) => void;
}
