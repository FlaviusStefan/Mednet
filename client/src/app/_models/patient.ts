import { Photo } from "./photo";

export interface Patient {
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