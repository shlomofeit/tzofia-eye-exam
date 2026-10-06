import type { Arena } from "./alert";

export type Role = "arena_user" | "general_user" | "admin";
export type AssignedArena = Arena | "All";

export interface UserInput {
  username: string;
  password: string;
  email: string;
  role: Role;
  assignedArena: AssignedArena;
}

export interface User extends UserInput {
  id: string;
}

export interface UserFormErrors {
  username?: string;
  password?: string;
  email?: string;
}
