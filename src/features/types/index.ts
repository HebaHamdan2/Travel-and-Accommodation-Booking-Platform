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
