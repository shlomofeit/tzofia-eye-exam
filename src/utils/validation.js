import { z } from "zod";

export const alertSchema = z.object({
  displayName: z
    .string("Disaplay name must be a string")
    .min(2, "Display name must have at least 2 charaterce"),
  description: z
    .string("Description name must be a string")
    .min(2, "Description name must have at least 2 charaterce"),
  priority: z.enum(
    ["Low", "Medium", "High", "Critical"],
    "Priority must be Low, Medium, High or Critical",
  ),
  arena: z.enum(
    ["North", "South", "Center"],
    "Arena must be North, South or Center",
  ),
  status: z.enum(["Active", "Handled"], "Status must be Active or Handled"),
  lon: z
    .number("Lon must be a number")
    .min(-180, "Lon must be greater than -180")
    .max(180, "Lon must be less than 180"),
  lat: z
    .number("Lat must be a number")
    .min(-90, "Lat must be greater than -90")
    .max(90, "Lat must be less than 90"),
});

export const updateAlertSchema = alertSchema.partial();

export const userSchema = z.object({
  username: z
    .string("Username must be a string")
    .min(2, "Username must have at least 2 charaterce"),
  password: z
    .string("Password must be a string")
    .min(6, "Password must have at least 6 charaterce"),
  email: z.email("Invalid email address"),
  role: z.enum(
    ["arena_user", "general_user", "admin"],
    "Role must be arena_user, general_user or admin",
  ),
  assignedArena: z.enum(
    ["North", "South", "Center", "All"],
    "AssignedArena must be North, South, Center or All",
  ),
});

export const loginSchema = z.object({
  username: z.string("Username must be a string"),
  password: z.string("Password must be a string"),
});
