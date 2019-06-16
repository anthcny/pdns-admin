import {AbstractEntity} from './base';

export class User extends AbstractEntity {
	email?: string;
	username?: string;
	password?: string;
	role?: string;
	phone?: string;
	deviceId?: string;
	confirm?: boolean;
	confirmCode?: number;
	confirmAtUtc?: number;
}