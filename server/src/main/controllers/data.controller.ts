import { Controller, Get, Post, Body, UsePipes, HttpCode } from '@nestjs/common';
import { DataService } from '../services';

@Controller('api/users')
export class DataController {

    constructor(
		protected DataService: DataService,
	) {}

    @Post('get')
    async getUsers(@Body() params) {
        return await this.DataService.getUsers(params);
    }
}