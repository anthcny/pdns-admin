import { Component, UnauthorizedException } from '@nestjs/common';

import {SignInDto, SignUpDto, VerifyTokenDto, TokenDto} from '../dto';
import {User} from '../entities';
import {DuplicateRegistrationException} from '../exceptions/duplicate-registration.exception';
import {sign} from 'jsonwebtoken';
import { UuidService } from './uuid.service';
import { getDB, saveDB } from '../../database/useDB';

let usersDB;
getDB('users', users => {
	usersDB = users;
});

@Component()
export class SignService {

	constructor(
		protected uuidService: UuidService,
	) {}

	async signUp(dto: SignUpDto) {
		console.log('sing up dto', dto)
		const newUser: User = new User();
		newUser.createdAtUtc = Date.now();
		newUser.uid = this.uuidService.create();
		// newUser.id = this.users.length;
		if (dto.isMobile) {
			// const existing = this.users.find(u => (
			// 	u.deviceId === dto.deviceId
			// 	&& u.phone === dto.phone
			// ));
			// if (existing)
			// 	throw new DuplicateRegistrationException();
			// newUser.phone = dto.phone;
			// newUser.deviceId = dto.deviceId;
		} else {
			
			const {email, password, role, username} = dto;
			const token = dto.headers && dto.headers.token;
			const update = dto.headers && dto.headers.update;
			newUser.email = email;
			newUser.password = password;
			newUser.role = role;
			let isUpdate = false;
			console.log('sign dto', dto);
			const existing = usersDB[username];
			if(existing && update && token && usersDB[dto.headers.username].token === token){
				usersDB[username].token = null,
				isUpdate = true;
			}
			console.log('isUpdate', isUpdate);
			if (existing && !isUpdate)
				throw new DuplicateRegistrationException();
			usersDB[username] = newUser;
			saveDB('users', usersDB);
			return isUpdate ? 'user updated!' : 'registration succes';
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
			user = usersDB[username];
			user = user && user.password === password ? user : null;
		}
		if (!user)
				throw new UnauthorizedException();
		let token;
		if(user.token){
			token = user.token;
		}
		else {
			token = usersDB[username].token = sign({payload: new TokenDto(user.uid)}, 'secret');
			saveDB('users', usersDB);
		}
		const role = usersDB[username].role;
		return {token, role};
	}
}