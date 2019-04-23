import {v1} from 'uuid';
import { Component } from '@nestjs/common';

@Component()
export class UuidService {
	create() {
		return v1();
	}
}