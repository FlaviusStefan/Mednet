import { Doctor } from "./doctor";
import { Patient } from "./patient";

export interface User {
    username: string;
    token: string;
    role: Role;
}

export enum Role {
    Patient = 0,
    Doctor = 1
}