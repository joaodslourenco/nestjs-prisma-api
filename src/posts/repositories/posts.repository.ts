import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createPostDto: CreatePostDto): Promise<PostEntity> {
        const newPost = await this.prisma.post.create({
            data: createPostDto,
        });
        return newPost;
    }

    async findAll(): Promise<PostEntity[]> {
        return this.prisma.post.findMany();
    }

    async findOne(id: number): Promise<PostEntity> {
        const post = await this.prisma.post.findUnique({
            where: {
                id,
            },
        });
        return post;
    }

    async update(
        id: number,
        updatePostDto: UpdatePostDto,
    ): Promise<PostEntity> {
        const updatedPost = await this.prisma.post.update({
            where: { id },
            data: updatePostDto,
        });
        return updatedPost;
    }

    async remove(id: number): Promise<PostEntity> {
        return this.prisma.post.delete({ where: { id } });
    }
}
