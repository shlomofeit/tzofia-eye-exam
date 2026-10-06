import axios from "axios";
import { create } from "zustand";
import type {
  Alert,
  AlertInput,
  ArenaFilter,
  PriorityFilter,
} from "../types/alert";

const BASE_URL = "http://localhost:3001/api/alerts";

interface AlertsState {
  isLoading: boolean;
  error: string | null;
  alerts: Alert[];
  search: string;
  arena: ArenaFilter;
  priority: PriorityFilter;
  selectedAlert: Alert | null;
  setAlerts: () => void;
  removeAlert: (id: string) => void;
  setSearch: (id: string) => void;
  setArena: (arena: ArenaFilter) => void;
  setPriority: (priority: PriorityFilter) => void;
  setNewAlert: (alert: AlertInput) => void;
  setSelectedAlert: (id: string) => void;
  setUpdateAlert: (id: string, alert: AlertInput) => void;
}

function getErrorDetails(err: unknown, other: string): string {
  if (axios.isAxiosError(err))
    return err.response?.data?.error || err.response?.data?.message || other;
  return other;
}

export const useAlertsStore = create<AlertsState>()((set) => ({
  alerts: [],
  isLoading: false,
  error: null,
  search: "",
  arena: "All",
  priority: "All",
  selectedAlert: null,

  setAlerts: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(BASE_URL);
      set({ alerts: res.data.data, isLoading: false });
    } catch (err) {
      const msg = getErrorDetails(err, "Failed to fetch alerts");
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
    } catch (err) {
      const msg = getErrorDetails(err, "Failed to fetch alerts");
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
    } catch (err) {
      const msg = getErrorDetails(err, "Failed to fetch alerts");
      set({
        error: msg,
        isLoading: false,
      });
    }
  },

  setSelectedAlert: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${BASE_URL}/${id}`);
      set({ selectedAlert: res.data.data, isLoading: false });
    } catch (err) {
      const msg = getErrorDetails(err, "Failed to fetch alerts");
      set({
        error: msg,
        isLoading: false,
      });
    }
  },

  setUpdateAlert: async (id, alert) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, alert);
      set((state) => ({
        alerts: state.alerts.map((a) => (a.id === id ? res.data.data : a)),
      }));
    } catch (err) {
      const msg = getErrorDetails(err, "Failed to fetch alerts");
      set({
        error: msg,
        isLoading: false,
      });
    }
  },

  setSearch: (search) => set({ search }),
  setArena: (arena) => set({ arena }),
  setPriority: (priority) => set({ priority }),
}));
