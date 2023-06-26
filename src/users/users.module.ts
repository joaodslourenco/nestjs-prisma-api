import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from './repositories/users.repository';

@Module({
    controllers: [UsersController],
    providers: [PrismaService, UsersService, UsersRepository],
})
export class UsersModule {}
