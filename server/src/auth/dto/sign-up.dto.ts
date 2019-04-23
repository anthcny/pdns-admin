import {IsBoolean, IsOptional, IsInt, IsString, IsEmail, IsMobilePhone} from 'class-validator';

export class SignUpDto {
	// mobile
	@IsOptional() @IsBoolean()
	isMobile?: boolean;
	@IsOptional() @IsInt()
	confirmCode?: number;
	@IsOptional() @IsString()
	phone?: string;
	@IsOptional() @IsString()
	deviceId?: string;

	// web
	@IsOptional() @IsString()
	email?: string;
	@IsOptional() @IsString()
	password?: string;
}