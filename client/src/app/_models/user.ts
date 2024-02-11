import { Doctor } from "./doctor";
import { Patient } from "./patient";
import { Role } from "./role";

export interface User {
    username: string;
    token: string;
    role: Role;
}