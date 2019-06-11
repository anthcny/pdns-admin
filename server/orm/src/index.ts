import "reflect-metadata";
import {createConnection, getConnectionOptions} from "typeorm";
import {User} from "./entity/User";
import * as bcrypt from 'bcryptjs';

const superAdmin = {
    login: 'root',
    password: 'root',
    email: 'tonyroot@gmail.com',
    uid: '000',
}

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    // user.login = superAdmin.login;
    user.hashPassword = await bcrypt.hash(superAdmin.password, 10);
    user.email = superAdmin.email;
    user.uid = superAdmin.uid;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

}).catch(error => console.log(error));
