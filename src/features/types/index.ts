export interface AuthState {
  userType: string | null;
  authentication: string | null;
  loading: boolean;
  error?: { title: string } | null;
}
