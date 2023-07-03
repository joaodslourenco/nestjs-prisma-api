import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Prisma } from '@prisma/client';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class PostsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createPostDto: CreatePostDto): Promise<PostEntity> {
        const { authorEmail } = createPostDto;

        delete createPostDto.authorEmail;

        const user = await this.prisma.user.findUnique({
            where: { email: authorEmail },
        });

        if (!user) {
            throw new NotFoundError('Author not found!');
        }
        const data: Prisma.PostCreateInput = {
            ...createPostDto,
            author: { connect: { email: authorEmail } },
        };

        const newPost = await this.prisma.post.create({
            data,
        });
        return newPost;
    }

    async findAll(): Promise<PostEntity[]> {
        return this.prisma.post.findMany({
            include: { author: { select: { name: true } } },
        });
    }

    async findOne(id: number): Promise<PostEntity> {
        const post = await this.prisma.post.findUnique({
            where: {
                id,
            },
            include: { author: { select: { name: true, email: true } } },
        });
        return post;
    }

    async update(
        id: number,
        updatePostDto: UpdatePostDto,
    ): Promise<PostEntity> {
        const { authorEmail } = updatePostDto;

        if (!authorEmail) {
            return this.prisma.post.update({
                where: { id },
                data: updatePostDto,
            });
        }
        delete updatePostDto.authorEmail;

        const user = await this.prisma.user.findUnique({
            where: { email: authorEmail },
        });

        if (!user) {
            throw new NotFoundError('Author not found.');
        }

        const data: Prisma.PostUpdateInput = {
            ...updatePostDto,
            author: {
                connect: {
                    email: authorEmail,
                },
            },
        };

        const updatedPost = await this.prisma.post.update({
            where: { id },
            data,
            include: { author: { select: { name: true } } },
        });
        return updatedPost;
    }

    async remove(id: number): Promise<PostEntity> {
        return this.prisma.post.delete({ where: { id } });
    }
}
