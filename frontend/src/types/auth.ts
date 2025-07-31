export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt?: Date;
  token: string;
}

export interface AuthContextType {
  user: Omit<AuthUser, "token"> | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}
