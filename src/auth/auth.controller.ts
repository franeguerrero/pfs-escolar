import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDTO: RegisterDTO) {
    // console.log(registerDTO);
    return this.authService.register(registerDTO);
  }

  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    // console.log(loginDTO);
    return this.authService.login(loginDTO);
  }
}