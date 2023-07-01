import { User } from "../types/User";
import { randomUUID } from 'crypto';
//console.log(randomUUID());

export class Store {

    private users: User[] = [];

    public get_users = () => {
        return this.users
    }

    public get_user_by_id = (id:string): User | undefined => {
        return this.users.find(user => user.id === id)
    }

    public add_user = ()

}