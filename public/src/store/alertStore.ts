import axios from "axios";
import { create } from "zustand";

const BASE_URL = "http://localhost:3001/api/alerts";

export type Priority = "Low" | "Medium" | "High" | "Critical";
export type Status = "Active" | "Handled";
export type Arena = "North" | "South" | "Center";

export interface AlertInput {
  displayName: string;
  description: string;
  priority: Priority;
  arena: Arena;
  status: Status;
  lon: number;
  lat: number;
}

export interface Alert extends AlertInput {
  id: string;
}

interface AlertsState {
  isLoading: boolean;
  error: string | null;
  alerts: Alert[];
  search: string;
  setAlerts: () => void;
  removeAlert: (id: string) => void;
  //   setSearch: (id: string) => void;
  setNewAlert: (alert: AlertInput) => void;
}

export const useIncidentStore = create<AlertsState>()((set) => ({
  alerts: [],
  isLoading: false,
  error: null,
  search: "",

  setAlerts: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(BASE_URL);
      set({ alerts: res.data.data, isLoading: false });
    } catch (err: any) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch incidents";
      set({
        error: msg,
        isLoading: false,
      });
    }
  },

  setNewAlert: async (alert) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${BASE_URL}`, alert);

      const newAlert: Alert = res.data.data;
      set((state) => ({
        alerts: [newAlert, ...state.alerts],
        isLoading: false,
      }));
      return newAlert;
    } catch (err: any) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch incidents";
      set({
        error: msg,
        isLoading: false,
      });
    }
  },

  removeAlert: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      set((state) => ({
        alerts: state.alerts.filter((alert) => alert.id !== id),
      }));
    } catch (err: any) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch incidents";
      set({
        error: msg,
        isLoading: false,
      });
    }
  },
}));
