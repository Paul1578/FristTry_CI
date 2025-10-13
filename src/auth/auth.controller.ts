import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authServive: AuthService,

    ){}

    @Post('register')
        register(@Body()registerDto: RegisterDto){
        return this.authServive.register(registerDto)
        }
  

    @Post('login')
    login(){
        return this.authServive.login()
    }
}
