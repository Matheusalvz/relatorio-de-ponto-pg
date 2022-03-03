//import { UserRole } from '../user-roles.enum';
import { IsString, IsOptional } from 'class-validator';
export class UpdateUserDto {
  @IsOptional()
  @IsString({
    message: 'Informe um nome de usuário válido',
  })
  username: string;

  @IsOptional()
  @IsString({
    message: 'Informe setor válido',
  })
  setor: string;

  @IsOptional()
  status: boolean;
}
