import { Body, Controller, Get, Params, Post, Validate } from '../../../../src/decorators';
import { IRequest, IResponse } from '../../../../src/common/interfaces';

import { PostService } from './post.service';
import { CheckPostIdParamDto, CreatePostBodyDto } from './dtos';

@Controller('/posts')
export class PostController {

  private postService : PostService;

  constructor () {
    this.postService = new PostService();
  }

  @Get('/')
  public async index (req : IRequest, res : IResponse) : Promise<object[]> {
    return await this.postService.getAll();
  }

  @Validate()
  @Get('/:postId')
  public async show (@Params(CheckPostIdParamDto) req : IRequest, res : IResponse) : Promise<object> {
    return await this.postService.getOne(req.params.postId);
  }

  @Validate()
  @Post('/')
  public async create (@Body(CreatePostBodyDto) req : IRequest, res : IResponse) : Promise<object> {
    return await this.postService.insert(req.body);
  }

}