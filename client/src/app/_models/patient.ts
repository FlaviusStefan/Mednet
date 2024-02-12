import { Photo } from "./photo";

export interface Patient {
    id: number;
    userName: string;
    role: string;
    age: number;
    created: string;
    lastActive: string;
    gender: string;
    city: string;
    country: string;
    photos: Photo[];
}