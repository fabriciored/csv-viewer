import { User } from './../entities/user';
import Repository from "./repository";

export default class UsersRepository extends Repository {

    constructor() {
        super("users", User);
      }
}