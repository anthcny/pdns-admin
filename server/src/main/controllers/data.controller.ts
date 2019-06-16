import { Controller, Get, Post, Body, UsePipes, HttpCode } from '@nestjs/common';
import { DataService } from '../services';

@Controller('api/data/')
export class DataController {

    constructor(
		protected DataService: DataService,
	) {}

    @Get('users')
    async getUsers() {
        return await this.DataService.getUsers();
    }

    // @Post('get')
    // async getU(@Body() params) {
    //     return await this.DataService.getUsers(params);
    // }
}