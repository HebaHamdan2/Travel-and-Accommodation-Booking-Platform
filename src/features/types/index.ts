export interface AuthState {
  userType: string | null;
  authentication: string | null;
  loading: boolean;
  error?: { title: string } | null;
}
export interface SearchState {
  city?: string;          
  checkInDate: string;     
  checkOutDate: string;     
  starRate?: number;       
  numberOfRooms: number;  
  adults: number;          
  children: number;       
}
export interface SearchSliceState extends SearchState {
  results: any[];
  loading: boolean;
  error: string | null;
}
export interface FiltersState {
  priceRange: number[];    
  rating: number | null;
  amenities: string[];
  roomTypes: string[];
}

export const initialFilterState: FiltersState = {
  priceRange: [0, 800],
  rating: null,
  amenities: [],
  roomTypes: [],
};