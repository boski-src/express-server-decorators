[express-server-decorators](https://www.npmjs.com/package/express-server-decorators)
===

> Project provide typescript decorators for easily setup web server based on ExpressJS.

## Installation
```
npm install express-server-decorators --save
```
## Example
Look at the code example (API Server): [click here](https://github.com/boski-src/express-server-decorators/tree/master/examples)

## Code samples
```typescript
// app.config.ts

import { IConfig } from 'express-server-decorators';

import { PostController } from './post.controller.ts'

export const AppConfig : IConfig = {
  middlewares: [],
  guards: [],
  handlers: [],
  controllers: [PostController]
};
```
```typescript
// app.ts

import { ExpressApp } from 'express-server-decorators';
import { AppConfig } from './app.config';

export class App extends ExpressApp {

  public configure () {
    this.defaultConfig();
  }

}

export const app : App = new App(AppConfig);
```
```typescript
// post.controller.ts

import { Body, Controller, Get, Params, Post, Validate } from 'express-server-decorators';

import { PostService } from './post.service';
import { CreatePostBodyDto } from './create-post-body.dto.ts';

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

  @Get('/:postId')
  public async show (req : IRequest, res : IResponse) : Promise<object> {
    return await this.postService.getOne(req.params.postId);
  }

  @Validate()
  @Post('/')
  public async create (@Body(CreatePostBodyDto) req : IRequest, res : IResponse) : Promise<object> {
    return await this.postService.insert(req.body);
  }

}
```
```typescript
// post.service.ts

import fetch from 'node-fetch';

import { Catch, HttpError } from 'express-server-decorators';

export class PostService {

  @Catch('Try Catch block activated.')
  public async getAll () : Promise<object[]> {
    let data = await fetch(`https://jsonplaceholder.typicode.com/posts`);

    return await data.json();
  }

  @Catch('Try Catch block activated.')
  public async getOne (postId : number) : Promise<object> {
    let data = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    let json = await data.json();

    if (!json.title) throw new HttpError('Not found post.', 404);

    return json;
  }

  @Catch('Try Catch block activated.')
  public async insert (body : { title : string, body : string, postId : number }) : Promise<object> {
    let data = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    return await data.json();
  }

}
```
```typescript
// create-post-body.dto.ts

import { IsNotEmpty, IsNumber, IsString, Length, MaxLength, Min } from 'class-validator';

export class CreatePostBodyDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  title : string;
  @IsString()
  @MaxLength(300)
  body : string;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  userId : number;
}
```

## Decorators API
HTTP:
##### `Controller (basePath: string, middlewares: { guards : RequestHandler[], params: { name : string, handler : RequestParamHandler })`

##### `Links (array: { action : string, method : HTTP_METHOD, href : string })`

##### `Docs (url: string)`

##### `Get (path: string, middlewares: Function[])`

##### `Post (path: string, middlewares: Function[])`

##### `Patch (path: string, middlewares: Function[])`

##### `Put (path: string, middlewares: Function[])`

##### `All (path: string, middlewares: Function[])`

##### `Options (path: string, middlewares: Function[])`

##### `Delete (path: string, middlewares: Function[])`
Validator:
##### `Validate ()`

##### `Body (rules : class-validator object)`

##### `Params (rules : class-validator object)`

##### `Query (rules : class-validator object)`
Other:
##### `Catch (message : string)`

#### Dependencies: [click here](https://github.com/boski-src/express-server-decorators/network/dependencies)
