import { Controller, Get } from "@nestjs/common";

@Controller('api/test')
export class TestController {
    @Get('ok')
    test() {
        return 'OK';
    }
}