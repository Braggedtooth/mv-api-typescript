import { Controller, Get, HttpCode, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(":name")
  getHelloName( @Param("name") name: string) : string { 
    return this.appService.getHelloName(name)
  }
}