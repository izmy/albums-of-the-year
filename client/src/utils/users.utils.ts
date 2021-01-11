import { Role } from "../models/user.types";

export const isAdmin = (role: Role[]) => role.includes(Role.ADMIN);
