import { PipeTransform, ArgumentMetadata, Pipe, BadRequestException } from '@nestjs/common';
import { validate, Validator } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {SignUpDto} from '../dto';

@Pipe()
export class SignUpValidationPipe implements PipeTransform<any> {
	protected validator = new Validator();

	async transform(value: any, metadata: ArgumentMetadata) {
		const valueTyped = plainToClass<SignUpDto, SignUpDto>(SignUpDto, value);

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

	mobileUserValidate(dto: SignUpDto) {
		const valid =
			this.validator.isString(dto.phone)
			&& this.validator.isString(dto.deviceId)
			&& this.validator.isInt(dto.confirmCode)
			&& (dto.confirmCode.toString().length === 6);
		if (!valid)
			throw new BadRequestException();
	}

	webUserValidate(dto: SignUpDto) {
		const valid =
			this.validator.isString(dto.email)
			&& this.validator.isString(dto.password)
			&& this.validator.isEmail(dto.email);
		if (!valid)
			throw new BadRequestException();
	}
}