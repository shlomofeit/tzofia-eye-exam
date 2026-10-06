import { create } from "zustand";
import type { User, UserInput } from "../types/user";
import axios from "axios";

const BASE_URL = "http://localhost:3001/api/auth";

interface AuthState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  token: string | null;
  users: User[];
  setLogin: (username: string, password: string) => void;
  setMe: () => void;
  logout: () => void;
  setUsers: () => void;
  setNewUser: (user: UserInput) => void;
  removeUser: (id: string) => void;
}

export function getAuth() {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
}

export function getErrorDetails(err: unknown, other: string): string {
  if (axios.isAxiosError(err))
    return err.response?.data?.error || err.response?.data?.message || other;
  return other;
}

export const useAuthStore = create<AuthState>()((set) => ({
  users: [],
  isLoading: false,
  error: null,
  user: null,
  token: localStorage.getItem("token"),

  setLogin: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${BASE_URL}/login`, { username, password });
      const { user, token } = res.data.data;
      localStorage.setItem("token", token);
      set({ user, token, isLoading: false });
    } catch (err) {
      const msg = getErrorDetails(err, "Failed to login");
      set({
        error: msg,
        isLoading: false,
      });
    }
  },

  setMe: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/me`, getAuth());
      set({ user: res.data.data });
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, users: [], error: null });
  },

  setUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${BASE_URL}/users`, getAuth());
      set({ users: res.data.data, isLoading: false });
    } catch (err) {
      const msg = getErrorDetails(err, "Failed to fetch users");
      set({
        error: msg,
        isLoading: false,
      });
    }
  },

  setNewUser: async (user) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${BASE_URL}/register`, user, getAuth());

      const newUser = res.data.data;
      set((state) => ({
        users: [...state.users, newUser],
        isLoading: false,
      }));
    } catch (err) {
      const msg = getErrorDetails(err, "Failed to create user");
      set({
        error: msg,
        isLoading: false,
      });
    }
  },

  removeUser: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${BASE_URL}/users/${id}`, getAuth());
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        isLoading: false,
      }));
    } catch (err) {
      const msg = getErrorDetails(err, "Failed to delete user");
      set({
        error: msg,
        isLoading: false,
      });
    }
  },
}));
