import { Iuser } from './user.interface';

export class User implements Iuser{
    email: string;
    password: string;

    constructor(){
        this.email = "";
        this.password = "";
    }
}