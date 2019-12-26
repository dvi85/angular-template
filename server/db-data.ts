import {User} from "../src/app/feature/users/components/store/user";



export const USERS = Array.from({ length: 256 }, (value, key) => key)
    .map(n => new User(n, n + "username@gmail.com", "Name" + n, "Surname" + n));




