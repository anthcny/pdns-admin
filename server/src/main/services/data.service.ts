import { Component } from '@nestjs/common';


@Component()
export class DataService {
	constructor(){}

	async getUsers(params) {
		return 'ok';
	}

	async createUser() {
		return 'ok';
	}
}