import { Photo } from "./photo";
import { Specialization } from "./specialization";

export interface Doctor {
    specialization: Specialization;
    id: number;
    userName: string;
    role: string;
    age: number;
    created: Date;
    lastActive: Date;
    gender: string;
    city: string;
    country: string;
    photos: Photo[];
}