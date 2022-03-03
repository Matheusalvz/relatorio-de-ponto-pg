import { Controller, Get, Request, UseGuards, Post, Body, Param, ValidationPipe, Patch, Delete} from '@nestjs/common';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";


import { CreateUserDto } from './dto/create-user.dto';//
import { UserService } from './user.service';//
import { ReturnUserDto } from './dto/return-user.dto';//



import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';


@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {} //

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  //Método para criação de usuário
  //@UseGuards(JwtAuthGuard)
  @Post()
  async createAdminUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  //@UseGuards(JwtAuthGuard)
  
  @Get(':id')
  //@Role(UserRole.ADMIN)
  async findUserById(@Param('id') id): Promise<ReturnUserDto> {
    const user = await this.usersService.findUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  //Editar usuários
  @Patch(':id')
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    //@GetUser() user: User,
    @Param('id') id: string,) {

      return this.usersService.updateUser(updateUserDto, id);
    
  }

  //Deletar usuários
  @Delete(':id')
  //@Role(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return {
      message: 'Usuário removido com sucesso',
    };
  }
  
}
