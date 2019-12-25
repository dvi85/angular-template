


import {Request, Response} from 'express';
import {USERS} from "./db-data";
import {setTimeout} from "timers";



export function searchUsers(req: Request, res: Response) {

    const queryParams = req.query;

    const filter = queryParams.filter || '',
          sortOrder = queryParams.sortOrder,
          pageNumber = parseInt(queryParams.pageNumber) || 0,
          pageSize = parseInt(queryParams.pageSize);

    let lessons = Object.values(USERS).sort((l1, l2) => l1.id - l2.id);

    if (filter) {

       lessons = lessons.filter(
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
        lessons = lessons.reverse();
    }

    const initialPos = pageNumber * pageSize;

    const lessonsPage = lessons.slice(initialPos, initialPos + pageSize);

    setTimeout(() => {
        res.status(200).json({payload: lessonsPage, usersCount: 256});
    },1000);


}
