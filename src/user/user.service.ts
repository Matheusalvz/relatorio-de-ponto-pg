import { Injectable, UnprocessableEntityException, NotFoundException, InternalServerErrorException} from "@nestjs/common";
import { UserClass } from "./classes/user.class";
import { InjectRepository } from '@nestjs/typeorm';//
import { UserRepository } from './user.repository';//
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';//
//import { UserRole } from './user-roles.enum';//
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor( //
    @InjectRepository(UserRepository)//
    private userRepository: UserRepository,//
  ) {}
  private readonly users = [
    {
      userId: 1,
      username: "jaquionias",
      password: "1234"
    },
    {
      userId: 2,
      username: "maria",
      password: "12345"
    }
  ];
  
  async findOne(username: string): Promise<UserClass | undefined> {
    return this.users.find(user => user.username === username);
  }
  
  //Método para criação do usuário
  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.userRepository.createUser(createUserDto);
      //return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
    }
  }
  
  //Método para encontrar usuário por id
  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId, {
      //select: ['email', 'name', 'role', 'id'],
      select: ['username', 'id', 'setor'],
    });

    if (!user) throw new NotFoundException('Usuário não encontrado (Service)');

    return user;
  }
  
  //Método para editar usuários
  async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    const user = await this.findUserById(id);
    const { username, setor, status } = updateUserDto;
    user.username = username ? username : user.username;
    user.setor = setor ? setor : user.setor;
    //user.role = role ? role : user.role;
    user.status = status === undefined ? user.status : status;
    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  //Método para deletar usuários
  async deleteUser(userId: string) {
    const result = await this.userRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado',
      );
    }
  }
  //Implementar método para listar todos os usuários

}
