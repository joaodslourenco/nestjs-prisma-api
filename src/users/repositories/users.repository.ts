import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const newUser = await this.prisma.user.create({
            data: createUserDto,
        });
        return newUser;
    }

    async findAll(): Promise<UserEntity[]> {
        return this.prisma.user.findMany();
    }

    async findOne(id: number): Promise<UserEntity> {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<UserEntity> {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
        return updatedUser;
    }

    async remove(id: number): Promise<UserEntity> {
        return this.prisma.user.delete({ where: { id } });
    }
}
