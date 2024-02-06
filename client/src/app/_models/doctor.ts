import { User } from "./user";

export interface Doctor extends User {
    specialization: string;    
}