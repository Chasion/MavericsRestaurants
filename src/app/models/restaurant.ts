import { User } from "./user";

export interface Restaurant {
    $key: string;
    name: string;
    photo: string;
    users: User[];
}
