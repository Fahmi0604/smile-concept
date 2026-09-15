declare type Role = "admin" | "editor";
declare type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  photoUrl?: string;
  bio?: string;
  isActive?: boolean;
  created_at: string;
  updated_at: string;
};

declare type UserResponse = User;
