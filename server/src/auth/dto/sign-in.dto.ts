import { IsOptional, IsBoolean, IsInt, IsString } from 'class-validator';
export class SignInDto {
	// mobile
	@IsOptional() @IsBoolean()
	isMobile?: boolean;
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