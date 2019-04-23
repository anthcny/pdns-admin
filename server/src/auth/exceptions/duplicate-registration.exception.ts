import { ConflictException } from '@nestjs/common';

export class DuplicateRegistrationException extends ConflictException {
	constructor(message?: string) {
		super(message || 'user already exist');
	}
}