import {AbstractEntity} from './base';

export class User extends AbstractEntity {
	email?: string;
	password?: string;
	phone?: string;
	deviceId?: string;
	confirm?: boolean;
	confirmCode?: number;
	confirmAtUtc?: number;
}