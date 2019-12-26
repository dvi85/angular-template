


import {Request, Response} from 'express';
import {USERS} from "./db-data";
import {setTimeout} from "timers";



export function searchUsers(req: Request, res: Response) {

    const queryParams = req.query;

    const filter = queryParams.filter || '',
          sortOrder = queryParams.sortOrder,
          pageNumber = parseInt(queryParams.pageNumber) || 0,
          pageSize = parseInt(queryParams.pageSize);

    let users = Object.values(USERS).sort((l1, l2) => l1.id - l2.id);

    if (filter) {

        users = users.filter(
           user =>
               filter === undefined ||
               filter === null ||
               filter == "" ||
               user.login.includes(filter) ||
               user.name.includes(filter) ||
               user.surname.includes(filter)
       );
    }

    if (sortOrder == "desc") {
        users = users.reverse();
    }

    const initialPos = pageNumber * pageSize;

    const usersPage = users.slice(initialPos, initialPos + pageSize);

    setTimeout(() => {
        res.status(200).json({payload: usersPage, usersCount: users.length});
    },1000);


}
