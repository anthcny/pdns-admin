import { Component, UnauthorizedException } from '@nestjs/common';

import {SignInDto, SignUpDto, VerifyTokenDto, TokenDto} from '../dto';
import {User} from '../entities';
import {DuplicateRegistrationException} from '../exceptions/duplicate-registration.exception';
import {sign} from 'jsonwebtoken';
import { UuidService } from './uuid.service';

@Component()
export class SignService {
	protected users: User[] = [];

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
			newUser.email = dto.email;
			newUser.password = dto.password;
		}
		this.users.push(newUser);
	}

	async signIn(dto: SignInDto) {
		let user: User = null;
		if (dto.isMobile) {
			user = this.users.find(u => (
				u.deviceId === dto.deviceId
				&& u.phone === dto.phone
			));
		} else {
			user = this.users.find(u => (
				u.email.toLowerCase() === dto.email.toLowerCase()
				&& u.password === dto.password
			));
		}
		if (!user)
				throw new UnauthorizedException();
		const token = sign({payload: new TokenDto(user.uid)}, 'secret');
		return {token};
	}
}