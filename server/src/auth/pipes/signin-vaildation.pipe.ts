import { PipeTransform, ArgumentMetadata, Pipe, BadRequestException } from '@nestjs/common';
import { validate, Validator } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { SignInDto } from '../dto';

@Pipe()
export class SignInValidationPipe implements PipeTransform<any> {
	protected validator = new Validator();

	async transform(value: any, metadata: ArgumentMetadata) {
		const valueTyped = plainToClass<SignInDto, SignInDto>(SignInDto, value);

		const errors = await validate(valueTyped);
		if (errors.length > 0) {
			throw new BadRequestException();
		}
		if (valueTyped.isMobile)
			this.mobileUserValidate(valueTyped);
		else
			this.webUserValidate(valueTyped);

		return valueTyped;
	}

	mobileUserValidate(dto: SignInDto) {
		const valid =
			this.validator.isString(dto.phone)
			&& this.validator.isString(dto.deviceId);
		if (!valid)
			throw new BadRequestException();
	}

	webUserValidate(dto: SignInDto) {
		const valid =
			this.validator.isString(dto.email)
			&& this.validator.isString(dto.password)
			&& this.validator.isEmail(dto.email);
		if (!valid)
			throw new BadRequestException();
	}
}