import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';//
import { UserRepository } from './user.repository';//

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([UserRepository])],//
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
