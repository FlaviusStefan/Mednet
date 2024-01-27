import { Doctor } from "./doctor";
import { Patient } from "./patient";

export interface User {
    username: string;
    token: string;
    role: Doctor | Patient;
}