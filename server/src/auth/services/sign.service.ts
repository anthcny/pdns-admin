import { Component, UnauthorizedException } from '@nestjs/common';

import {SignInDto, SignUpDto, VerifyTokenDto, TokenDto} from '../dto';
import {User} from '../entities';
import {findUser} from '../../../orm/src/operations/User';
import {DuplicateRegistrationException} from '../exceptions/duplicate-registration.exception';
import {sign} from 'jsonwebtoken';
import { UuidService } from './uuid.service';
import JsonDB = require('node-json-db');
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';


var db = new JsonDB(new Config("DataBase", true, true, '/'));
db.push('/users', { 'root': {
	uid: '000',
	password: 'root',
	token: null,
}}, false);

@Component()
export class SignService {
	protected users = db.getData("/users") || {};

	constructor(
		protected uuidService: UuidService,
	) {}

	async signUp(dto: SignUpDto) {
		const newUser: User = new User();
		newUser.createdAtUtc = Date.now();
		newUser.uid = this.uuidService.create();
		newUser.id = this.users.length;
		if (dto.isMobile) {
			const existing = this.users.find(u => (
				u.deviceId === dto.deviceId
				&& u.phone === dto.phone
			));
			if (existing)
				throw new DuplicateRegistrationException();
			newUser.phone = dto.phone;
			newUser.deviceId = dto.deviceId;
		} else {
			const existing = this.users.find(u => u.email.toLowerCase() === dto.email.toLowerCase());
			if (existing)
				throw new DuplicateRegistrationException();
			const {email, password} = dto;
			newUser.email = email;
			newUser.password = password;
		}
		// this.users.push(newUser);
	}

	async signIn(dto: SignInDto) {
		let user = null;
		const {isMobile, username, password} = dto;
		if (isMobile) {
			// user = this.users.find(u => (
			// 	u.deviceId === dto.deviceId
			// 	&& u.phone === dto.phone
			// ));
		} else {
			user = this.users[username];
			user = user && user.password === password ? user : null;
		}
		if (!user)
				throw new UnauthorizedException();
		const token = sign({payload: new TokenDto(user.uid)}, 'secret');
		db.push(`/users/${username}`, { token }, false);
		return {token};
	}
}