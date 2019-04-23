import { Controller, Get, Post, Body, UsePipes, HttpCode } from '@nestjs/common';
import { SignUpDto } from '../dto';
import {SignUpValidationPipe, SignInValidationPipe} from '../pipes';
import {SignService} from '../services';

@Controller('api/sign')
export class SignController {

	constructor(
		protected signService: SignService,
	) {}

	/** create new user */
	@Post('up')
	@UsePipes(new SignUpValidationPipe())
	async signUp(@Body() signUpDto: SignUpDto) {
		return await this.signService.signUp(signUpDto);
	}

	/** signIn/login to app
	 * this method create and return new token
	 * if user or mobile device is exist/signUp
	 */
	@Post('in')
	@UsePipes(new SignInValidationPipe())
	async signIn(@Body() signInDto) {
		return await this.signService.signIn(signInDto);
	}

	/** forced invalidate token, exit from app */
	@Post('out')
	@HttpCode(200)
	signOut(@Body() signOutDto) {

	}

	/** verify token */
	@Post('verify')
	@HttpCode(200)
	verifyToken(@Body() verifyTokenDto) {

	}
}