import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repositories/posts.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) {}

    create(createPostDto: CreatePostDto) {
        return this.postsRepository.create(createPostDto);
    }

    findAll() {
        return this.postsRepository.findAll();
    }

    async findOne(id: number) {
        const user = await this.postsRepository.findOne(id);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado!');
        }
        return user;
    }

    update(id: number, updatePostDto: UpdatePostDto) {
        return this.postsRepository.update(id, updatePostDto);
    }

    remove(id: number) {
        return this.postsRepository.remove(id);
    }
}
