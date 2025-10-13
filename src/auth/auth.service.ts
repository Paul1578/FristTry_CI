import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,){}

    async register( {name, email, password}:RegisterDto){
        const user = this.userService.fineOneByemail(email)
        if(user){
            throw new BadRequestException('User alredy exist')
        }
        return await this.userService.create({name, email, password})
     }

     async login(){
         //const user = this.userService.fineOneByemail(email)
        return 'login'
     }
}
