export type Priority = "Low" | "Medium" | "High" | "Critical";
export type Status = "Active" | "Handled";
export type Arena = "North" | "South" | "Center";

export type PriorityFilter = Priority | "All";
export type ArenaFilter = Arena | "All";

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

export interface AlertFormValues {
  displayName: string;
  description: string;
  priority: Priority;
  arena: Arena;
  status: Status;
  lon: string;
  lat: string;
}

export interface AlertFormErrors {
  displayName?: string;
  description?: string;
  lon?: string;
  lat?: string;
}

export interface FilterValues {
  search: string;
  arena: ArenaFilter;
  priority: PriorityFilter;
}
