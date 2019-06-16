import {IsBoolean, IsOptional, IsInt, IsString, IsEmail, IsMobilePhone} from 'class-validator';

class SignUpHeaders {
	@IsOptional() @IsString()
	token?: string;
	@IsOptional() @IsInt()
	username?: number;
	@IsOptional() @IsBoolean()
	update?: boolean;
	
}

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
	username?: string;
	@IsOptional() @IsString()
	password?: string;
	@IsOptional() @IsString()
	role?: string;

	//fast and bad
	@IsOptional()
	headers?: SignUpHeaders;
}