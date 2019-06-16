import { Component } from '@nestjs/common';
import { getDB, saveDB } from '../../database/useDB';

let usersDB;
getDB('users', users => {
	usersDB = users;
});

@Component()
export class DataService {
	constructor(){}

	async getUsers() {
		return usersDB;
	}

	async createUser() {
		return 'ok';
	}
}